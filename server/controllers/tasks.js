const Task = require("../models/tasks");

// Task is the model name
// either cb or async/await can be used
// since find is asynchronous operation we need to use async
// thus using await, allows the code to wait for the promise to resolve before moving on to the next line
const getAllTasks = async (req, res) => {
  try {
    // Retrieve the user ID from the authenticated user
    const userId = req.user._id;
    // console.log(userId);
    // Find tasks created by the specific user
    const tasks = await Task.find({ createdBy: userId });
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const createTask = async (req, res) => {
  // Extract user information from the request
  const createdBy = req.user._id;

  // Add createdBy field to the request body
  req.body.createdBy = createdBy;
  try {
    const task = await Task.create(req.body);
    res.status(201).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

// WORK on error messages such as taskID and userId should have different messages
// for all controllers
const getTask = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id: taskID } = req.params;

    const task = await Task.findOne({ createdBy: userId, _id: taskID });
    // will return null if not found but correct structure (nums of char)
    if (!task) {
      // always return something inorder to avoid JS executing the res after condition
      return res.status(404).json({ msg: `No task with id: ${taskID}` });
    }
    res.status(200).json({ task });
    // this catch is for the incorrect structure
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const updateTask = async (req, res) => {
  try {
    const userId = req.user._id;
    // console.log(`here is userId ${userId}`);
    const { id: taskID } = req.params;
    const task = await Task.findOneAndUpdate(
      { createdBy: userId, _id: taskID },
      req.body,
      {
        new: true, // Return the modified doc
        runValidators: true, // Run validators during the update
      }
    );
    if (!task) {
      return res.status(404).json({ msg: `No task with id ${taskID}` });
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const deleteTask = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id: taskID } = req.params;
    const task = await Task.findOneAndDelete({
      createdBy: userId,
      _id: taskID,
    });
    if (!task) {
      return res.status(404).json({ msg: `No task with id: ${taskID}` });
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
