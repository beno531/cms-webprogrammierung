import Site from  '../models/site';
var fs = require('fs');


async function getAllSites(req, res) {
   
    try {
        const data = await Site.find();
        
        res.json(data);
    }
    catch (error: any) {
        res.status(500).json({ message: error.message })
    }

}

// Create Site
async function createSite(req, res) {

    
   
    const data = new Site({
        titel: req.body.titel,
        autor: req.body.autor,
        beschreibung: req.body.beschreibung,
        layout: req.body.layout,
        erstelltAm: Date.now(),
        inhalt: "<p>Hello World</p>"
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

    var response;
    try {

        const dataToSave = await data.save();
        response = dataToSave;
    }
    catch (error: any) {
        res.status(400).json(error.message);
    }

    // Erstellen der HTML Datei
    if(data.layout.includes('Unterseite') || data.layout.includes('unterseite')){
        try {

            var content = `<%- include('partials/_header') %>
            <%- include('partials/_subNav') %>
                
            <main>
                <%- site.inhalt %>
            </main>
            
            <%- include('partials/_footer') %>`

            fs.writeFile(__dirname + "/../views/public/" + data.titel + '.ejs', content, function (err) {
                if (err) throw err;
                console.log('File is created successfully.');
            });
            
        } catch (error: any) {
            res.status(400).json(error.message);
        }
    }

    res.status(200).json(response);

}

// Delete Site
async function deleteSite(req, res){
    try {
        const id = req.params.id;
        Site.findByIdAndDelete(id, function (err: any, data: any) {
            if(err){
                res.status(400).json({ message: err.message })
            }

            res.status(200).json(`Seite "${data?.titel}" wurde gelöscht.`);
        });
        
    }
    catch (error: any) {
        res.status(400).json({ message: error.message })
    }

    // TODO -> Delete File in Public/Views
}

module.exports = {
    createSite,
    getAllSites,
    deleteSite
  };