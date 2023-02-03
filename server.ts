import { DataSeeder } from "./dataseeder/seed";
import User from "./models/user";

require('dotenv').config();

const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;
const apiRoutes = require('./routes/apiRoutes');
const privateRoutes = require('./routes/privateRoutes');
const publicRoutes = require('./routes/publicRoutes');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const morgan = require('morgan');
const path = require('path');
const favicon = require('serve-favicon');

const PORT = process.env.PORT || 8080;


mongoose.connect(mongoString, async function (err) {
    if (err) {
        console.log(err);
    }else{
        User.countDocuments({}, async function( err, count){
            console.log('Anzahl der Benutzer: ' + count);
            if (count < 1) {
                await DataSeeder.seed();
                console.log('User wurde erstellt!');
            }
        })
        
        console.log('Database Connected');
    }
});

const app = express();

app.use(morgan('tiny'));

app.use(cors());

app.use(fileUpload());

app.use('/css', express.static(path.resolve(__dirname, "assets/css")));
app.use('/js', express.static(path.resolve(__dirname, "assets/js")));
app.use('/img', express.static(path.resolve(__dirname, "assets/img")));
app.use('/webfonts', express.static(path.resolve(__dirname, "assets/webfonts")));

app.use("/media", express.static(path.resolve(__dirname, "media")));

app.use(bodyParser.json());

app.use(express.json());

app.set('view engine', 'ejs');

app.use(favicon(__dirname + '/assets/img/favicon.ico'));

app.use('/', publicRoutes);
app.use('/cms', privateRoutes);
app.use('/api', apiRoutes);


app.listen(PORT, () => {
    console.log(`App listening at port ${PORT}`)
})