import React, { useState, useEffect } from "react";
import wallet from "../assets/wallet.png";
import user from "../assets/user.png";
import premuim from "../assets/premuim.png";

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const token = localStorage.getItem('token');

  const handleBuyPremium = async () => {
    try {
      const response = await fetch('http://localhost:3000/razorpayPremium', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ amount: 25 }),
      });

      if (response.ok) {
        const orderDetails = await response.json();
        initializeRazorpay(orderDetails);
      } else {
        console.error('Error initiating Razorpay payment:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const initializeRazorpay = (orderDetails) => {
    const options = {
      key: 'rzp_test_irRWRJ6Q13otVr',
      amount: orderDetails.orderAmount,
      currency: 'INR',
      name: 'Spenzi',
      description: 'Premium Subscription',
      order_id: orderDetails.orderId,
      handler: async function (response) {
        // Update premiumUser status on the backend
        try {
          const updateResponse = await fetch('http://localhost:3000/updatePremiumStatus', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ userId: response.userId, premium: true }),
          });

          if (updateResponse.ok) {
            console.log('Premium status updated successfully');
            alert('You are now a premium user. Enjoy our premium features!!');
          } else {
            console.error('Error updating premium status:', updateResponse.statusText);
          }
        } catch (updateError) {
          console.error('Error updating premium status:', updateError.message);
        }
      },
      prefill: {
        email: 'token.email', // Replace with the user's email
      },
    };

    const razorpayInstance = new window.Razorpay(options);
    razorpayInstance.open();
  };

  useEffect(() => {
    // Load Razorpay script dynamically
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => {
      console.log('Razorpay script loaded');
    };
    document.head.appendChild(script);

    // Cleanup the script on component unmount
    return () => {
      document.head.removeChild(script);
    };
  }, []);
  return (
    <div className="bg-cyan-500 text-white shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <img src={wallet} alt="wallet-logo" className="h-20 w-20" />
          <h1 className="text-lg ml-2 font-semibold text-sky-900">Spendzi</h1>
        </div>

        <div className="relative ml-auto mr-5 shadow-md">
          <button
            className="flex items-center justify-between border rounded-lg bg-orange-900 px-3 py-1 hover:bg-orange-800"
            onClick={handleBuyPremium}
          >
            <span className="mr-1">Buy Premium</span>
            <img src={premuim} alt="premuim-logo" className="h-8 w-8" />
          </button>
        </div>

        <div className="relative">
          <div
            className="cursor-pointer h-8 w-8 flex items-center"
            onClick={toggleDropdown}
          >
            <img src={user} alt="user-logo" className="rounded-full h-full w-full bg-slate-400" />
          </div>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 bg-red-500 rounded-lg shadow-md">
              <button className="block px-4 py-2 text-gray-800 hover:bg-red-300 rounded-lg ">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
