"use-strict";

import Site from '../models/site.js';

class PublicViewController {

    // Home
    static async home(req, res) {

        const data = await Site.findOne({ layout: "Hauptseite" }).select('titel autor beschreibung inhalt');

        const list = await Site.find({ layout: "Unterseite" }).select('titel');

        // Wenn Data != null, dann zeig erstellte Hauptseite an. Ansonsten default index
        if (data) {
            res.render('../views/public/' + data.titel, {
                site: data, // Daten der Hauptseite
                unterseiten: list // Liste aller Unterseiten zur Generierung der Navigation
            });
        } else {
            res.render('../views/public/index', {
                site: data, // Daten der Hauptseite (Hier null)
                unterseiten: list // Liste aller Unterseiten zur Generierung der Navigation
            });
        }
    }

    // Render Dynamic
    static async renderDynamic(req, res) {

        const data = await Site.findOne({ titel: req.params.titel }).select('titel autor beschreibung inhalt');

        const main = await Site.findOne({ layout: "Hauptseite" }).select('titel');

        const list = await Site.find({ layout: "Unterseite" }).select('titel');


        res.render('../views/public/' + req.params.titel, {
            main: main, // Titel der Seite
            site: data, // Daten der darzustellenden Unterseite
            unterseiten: list // Liste aller Unterseiten zur Generierung der Navigation
        });

    }
}

export default PublicViewController;