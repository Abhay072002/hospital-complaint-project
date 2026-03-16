const express = require("express");
const router = express.Router();
const {userLogin, userLogout} = require("../controllers/authController");


router.post("/login" ,userLogin);
router.post("/logout", userLogout)

module.exports = router;