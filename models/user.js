"use strict";

import * as mongoose from "mongoose";
const { Schema } = mongoose;

class UserSchema extends Schema {
    constructor() {
        super({
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
                type: String,
                unique: true,
            },
            email: {
                required: true,
                type: String
            },
            passwort: {
                required: true,
                type: String
            },
            rolle: {
                required: true,
                type: String,
                enum: ['admin', 'user']
            },

        });
    }
}

const User = mongoose.model('User', new UserSchema());
export default User;


