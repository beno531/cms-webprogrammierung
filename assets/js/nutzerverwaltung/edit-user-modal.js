"use strict";

const editUserModalContent = `
<div class="modal-content">
            <span class="close-button" id="modal-user-edit-close-button">&times;</span>
            <h1>User editieren:</h1>
            <form name="editUserForm">
                <input type="hidden" id="benutzername" name="benutzername">
                <label for="name">Name:</label><br>
                <input type="text" id="name" name="name"><br>
                <label for="email">Email:</label><br>
                <input type="email" id="email" name="email"><br>
                <label for="rolle">Rolle:</label><br>
                <select name="rolle" id="rolle">
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                </select><br>

                <button type="button" class="modal-btn" onclick="formEditUser()">Speichern</button>
            </form>
        </div>`;

var editUserModal = document.createElement("div");
editUserModal.classList.add("modal");
editUserModal.setAttribute("id", "modal-user-edit");
editUserModal.innerHTML = editUserModalContent;

document.querySelector("body").appendChild(editUserModal);


const modalUserEdit = document.querySelector("#modal-user-edit");
const closeButtonUserEdit = document.querySelector("#modal-user-edit-close-button");


function toggleEditUserModal() {
    
    modalUserEdit.classList.toggle("show-modal");

    document.querySelector('#modal-user-edit #name').value = "";
    document.querySelector('#modal-user-edit #email').value = "";
    document.querySelector('#modal-user-edit #rolle').value = "";


}

function loadUserDataModal(user) {

    document.querySelector('#modal-user-edit #benutzername').value = user.benutzername;
    document.querySelector('#modal-user-edit #name').value = user.name;
    document.querySelector('#modal-user-edit #email').value = user.email;
    document.querySelector('#modal-user-edit #rolle').value = user.rolle;
    
}

closeButtonUserEdit.addEventListener("click", toggleEditUserModal);