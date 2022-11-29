import * as express from "express";
import { LoginUser } from "../models/loginUser";
import { SecurityMaster } from "../models/securityMaster";
const fileUpload = require('express-fileupload');
var fs = require('fs');
const router = express.Router();
const jwt = require('jsonwebtoken');
const testFolder = './media/';


const User = require('../models/user');
const MediaDTO = require('../models/media');

module.exports = router;

//Create User
router.post('/user/create', async (req: any, res: any) => {
    const data = new User({
        name: req.body.name,
        vorname: req.body.vorname,
        benutzername: req.body.benutzername,
        email: req.body.email,
        passwort: req.body.passwort,
        rolle: req.body.rolle
    })

    try {

        data.passwort = await SecurityMaster.hashPassword(data.passwort);



        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error: any) {
        res.status(400).json({ message: error.message })
    }
})

// Delete User
router.delete('/user/delete/:username', async (req: any, res: any) => {
    try {
        const username = req.params.username;
        const data = await User.findOneAndDelete({ benutzername: username }).exec();
        //const data = await User.findByIdAndDelete(id)
        res.send(`User "${data.benutzername}" wurde gelöscht.`)
    }
    catch (error: any) {
        res.status(400).json({ message: error.message })
    }
})

// Get all User
router.get('/user', async (req: any, res: any) => {
    try {
        const data = await User.find();
        res.json(data)
    }
    catch (error: any) {
        res.status(500).json({ message: error.message })
    }
})

// Update User
router.patch('/user/update/:username', async (req: any, res: any) => {
    try {
        const username = req.params.username;

        const updatedData = {
            name: req.body.name,
            email: req.body.email,
            rolle: req.body.rolle
        };

        const options = { new: true };

        const result = await User.findOneAndUpdate(
            username, updatedData, options
        )

        res.send(result)
    }
    catch (error: any) {
        res.status(400).json({ message: error.message })
    }
});






//Get by ID Method
router.get('/getOne/:id', async (req: any, res: any) => {
    try {
        const data = await User.findById(req.params.id);
        res.json(data)
    }
    catch (error: any) {
        res.status(500).json({ message: error.message })
    }
})

// Login
router.post('/login', async (req: any, res: any) => {
    //console.log(req.body);
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



            res.json({
                accessToken
            });
        } else {
            res.send('Username or password incorrect');
        }


    }
    catch (error: any) {
        res.status(400).json({ message: error.message })
    }
})

// Media Upload
router.post('/media/upload', async function (req: any, res: any) {

    let sampleFile;
    let uploadPath;

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    sampleFile = req.files.sampleFile;
    // Remove spaces
    sampleFile.name = sampleFile.name.replace(/\s/g, "");

    uploadPath = __dirname + '/../media/' + sampleFile.name;


    // Check ob Dateiname schon vorhanden ist
    fs.readdirSync(testFolder).forEach(file => {
        if (file == sampleFile.name) {
            return res.status(500).send("File already exists! Please change the name of the file!");
        }
    });

    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(uploadPath, async function (err: any) {
        if (err) {
            return res.status(500).send(err);
        }

        // Media in DB enlegen
        const data = new MediaDTO({
            bezeichnung: sampleFile.name,
            link: "http://localhost:3000/media/" + sampleFile.name,
            erstelltAm: Date.now()
        })

        try {
            const dataToSave = await data.save();
            res.status(200).json(dataToSave)
        }
        catch (error: any) {
            res.status(400).json({ message: error.message })
        }
        res.send('File uploaded!');
    });
});

// GetAll Media
router.get('/media', async (req: any, res: any) => {
    try {
        const data = await MediaDTO.find();
        res.json(data)
    }
    catch (error: any) {
        res.status(500).json({ message: error.message })
    }
})

// Get Media-Link by ID
router.get('/media/:id/link', async (req: any, res: any) => {
    try {
        const data = await MediaDTO.findById(req.params.id);
        res.json(data.link)
    }
    catch (error: any) {
        res.status(500).json({ message: error.message })
    }
})

// Delete Media
router.delete('/media/delete/:id', (req: any, res: any) => {
    try {
        const id = req.params.id;
        MediaDTO.findByIdAndDelete(id, function (err: any, docs: any) {
            if (err) {
                console.log(err)
            }
            else {
                console.log("Deleted : ", docs);
            }
        });
        res.send(`Media "${id}" wurde gelöscht.`)
    }
    catch (error: any) {
        res.status(400).json({ message: error.message })
    }
})