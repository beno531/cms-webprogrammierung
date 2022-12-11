const mediaViewModalContent = `
<div class="modal-content">
    <span class="close-button" id="view-media-modal-close-button">&times;</span>
    <h1>View Media:</h1>
        <iframe id="mediapreview" src="" title="Media Preview"></iframe>          
</div>`;

var mediaViewModal = document.createElement("div");
mediaViewModal.classList.add("modal");
mediaViewModal.setAttribute("id", "view-media-modal");
mediaViewModal.innerHTML = mediaViewModalContent;

document.querySelector("body").appendChild(mediaViewModal);

const modalViewMedia = document.querySelector("#view-media-modal");
const closeButtonViewMedia = document.querySelector("#view-media-modal-close-button");

function toggleViewMediaModal() {
    
    modalViewMedia.classList.toggle("show-modal");

}

function loadViewMediaModal(link) {

    console.log("view");

    document.querySelector('#view-media-modal #mediapreview').src = link;
    
}

closeButtonViewMedia.addEventListener("click", toggleViewMediaModal);