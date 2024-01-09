/* /backend/controller/razorpayController.js */

const razorpay = require("razorpay");

const razorpayInstance = new razorpay({
  key_id: "rzp_test_irRWRJ6Q13otVr",
  key_secret: "VnpWyQObIW2pMqShoxg4DQll",
});

const createRazorpayOrder = async (amount) => {
  const options = {
    amount: amount * 100,
    currency: "INR",
  };

  try {
    const order = await razorpayInstance.orders.create(options);
    return { orderId: order.id, orderAmount: order.amount };
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    throw new Error("Internal Server Error");
  }
};

module.exports = {
  createRazorpayOrder,
};