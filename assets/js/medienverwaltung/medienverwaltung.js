"use strict";

window.onload = function(){ 
    buildTable();
    displayUsername();
};

async function formUploadMedia(){

  var response = await createMedia(uploadMediaForm);

  let result = await response.json();
  

  if(response.status == 200){
    uploadMediaForm.reset();
    toggleUploadMediaModal();
    buildTable();
    alert("Der Upload von " + result.bezeichnung + " war erfolgreich!");
  }else{
    uploadMediaForm.reset();
    alert(result);
  }
};

function appendItemToTable(item) {

  console.log(item);
  
  const mediaTable = document.querySelector("#medienverwaltung");

  var data = document.createElement("tr");
  data.innerHTML = `
  <td>${item.bezeichnung}</td>
  <td class="options">
    <a href="#">
      <span><i class="fa-solid fa-eye fa-lg"></i></span>
    </a>
    <a href="#">
      <span><i class="fa-solid fa-plus fa-lg"></i></span>
    </a>
  </td>`

  mediaTable.appendChild(data);

}


async function buildTable() {

  var response = await getAllMedia();
  let result = await response.json();

  var table = document.getElementById('medienverwaltung');
            table.innerHTML = `<thead><tr>
            <th width="50%">Bezeichnung</th>
            <th width="30%">Link</th>
            <th width="10%">Erstellt am</th>
            <th width="100px">Optionen</th>
            </tr></thead>`;

            var tbody = document.createElement("tbody");
            table.appendChild(tbody);


            for (const media of result) {


                var erstelltAmDate = new Date(media.erstelltAm);
                erstelltAmDate = erstelltAmDate.toLocaleDateString('de-DE');


                const tableRow = document.createElement("tr");
                tableRow.innerHTML = ` 
                <td>${media.bezeichnung} </td>
                <td>${media.link}</td>
                <td>${erstelltAmDate}</td>`;


                //View Button
                const viewButton = document.createElement("button");
                viewButton.innerHTML = `<span><i class="fa-solid fa-eye fa-lg"></i></span>`;
                viewButton.onclick = function () {
                    window.open(media.link, '_blank').focus();
                };

                //Delete Button
                const deleteButton = document.createElement("button");
                deleteButton.innerHTML = `<span><i class="fa-solid fa-trash-can fa-lg"></i></span>`;
                deleteButton.onclick = async function () {

                    const check = window.confirm(`Möchten Sie diese Medium "${media.bezeichnung}" wirklich löschen?`);

                    if (check) {
                        const response = await deleteMedia(media._id);
                        let result = await response.json();

                        if (response.status == 200) {
                            buildTable();
                            alert(result);
                        } else {
                            alert(result);
                        }
                    }

                };

                //Create Options td
                const tdOptions = document.createElement("td");
                tdOptions.classList.add("options");
                tdOptions.appendChild(viewButton);
                tdOptions.appendChild(deleteButton);

                tableRow.appendChild(tdOptions);

                tbody.appendChild(tableRow);

            }
}