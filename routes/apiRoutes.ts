import * as express from "express";
import SecurityMaster from "../models/securityMaster";

const router = express.Router();

const UserController = require('../controller/userController');
const MediaController = require('../controller/mediaController');
const SiteController = require('../controller/siteController');
const AuthController = require('../controller/authController');
const SettingsController = require('../controller/settingsController');

module.exports = router;


/*********************************
************** USER **************
**********************************/

// Get all User
router.get('/user', SecurityMaster.authenticateToken, UserController.getAllUser);

// Create User
router.post('/user/create', SecurityMaster.authenticateToken, UserController.createUser);

// Update User
router.put('/user/update/:username', SecurityMaster.authenticateToken, UserController.updateUser);

// Delete User
router.delete('/user/delete/:username', SecurityMaster.authenticateToken, UserController.deleteUser);


/*********************************
************** MEDIA *************
**********************************/

// GetAll Media
router.get('/media', SecurityMaster.authenticateToken, MediaController.getAllMedia);

// Create Media
router.post('/media/upload', SecurityMaster.authenticateToken, MediaController.createMedia);

// Delete Media
router.delete('/media/delete/:id', SecurityMaster.authenticateToken, MediaController.deleteMedia);


/*********************************
************** SITE **************
**********************************/

// Create Site
router.post('/site/create', SecurityMaster.authenticateToken, SiteController.createSite);

// GetAll Sites
router.get('/site', SecurityMaster.authenticateToken, SiteController.getAllSites);

// Seite editieren
router.put('/site/:id/edit', SecurityMaster.authenticateToken, SiteController.editSite);

// Seite löschen
router.delete('/site/delete/:id', SecurityMaster.authenticateToken, SiteController.deleteSite);


/*********************************
************** AUTH **************
**********************************/

// Login
router.post('/login', AuthController.login);

// Logout
router.post('/logout', SecurityMaster.authenticateToken, AuthController.logout);


/*********************************
************ Settings ************
**********************************/

// Save CSS
router.post('/settings/css', SecurityMaster.authenticateToken, SettingsController.saveCss);

// Get initial CSS
router.get('/settings/css/initial', SecurityMaster.authenticateToken, SettingsController.getInitialCss);
