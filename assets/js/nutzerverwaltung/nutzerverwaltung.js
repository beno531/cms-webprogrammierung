"use strict";

// Get all Users from API
window.onload = function(){ 
  getAllUser();
  displayUsername();
};

// Subscribe to Create-User-Form
async function createUserForm() {

  var response = await createUser(createUserForm);

  let result = await response.json();

  if(response.status == 200){
    createUserForm.reset();
    toggleUserCreateModal();
    getAllUser();
    alert(result);
  } else {
    alert(result);
  }
};

// Subscribe to Edit-User-Form
async function editUserForm() {

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