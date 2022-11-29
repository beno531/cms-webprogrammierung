const bcrypt = require('bcrypt');

export class SecurityMaster{

    public static async hashPassword(password: string){

        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(password, salt);

        return hashedPassword;

    }

    public static async checkPassword(password: string, hash: string){
        return await bcrypt.compareSync(password, hash);
    }

}