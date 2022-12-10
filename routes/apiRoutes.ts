import * as express from "express";

const router = express.Router();

const UserController = require('../controller/userController');
const MediaController = require('../controller/mediaController');
const SiteController = require('../controller/siteController');
const AuthController = require('../controller/authController');

module.exports = router;


/*********************************
************** USER **************
**********************************/

// Get all User
router.get('/user', UserController.getAllUser);

// Create User
router.post('/user/create', UserController.createUser);

// Get all User
router.get('/user', UserController.getAllUser);

// Delete User
router.delete('/user/delete/:username', UserController.deleteUser);


/*********************************
************** MEDIA *************
**********************************/

// Create Media
router.post('/media/upload', MediaController.getAllMedia);

// GetAll Media
router.get('/media', MediaController.createMedia);

// Get Media Link
router.get('/media/:id/link', MediaController.getMediaLink);

// Delete Media
router.delete('/media/delete/:id', MediaController.deleteMedia);


/*********************************
************** SITE **************
**********************************/

// Create Site
router.post('/site/create', SiteController.createSite);

// GetAll Sites
router.get('/site', SiteController.getAllSites);

// Seite editieren
//router.post('/site/edit/:id', SiteController.editSite);


// Seite löschen
router.delete('/site/delete/:id', SiteController.deleteSite);


/*********************************
************** AUTH **************
**********************************/

// Check Credentials
router.post('/auth', AuthController.checkCredentials);
