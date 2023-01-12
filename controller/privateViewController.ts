import Media from "../models/media";
import Site from "../models/site";


const SettingsController = require('../controller/settingsController');

var fs = require('fs');


// Get Login
function getLogin(req, res){

    res.render('../views/private/login');

}

// Get Dashboard
function getDahsboard(req, res){

    res.render('../views/private/dashboard');

}

// Get Medienverwaltung
async function getMedienverwaltung(req, res){

    res.render('../views/private/medienverwaltung');

}

// Get Nutzerverwaltung
function getNutzerverwaltung(req, res){

    res.render('../views/private/nutzerverwaltung');

}

// Get Seitenverwaltung
function getSeitenverwaltung(req, res){

    res.render('../views/private/seitenverwaltung');

}

// Get Seiteneditor
async function getSeiteneditor(req, res){

    const data = await Site.findOne({_id: req.params.id});

    const media = await Media.find();

    res.render('../views/private/seiteneditor', {
        site: data,
        media: media
    });
}

// Get Einstellungen
async function getEinstellungen(req, res) {

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

module.exports = {
    getLogin,
    getDahsboard,
    getMedienverwaltung,
    getNutzerverwaltung,
    getSeitenverwaltung,
    getSeiteneditor,
    getEinstellungen
};