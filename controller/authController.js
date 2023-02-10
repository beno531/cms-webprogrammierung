"use strict";

import LoginUser from "../models/loginUser.js";
import User from '../models/user.js';
import SecurityMaster from '../models/securityMaster.js';
import jwt from "jsonwebtoken";


class AuthController {

    // Überprüfe die Logindaten des Users
    // @return jwt-token
    static async login(req, res) {

        const loginUser = new LoginUser({
            username: req.body.username,
            password: req.body.password
        });

        try {

            // Holt anhand des Users, dass zugehörige verschlüsselte Passwort aus der Datenbank 
            var result = await User.findOne({ benutzername: loginUser.username }).exec();

            // Vergleicht das Passwort aus der Datenbank mit dem eingegebenen Passwort
            var check = await SecurityMaster.checkPassword(loginUser.password, result.passwort);

            // Falls das Passwort übereinstimmt, wird ein JWT Token erzeugt
            if (check) {
                const jwtSecret = process.env.JWT_SECRET;

                // Generiert den JWT Token
                const accessToken = jwt.sign({ username: result.benutzername, role: result.rolle, overwrite: true }, jwtSecret);

                // Sendet den Token als Cookie an den Client
                res.cookie('auth', accessToken);
                res.json("Login war erfolgreich!");
            } else {
                res.status(400).send('Username oder Passwort falsch!');
            }


        }
        catch (error) {
            res.status(400).json({ message: error.message })
        }

    }

    // Der Nutzer wird abgemeldet
    static async logout(req, res) {

        // Mit dieser Response wird der Cookie "auth" im Cookie Storage vom Client gelöscht
        res.clearCookie('auth');
        res.json('You are logged out');

    }

}


export default AuthController;