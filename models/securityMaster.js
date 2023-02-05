"use strict";

import User from "./user.js";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

class SecurityMaster {

  // Verschlüsselt das User-Passwort
  static async hashPassword(password) {

    // Generiert einen zufälligen Salt
    const salt = await bcrypt.genSalt(10);

    // Aus dem Klartext-Passwort und dem Salt wird ein Hashwert erzeugt
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;

  }

  // Prüft ob das Klartextpasswort mit dem verschlüsselten Passwort übereinstimmt
  static async checkPassword(password, dbPassword) {
    return await bcrypt.compareSync(password, dbPassword);
  }

  // Prüft ob der JWT Token gültig ist
  static authenticateToken(req, res, next) {

    let cookies = {};

    // Schaut ob ein Cokkie im Header der Anfrage mitgesendet wurde
    if (req.headers.cookie == null) return res.sendStatus(401)

    // Falls mehrere Cookies mitgesendet wurden, werden diese aufgeteilt und in einem array gespeichert
    const cookiesArray = req.headers.cookie.split(';');

    // Erstellt eine Key/ Value Liste
    try {
      cookiesArray.forEach((cookie) => {
        const [key, value] = cookie.trim().split('=');
        cookies[key] = value;
      });
    } catch (error) {
      console.log(error);
    }

    // Der Cookie "auth" der den JWT Token enthält, wird selektiert
    const token = cookies['auth'];

    // Wenn der Token nicht exsistiert, dann sende Status 401
    if (token == null) return res.sendStatus(401)

    // Überprüfe den Token auf seine gültigkeit
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {

      if (err) return res.sendStatus(403)

      // Füge die Userdaten der Token Payload als weitere Information an die Anfrage an
      req.user = user

      // Ruft den entsprechenden Controller auf
      next()
    })
  }
}

export default SecurityMaster;