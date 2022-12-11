//#region Get all Users from API

window.onload = function(){ 
    getAllMedia();
};
  
//#endregion
  
//#region Create new Media

uploadMediaForm.onsubmit = async (e) => {
  e.preventDefault();

  var response = await createMedia(uploadMediaForm);

  let result = await response.json();

  console.log(result);

  //appendItemToTable(result);
  

  if(response.status == 200){
    toggleUploadMediaModal();
    alert(result);
  }else{
    alert(result);
  }
};

//#endregion


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
 
    
