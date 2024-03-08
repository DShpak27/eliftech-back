const express = require("express");
const { getPharms, getPrices } = require("../controllers/pharms-controller.js");

const router = express.Router();

router.get("/pharms", getPharms);
router.get("/pharms/:id/prices", getPrices);

module.exports = { pharmsRouter: router };
