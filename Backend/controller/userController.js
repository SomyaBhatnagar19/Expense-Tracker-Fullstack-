/* /backend/controller/userController.js */
// code for both signup and login

const express = require("express");
const UserModel = require("../model/userModel");

const router = express.Router();

// Applying middleware to parse JSON body
router.use(express.json());

// Initializing the user table
UserModel.initialize();

//CREATING NEW USERS IN USER TABLE
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

//GETTING DATA FROM USERS TABLE
router.get('/', async(req, res) => {
    try {
        // Retrieve all users from the database
        const users = await UserModel.getAllUsers();
        res.status(200).json(users);
    } catch (err) {
        console.log('Error fetching users.', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//USER LOGIN FUNCTIONALITY
router.post('/login', async(req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await UserModel.getUserByEmail(email);

    //checking the user table for the already existing data
    if(!existingUser) {
      return res.status(404).json({Error: "User not found. Please Sign up."});
    }

    //checking for password in database and that entered but the user
    if(existingUser.password !== password) {
      return res.status(401).json({Error: "Incorrect Password."})
    }

    //successful login
    res.status(200).json({message: "User successfully logged in."});
  } catch (err) {
    console.error("Error logging in user.", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
