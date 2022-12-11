//#region Logout

async function logoutUser() {

    var response = await logout();
  
    if(response.status == 200){

        //sessionStorage.setItem("cmsAuthToken", result.accessToken);
        location.href = '/';
        alert("Sie wurden abgemeldet!");

    }else{
      alert("Logout ist fehlgeschlagen!");
    }
    
}
  
//#endregion