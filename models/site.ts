import * as mongoose from "mongoose";

export const dataSchema = new mongoose.Schema({
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

    /* TODO
        - Firmenlogo (Image)
        - Header Image (Nur bei Index)
    */

})

const Site = mongoose.model('SiteDTO', dataSchema)
export default Site;