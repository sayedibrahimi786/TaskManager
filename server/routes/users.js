const express = require("express");
const router = express.Router();
const createUser = require("../controllers/users");
const loginUser = require("../controllers/auth");

router.post("/register", createUser);
router.post("/login", loginUser);

module.exports = router;
