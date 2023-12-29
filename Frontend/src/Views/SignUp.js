/* /frontend/Views/SignUp.js */

import React, { useState } from "react";

export default function SignUp() {
  const [showForm, setShowForm] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showLogin, setShowLogin] = useState("");

  //opening signup if user clicks on it
  const SignUpButtonClicked = () => {
    setShowForm(true);
  };

  //opening login form
  const LoginButtonClicked = () => {
    setShowLogin(true);
  }

  //POSTING DATA IN MYSQQL BACKEND FROM SIGNUP FORM
  const handleSignUp = async () => {
    try {
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
        }),
      });

      const data = await response.json();
      console.log(response.status, data);

      if (response.ok) {
        alert("User created successfully!", data.message);
      } else {
        if (response.status === 400 && data.error.includes("already exists")) {
          alert('User with this email already exists.')
        } else {
          setError("Error creating new user.");
        }
      }
    } catch (err) {
      console.error("Error creating new user:", err);
      alert('Error creating new User.', err);
    }
  };

  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="grid grid-cols-2  w-full max-w-md">
        {/* Login */}
        {!showForm || showLogin ? (
          <div  className="bg-gradient-to-l from-slate-50 to-slate-100 text-center p-4 border shadow-lg">
          <h3 className="text-2xl font-semibold mb-2">Login</h3>
          <h5>Use your credentials to login.</h5>
          <form className="mt-2 flex flex-col">
            <input type="email" placeholder="email" className="border border-gray-300 rounded px-3 py-2 mt-2"/>
            <input type="password" placeholder="password" className="border border-gray-300 rounded px-3 py-2 mt-2"/>
            <p>Forgot your password?</p>
            <button className="mt-1 text-white px-3 py-1 border rounded-xl bg-slate-800">
              LOGIN
            </button>
          </form>
        </div>
        ):(
          <div className="text-center bg-gradient-to-l from-cyan-600 to-cyan-700 text-white p-4 shadow-lg">
          <h3 className="text-2xl font-semibold mb-2">Welcome Back!</h3>
          <h5>Login with your details to stay connected.</h5>
          <button className="mt-2 text-white px-4 py-1 border rounded-xl" onClick={LoginButtonClicked}>Login</button>
          </div>
        )}
        

        {/* SignUp */}
        {!showForm || showLogin ? (
          <div className="text-center bg-gradient-to-l from-cyan-600 to-cyan-700 text-white p-4 shadow-lg">
            <h3 className="text-2xl font-semibold mb-2">Hello! New User?</h3>
            <h5>Enter your details and start your journey.</h5>
            <button
              className="mt-2 text-white px-4 py-1 border rounded-xl"
              onClick={SignUpButtonClicked}
            >
              SignUp
            </button>
          </div>
        ) : (
          <div className="bg-gradient-to-l from-slate-50 to-slate-100 text-center p-4 border shadow-lg">
            <h3 className="text-2xl font-semibold mb-2">Create Account</h3>
            <h5>Fill in your credentials.</h5>
            <form className="mt-2 flex flex-col">
              <input
                className="border border-gray-300 rounded px-3 py-2 mt-2"
                type="text"
                placeholder="Name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                className="border border-gray-300 rounded px-3 py-2 mt-2"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="border border-gray-300 rounded px-3 py-2 mt-2"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className="mt-2 bg-cyan-900 hover:bg-cyan-700 focus:bg-cyan-700 text-white px-4 py-1 border rounded-xl"
                onClick={handleSignUp}
              >
                SIGNUP
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}