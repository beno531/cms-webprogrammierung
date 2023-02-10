"use strict";

import DataSeeder from "./data/seed.js";
import User from "./models/user.js";

import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import express from "express";
import mongoose from "mongoose";
const mongoString = process.env.DATABASE_URL;
import apiRoutes from "./routes/apiRoutes.js";
import privateRoutes from "./routes/privateRoutes.js";
import publicRoutes from "./routes/publicRoutes.js";
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import favicon from 'serve-favicon';

const PORT = process.env.PORT || 8080;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


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

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(404).send('Diese Aktion wurde nicht gefunden!')
});


app.listen(PORT, () => {
    console.log(`App listening at port ${PORT}`)
})