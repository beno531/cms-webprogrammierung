var fs = require('fs');

async function saveCss(req, res){
 

    try {
        fs.writeFile(__dirname + "/../assets/css/stylesheetpublic.css", req.body.css, function (err) {
            if (err) throw err;
        });
        
        return res.status(200);
    }
    catch (error: any) {
        return res.status(500).json({ message: error.message })
    }

}

async function getInitialCss(req, res){

    try {

        fs.readFile(__dirname + '/../DataSeeder/backup_stylesheetpublic.css', 'utf8', function read(err, data) {
            if (err) {
                throw err;
            }
            const content = data;
        
            return res.status(200).json(content);  
        });
        
    }
    catch (error: any) {
        return res.status(500).json({ message: error.message })
    }

}


module.exports = {
    saveCss,
    getInitialCss
};