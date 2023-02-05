"use strict";

class LoginUser{

    username;
    password;

    constructor(values = {}) {
        Object.assign(this, values);
    }
}

export default LoginUser;