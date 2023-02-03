import * as express from "express";
import { send } from "process";
import SecurityMaster from "../models/securityMaster";

const path = require('path');
const router = express.Router();

const PrivateViewController = require('../controller/privateViewController');

module.exports = router;


/*********************************
************ PRIVATE *************
**********************************/



// Login
router.get('/login', PrivateViewController.getLogin);

router.get('/test', function(req, res) {
    res.send("asd")
});
// Dashboard
router.get('/dashboard', SecurityMaster.authenticateToken, PrivateViewController.getDahsboard);

// Medienverwaltung
router.get('/medienverwaltung', SecurityMaster.authenticateToken, PrivateViewController.getMedienverwaltung);

// Nutzerverwaltung
router.get('/nutzerverwaltung', SecurityMaster.authenticateToken, PrivateViewController.getNutzerverwaltung);

// Seitenverwaltung
router.get('/seitenverwaltung', SecurityMaster.authenticateToken, PrivateViewController.getSeitenverwaltung);

// Seiteneditor
router.get('/seiteneditor/:id', SecurityMaster.authenticateToken, PrivateViewController.getSeiteneditor);

// Einstellungen
router.get('/einstellungen', SecurityMaster.authenticateToken, PrivateViewController.getEinstellungen);
