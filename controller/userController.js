import User from '../models/user.js';
import SecurityMaster from '../models/securityMaster.js';


// Get all User
async function getAllUser(req, res) {

    try {
        const data = await User.find().select('name vorname benutzername email rolle');

        res.json(data);
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }

}

// Create User
async function createUser(req, res) {

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
            data.passwort = await SecurityMaster.hashPassword(data.passwort);

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
async function updateUser(req, res) {

    if (req.user.role == "admin") {

        try {
            const username = req.params.username;

            const updatedData = {
                name: req.body.name,
                email: req.body.email,
                rolle: req.body.rolle
            };


            if (username == req.user.username && updatedData.rolle != req.user.role) {

                res.status(400).json("Sie können Ihre eigene Rolle nicht ändern!");

            } else {
                const options = { new: true };

                const result = await User.findOneAndUpdate(
                    { benutzername: username }, updatedData, options
                )

                // TODO
                if (username == req.user.role) {
                    const accessToken = await SecurityMaster.updateToken(username);
                    res.clearCookie('auth');
                    res.cookie('auth', accessToken);
                }

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
async function deleteUser(req, res) {

    if (req.user.role == "admin") {
        try {

            const username = req.params.username;

            if (req.user.username != username) {
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

export default {
    getAllUser,
    createUser,
    updateUser,
    deleteUser
};