"use strict";

// Liest den aktuellen Username aus dem JWT Token und zeigt ihn in der Header Bar an
function displayUsername() {

    const data = getCookie("auth");

    const user = parseJwt(data);

    var displUser = document.getElementById("username");
    displUser.innerHTML = user.username;

    console.log(user.username);
    return user.username;
}

// Entschlüsselt die Payload des JWT Tokens
function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

// Liest die Cookies aus dem Cookie Storage aus
function getCookie(cookieName) {
    let cookie = {};
    document.cookie.split(';').forEach(function (el) {
        let [key, value] = el.split('=');
        cookie[key.trim()] = value;
    })
    return cookie[cookieName];
}