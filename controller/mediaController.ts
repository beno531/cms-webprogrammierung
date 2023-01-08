import Media from  '../models/media'; 
const UPLOADPATH = __dirname + '/../media/';
var fs = require('fs');
const testFolder = './media/';


// Get all Media
async function getAllMedia(req, res){
    try {
        const data = await Media.find();
        res.json(data)
    }
    catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

// Create Media
async function createMedia(req, res) {

    let sampleFile;
    let uploadPath;

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json('Es wurde keine Dtaei hochgeladen');
    }

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    sampleFile = req.files.sampleFile;
    // Remove spaces
    sampleFile.name = sampleFile.name.replace(/\s/g, "");

    uploadPath = UPLOADPATH + sampleFile.name;

    if (fs.existsSync(uploadPath)) {
        return res.status(400).json('Die Datei existiert bereits! Bitte wählen Sie einen anderen Namen.');
    }

    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(uploadPath, async function (err: any) {
        if (err) {
            return res.status(500).json(err);
        }

        // Media in DB enlegen
        const data = new Media({
            bezeichnung: sampleFile.name,
            link: "/media/" + sampleFile.name,
            erstelltAm: Date.now()
        })

        try {
            const dataToSave = await data.save();
            return res.status(200).json(dataToSave);
        }
        catch (error: any) {
            return res.status(400).json(error.message);
        }
    });
}

// Get Media Link
async function getMediaLink(req, res){
    try {
        const data = await Media.findById(req.params.id);
        res.json(data.link)
    }
    catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

// Delete Media
async function deleteMedia(req, res){
    try {
        const id = req.params.id;
        Media.findByIdAndDelete(id, function (err: any, docs: any) {

            let filePath = UPLOADPATH + docs.bezeichnung
            fs.unlinkSync(filePath);
        });

        res.status(200).json("Das Element wurde erfolgreich gelöscht!");
    }
    catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = {
    getAllMedia,
    createMedia,
    getMediaLink,
    deleteMedia
};