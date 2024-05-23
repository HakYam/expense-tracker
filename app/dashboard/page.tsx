"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../libs/authContext";
import AddTransactionForm from "../components/dashboard/AddTransactionForm";
import TransactionTable from "../components/dashboard/TransactionTable";
import Budget from "../components/dashboard/Budget";

interface Transaction {
  _id: string;
  name: string;
  amount: number;
  startDate: string;
}

const Dashboard: React.FC = () => {
  const router = useRouter();
  const { userId, userName, isAuthenticated, logout } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/");
    } else {
      fetchTransactions();
    }
  }, [isAuthenticated, router]);

  const fetchTransactions = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.error("User not authenticated");
      return;
    }

    const response = await fetch("/api/transaction", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data: Transaction[] = await response.json();
      setTransactions(data);
    } else {
      console.error("Failed to fetch transactions");
    }
  };

  const handleAddTransaction = (newTransaction: Transaction) => {
    setTransactions((prevTransactions) => [
      ...prevTransactions,
      newTransaction,
    ]);
  };

  const handleDeleteTransaction = async (id: string) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.error("User not authenticated");
      return;
    }

    const response = await fetch(`/api/transaction/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      setTransactions((prevTransactions) =>
        prevTransactions.filter((transaction) => transaction._id !== id)
      );
    } else {
      console.error("Failed to delete transaction");
    }
  };

  const handleUpdateTransaction = async (updatedTransaction: Transaction) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.error("User not authenticated");
      return;
    }

    const response = await fetch(`/api/transaction/${updatedTransaction._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedTransaction),
    });

    if (response.ok) {
      setTransactions((prevTransactions) =>
        prevTransactions.map((transaction) =>
          transaction._id === updatedTransaction._id
            ? updatedTransaction
            : transaction
        )
      );
    } else {
      console.error("Failed to update transaction");
    }
  };

  if (!isAuthenticated()) {
    return <p>Redirecting...</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <p>Welcome, {userName}! You are authenticated.</p>
      <button
        className="bg-white border border-red-500 text-red-500 font-bold py-1 px-2 rounded hover:bg-red-500 hover:text-white"
        onClick={logout}
      >
        Logout
      </button>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Add New Transaction</h2>
        <div className="flex flex-col md:flex-row md:space-x-4">
          <div className="md:w-1/2">
            <AddTransactionForm onAddTransaction={handleAddTransaction} />
            <Budget transactions={transactions} />
          </div>
          <div className="md:w-full mt-8 md:mt-0">
            <TransactionTable
              transactions={transactions}
              onDeleteTransaction={handleDeleteTransaction}
              onUpdateTransaction={handleUpdateTransaction}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
