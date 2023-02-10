"use strict";

/*********************************
************** USER **************
**********************************/

async function getAllUser() {

    return await fetch('/api/user', {
        method: 'GET',
        cache: "no-store"
    });

}

async function createUser(formData) {

    return await fetch('/api/user/create', {
        method: 'POST',
        body: new FormData(formData)
    });

}

async function updateUser(username, formData) {

    return await fetch('/api/user/update/' + username, {
        method: 'PUT',
        body: new FormData(formData)
    });

}

async function deleteUser(username) {

    return await fetch('/api/user/delete/' + username, {
        method: 'DELETE'
    });

}


/*********************************
************** MEDIA *************
**********************************/

async function getAllMedia() {

    return await fetch('/api/media', {
        method: 'GET',
        cache: "no-store"
    });

}

async function createMedia(formData) {

    return await fetch('/api/media/upload', {
        method: 'POST',
        body: new FormData(formData)
    });

}

async function deleteMedia(id) {

    return await fetch('/api/media/delete/' + id, {
        method: 'DELETE'
    });

}


/*********************************
************** SITE **************
**********************************/

async function getAllSites() {

    return await fetch('/api/site', {
        method: 'GET',
        cache: "no-store"
    });

}

async function createSite(formData) {

    return await fetch('/api/site/create', {
        method: 'POST',
        body: new FormData(formData)
    });

}

async function editSite(siteId, formData) {

    return await fetch('/api/site/' + siteId + '/edit', {
        method: 'PUT',
        body: new FormData(formData)
    });

}

async function deleteSite(id) {

    return await fetch('/api/site/delete/' + id, {
        method: 'DELETE'
    });

}


/*********************************
************** AUTH **************
**********************************/

async function login(formData) {

    return await fetch('/api/login', {
        method: 'POST',
        body: new FormData(formData)
    });

}

async function logout() {

    return await fetch('/api/logout', {
        method: 'POST'
    });

}

/*********************************
************ Settings ************
**********************************/

async function saveCss(formData) {

    return await fetch('/api/settings/css', {
        method: 'POST',
        body: new FormData(formData)
    });

}

async function getInitialCss() {

    return await fetch('/api/settings/css/initial', {
        method: 'GET',
    });

}