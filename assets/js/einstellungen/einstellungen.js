//#region Get all Users from API

window.onload = function(){ 
    displayUsername();
};
  
//#endregion
  
async function saveCssChanges() {

    //e.preventDefault();

    console.log(editCssForm);

    var response = await saveCss(editCssForm);

    console.log(response);
    
}

function resetEdit(data) {

    let cssInput = document.querySelector("#css");

    editCssForm.css.value = data;
}