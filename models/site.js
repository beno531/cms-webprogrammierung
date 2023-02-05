"use strict";

import * as mongoose from "mongoose";

const dataSchema = new mongoose.Schema({
    titel: {
        required: true,
        type: String,
        unique : true,
    },
    autor: {
        required: true,
        type: String
    },
    beschreibung: {
        required: true,
        type: String,
    },
    layout: {
        required: true,
        type: String,
        enum: ['Hauptseite', 'Unterseite']
    },
    erstelltAm: {
        required: false,
        type: Date,
    },
    inhalt: {
        required: false,
        type: String,
    }

})

const Site = mongoose.model('Site', dataSchema)
export default Site;