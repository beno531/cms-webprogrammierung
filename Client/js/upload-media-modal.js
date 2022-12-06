const modalUploadMedia = document.querySelector("#modal-upload-media");
const closeButtonUploadMedia = document.querySelector("#modal-upload-media-close-button");
const triggerUploadMedia = document.querySelector("#modal-upload-media-trigger");


function toggleUploadMediaModal() {
  
    modalUploadMedia.classList.toggle("show-modal");
}

closeButtonUploadMedia.addEventListener("click", toggleUploadMediaModal);
triggerUploadMedia.addEventListener("click", toggleUploadMediaModal);
