import express from "express";

const router = express.Router();

import PublicViewController from "../controller/publicViewController.js";



/*********************************
************ PUBLIC **************
**********************************/

// Home
router.get('', PublicViewController.home);

// Dynamic
router.get('/:titel', PublicViewController.renderDynamic);

export default router;