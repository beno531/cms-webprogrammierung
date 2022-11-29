import * as mongoose from "mongoose";

const dataSchema = new mongoose.Schema({
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

})

module.exports = mongoose.model('MediaDTO', dataSchema)