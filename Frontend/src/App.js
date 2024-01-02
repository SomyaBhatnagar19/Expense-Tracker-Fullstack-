/* /frontend/App.js */

import React, { useState, useEffect } from 'react';
import SignUp from './Views/SignUp';
import ExpensesForm from './Views/ExpensesForm';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Views/Header';
import Footer from './Views/Footer';

function App() {
  // FETCHING EMAIL OF USER FROM LOCAL STORAGE
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    // Fetch user email from localStorage when the component mounts
    const emailFromLocalStorage = localStorage.getItem("email");
    setUserEmail(emailFromLocalStorage);
  }, []);

  return (
    <Router>
    <div className='min-h-screen flex flex-col bg-cyan-50'>
      <Header />
      <Routes>
        {userEmail ? (
          <Route path='/' element={<ExpensesForm />} />
        ) : (
          <Route path='/' element={<SignUp />} />
        )}
      </Routes>
      <Footer />
    </div>
  </Router>
  );
}

export default App;

