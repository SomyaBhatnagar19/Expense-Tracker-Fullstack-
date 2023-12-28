/* /backend/controller/userController.js */

const express = require("express");
const UserModel = require("../model/userModel");

const router = express.Router();

// Applying middleware to parse JSON body
router.use(express.json());

// Initializing the user table
UserModel.initialize();

router.post("/", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the user with the given email already exists
    const existingUser = await UserModel.getUserByEmail(email);

    if (existingUser) {
      // User with the email already exists
      return res
        .status(400)
        .json({ error: "User with this email already exists." });
    }

    // NEW USER CREATION IN DATABASE
    const newUser = await UserModel.createUser(username, email, password);
    res.status(201).json({ newUser, message: "User created successfully." });
  } catch (err) {
    console.log("Error creating new user.", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
