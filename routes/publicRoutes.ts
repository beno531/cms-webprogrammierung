import * as express from "express";

const path = require('path');
const router = express.Router();

const PublicViewController = require('../controller/publicViewController');

module.exports = router;


/*********************************
************ PUBLIC **************
**********************************/

// Home
router.get('', PublicViewController.home);

/*
// Favicon
router.all('/favico.ico', function(req, res){
    res.status(204);
    res.end();
});*/

// Dynamic
router.get('/:titel', PublicViewController.renderDynamic);