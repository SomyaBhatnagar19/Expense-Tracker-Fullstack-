// /* /backend/model/razorpayModel.js */

// const createConnection = require('./database');

// const razorpayModel = async () => {

//   try{
//      const connection = await createConnection();

//      //Creating the Razorpay orders table
//      await connection.query(`CREATE TABLE IF NOT EXISTS razorpayOrderTable (
//       id INT AUTO_INCREMENT PRIMARY KEY,
//         paymentid VARCHAR(255),
//         orderid VARCHAR(255),
//         status VARCHAR(255),
//         userId INT,
//         FOREIGN KEY (userId) REFERENCES users(id)
//       )`);

//       connection.end();
//   } catch (err) {
//     console.log('Error creating razorpay order table.', err);
//   }
 
  
// }

// module.exports = razorpayModel;

/* /backend/model/razorpayModel.js */

const razorpayController = require('../controller/razorpayController');

const createRazorpayOrder = async (amount) => {
    return razorpayController.createRazorpayOrder(amount);
  };
  
  module.exports = {
    createRazorpayOrder,
  };
