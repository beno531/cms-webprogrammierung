const mediaModalContent = `
<div class="modal-content">
    <span class="close-button" id="modal-upload-media-close-button">&times;</span>
    <h1>Medienupload:</h1>
    <form ref='uploadMediaForm' 
    name='uploadMediaForm'>
        <input type="file" name="sampleFile" />
        <input type='submit' value='Upload!' />
    </form>
</div>`;

var mediaModal = document.createElement("div");
mediaModal.classList.add("modal");
mediaModal.setAttribute("id", "modal-upload-media");
mediaModal.innerHTML = mediaModalContent;

document.querySelector("body").appendChild(mediaModal);


const modalUploadMedia = document.querySelector("#modal-upload-media");
const closeButtonUploadMedia = document.querySelector("#modal-upload-media-close-button");
const triggerUploadMedia = document.querySelector("#modal-upload-media-trigger");


function toggleUploadMediaModal() {
  
    modalUploadMedia.classList.toggle("show-modal");
}

closeButtonUploadMedia.addEventListener("click", toggleUploadMediaModal);
triggerUploadMedia.addEventListener("click", toggleUploadMediaModal);
