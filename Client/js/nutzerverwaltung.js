//#region Get all Users from API

window.onload = function(){ 
  getAllUser();
};

//#endregion

//#region Subscribe to Create-User-Form

createUserForm.onsubmit = async (e) => {
  e.preventDefault();

  var response = await createUser(createUserForm);

  let result = await response.json();

  if(response.status == 200){
    createUserForm.reset();
    toggleModal();
    alert(result);
  }else{
    alert(result);
  }
};

//#endregion

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