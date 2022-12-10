import * as express from "express";

const path = require('path');
const router = express.Router();

const PrivateViewController = require('../controller/privateViewController');

module.exports = router;


/*********************************
************ PRIVATE *************
**********************************/

// Login
router.get('/login', PrivateViewController.getLogin);

// Dashboard
router.get('/dashboard', PrivateViewController.getDahsboard);

// Medienverwaltung
router.get('/medienverwaltung', PrivateViewController.getMedienverwaltung);

// Nutzerverwaltung
router.get('/nutzerverwaltung', PrivateViewController.getNutzerverwaltung);

// Seitenverwaltung
router.get('/seitenverwaltung', PrivateViewController.getSeitenverwaltung);

// Seiteneditor
router.get('/seiteneditor/:id', PrivateViewController.getSeiteneditor);