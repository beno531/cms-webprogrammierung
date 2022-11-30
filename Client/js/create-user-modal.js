const modalUserCreate = document.querySelector("#modal-user-create");
const triggerUserCreate = document.querySelector("#modal-user-create-trigger");
const closeButtonUserCreate = document.querySelector("#modal-user-create-close-button");

function toggleModal() {
    console.log("hit");

        modalUserCreate.classList.toggle("show-modal");
    
}

/*
function windowOnClick(event) {
    if (event.target === modalUserCreate) {
        toggleModal();
    }
}
*/

triggerUserCreate.addEventListener("click", toggleModal);
closeButtonUserCreate.addEventListener("click", toggleModal);
//window.addEventListener("click", windowOnClick);