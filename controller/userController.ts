import User from  '../models/user';
import SecurityMaster from '../models/securityMaster';


// Get all User
async function getAllUser(req, res){
    try {
        const data = await User.find().select('name vorname benutzername email rolle');
        
        res.json(data);
    }
    catch (error: any) {
        res.status(500).json({ message: error.message })
    }
    
}

// Create User
async function createUser(req, res) {
    const data = new User({
        name: req.body.name,
        vorname: req.body.vorname,
        benutzername: req.body.benutzername,
        email: req.body.email,
        passwort: req.body.passwort,
        rolle: req.body.rolle
    })

    try {
        data.passwort = await SecurityMaster.hashPassword(data.passwort);

        const dataToSave = await data.save();
        
        res.status(200).json("Der User " + dataToSave.benutzername + " wurde erfolgreich angelegt!")
    }
    catch (error: any) {
        res.status(400).json(error.message);
    }
}

// Update User
async function updateUser(req, res){
    try {
        const username = req.params.username;

        const updatedData = {
            name: req.body.name,
            email: req.body.email,
            rolle: req.body.rolle
        };

        const options = { new: true };

        const result = await User.findOneAndUpdate(
            username, updatedData, options
        )

        res.status(200).json(`Die Änderungen wurden erfolgreich gespeichert!`);
    }
    catch (error: any) {
        res.status(400).json(error.message);
    }
}

// Delete User
async function deleteUser(req, res){
    try {
        const username = req.params.username;
        const data = await User.findOneAndDelete({ benutzername: username }).exec();
        res.status(200).json(`User "${data?.benutzername}" wurde gelöscht.`);
    }
    catch (error: any) {
        res.status(400).json({ message: error.message })
    }
}

module.exports = {
    getAllUser,
    createUser,
    updateUser,
    deleteUser
};