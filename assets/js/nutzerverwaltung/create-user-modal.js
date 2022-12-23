const modalUserCreate = document.querySelector("#modal-user-create");
const triggerUserCreate = document.querySelector("#modal-user-create-trigger");
const closeButtonUserCreate = document.querySelector("#modal-user-create-close-button");

function toggleUserCreateModal() {

    modalUserCreate.classList.toggle("show-modal");
    
}

triggerUserCreate.addEventListener("click", toggleUserCreateModal);
closeButtonUserCreate.addEventListener("click", toggleUserCreateModal);