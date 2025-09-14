"use client";

import React, { useState } from "react";

export default function ExpenseAnalysis() {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [budget, setBudget] = useState(""); 
  const [expenses, setExpenses] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  const handleAddExpense = () => {
    if (!description || !amount) return;
    setExpenses((prev) => [
      ...prev,
      { description, amount: parseFloat(amount) },
    ]);
    setDescription("");
    setAmount("");
  };

  const handleClearAll = () => {
    setDescription("");
    setAmount("");
    setBudget("");
    setExpenses([]);
    setShowPopup(false);
  };

  const totalExpense = expenses.reduce((acc, exp) => acc + exp.amount, 0);
  const topExpense =
    expenses.length > 0
      ? expenses.reduce((max, exp) => (exp.amount > max.amount ? exp : max))
      : null;

  const parsedBudget = parseFloat(budget) || 0;
  const profitOrLoss = parsedBudget - totalExpense;

  return (
    <div className="p-6 bg-gray-900 md:w-[600px] md:h-[500px] flex flex-col items-center text-white mx-auto rounded-2xl shadow-2xl hover:shadow-cyan-500/50 transition">
      <h1 className="text-3xl font-bold text-cyan-400 mb-6">Expense Analysis</h1>

      {/* Budget Input */}
      <div className="flex flex-col sm:flex-row gap-2 w-full max-w-md mb-4">
        <input
          className="p-2 border rounded-md flex-1 bg-gray-800 text-white border-gray-700"
          type="number"
          placeholder="Enter Budget"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
        />
      </div>

      {/* Expense Input Section */}
      <div className="flex flex-col sm:flex-row gap-2 w-full max-w-md mb-6">
        <input
          className="p-2 border rounded-md flex-1 bg-gray-800 text-white border-gray-700"
          placeholder="Expense Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          className="p-2 border rounded-md flex-1 bg-gray-800 text-white border-gray-700"
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button
          className="bg-cyan-600 text-white px-4 py-2 rounded-md hover:bg-cyan-700 cursor-pointer"
          onClick={handleAddExpense}
        >
          Add
        </button>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mb-6">
        <button
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 cursor-pointer"
          onClick={() => setShowPopup(true)}
        >
          Calculate
        </button>
        <button
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 cursor-pointer"
          onClick={handleClearAll}
        >
          Clear All
        </button>
      </div>

      {/* Expenses List */}
      <div className="w-full max-w-md bg-gray-800 p-4 rounded-lg shadow-md mb-6">
        <h2 className="font-semibold mb-2">Expenses</h2>
        <ul className="space-y-1">
          {expenses.map((exp, idx) => (
            <li key={idx} className="flex justify-between">
              <span>{exp.description}</span>
              <span>₹{exp.amount.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 bg-gray-800 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-6 rounded-lg w-80 relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-white"
              onClick={() => setShowPopup(false)}
            >
              ✖
            </button>
            <h2 className="text-xl font-bold mb-4 text-cyan-400">Overall Summary</h2>
            <p><strong>Budget:</strong> ₹{parsedBudget.toFixed(2)}</p>
            <p><strong>Total Expenses:</strong> ₹{totalExpense.toFixed(2)}</p>
            <p>
              <strong>Profit/Loss:</strong>{" "}
              <span className={profitOrLoss >= 0 ? "text-green-500" : "text-red-500"}>
                ₹{profitOrLoss.toFixed(2)}
              </span>
            </p>
            {topExpense && (
              <p>
                <strong>Top Expense:</strong> {topExpense.description} (₹{topExpense.amount.toFixed(2)})
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
