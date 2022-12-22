import User from "./user";

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

export class SecurityMaster {

  public static async hashPassword(password: string) {

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;

  }

  public static async checkPassword(password: string, hash: string) {
    return await bcrypt.compareSync(password, hash);
  }

  public static async updateToken(username) {

    try {
      var result = await User.findOne({ benutzername: username }).exec();

      const jwtSecret = process.env.JWT_SECRET;

      // Generate an access token
      return jwt.sign({ username: result.benutzername, role: result.rolle, overwrite: true }, jwtSecret);

    }
    catch (error: any) {
      console.log(error);
    }

  }

  public static authenticateToken(req, res, next) {

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

    jwt.verify(token, process.env.JWT_SECRET as string, (err: any, user: any) => {

      if (err) return res.sendStatus(403)

      req.user = user

      next()
    })
  }

}

export default SecurityMaster;