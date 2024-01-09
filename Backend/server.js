/* /backend/server.js */

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const createConnection = require('./model/database');
const UserController = require('./controller/userController');
const ExpensesController = require('./controller/expensesController');
const razorpayController = require('./controller/razorpayController');

const app = express();

// Middleware to parse JSON in the request body
app.use(bodyParser.json());

app.use(cors());

//User Controllers access
app.use('/users', UserController);

//Expenses Controller 
app.use('/expenses', ExpensesController);

//Razorpay Controller
app.post('/razorpayPremium', async (req, res) => {
    const { amount, razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    try {
        // Ensure the correct variable names are used
        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        const orderDetails = await razorpayController.createRazorpayOrder(amount);
        res.json(orderDetails);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Pass the MySQL connection to the updatePremiumStatus route
app.post('/updatePremiumStatus', async (req, res) => {
    try {
        const { userId, premium } = req.body;

        // Update premium status in the database
        const updateQuery = 'UPDATE users SET premium = ? WHERE userId = ?';
        await connection.execute(updateQuery, [premium, userId]);

        // Respond with success (you can customize this response)
        res.json({ success: true });
    } catch (error) {
        console.error('Error updating premium status:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});
app.listen(3000, () => {
    console.log(`Server is running on http://localhost:3000 .`);
})