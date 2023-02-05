"use strict";

import * as mongoose from "mongoose";
const { Schema } = mongoose;


class MediaSchema extends Schema {
    constructor() {
        super({
            bezeichnung: {
                required: true,
                type: String
            },
            link: {
                required: true,
                type: String
            },
            erstelltAm: {
                required: true,
                type: Date,
            }
        });
    }
}

const Media = mongoose.model("Media", new MediaSchema());
export default Media;