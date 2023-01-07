import SecurityMaster from "../models/securityMaster";
import User from "../models/user";

export class DataSeeder {

    public static async seed() {
        
        const seedUser = [
            {
                name: "Mustermann",
                vorname: "Max",
                benutzername: 'mm11',
                email: "mm11@mail.com",
                passwort: await SecurityMaster.hashPassword("1234"),
                rolle: "admin"

            }];

        //await User.deleteMany({});
        await User.insertMany(seedUser);

    }

}

export default DataSeeder;