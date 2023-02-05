import express from "express";
import SecurityMaster from "../models/securityMaster.js";

const router = express.Router();

import PrivateViewController from "../controller/privateViewController.js";


/*********************************
************ PRIVATE *************
**********************************/

// Login
router.get('/login', PrivateViewController.getLogin);

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

export default router;
