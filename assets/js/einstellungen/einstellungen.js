"use strict";

window.onload = function () {
    displayUsername();
};

async function formSaveCss() {

    var response = await saveCss(editCssForm);

    if (response.status == 200) {
        alert("Das Speichern war erfolgreich!");
    } else {
        alert(result);
    }

}

async function formGetInitialCss() {

    var response = await getInitialCss();
    let result = await response.json();

    if (response.status == 200) {
        editCssForm.css.value = result;
    } else {
        alert("Ein Fehler beim laden ist aufgetreten!");
    }
}