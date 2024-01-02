/* /backend/model/expensesModel.js */

const createConnection = require("./database");

const ExpensesModel = {
  initialize: async () => {
    try {
      const connection = await createConnection();

      // Create expenses table with an index on the email column
      await connection.query(`
        CREATE TABLE IF NOT EXISTS expenses (
          id INT AUTO_INCREMENT PRIMARY KEY,
          description VARCHAR(255) NOT NULL,
          amount DECIMAL(10, 2) NOT NULL,
          category VARCHAR(255) NOT NULL,
          date DATE NOT NULL,
          email VARCHAR(255) NOT NULL,
          INDEX fk_users_idx (email ASC),
          CONSTRAINT fk_users_expenses
          FOREIGN KEY (email) REFERENCES users(email)
        )
      `);

      connection.end();
    } catch (err) {
      console.error("Error in initializing expenses table.", err);
    }
  },

  //POSTING NEW EXPENSE DATA
  createExpense: async (description, amount, category, date, email) => {
    try {
      const connection = await createConnection();
      const [result] = await connection.query(
        "INSERT INTO expenses (description, amount, category, date, email) VALUES (?, ?, ?, ?, ?)",
        [description, amount, category, date, email]
      );
      connection.end();
      return result;
    } catch (err) {
      console.error("Error creating new expense in the database.", err);
      throw err;
    }
  },
  
  //GET EXPENSE USING EMAIL
  getAllExpensesByUser: async (email) => {
    try {
      const connection = await createConnection();
      const [rows] = await connection.query(
        "SELECT * FROM expenses WHERE email = ?",
        [email]
      );
      connection.end();
      return rows;
    } catch (err) {
      console.error("Error fetching expenses for the user.", err);
      throw err;
    }
  },

  //DELETING EXPENSE 
  deleteExpenseById: async (id) => {
    try {
      const connection = await createConnection();
      await connection.query("DELETE FROM expenses WHERE id = ?", [id]);
      connection.end();
    } catch (err) {
      console.error("Error deleting expense from the database.", err);
      throw err;
    }
  },
};

module.exports = ExpensesModel;
