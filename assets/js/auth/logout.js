"use strict";

// User Logout
async function logoutUser() {
  var response = await logout();

  if (response.status == 200) {

    location.href = '/';
    alert("Sie wurden abgemeldet!");

  } else {
    alert("Logout ist fehlgeschlagen!");
  }

}