const express = require("express");
const router = express.Router();
const {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
} = require("../controllers/tasks");
const auth = require("../middlewares/auth");

router.get("/", auth, getAllTasks);

router.post("/", auth, createTask);

router.get("/:id", auth, getTask);

router.patch("/:id", auth, updateTask);

router.delete("/:id", auth, deleteTask);

module.exports = router;
