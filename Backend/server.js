/* /backend/server.js */

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const UserController = require('./controller/userController');
const ExpensesController = require('./controller/expensesController');

const app = express();

// Middleware to parse JSON in the request body
app.use(bodyParser.json());

app.use(cors());

//User Controllers access
app.use('/users', UserController);

//Expenses Controller 
app.use('/expenses', ExpensesController);


app.listen(3000, () => {
    console.log(`Server is running on http://localhost:3000 .`);
})