const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    vorname: {
        required: true,
        type: String
    },
    benutzername: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    rolle: {
        required: true,
        type: String,
        enum: ['admin', 'user']
    },

})

module.exports = mongoose.model('User', dataSchema)