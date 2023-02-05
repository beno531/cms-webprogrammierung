import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function saveCss(req, res){
 
    console.log("1!");

    try {
        fs.writeFile(__dirname + "/../assets/css/stylesheetpublic.css", req.body.css, function (err) {
            if (err) throw err;
        });
        console.log("2!");
        
        return res.status(200).json("CSS wurde erfolgreich gespeichert!");
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }

}

async function getInitialCss(req, res){

    try {

        fs.readFile(__dirname + '/../data/backup_stylesheetpublic.css', 'utf8', function read(err, data) {
            if (err) {
                throw err;
            }
            const content = data;
        
            return res.status(200).json(content);  
        });
        
    }
    catch (error) {
        return res.status(500).json({ message: error.message })
    }

}


export default {
    saveCss,
    getInitialCss
};