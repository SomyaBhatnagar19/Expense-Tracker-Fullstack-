/* /frontend/Views/SignUp.js */

import React, { useState } from "react";

export default function SignUp({ onSignUp }) {
  const [showForm, setShowForm] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showLogin, setShowLogin] = useState("");
  const [error, setError] = useState("");

  const SignUpButtonClicked = () => {
    setShowForm(true);
  };

  const LoginButtonClicked = () => {
    setShowLogin(true);
  }

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

      if (response.ok) {
        alert("User created successfully!", data.message);
        onSignUp({ email });
      } else {
        if (response.status === 400 && data.error.includes("already exists")) {
          alert('User with this email already exists.')
        } else {
          console.error("Error creating new user:", data.error);
          alert("Error creating new user. Please try again.");
        }
      }
    } catch (err) {
      console.error("Error creating new user:", err);
      alert("Error creating new User. Please try again.");
    }
  };


   //LOGIN FUNCTIONALITY
   const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();
      console.log(response.status, data);

      if (response.ok) {
        alert("Login successful!", data.message);

        //STORING USER EMAIL ON SUCCESSFUL LOGIN
        localStorage.setItem('email', email);

        // STORING TOKEN FROM RESPONSE
      const token = JSON.stringify({
        email: email,
        password: password,
      })
      localStorage.setItem('token', token);

      } else {
        if (response.status === 404) {
          alert('User not found please Signup.');
        } else if (response.status === 401) {
          alert('Incorrect password.')
        } else {
          setError("Error logging in.");
        }
      }
    } catch (err) {
      console.error("Error logging in user:", err);
      alert('Error logging in User.', err);
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
            <input type="email" placeholder="email" className="border border-gray-300 rounded px-3 py-2 mt-2" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <input type="password" placeholder="password" className="border border-gray-300 rounded px-3 py-2 mt-2" value={password} onChange={(e) => setPassword(e.target.value)} />
            <p>Forgot your password?</p>
            <button className="mt-1 text-white px-3 py-1 border rounded-xl bg-slate-800" onClick={handleLogin}>
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