const express = require("express");
const router = express.Router();

const CsvRequestController = require("../Controllers/CsvRequest.controller");

router.get("/api/v1/csv", CsvRequestController.getCsv);

module.exports = router;
