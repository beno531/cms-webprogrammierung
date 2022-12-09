import User from  '../models/user';
import SecurityMaster from '../models/securityMaster';


// Create User
async function createUser(req, res, next) {
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

// Delete User
async function deleteUser(req, res, next){
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
    createUser,
    deleteUser
  };