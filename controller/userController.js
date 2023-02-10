"use strict";

import User from '../models/user.js';
import SecurityMaster from '../models/securityMaster.js';


class UserController {

    // Get all User
    static async getAllUser(req, res) {

        try {
            const data = await User.find().select('name vorname benutzername email rolle');

            res.json(data);
        }
        catch (error) {
            res.status(500).json({ message: error.message })
        }

    }

    // Create User
    static async createUser(req, res) {

        // Einschränkung: Nur als Admin ausführbar
        if (req.user.role == "admin") {

            const data = new User({
                name: req.body.name,
                vorname: req.body.vorname,
                benutzername: req.body.benutzername,
                email: req.body.email,
                passwort: req.body.passwort,
                rolle: req.body.rolle
            });

            try {

                // Passwort wird verschlüsselt
                data.passwort = await SecurityMaster.hashPassword(data.passwort);

                // Neuer User wird in der DB angelegt
                const dataToSave = await data.save();

                res.status(200).json("Der User " + dataToSave.benutzername + " wurde erfolgreich angelegt!");
            }
            catch (error) {
                res.status(400).json(error.message);
            }

        } else {
            res.status(403).json("Sie haben keine Berechtigung für diese Aktion!");
        }
    }

    // Update User
    static async updateUser(req, res) {

        // Einschränkung: Nur als Admin ausführbar
        if (req.user.role == "admin") {

            try {
                const username = req.params.username;

                const updatedData = {
                    name: req.body.name,
                    email: req.body.email,
                    rolle: req.body.rolle
                };


                // Checkt ob der User seine eigene Rolle ändert
                if (username == req.user.username && updatedData.rolle != req.user.role) {

                    res.status(400).json("Sie können Ihre eigene Rolle nicht ändern!");

                } else {
                    const options = { new: true };

                    // Aktualisiert die entsprechenden Einträge des Users in der DB
                    const result = await User.findOneAndUpdate(
                        { benutzername: username }, updatedData, options
                    )

                    res.status(200).json(`Die Änderungen wurden erfolgreich gespeichert!`);
                }

            }
            catch (error) {
                res.status(400).json(error.message);
            }

        } else {
            res.status(403).json("Sie haben keine Berechtigung für diese Aktion!");
        }
    }

    // Delete User
    static async deleteUser(req, res) {

        // Einschränkung: Nur als Admin ausführbar
        if (req.user.role == "admin") {
            try {

                const username = req.params.username;

                // Checkt ob der User sich selber löscht
                if (req.user.username != username) {

                    // Ermittelt den User anhand seiner übermittelten ID und löscht diesen in der DB
                    const data = await User.findOneAndDelete({ benutzername: username }).exec();
                    res.status(200).json(`User "${data?.benutzername}" wurde gelöscht.`);
                }
                else {
                    res.status(400).json("Sie können sich nicht selber löschen!");
                }

            }
            catch (error) {
                res.status(400).json({ message: error.message });
            }

        } else {
            res.status(403).json("Sie haben keine Berechtigung für diese Aktion!");
        }
    }
}

export default UserController;