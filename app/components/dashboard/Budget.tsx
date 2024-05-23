"use client";

import React, { useState, useEffect } from 'react';

interface Transaction {
  _id: string;
  name: string;
  amount: number;
  startDate: string;
}

interface BudgetProps {
  transactions: Transaction[];
}

const Budget: React.FC<BudgetProps> = ({ transactions }) => {
  const [income, setIncome] = useState<number>(0);
  const [expenses, setExpenses] = useState<number>(0);
  const [budget, setBudget] = useState<number>(0);

  useEffect(() => {
    calculateBudget(transactions);
  }, [transactions]);

  const calculateBudget = (transactions: Transaction[]) => {
    const income = transactions
      .filter(transaction => transaction.amount > 0)
      .reduce((sum, transaction) => sum + (typeof transaction.amount === 'number' ? transaction.amount : parseFloat(transaction.amount.toString())), 0);

    const expenses = transactions
      .filter(transaction => transaction.amount < 0)
      .reduce((sum, transaction) => sum + (typeof transaction.amount === 'number' ? transaction.amount : parseFloat(transaction.amount.toString())), 0);

    setIncome(income);
    setExpenses(Math.abs(expenses)); // Ensure expenses are positive for display
    setBudget(income - Math.abs(expenses)); // Budget is income - expenses
  };

  return (
    <div className="container ">
      <div className="bg-green-500 text-white text-2xl font-bold p-4 rounded mb-4">
        Income: ${isNaN(income) ? '0.00' : income.toFixed(2)}
      </div>
      <div className="bg-red-500 text-white text-2xl font-bold p-4 rounded mb-4">
        Expenses: ${isNaN(expenses) ? '0.00' : expenses.toFixed(2)}
      </div>
      <div className="bg-gray-200 text-black text-2xl font-bold p-4 rounded">
        Budget: ${isNaN(budget) ? '0.00' : budget.toFixed(2)}
      </div>
    </div>
  );
};

export default Budget;
