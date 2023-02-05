import Media from  '../models/media.js'; 
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const UPLOADPATH = __dirname + '/../media/';


// Get all Media
async function getAllMedia(req, res){
    try {
        const data = await Media.find();
        res.json(data)
    }
    catch (error) {
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
    sampleFile.mv(uploadPath, async function (err) {
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
        catch (error) {
            return res.status(400).json(error.message);
        }
    });
}

// Delete Media
async function deleteMedia(req, res){
    try {
        const id = req.params.id;
        Media.findByIdAndDelete(id, function (err, docs) {

            try {
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

export default {
    getAllMedia,
    createMedia,
    deleteMedia
};