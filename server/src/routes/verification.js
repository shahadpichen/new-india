const express = require("express");
const router = express.Router();
const { verifyProof } = require("../controllers/verificationController");

router.post("/proof", verifyProof);

module.exports = router;
