const modalSiteCreate = document.querySelector("#modal-site-create");
const triggerSiteCreate = document.querySelector("#modal-site-create-trigger");
const closeButtonSiteCreate = document.querySelector("#modal-site-create-close-button");

function toggleSiteCreateModal() {

    modalSiteCreate.classList.toggle("show-modal");
    
}

/*
function windowOnClick(event) {
    if (event.target === modalUserCreate) {
        toggleModal();
    }
}
*/

triggerSiteCreate.addEventListener("click", toggleSiteCreateModal);
closeButtonSiteCreate.addEventListener("click", toggleSiteCreateModal);
//window.addEventListener("click", windowOnClick);