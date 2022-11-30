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
