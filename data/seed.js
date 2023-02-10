import SecurityMaster from "../models/securityMaster.js";
import User from "../models/user.js";

class DataSeeder {

    static async seed() {
        
        const seedUser = [
            {
                name: "Mustermann",
                vorname: "Max",
                benutzername: 'mm11',
                email: "mm11@mail.com",
                passwort: await SecurityMaster.hashPassword("1234"),
                rolle: "admin"

            }];

        await User.insertMany(seedUser);

    }

}

export default DataSeeder;