import Media from  '../models/media'; 
const UPLOADPATH = __dirname + '/../media/';
var fs = require('fs');


async function saveCss(req, res){

    fs.writeFile(__dirname + "/../assets/css/stylesheetpublic.css", req.body.css, function (err) {
        if (err) throw err;
    });

    return ; 

}


module.exports = {
    saveCss
};