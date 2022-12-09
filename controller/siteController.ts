import Site from  '../models/site';
var fs = require('fs');


// Create User
async function createSite(req, res, next) {
   
    const data = new Site({
        titel: req.body.titel,
        autor: req.body.autor,
        beschreibung: req.body.beschreibung,
        layout: req.body.layout,
        erstelltAm: Date.now()
    })

    // Schauen ob ein Punkt im Titel steht.
    if(data.titel.includes('.') || data.titel.includes('html')){
        res.status(400).json("Der Titel darf keinen Punkt oder eine Dateiendung beinhalten!");
    }

    // Ist Layout gleich Hauptseite, dann titel durch "index" ersetzen.
    if(data.layout.includes('Hauptseite') || data.layout.includes('hauptseite')){
        data.titel = "index";

        var query = Site.find({ layout: 'Hauptseite' });
        query.count(function (err, count) {
            if (err) console.log(err)
            
            if(count >= 1){
                res.status(400).json("Es kann nur maximal 1 Hauptseite angelegt werden!");
            }
        });
    }

    // Wie viele Unterseiten gibt es(wenn layout nicht hauptseite) -> max. 5 unterseiten
    if(data.layout.includes('Unterseite') || data.layout.includes('unterseite')){
        
        var query = Site.find({ layout: 'Unterseite' });
        query.count(function (err, count) {
            if (err) console.log(err)
            
            if(count >= 5){
                res.status(400).json("Es können nur maximal 5 Unterseiten angelegt werden!");
            }
        });
    }

    // Seite in der DB erstellen
    try {

        const dataToSave = await data.save();
    }
    catch (error: any) {
        res.status(400).json(error.message);
    }

    // Erstellen der HTML Datei
    try {

        fs.writeFile(__dirname + "/../client/html/public/" + data.titel + '.html', '', function (err) {
            if (err) throw err;
            console.log('File is created successfully.');
        });
        
    } catch (error: any) {
        res.status(400).json(error.message);
    }

    // Funktion aufruf -> HTML File Header mit Metadaten erzeugen

    //TODO
}

module.exports = {
    createSite
  };