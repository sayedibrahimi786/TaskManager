const User = require("../models/users");

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

module.exports = createUser;
