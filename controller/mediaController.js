"use strict";

import Media from '../models/media.js';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const UPLOADPATH = __dirname + '/../media/';

class MediaController {

    // Get all Media
    static async getAllMedia(req, res) {
        try {
            const data = await Media.find();
            res.json(data)
        }
        catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    // Create Media
    static async createMedia(req, res) {

        let sampleFile;
        let uploadPath;

        // Prüft ob wirklich eine Datei hochgeladen wurde und ob sie ungleich der Länge 0 entspricht
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json('Es wurde keine Datei hochgeladen');
        }

        // Selekiert die eigentlich Datei aus der Anfrage
        sampleFile = req.files.sampleFile;

        // Entfernt Leerzeichen aus dem Titel der Datei
        sampleFile.name = sampleFile.name.replace(/\s/g, "");

        // Bestimmt den Pfad, an dem die Datei liegen soll
        uploadPath = UPLOADPATH + sampleFile.name;

        // Prüft ob eine Datei bereits unter dem oben ermittelten Pfad existiert
        if (fs.existsSync(uploadPath)) {
            return res.status(400).json('Die Datei existiert bereits! Bitte wählen Sie einen anderen Namen.');
        }

        // Verschiebt die Datei an die definierte Stelle auf dem Server
        sampleFile.mv(uploadPath, async function (err) {
            if (err) {
                return res.status(500).json(err);
            }

            // Datei wird in DB angelegt
            const data = new Media({
                bezeichnung: sampleFile.name,
                link: "/media/" + sampleFile.name,
                erstelltAm: Date.now()
            })

            try {
                const dataToSave = await data.save();
                return res.status(200).json(dataToSave);
            }
            catch (error) {
                return res.status(400).json(error.message);
            }
        });
    }

    // Delete Media
    static async deleteMedia(req, res) {
        try {
            const id = req.params.id;
            Media.findByIdAndDelete(id, function (err, docs) {

                try {
                    // Physische Datei wird auf dem Server gelöscht 
                    let filePath = UPLOADPATH + docs.bezeichnung
                    fs.unlinkSync(filePath);
                } catch (error) {
                    console.log("Element ist nicht vorhanden!");
                }
            });

            res.status(200).json("Das Element wurde erfolgreich gelöscht!");
        }
        catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}


export default MediaController;