import Media from "../models/media";
import Site from "../models/site";


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

module.exports = {
    getLogin,
    getDahsboard,
    getMedienverwaltung,
    getNutzerverwaltung,
    getSeitenverwaltung,
    getSeiteneditor
};