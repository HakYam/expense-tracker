import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useAuth } from '../../libs/authContext';

const AddTransactionForm: React.FC = () => {
  const router = useRouter();
  const { userId } = useAuth();  // اجلب معرف المستخدم من سياق المصادقة
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    date: new Date(),
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
    setError(null);
  };

  const handleDateChange = (date: Date) => {
    setFormData((prevState) => ({
      ...prevState,
      date,
    }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.amount || !formData.date) {
      setError('All fields are required.');
      return;
    }

    try {
      const response = await fetch('/api/transaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          amount: parseFloat(formData.amount),
          startDate: formData.date,
          userId: user,  // تضمين معرف المستخدم في الطلب
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error);
        return;
      }

      router.reload();
    } catch (error) {
      console.log(error);
      setError('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <form
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      onSubmit={handleSubmit}
    >
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="name"
        >
          Name
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder="Transaction Name"
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="amount"
        >
          Amount
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="amount"
          type="text"
          value={formData.amount}
          onChange={handleChange}
          placeholder="Amount"
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="date"
        >
          Date
        </label>
        <DatePicker
          selected={formData.date}
          onChange={handleDateChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Add Transaction
        </button>
      </div>
      {error && <p className="text-red-500 text-xs italic">{error}</p>}
    </form>
  );
};

export default AddTransactionForm;
