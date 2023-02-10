"use strict";

import * as mongoose from "mongoose";
const { Schema } = mongoose;

class SiteSchema extends Schema {
    constructor() {
        super({
            titel: {
                required: true,
                type: String,
                unique: true,
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

        });
    }
}

const Site = mongoose.model('Site', new SiteSchema());
export default Site;