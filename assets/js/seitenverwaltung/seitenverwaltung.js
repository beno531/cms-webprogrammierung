"use strict";


window.onload = function(){ 
  buildTable();
  //Lädt den Username
  displayUsername();
};


// Anfrage um eine neue Seite zu erstellen
async function formCreateSite() {

  var response = await createSite(createSiteForm);

  let result = await response.json();

  if(response.status == 200){

    createSiteForm.reset();

    // Redirect zu seiteneditor mit seite id
    location.href = '/cms/seiteneditor/' + result._id;

  }else{
    createSiteForm.reset();
    alert(result);
  }
};


// Holt alle Seiten vom Server und baut eine entsprechende Tabelle zum anzeigen der Daten
async function buildTable(){


  var response = await getAllSites();
  let result = await response.json();


  var table = document.getElementById('seitenverwaltung');
            table.innerHTML = `<thead><tr>
            <th width='20%'>Titel</th>
            <th width='20%'>Autor</th>
            <th width="35%">Beschreibung</th>
            <th width="10%">Layout</th>
            <th width="10%">Erstellt am</th>
            <th width="130px">Optionen</th>
            </tr></thead>`;

            var tbody = document.createElement("tbody");
            table.appendChild(tbody);


            for (const site of result) {

                var erstelltAmDate = new Date(site.erstelltAm);
                erstelltAmDate = erstelltAmDate.toLocaleDateString('de-DE');


                var tableRow = document.createElement("tr");
                tableRow.innerHTML = ` 
                <td>${site.titel} </td>
                <td>${site.autor}</td>
                <td>${site.beschreibung}</td>
                <td>${site.layout}</td>
                <td>${erstelltAmDate}</td>`;

                //Open Site Button
                const openSiteButton = document.createElement("button");
                openSiteButton.innerHTML = `<span><i class="fa-solid fa-arrow-up-right-from-square"></i></span>`;
                openSiteButton.onclick = function () {
                    if (site.layout == "Hauptseite") {
                        window.open('/', '_blank').focus();
                    }else{
                        window.open('/' + site.titel, '_blank').focus();
                    }
                };

                //Edit Button
                const editButton = document.createElement("button");
                editButton.classList.add("trigger", "modal-site-edit-trigger");
                editButton.innerHTML = `<span><i class="fa-sharp fa-solid fa-pen"></i></span>`;
                editButton.onclick = function () {
                    location.href = '/cms/seiteneditor/' + site._id;
                };

                //Delete Button
                const deleteButton = document.createElement("button");
                deleteButton.classList.add("trigger", "modal-site-edit-trigger");
                deleteButton.innerHTML = `<span><i class="fa-solid fa-trash-can fa-lg"></i></span>`;
                deleteButton.onclick = async function () {

                    const check = window.confirm(`Möchten Sie die Seite "${site.titel}" wirklich löschen?`);

                    if (check) {
                        const response = await deleteSite(site._id);
                        let result = await response.json();

                        buildTable();

                        alert(result);
                    }

                };

                //Create Options td
                const tdOptions = document.createElement("td");
                tdOptions.classList.add("options");
                tdOptions.appendChild(openSiteButton);
                tdOptions.appendChild(editButton);
                tdOptions.appendChild(deleteButton);

                tableRow.appendChild(tdOptions);

                tbody.appendChild(tableRow);
            }
}