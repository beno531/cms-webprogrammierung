"use strict";

// Subscribe to Edit-User-Form
async function formEditSite() {

  const siteId = document.querySelector('#editSiteForm #siteId').value;

  var response = await editSite(siteId, editSiteForm);

  let result = await response.json();

  if (response.status == 200) {

    editSiteForm.reset();

    location.href = '/cms/seitenverwaltung/';

  } else {
    alert(result);
  }
};

// Create new Media
async function formUploadMedia() {

  var response = await createMedia(uploadMediaForm);

  let result = await response.json();



  if (response.status == 200) {
    uploadMediaForm.reset();
    toggleUploadMediaModal();
    appendItemToTable(result);
    alert("Der Upload von " + result.bezeichnung + " war erfolgreich!");
  } else {
    uploadMediaForm.reset();
    alert(result);
  }
};


function appendItemToTable(item) {

  const mediaTable = document.querySelector("#editorMedienverwaltung");

  var data = document.createElement("tr");
  data.innerHTML = `
    <td>${item.bezeichnung}</td>
    <td class="options">
      <button onclick="toggleViewMediaModal();loadViewMediaModal('${item.link}')">
        <span><i class="fa-solid fa-eye fa-lg"></i></span>
      </button>
      <button onclick="copyLinkToClipboard('${item.link}')">
        <span><i class="fa-solid fa-clipboard fa-lg"></i></span>
      </button>
    </td>`

  mediaTable.appendChild(data);
}


function copyLinkToClipboard(link) {

  navigator.clipboard.writeText(link);

  alert("Link wurde kopiert: " + link);

}

function cancelEdit() {

  const check = window.confirm(`Möchten Sie die Seite verlassen ohne zu speichern?`);

  if (check) {
    location.href = '/cms/seitenverwaltung/';
  }
}
