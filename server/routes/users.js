const express = require("express");
const router = express.Router();
const { createUser, getUser } = require("../controllers/users");
const loginUser = require("../controllers/auth");
const auth = require("../middlewares/auth");

router.post("/register", createUser);
router.post("/login", loginUser);

// Route to get current user's details
router.get("/users/me", auth, getUser);

module.exports = router;
