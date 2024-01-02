/* /backend/controller/expensesController.js */


const express = require("express");
const ExpensesModel = require('../model/expensesModel');
const UserModel = require('../model/userModel');

const router = express.Router();
router.use(express.json());

// Initializing the expenses table
ExpensesModel.initialize();

// CREATE NEW EXPENSE
router.post("/", async (req, res) => {
  try {
    const { description, amount, category, date, email } = req.body;

    console.log("Received POST request at /expenses");
    
    // Check if the user with the given email exists
    const existingUser = await UserModel.getUserByEmail(email);

    if (!existingUser) {
      // User does not exist
      return res.status(404).json({ error: "User not found. Please sign up." });
    }

    // Create a new expense in the database
    const newExpense = await ExpensesModel.createExpense(
      description,
      amount,
      category,
      date,
      email
    );
    res.status(201).json({ newExpense, message: "Expense created successfully." });
  } catch (err) {
    console.error("Error creating new expense.", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// GET EXPENSES FOR A USER
router.get("/:email", async (req, res) => {
  try {
    const { email } = req.params;

    // Check if the user with the given email exists
    const existingUser = await UserModel.getUserByEmail(email);

    if (!existingUser) {
      // User does not exist
      return res.status(404).json({ error: "User not found." });
    }

    // Retrieve all expenses for the user from the database
    const expenses = await ExpensesModel.getAllExpensesByUser(email);
    res.status(200).json(expenses);
  } catch (err) {
    console.error("Error fetching expenses.", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//DELETING DATA USING EMAIL
router.delete("/:email/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { email } = req.params;

    // Check if the user with the given email exists
    const existingUser = await UserModel.getUserByEmail(email);

    if (!existingUser) {
      // User does not exist
      return res.status(404).json({ error: "User not found." });
    }

    // Delete the expense with the given ID
    await ExpensesModel.deleteExpenseById(id);
    res.status(200).json({ message: "Expense deleted successfully." });
  } catch (err) {
    console.error("Error deleting expense.", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
