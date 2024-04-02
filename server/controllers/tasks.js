const Task = require('../models/tasks');

// Task is the model name
// either cb or async/await can be used
// since find is asynchronous operation we need to use async
// thus using await, allows the code to wait for the promise to resolve before moving on to the next line
const getAllTasks = async (req, res) => {
    try {
     const tasks = await Task.find({});
     res.status(200).json({ tasks });
    } catch (error) {
        res.status(500).json({msg: error})
    }
};

const createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body)
        res.status(201).json({ task });
    } catch (error) {
        res.status(500).json({msg: error});
    }
};

const getTask = async (req, res) => {
    try {
        const {id:taskID} = req.params;
        const task = await Task.findOne({_id: taskID});
        // will return null if not found but correct structure (nums of char)
        if (!task) {
            // always return something inorder to avoid JS executing the res after condition
            return res.status(404).json({msg: `No task with id: ${taskID}`});
        }
        res.status(200).json({task});
        // this catch is for the incorrect structure
    } catch (error) {
        res.status(500).json({msg: error});
    }
};

const updateTask = async (req, res) => {
    try {
        const {id:taskID} = req.params;
        const task = await Task.findOneAndUpdate({_id: taskID}, req.body, {
            new: true,              // Return the modified doc
            runValidators: true,    // Run validators during the update
        });
        if(!task) {
            res.status(404).json({msg: `No task with id ${taskID}`});
        }
        res.status(200).json({task});
    } catch (error) {
        res.status(500).json({msg: error});
    }
};

const deleteTask = async (req, res) => {
    try {
        const {id:taskID} = req.params;
        const task = await Task.findOneAndDelete({_id: taskID});
        if (!task) {
            return res.status(404).json({msg: `No task with id: ${taskID}`});
        }
        res.status(200).json({task});
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
};