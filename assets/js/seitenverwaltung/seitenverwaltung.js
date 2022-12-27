//#region Get all Sites from API

window.onload = function(){ 
  getAllSites();
  displayUsername();
};

//#endregion

//#region Subscribe to Create-User-Form

createSiteForm.onsubmit = async (e) => {
  e.preventDefault();

  var response = await createSite(createSiteForm);

  let result = await response.json();

  if(response.status == 200){

    createSiteForm.reset();

    // Redirect zu seiteneditor mit seite id
    location.href = '/cms/seiteneditor/' + result._id;

  }else{
    alert(result);
  }
};

//#endregion

/*

//#region Subscribe to CreateUser-Form

editUserForm.onsubmit = async (e) => {
  e.preventDefault();

  const username = document.querySelector('#modal-user-edit #benutzername').value;

  var response = await updateUser(username, editUserForm);

  let result = await response.json();

  console.log(result);

  if(response.status == 200){
    toggleEditUserModal();
    getAllUser();
    alert(result);
  }else{
    alert(result);
  }
};

//#endregion


*/