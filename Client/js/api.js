const apiUrl = "http://localhost:3000/api/";



function getAllUser() {

    fetch(apiUrl + 'user')
        .then((response) => response.json())
        .then((data) => {

            var table = document.getElementById('nutzerverwaltung');


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
                editButton.onclick = async function(){
                    
                    const check = window.confirm(`Möchten Sie den Benutzer "${user.name}, ${user.vorname}" mit der Kennung "${user.benutzername}" wirklich löschen?`);
                    
                    if(check){
                        const response = await deleteUser(user.benutzername);
                        let result = await response.json();

                        getAllUser();

                        console.log(result);

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
        method: 'PATCH',
        body: new FormData(formData)
    });

}

async function deleteUser(username) {

    return await fetch(apiUrl + 'user/delete/' + username, {
        method: 'DELETE'
    });
    
}
