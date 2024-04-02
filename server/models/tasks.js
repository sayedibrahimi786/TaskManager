const mongoose = require("mongoose");

// create an instance (collection) of the schema with predefined structure for the data
// the properties that are not in schema will be ignored
const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    // validators
    required: [true, "must provide name"],
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

// Task is the model name
module.exports = mongoose.model("Task", TaskSchema);
