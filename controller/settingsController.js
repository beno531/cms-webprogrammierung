"use-strict";

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


class SettingsController {

    // Speichert die an der StyleSheetPublic.css vorgenommenen Änderungen
    static saveCss(req, res) {

        try {
            // Überschreibt die CSS Datei mit den übermittelten Änderungen
            fs.writeFile(__dirname + "/../assets/css/stylesheetpublic.css", req.body.css, function (err) {
                if (err) throw err;
            });

            return res.status(200).json("CSS wurde erfolgreich gespeichert!");
        }
        catch (error) {
            return res.status(500).json({ message: error.message });
        }

    }

    // Stellt die initiale CSS Datei wieder her
    static getInitialCss(req, res) {

        try {

            // Liest den Inhalt der backup CSS Datei, die den initialen Inhalt der stylesheetpublic beinhaltet
            fs.readFile(__dirname + '/../data/backup_stylesheetpublic.css', 'utf8', function read(err, data) {
                if (err) {
                    throw err;
                }

                return res.status(200).json(data);
            });

        }
        catch (error) {
            return res.status(500).json({ message: error.message })
        }

    }
}


export default SettingsController;