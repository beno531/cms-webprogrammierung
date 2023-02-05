"use strict";

import User from "./user.js";

import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

class SecurityMaster {

  static async hashPassword(password) {

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;

  }

  static async checkPassword(password, dbPassword) {
    return await bcrypt.compareSync(password, dbPassword);
  }

  static async updateToken(username) {

    try {
      var result = await User.findOne({ benutzername: username }).exec();

      const jwtSecret = process.env.JWT_SECRET;

      // Generate an access token
      return jwt.sign({ username: result.benutzername, role: result.rolle, overwrite: true }, jwtSecret);

    }
    catch (error) {
      console.log(error);
    }

  }

  static authenticateToken(req, res, next) {

    let cookies = {};

    if (req.headers.cookie == null) return res.sendStatus(401)

    const cookiesArray = req.headers.cookie.split(';');

    try {
      cookiesArray.forEach((cookie) => {
        const [key, value] = cookie.trim().split('=');
        cookies[key] = value;
      });
    } catch (error) {
      console.log(error);
    }

    const token = cookies['auth'];

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {

      if (err) return res.sendStatus(403)

      req.user = user

      next()
    })
  }

}

export default SecurityMaster;