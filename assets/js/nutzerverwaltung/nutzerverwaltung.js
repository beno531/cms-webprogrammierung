"use strict";

// Get all Users from API
window.onload = function(){ 
  buildTable();
  displayUsername();
};

// Subscribe to Create-User-Form
async function formCreateUser() {

  var response = await createUser(createUserForm);

  let result = await response.json();

  if(response.status == 200){
    createUserForm.reset();
    toggleUserCreateModal();
    buildTable();
    alert(result);
  } else {
    alert(result);
  }
};

// Subscribe to Edit-User-Form
async function formEditUser() {

  const username = document.querySelector('#modal-user-edit #benutzername').value;

  var response = await updateUser(username, editUserForm);

  let result = await response.json();

  console.log(result);

  if(response.status == 200){
    toggleEditUserModal();
    buildTable();
    alert(result);
  }else{
    alert(result);
  }
};


// 
async function buildTable(){

  var response = await getAllUser();
  let result = await response.json();


  var table = document.getElementById('nutzerverwaltung');
            table.innerHTML = `<thead><tr>
            <th width="20%">Name</th>
            <th width="20%">Vorname</th>
            <th width="20%">Benutzername</th>
            <th width="25%">Email</th>
            <th width="10%">Rolle</th>
            <th width="100px">Optionen</th>
            </tr></thead>`;

            var tbody = document.createElement("tbody");
            table.appendChild(tbody);


            for (const user of result) {

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
                editButton.onclick = function () {
                    toggleEditUserModal();
                    loadUserDataModal(user);
                };

                //Delete Button
                const deleteButton = document.createElement("button");
                deleteButton.classList.add("trigger", "modal-user-edit-trigger");
                deleteButton.innerHTML = `<span><i class="fa-solid fa-trash-can fa-lg"></i></span>`;
                deleteButton.onclick = async function () {

                    const check = window.confirm(`Möchten Sie den Benutzer "${user.name}, ${user.vorname}" mit der Kennung "${user.benutzername}" wirklich löschen?`);

                    if (check) {
                        const response = await deleteUser(user.benutzername);
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
                tdOptions.appendChild(editButton);
                tdOptions.appendChild(deleteButton);

                tableRow.appendChild(tdOptions);

                tbody.appendChild(tableRow);
            }
}