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

// Dynamic
router.get('/:titel', PublicViewController.renderDynamic);