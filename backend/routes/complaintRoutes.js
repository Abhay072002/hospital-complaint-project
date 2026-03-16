const express = require("express");
const { createComplaint, trackComplaint } = require("../controllers/complaintController");

const router = express.Router();

router.post("/",createComplaint);
router.get("/track/:query", trackComplaint);

module.exports = router;