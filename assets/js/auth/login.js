"use strict";

// login 
async function formLogin() {

  // Checkt ob Cookies im Browser erlaubt sind
  if (!navigator.cookieEnabled) {
    alert("Sie haben Cookies in Ihrem Browser deaktiviert! Um sich anmelden zu können, müssen Cookies aktiviert sein.")
  } else {
     //schickt die Login Daten an den Server
    var response = await login(loginForm);

    if (response.status == 200) {

      // Weiterleitung auf die Dashboard Seite
      location.href = '/cms/dashboard';

    } else {
      alert("Login ist fehlgeschlagen!");
    }
  }
};