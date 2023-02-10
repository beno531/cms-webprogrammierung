"use strict";

const createUserModalContent = `
<div class="modal-content">
            <span class="close-button" id="modal-user-create-close-button">&times;</span>
            <h1>Neuen User anlegen:</h1>
            <form name="createUserForm">
                <label for="name">Name:</label><br>
                <input type="text" id="name" name="name"><br>
                <label for="vorname">Vorname:</label><br>
                <input type="text" id="vorname" name="vorname"><br>
                <label for="benutzername">Benutzername:</label><br>
                <input type="text" id="benutzername" name="benutzername"><br>
                <label for="email">Email:</label><br>
                <input type="email" id="email" name="email"><br>
                <label for="rolle">Rolle:</label><br>
                <select name="rolle" id="rolle">
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                </select><br>
                <label for="passwort">Passwort:</label><br>
                <input type="password" id="passwort" name="passwort"><br>

                <button type="button" class="modal-btn" onclick="formCreateUser()">Erstellen</button>
            </form>
        </div>`;

var createUserModal = document.createElement("div");
createUserModal.classList.add("modal");
createUserModal.setAttribute("id", "modal-user-create");
createUserModal.innerHTML = createUserModalContent;

document.querySelector("body").appendChild(createUserModal);


const modalUserCreate = document.querySelector("#modal-user-create");
const triggerUserCreate = document.querySelector("#modal-user-create-trigger");
const closeButtonUserCreate = document.querySelector("#modal-user-create-close-button");

// Öffnet oder schließt den modalen Dialog
function toggleUserCreateModal() {

    console.log(modalUserCreate);

    modalUserCreate.classList.toggle("show-modal");
    
}

triggerUserCreate.addEventListener("click", toggleUserCreateModal);
closeButtonUserCreate.addEventListener("click", toggleUserCreateModal);