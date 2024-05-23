// components/AddTransactionForm.tsx
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../libs/authContext';

const AddTransactionForm: React.FC = () => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState<number | ''>('');
  const [startDate, setStartDate] = useState('');
  const { userId } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) {
      console.error('User not authenticated');
      return;
    }

    try {
      const data = { name, amount, startDate, userId };
      const response = await fetch('/api/transaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setName('');
        setAmount('');
        setStartDate('');
        router.push('/'); // Redirect to home or a success page
      } else {
        const errorData = await response.json();
        console.error('Failed to add transaction:', errorData);
      }
    } catch (error) {
      console.error('An unexpected error occurred:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="amount">Amount</label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          required
        />
      </div>
      <div>
        <label htmlFor="startDate">Start Date</label>
        <input
          type="date"
          id="startDate"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
      </div>
      <button type="submit">Add Transaction</button>
    </form>
  );
};

export default AddTransactionForm;
