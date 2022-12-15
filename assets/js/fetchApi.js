const apiUrl = "http://localhost:3000/api/";

/*********************************
************** USER **************
**********************************/

function getAllUser() {

    fetch(apiUrl + 'user', {cache: "no-store"})
        .then((response) => response.json())
        .then((data) => {

            var table = document.getElementById('nutzerverwaltung');
            table.innerHTML = "";


            for (const user of data) {

                const tableRow = document.createElement("tr");
                tableRow.innerHTML = ` 
                <td>${user.name} </td>
                <td>${user.vorname}</td>
                <td>${user.benutzername}</td> 
                <td>${user.email}</td>  
                <td>${user.rolle}</td>`;

                //Edit Button
                const editButton = document.createElement("button");
                editButton.classList.add("trigger", "modal-user-edit-trigger");
                editButton.innerHTML = `<span><i class="fa-sharp fa-solid fa-pen"></i></span>`;
                editButton.onclick = function(){
                    toggleEditUserModal();
                    loadUserDataModal(user);
                };

                //Delete Button
                const deleteButton = document.createElement("button");
                deleteButton.classList.add("trigger", "modal-user-edit-trigger");
                deleteButton.innerHTML = `<span><i class="fa-solid fa-trash-can fa-lg"></i></span>`;
                deleteButton.onclick = async function(){
                    
                    const check = window.confirm(`Möchten Sie den Benutzer "${user.name}, ${user.vorname}" mit der Kennung "${user.benutzername}" wirklich löschen?`);
                    
                    if(check){
                        const response = await deleteUser(user.benutzername);
                        let result = await response.json();

                        getAllUser();

                        alert(result);
                    }

                };

                //Create Options td
                const tdOptions = document.createElement("td");
                tdOptions.classList.add("options");
                tdOptions.appendChild(editButton);
                tdOptions.appendChild(deleteButton);

                tableRow.appendChild(tdOptions);

                table.appendChild(tableRow);
            }

            

        });





}

async function createUser(formData) {

    return await fetch(apiUrl + 'user/create', {
        method: 'POST',
        body: new FormData(formData)
    });

    
}

async function updateUser(username, formData) {

    return await fetch(apiUrl + 'user/update/' + username, {
        method: 'PUT',
        body: new FormData(formData)
    });

}

async function deleteUser(username) {

    return await fetch(apiUrl + 'user/delete/' + username, {
        method: 'DELETE'
    });
    
}

/*********************************
************** MEDIA *************
**********************************/


function getAllMedia() {

    fetch(apiUrl + 'media', {
        headers: {
            authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1tMTEiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NzA3ODQyMzV9.iqX-MvxX2ZIBEPQSOP0aceGJyMeUDMtQdW1jP0v7Eyg"
        }
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            var table = document.getElementById('medienverwaltung');
            table.innerHTML = '';

            


            for (const media of data) {

                
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
                viewButton.onclick = function(){
                    toggleViewMediaModal();
                    loadViewMediaModal(media.link);
                };

                //Delete Button
                const deleteButton = document.createElement("button");
                deleteButton.innerHTML = `<span><i class="fa-solid fa-trash-can fa-lg"></i></span>`;
                deleteButton.onclick = async function(){
                    
                    const check = window.confirm(`Möchten Sie diese Medium "${media.bezeichnung}" wirklich löschen?`);
                    
                    if(check){
                        const response = await deleteMedia(media._id);
                        let result = await response.json();


                        // TODO funktioniert noch nicht
                        if(response.status == 200){
                            alert(result);
                          }else{
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
 
                table.appendChild(tableRow);
               
            }

            

        });

}

async function createMedia(formData) {

    return await fetch(apiUrl + 'media/upload', {
        method: 'POST',
        body: new FormData(formData)
    });
    
}

async function deleteMedia(id) {

    return await fetch(apiUrl + 'media/delete/' + id, {
        method: 'DELETE'
    });
    
}

/*********************************
************** SITE **************
**********************************/

function getAllSites() {

    fetch(apiUrl + 'site')
        .then((response) => response.json())
        .then((data) => {
            

            var table = document.getElementById('seitenverwaltung');
            table.innerHTML = `<thead><tr>
            <th width='20%'>Titel</th>
            <th width='20%'>Autor</th>
            <th width="35%">Beschreibung</th>
            <th width="10%">Layout</th>
            <th width="10%">Erstellt am</th>
            <th width="5%">Optionen</th>
            </tr></thead>`;

            var tbody = document.createElement("tbody");
            table.appendChild(tbody);


            for (const site of data) {

                var erstelltAmDate = new Date(site.erstelltAm);
                erstelltAmDate = erstelltAmDate.toLocaleDateString('de-DE');

               
                var tableRow = document.createElement("tr");
                tableRow.innerHTML = ` 
                <td>${site.titel} </td>
                <td>${site.autor}</td>
                <td>${site.beschreibung}</td>
                <td>${site.layout}</td>
                <td>${erstelltAmDate}</td>`;

                //Edit Button
                const editButton = document.createElement("button");
                editButton.classList.add("trigger", "modal-site-edit-trigger");
                editButton.innerHTML = `<span><i class="fa-sharp fa-solid fa-pen"></i></span>`;
                editButton.onclick = function(){
                    location.href = '/cms/seiteneditor/' + site._id;
                };

                //Delete Button
                const deleteButton = document.createElement("button");
                deleteButton.classList.add("trigger", "modal-site-edit-trigger");
                deleteButton.innerHTML = `<span><i class="fa-solid fa-trash-can fa-lg"></i></span>`;
                deleteButton.onclick = async function(){
                    
                    const check = window.confirm(`Möchten Sie die Seite "${site.titel}" wirklich löschen?`);
                    
                    if(check){
                        const response = await deleteSite(site._id);
                        let result = await response.json();

                        getAllSites();

                        alert(result);
                    }

                };

                //Create Options td
                const tdOptions = document.createElement("td");
                tdOptions.classList.add("options");
                tdOptions.appendChild(editButton);
                tdOptions.appendChild(deleteButton);

                tableRow.appendChild(tdOptions);

                tbody.appendChild(tableRow);
            }

        
        });
}


async function createSite(formData) {
    
    return await fetch(apiUrl + 'site/create', {
        method: 'POST',
        body: new FormData(formData)
    });

}

async function editSite(siteId, formData) {
    
    return await fetch(apiUrl + 'site/' + siteId + '/edit', {
        method: 'PUT',
        body: new FormData(formData)
    });

}

async function deleteSite(id) {

    return await fetch(apiUrl + 'site/delete/' + id, {
        method: 'DELETE'
    });
    
}


/*********************************
************** AUTH **************
**********************************/

async function login(formData) {
    
    return await fetch(apiUrl + 'login', {
        method: 'POST',
        body: new FormData(formData)
    });

}

async function logout() {
    
    return await fetch(apiUrl + 'logout', {
        method: 'POST'
    });

}
