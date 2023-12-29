/* /backend/models/userModel.js */

const createConnection = require("./database");

const UserModel = {
  initialize: async () => {
    try {
      const connection = await createConnection();

      // table creation command with corrected SQL syntax
      await connection.query(`CREATE TABLE IF NOT EXISTS users (
          id INT AUTO_INCREMENT PRIMARY KEY,
          username VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          password VARCHAR(255) NOT NULL
        )`);
      connection.end();
    } catch (err) {
      console.error("Error in initializing users table.", err);
    }
  },

  // Define createUser function
  createUser: async (username, email, password) => {
    try {
      const connection = await createConnection();

      // insert user into the table
      const [result] = await connection.query(
        "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
        [username, email, password]
      );

      connection.end();

      return result;
    } catch (err) {
      console.error("Error creating new user in the database.", err);
      throw err; //
    }
  },

  // Check if a user with the given email already exists
  getUserByEmail: async (email) => {
    try {
      const connection = await createConnection();
      const [rows] = await connection.query(
        "SELECT * FROM users WHERE email = ?",
        [email]
      );
      connection.end();

      if (rows.length > 0) {
        return rows[0]; // User with the email already exists
      } else {
        return null; // No user with the email found
      }
    } catch (err) {
      console.error("Error checking if user exists by email.", err);
      throw err;
    }
  },

  //Getting data from users table
  getAllUsers: async () => {
    try {
        const connection = await createConnection();
        const [rows] = await connection.query('SELECT * FROM users');
        connection.end();
        return rows;
    } catch (err) {
        console.error('Error fetching users.', err);
        throw err;
    }
},
};

module.exports = UserModel;
