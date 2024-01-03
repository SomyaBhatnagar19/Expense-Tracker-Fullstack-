/* /frontend/Views/ExpensesForm.js */
import React, { useState, useEffect } from "react";
import deleteBtn from "../assets/deleteBtn.png";
import editBtn from "../assets/editBtn.png";

export default function ExpensesForm() {
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [expenses, setExpenses] = useState([]);

  // Function to retrieve the token from localStorage
  const getToken = () => localStorage.getItem("token");

  // FETCHING EMAIL OF USER FROM LOCAL STORAGE
  const userEmail = localStorage.getItem("email");

  // FUNCTIONALITY FOR ADDING EXPENSE TO BACKEND
  const handleAddExpense = async (e) => {
    e.preventDefault();

    try {
      const token = getToken(); // Get the token
      console.log(token);
      const response = await fetch(`http://localhost:3000/expenses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Set Authorization header
        },
        body: JSON.stringify({
          category: category,
          description: description,
          amount: amount,
          date: date,
          email: userEmail,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Expense added successfully!", data.message);
        // Fetch updated expenses after deletion
        fetchExpenses();
      } else {
        setError("Error adding expense: " + data.error);
      }
    } catch (err) {
      console.error("Error adding expense:", err);
      alert("Error adding expense.", err);
    }
  };

  // FUNCTION TO DELETE EXPENSE
  const handleDeleteExpense = async (id) => {
    try {
      const token = getToken(); // Get the token
      const response = await fetch(
        `http://localhost:3000/expenses/${userEmail}/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Set Authorization header
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        alert("Expense deleted successfully!", data.message);
        // Fetch updated expenses after deletion
        fetchExpenses();
      } else {
        const errorMessage = await response.text();
        setError("Error deleting expense: " + errorMessage);
      }
    } catch (err) {
      console.error("Error deleting expense:", err);
      alert("Error deleting expense.", err);
    }
  };

  // FUNCTION TO FETCH EXPENSES FOR THE USER
  const fetchExpenses = async () => {
    try {
      const token = getToken(); // Get the token
      const response = await fetch(
        `http://localhost:3000/expenses/${userEmail}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );
      const data = await response.json();

      if (response.ok) {
        setExpenses(data);
      } else {
        setError("Error fetching expenses: " + data.error);
      }
    } catch (err) {
      console.error("Error fetching expenses:", err);
      setError("Error fetching expenses.");
    }
  };

  useEffect(() => {
    // Fetch expenses when the component mounts
    fetchExpenses();
  }, []);


  return (
    <div className="flex flex-col lg:flex-row pb-16">
      {/* Left Side (Form) */}
      <div className="lg:w-1/5 bg-gradient-to-l from-slate-50 to-slate-300 text-center p-4 border border-slate-900 m-2 rounded shadow-xl">
        <form onSubmit={handleAddExpense}>
          <div className="mb-4 flex items-center">
            <label
              htmlFor="Category"
              className="block text-md font-medium text-slate-100 bg-slate-800 p-2"
            >
              Category
            </label>
            <select
              id="category"
              className="mt-1 p-2 border rounded w-full"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Select Category">Select Category</option>
              <option value="Travel">Travel</option>
              <option value="Snacks/Junk food">Snacks/Junk food</option>
              <option value="Vegetable">Vegetable</option>
              <option value="Education">Education</option>
              <option value="Stationary">Stationary</option>
              <option value="Fuel">Fuel</option>
              <option value="Repairing/Servicing">Repairing/Servicing</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Salary">Salary</option>
              <option value="Bills/ EMI">Bills/ EMI</option>
              <option value="Fashion & Beauty">Fashion & Beauty</option>
            </select>
          </div>

          <div className="mb-4 flex items-center">
            <label
              htmlFor="date"
              className="block text-md font-medium text-slate-100 bg-slate-800 p-2"
            >
              Date
            </label>
            <input
              type="date"
              id="date"
              className="mt-1 p-2 border rounded w-full"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="mb-4 flex items-center">
            <label
              htmlFor="description"
              className="block text-md font-medium text-slate-100 bg-slate-800 p-2"
            >
              Description
            </label>
            <input
              type="text"
              id="description"
              className="mt-1 p-2 border rounded w-full"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="mb-4 flex items-center">
            <label
              htmlFor="amount"
              className="block text-md font-medium text-slate-100 bg-slate-800 p-2"
            >
              ₹
            </label>
            <input
              type="text"
              id="amount"
              className="mt-1 p-2 border rounded w-full"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <button
            className="mt-1 text-white px-3 py-1 border rounded-xl bg-slate-800"
            type="submit"
          >
            Add Expense
          </button>
        </form>
      </div>

      {/* Right Side (User Entered Data) */}
      <div className="lg:w-3/4 mt-2">
        <table className="w-full">
          <thead>
            <tr className="bg-gradient-to-l from-cyan-500 to-cyan-800 text-slate-200 italic">
              <th className="py-2 px-4 border border-slate-800">Description</th>
              <th className="py-2 px-4 border border-slate-800">Category</th>
              <th className="py-2 px-4 border border-slate-800">Date</th>

              <th className="py-2 px-4 border border-slate-800">Amount</th>
              <th className="py-2 px-4 border border-slate-800">Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.id} className="text-md italic bg-sky-300">
                <td className="py-2 px-4 border border-slate-800">
                  {expense.description}
                </td>
                <td className="py-2 px-4 border border-slate-800">
                  {expense.category}
                </td>
                <td className="py-2 px-4 border border-slate-800">
                  {new Intl.DateTimeFormat("en-US").format(
                    new Date(expense.date)
                  )}
                </td>

                <td className="py-2 px-4 border border-slate-800">
                  {expense.amount}
                </td>
                <td className="py-2 px-4 border border-slate-800">
                  <div className="flex items-center justify-between">
                  <img
                      src={editBtn}
                      alt="editBtn"
                      className="h-6 w-6"
                    />
                    <img
                      src={deleteBtn}
                      alt="deleteBtn"
                      className="h-10 w-10"
                      onClick={() => handleDeleteExpense(expense.id)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
