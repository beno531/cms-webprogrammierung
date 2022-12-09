const modalViewMedia = document.querySelector("#view-media-modal");
const closeButtonViewMedia = document.querySelector("#view-media-modal-close-button");


function toggleViewMediaModal() {
    
    modalViewMedia.classList.toggle("show-modal");

    //document.querySelector('#view-media-modal #name').value = "";



}

function loadViewMediaModal(link) {

    document.querySelector('#view-media-modal #mediapreview').src = link;
    
}

closeButtonViewMedia.addEventListener("click", toggleViewMediaModal);