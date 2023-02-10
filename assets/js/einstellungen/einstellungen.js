"use strict";

window.onload = function () {
    //Lädt den Username
    displayUsername();
};

// Anfrage zum überschreiben der PublicCss Datei
async function formSaveCss() {

    var response = await saveCss(editCssForm);

    console.log(response);

    if (response.status == 200) {
        alert("Das Speichern war erfolgreich!");
    } else {
        alert(result);
    }

}

// Anfrage zum holen der initialen Public Css Datei
async function formGetInitialCss() {

    var response = await getInitialCss();
    let result = await response.json();

    if (response.status == 200) {
        editCssForm.css.value = result;
    } else {
        alert("Ein Fehler beim laden ist aufgetreten!");
    }
}