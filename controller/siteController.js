"use strict";

import Site from '../models/site.js';
import fs from 'fs';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


class SiteController {

    // Get all Sites
    static async getAllSites(req, res) {

        try {
            const data = await Site.find();

            res.json(data);
        }
        catch (error) {
            res.status(500).json({ message: error.message })
        }

    }

    // Create Site
    static async createSite(req, res) {



        const data = new Site({
            titel: req.body.titel,
            autor: req.body.autor,
            beschreibung: req.body.beschreibung,
            layout: req.body.layout,
            erstelltAm: Date.now(),
            inhalt: "<p>Hello World</p>"
        })

        // Schauen ob ein Punkt im Titel steht
        if (data.titel.includes('.') || data.titel.includes('html') || data.titel.includes('htm')) {
            return res.status(400).json("Der Titel darf keinen Punkt oder eine Dateiendung beinhalten!");
        } else if (data.layout.includes('Hauptseite') || data.layout.includes('hauptseite')) {

            // Überprüfe wie viele Hauptseiten es gibt (max. 1)
            var query = Site.find({ layout: 'Hauptseite' });
            if (await query.count() >= 1) {
                return res.status(400).json("Es kann nur maximal 1 Hauptseite angelegt werden!");
            }


            // Seite in der DB erstellen
            var response;
            try {

                const dataToSave = await data.save();
                response = dataToSave;
            }
            catch (error) {
                return res.status(400).json(error.message);
            }



            // Erstellen der HTML Datei
            try {

                var content = `<%- include('partials/_header') %>
                <%- include('partials/_mainNav') %>
                    
                    
                    <main>
                    <%- site.inhalt %>
                    </main>
    
                <%- include('partials/_footer') %>`;

                fs.writeFile(__dirname + "/../views/public/" + data.titel + '.ejs', content, function (err) {
                    if (err) throw err;
                    console.log('File is created successfully.');
                });

            } catch (error) {
                return res.status(400).json(error.message);
            }


        } else if (data.layout.includes('Unterseite') || data.layout.includes('unterseite')) {

            //Wie viele Unterseiten gibt es (wenn layout nicht hauptseite) -> max. 5 Unterseiten
            var query = Site.find({ layout: 'Unterseite' });
            query.count(function (err, count) {
                if (err) console.log(err)

                if (count >= 5) {
                    return res.status(400).json("Es können nur maximal 5 Unterseiten angelegt werden!");
                }
            })

            // Seite in der DB erstellen
            var response;
            try {

                const dataToSave = await data.save();
                response = dataToSave;
            }
            catch (error) {
                res.status(400).json(error.message);
            }

            // Erstellen der HTML Datei
            try {

                var content = `<%- include('partials/_header') %>
                <%- include('partials/_subNav') %>
                    
                <main>
                    <%- site.inhalt %>
                </main>
                
                <%- include('partials/_footer') %>`;

                fs.writeFile(__dirname + "/../views/public/" + data.titel + '.ejs', content, function (err) {
                    if (err) throw err;
                    console.log('File is created successfully.');
                });

            } catch (error) {
                res.status(400).json(error.message);
            }
        }

        res.status(200).json(response);

    }

    // Edit Site
    static async editSite(req, res) {
        try {
            const siteId = req.params.id;


            const updatedData = {
                inhalt: req.body.inhalt,
            };

            const options = { new: true };

            const result = await Site.findOneAndUpdate(
                { _id: siteId }, updatedData, options
            )

            res.status(200).json(`Die Änderungen wurden erfolgreich gespeichert!`);
        }
        catch (error) {
            res.status(400).json(error.message);
        }
    }


    // Delete Site
    static async deleteSite(req, res) {
        try {
            const id = req.params.id;
            Site.findByIdAndDelete(id, function (err, data) {
                if (err) {
                    res.status(400).json({ message: err.message })
                }


                try {

                    let filePath = __dirname + "/../views/public/" + data.titel + '.ejs'
                    fs.unlinkSync(filePath);

                } catch (error) {
                    console.log("Element ist nicht mehr vorhanden!");
                }

                res.status(200).json(`Seite "${data?.titel}" wurde gelöscht.`);
            });

        }
        catch (error) {
            res.status(400).json({ message: error.message })
        }

        // TODO -> Delete File in Public/Views
    }

}


export default SiteController;