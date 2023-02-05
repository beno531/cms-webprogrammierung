"use strict";

const createSiteModalContent = `
<div class="modal-content">
                <span class="close-button" id="modal-site-create-close-button">&times;</span>
                <h1>Neue Seite anlegen:</h1>
                <form name="createSiteForm">
                    <label for="titel">Titel:</label><br>
                    <input type="text" id="titel" name="titel"><br>
                    <label for="autor">Autor:</label><br>
                    <input type="text" id="autor" name="autor"><br>
                    <label for="beschreibung">Beschreibung:</label><br>
                    <input type="text" id="beschreibung" name="beschreibung"><br>
                    <label for="layout">Layout:</label><br>
                    <select name="layout" id="layout">
                        <option value="Hauptseite">Hauptseite</option>
                        <option value="Unterseite">Unterseite</option>
                    </select><br>
    
                    <button type="button" class="modal-btn" onclick="formCreateSite()">Erstellen</button>
                </form>
            </div>`;

var createSiteModal = document.createElement("div");
createSiteModal.classList.add("modal");
createSiteModal.setAttribute("id", "modal-site-create");
createSiteModal.innerHTML = createSiteModalContent;

document.querySelector("body").appendChild(createSiteModal);


const modalSiteCreate = document.querySelector("#modal-site-create");
const triggerSiteCreate = document.querySelector("#modal-site-create-trigger");
const closeButtonSiteCreate = document.querySelector("#modal-site-create-close-button");

// Öffnet oder schließt den modalen Dialog
function toggleSiteCreateModal() {

    modalSiteCreate.classList.toggle("show-modal");
    
}

triggerSiteCreate.addEventListener("click", toggleSiteCreateModal);
closeButtonSiteCreate.addEventListener("click", toggleSiteCreateModal);