"use strict";

window.onload = function () {
    displayUsername();
};

async function saveCssChanges() {

    var response = await saveCss(editCssForm);

    if (response.status == 200) {
        alert("Das Speichern war erfolgreich!");
    } else {
        alert(result);
    }

}

// TODO
/*
function resetCssEdit(data) {

    let cssInput = document.querySelector("#css");

    editCssForm.css.value = data;
}*/