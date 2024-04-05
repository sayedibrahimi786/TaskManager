const User = require("../models/users");

const getUser = async (req, res) => {
  try {
    // Retrieve the user ID
    const userId = req.user._id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // If the user is found, send their details as a response
    res.status(200).send(user);
  } catch (error) {
    // Handle any errors
    console.error("Error fetching user:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const createUser = async (req, res) => {
  try {
    // Check if user with the given email already exists
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res
        .status(409)
        .send({ message: "User with given email already exists" });
    }

    // Create a new user in the database
    await User.create(req.body);

    // Send success response
    res.status(201).send({ message: "User created successfully" });
  } catch (error) {
    // Handle any errors
    console.error("Error creating user:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

module.exports = {
  createUser,
  getUser,
};
