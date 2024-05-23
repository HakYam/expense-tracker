"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../libs/authContext';
import AddTransactionForm from '../components/dashboard/AddTransactionForm';

const Dashboard: React.FC = () => {
  const router = useRouter();
  const { userId, userName, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated()) {
    return <p>Redirecting...</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <p>Welcome, {userName}! You are authenticated.</p>
      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        onClick={logout}
      >
        Logout
      </button>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Add New Transaction</h2>
        <AddTransactionForm />
      </div>
    </div>
  );
};

export default Dashboard;
