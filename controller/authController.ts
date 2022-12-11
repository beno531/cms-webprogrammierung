import { LoginUser } from "../models/loginUser";
import User from '../models/user'; 
import SecurityMaster from '../models/securityMaster';

const jwt = require('jsonwebtoken');


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

            console.log(jwtSecret);

            // Generate an access token
            const accessToken = jwt.sign({ username: result.benutzername, role: result.rolle }, jwtSecret);


            /*
            res.json({
                accessToken
            });

            */

            res.cookie('auth', accessToken);
            res.json("Das");
        } else {
            res.send('Username or password incorrect');
        }


    }
    catch (error: any) {
        res.status(400).json({ message: error.message })
    }
    
}

async function logout(req, res){
    
    res.clearCookie('auth');

    res.json('You are logged out');
    
}



module.exports = {
    login,
    logout
};