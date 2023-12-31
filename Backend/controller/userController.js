/* /backend/controller/userController.js */
// code for both signup and login

const express = require('express');

const UserModel = require("../model/userModel");

const bcrypt = require('bcrypt');

//USING JSON WEB TOKEN 
const jwt = require('jsonwebtoken');

const loginAuthentication = require('../middleware/auth');

const router = express.Router();

// Applying middleware to parse JSON body
router.use(express.json());

// Initializing the user table
UserModel.initialize();


// Middleware to verify the JWT token
const verifyTokenMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (token) {
    jwt.verify(token, '12345678907464534262945050683619', (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      req.decodedToken = decoded;
      next();
    });
  } else {
    return res.status(401).json({ error: 'Unauthorized' });
  }
};

// Route to update premiumUser status
router.post('/updatePremiumStatus', verifyTokenMiddleware, async (req, res) => {
  try {
    const userId = req.decodedToken.userId;

    // Update premiumUser status in the database
    await UserModel.updateUserPremiumStatus(userId);

    res.status(200).json({ message: 'Premium status updated successfully' });
  } catch (err) {
    console.error('Error updating premium status:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//CREATING NEW USERS IN USER TABLE
router.post("/", async (req, res) => {
  try {
    const { username, email, password, premiumUser } = req.body;

    // Check if the user with the given email already exists
    const existingUser = await UserModel.getUserByEmail(email);

    if (existingUser) {
      // User with the email already exists
      return res
        .status(400)
        .json({ error: "User with this email already exists." });
    }

    // NEW USER CREATION IN DATABASE USING BCRPT PASSWORD FOR ENCRYPTING 
    const salt = 10;
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await UserModel.createUser(username, email, hashedPassword);
    res.status(201).json({ newUser, message: "User created successfully." });
  } catch (err) {
    console.log("Error creating new user.", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//GETTING DATA FROM USERS TABLE
router.get('/', loginAuthentication, async(req, res) => {
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

    //checking for password in database using bcrypt.compare
    bcrypt.compare(password, existingUser.password, (err, result) => {
      if (err) {
        throw new error('Something went wrong.');
      }

      if (!result) {
        return res.status(401).json({ Error: "Incorrect Password." });
      }

      //CREATE A JWT TOKEN WITH USER DATA AFTER SUCCESSFUL LOGIN
      const token = jwt.sign({userId: existingUser.id, username: existingUser.username, email: existingUser.email,}, '12345678907464534262945050683619')
      //my secreat key = 12345678907464534262945050683619

      // successful login
      res.status(200).json({ message: "User successfully logged in." });
    });
  } catch (err) {
    console.error("Error logging in user.", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
