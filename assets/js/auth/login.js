"use strict";

loginForm.onsubmit = async (e) => {
  e.preventDefault();

  if (!navigator.cookieEnabled) {
    alert("Sie haben Cookies in Ihrem Browser deaktiviert! Um sich anmelden zu können, müssen Cookies aktiviert sein.")
  } else {
    var response = await login(loginForm);

    if (response.status == 200) {

      location.href = '/cms/dashboard';

    } else {
      alert("Login ist fehlgeschlagen!");
    }
  }
};