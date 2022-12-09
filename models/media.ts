import * as mongoose from "mongoose";

export const dataSchema = new mongoose.Schema({
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

const Media = mongoose.model('Media', dataSchema);
export default Media;