import { LoginUser } from "../models/loginUser.js";
import User from '../models/user.js'; 
import SecurityMaster from '../models/securityMaster.js';
import jwt from "jsonwebtoken";


// Check Credentials -> return token
async function login(req, res){
    const loginUser = new LoginUser({
        username: req.body.username,
        password: req.body.password
    });

    try {


        var result = await User.findOne({ benutzername: loginUser.username }).exec();

        var check = await SecurityMaster.checkPassword(loginUser.password, result.passwort);

        if (check) {
            const jwtSecret = process.env.JWT_SECRET;

            // Generate an access token
            const accessToken = jwt.sign({ username: result.benutzername, role: result.rolle, overwrite: true }, jwtSecret);

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

async function logout(req, res){
    
    res.clearCookie('auth');

    res.json('You are logged out');
    
}


export default {
    login,
    logout
};