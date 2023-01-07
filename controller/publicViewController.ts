import Site from  '../models/site';

// Home
async function home(req, res){

    const data = await Site.findOne({layout: "Hauptseite"}).select('titel autor beschreibung inhalt');

    const list = await Site.find({layout: "Unterseite"}).select('titel');

    res.render('../views/public/' + data.titel, {
        site: data,
        unterseiten: list
    });

}

// Render Dynamic
async function renderDynamic(req, res){

    const data = await Site.findOne({titel: req.params.titel}).select('titel autor beschreibung inhalt');

    const list = await Site.find({layout: "Unterseite"}).select('titel');


    res.render('../views/public/' + req.params.titel, {
        site: data,
        unterseiten: list
    });

}

module.exports = {
    home,
    renderDynamic
};