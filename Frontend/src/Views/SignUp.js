/* /frontend/Views/SignUp.js */

import React, { useState } from "react";

export default function SignUp() {
  //for SignUp Form opening
  const [showForm, setShowForm] = useState(false);

  //function for handling signup button click
  const SignUpButtonClicked = () => {
    setShowForm(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      {!showForm ? (
        <div className="text-center bg-gradient-to-l from-cyan-600 to-cyan-700 text-white p-4 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-2">Hello! New User?</h3>
          <h5>Enter your details and start your journey.</h5>
          <button className="mt-2 text-white px-4 py-1 border rounded-xl" onClick={SignUpButtonClicked}>SignUp</button>
        </div>
      ) : (
        <div className="bg-gradient-to-l from-slate-50 to-slate-100 text-center p-4 border rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-2">Create Account</h3>
          <h5 >Fill in your credentials.</h5>
          <div className="mt-2 flex flex-col">
          <input className="border border-gray-300 rounded px-3 py-2 mt-2" type="text" placeholder="Name" />
          <input className="border border-gray-300 rounded px-3 py-2 mt-2" type="email" placeholder="Email" />
          <input className="border border-gray-300 rounded px-3 py-2 mt-2" type="password" placeholder="Password" />
          <button className="mt-2 bg-cyan-900 hover:bg-cyan-700 focus:bg-cyan-700 text-white px-4 py-1 border rounded-xl">SignUp</button>
          </div>
        </div>
      )}
    </div>
  );
}
