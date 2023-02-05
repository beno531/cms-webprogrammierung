"use strict";

import Media from "../models/media.js";
import Site from "../models/site.js";

import fs from 'fs';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class PrivateViewController {

    // Get Login
    static getLogin(req, res) {

        res.render('../views/private/login.ejs');

    }

    // Get Dashboard
    static getDahsboard(req, res) {

        res.render('../views/private/dashboard');

    }

    // Get Medienverwaltung
    static async getMedienverwaltung(req, res) {

        res.render('../views/private/medienverwaltung');

    }

    // Get Nutzerverwaltung
    static getNutzerverwaltung(req, res) {

        res.render('../views/private/nutzerverwaltung');

    }

    // Get Seitenverwaltung
    static getSeitenverwaltung(req, res) {

        res.render('../views/private/seitenverwaltung');

    }

    // Get Seiteneditor
    static async getSeiteneditor(req, res) {

        // Sucht die entsprechende Seite anhand der übermittelten Id in der Datenbank
        const data = await Site.findOne({ _id: req.params.id });

        // Holt alle Media Datensätze aus der Datenbank
        const media = await Media.find();

        res.render('../views/private/seiteneditor', {
            site: data,
            media: media
        });
    }

    // Get Einstellungen
    static async getEinstellungen(req, res) {

        // Liest die CSS Datei für den Public Bereich aus
        fs.readFile(__dirname + "/../assets/css/stylesheetpublic.css", 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                return;
            }

            res.render('../views/private/einstellungen', {
                cssData: data
            });
        });

    }
}



export default PrivateViewController;