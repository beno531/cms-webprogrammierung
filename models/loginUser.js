export class LoginUser{

    username;
    password;

    constructor(values = {}) {
        Object.assign(this, values);
      }
}