const express = require("express");
const router = express.Router();

const CsvRequestController = require("../Controllers/CsvRequest.controller");

router.get("/api/csv", CsvRequestController.getCsv);

module.exports = router;
