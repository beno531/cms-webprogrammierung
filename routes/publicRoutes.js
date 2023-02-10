import express from "express";
import PublicViewController from "../controller/publicViewController.js";

const router = express.Router();



/*********************************
************ PUBLIC **************
**********************************/

// Home
router.get('', PublicViewController.home);

// Dynamic
router.get('/:titel', PublicViewController.renderDynamic);

export default router;