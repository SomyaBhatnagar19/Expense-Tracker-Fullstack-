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

  createExpense: async (description, amount, category, email) => {
    try {
      const connection = await createConnection();
      const [result] = await connection.query(
        "INSERT INTO expenses (description, amount, category, email) VALUES (?, ?, ?, ?)",
        [description, amount, category, email]
      );
      connection.end();
      return result;
    } catch (err) {
      console.error("Error creating new expense in the database.", err);
      throw err;
    }
  },

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
};

module.exports = ExpensesModel;
