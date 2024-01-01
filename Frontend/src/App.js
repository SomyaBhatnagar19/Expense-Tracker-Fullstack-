/* /frontend/App.js */

import React, { useState } from 'react';
import SignUp from './Views/SignUp';
import ExpensesForm from './Views/ExpensesForm';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  const [userEmail, setUserEmail] = useState("");

  const handleSignUp = (email) => {
    setUserEmail(email);
  }

  return (
    <div className='bg-cyan-50'>
      <SignUp onSignUp={handleSignUp} />
      <ExpensesForm userEmail={userEmail} />
    </div>
  );
}

export default App;

