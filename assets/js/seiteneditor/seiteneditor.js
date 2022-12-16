//#region Subscribe to Create-User-Form

editSiteForm.onsubmit = async (e) => {
    e.preventDefault();

    const siteId = document.querySelector('#editSiteForm #siteId').value;
  
    var response = await editSite(siteId, editSiteForm);
  
    let result = await response.json();
  
    if(response.status == 200){
  
      editSiteForm.reset();
  
      location.href = '/cms/seitenverwaltung/';
  
    }else{
      alert(result);
    }
  };
  
  //#endregion

  //#region Create new Media

uploadMediaForm.onsubmit = async (e) => {
    e.preventDefault();

    var response = await createMedia(uploadMediaForm);

    let result = await response.json();

    console.log(result);



    if (response.status == 200) {
        toggleUploadMediaModal();
        appendItemToTable(result);
        alert("Der Upload von " + result.bezeichnung + " war erfolgreich!");
    } else {
        alert(result);
    }
};

//#endregion


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

