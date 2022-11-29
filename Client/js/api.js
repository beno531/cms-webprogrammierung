const apiUrl = "http://localhost:3000/api/";


function getAllUser() {

    fetch(apiUrl + 'user')
        .then((response) => response.json())
        .then((data) => {

            var table = document.getElementById('nutzerverwaltung');

            let tableContent = table.innerHTML


            for (var user of data) {

                tableContent += `<tr> 
                    <td>${user.name} </td>
                    <td>${user.vorname}</td>
                    <td>${user.benutzername}</td> 
                    <td>${user.email}</td>  
                    <td>${user.rolle}</td>     
                    <td class="options">
                        <a href="#">
                            <span><i class="fa-sharp fa-solid fa-pen"></i></span>
                        </a>
                        <a href="#">
                            <span><i class="fa-solid fa-trash-can fa-lg"></i></span>
                        </a>
                    </td>     
                </tr>`;


            }

            table.innerHTML = tableContent;

        });




}

async function createUser() {

    return await fetch(apiUrl + 'user/create', {
        method: 'POST',
        body: new FormData(formElem)
    });

    
}

function test() {

    console.log("Moin! Servus!");

    
}
