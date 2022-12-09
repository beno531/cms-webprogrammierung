import * as express from "express";
import { LoginUser } from "../models/loginUser";
import { SecurityMaster } from "../models/securityMaster";
const fileUpload = require('express-fileupload');
const path = require('path');
var fs = require('fs');
const router = express.Router();
const jwt = require('jsonwebtoken');
const testFolder = './media/';


const User = require('../models/user');
const MediaDTO = require('../models/media');
const UPLOADPATH = __dirname + '/../media/';
const SiteDTO = require('../models/site');

module.exports = router;


//Dashboard
router.get('/dashboard', async (req: any, res: any) => {
    console.log("hitt");
    res.sendFile(path.join(__dirname+'client/html/private/dashboard.html'));
});