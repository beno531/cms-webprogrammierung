//#region Subscribe to CreateUser-Form

window.onload = function(){ 
  getAllUser();
};

//#endregion

//#region Subscribe to CreateUser-Form

formElem.onsubmit = async (e) => {
  e.preventDefault();

  var response = await createUser(formElem);

  let result = await response.json();



  // TODO: Wenn Fehler dann ...

  formElem.reset();

  toggleModal();

  //getAllUser();

  alert(result);
};

//#endregion