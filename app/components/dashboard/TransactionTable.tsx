"use client";

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';

interface Transaction {
  _id: string;
  name: string;
  amount: number;
  startDate: string;
}

interface TransactionTableProps {
  transactions: Transaction[];
  onDeleteTransaction: (id: string) => void;
  onUpdateTransaction: (updatedTransaction: Transaction) => void;
}

const TransactionTable: React.FC<TransactionTableProps> = ({ transactions, onDeleteTransaction, onUpdateTransaction }) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedTransaction, setEditedTransaction] = useState<Partial<Transaction>>({});

  const handleEditClick = (transaction: Transaction) => {
    setEditingId(transaction._id);
    setEditedTransaction(transaction);
  };

  const handleSaveClick = async () => {
    if (editingId) {
      // Call the update function
      await onUpdateTransaction(editedTransaction as Transaction);
      setEditingId(null);
      setEditedTransaction({});
    }
  };

  const handleCancelClick = () => {
    setEditingId(null);
    setEditedTransaction({});
  };

  const handleDeleteClick = (id: string) => {
    onDeleteTransaction(id);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedTransaction(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="container mx-auto  ">
      <div className="overflow-x-auto shadow-md">
        <table className="min-w-full bg-white  rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="w-1/4 px-4 py-2">Name</th>
              <th className="w-1/4 px-4 py-2">Amount</th>
              <th className="w-1/4 px-4 py-2">Date</th>
              <th className="w-1/4 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(transaction => (
              <tr key={transaction._id} className="border-b border-gray-200">
                <td className="px-4 py-2">
                  {editingId === transaction._id ? (
                    <input
                      type="text"
                      name="name"
                      value={editedTransaction.name || ''}
                      onChange={handleChange}
                      className="w-full px-2 py-1 border rounded"
                    />
                  ) : (
                    transaction.name
                  )}
                </td>
                <td className="px-4 py-2">
                  {editingId === transaction._id ? (
                    <input
                      type="number"
                      name="amount"
                      value={editedTransaction.amount || ''}
                      onChange={handleChange}
                      className="w-full px-2 py-1 border rounded"
                    />
                  ) : (
                    transaction.amount
                  )}
                </td>
                <td className="px-4 py-2">
                  {editingId === transaction._id ? (
                    <input
                      type="date"
                      name="startDate"
                      value={editedTransaction.startDate || ''}
                      onChange={handleChange}
                      className="w-full px-2 py-1 border rounded"
                    />
                  ) : (
                    new Date(transaction.startDate).toLocaleDateString()
                  )}
                </td>
                <td className="px-4 py-2">
                  <div className="flex items-center space-x-2">
                    {editingId === transaction._id ? (
                      <>
                        <button onClick={handleSaveClick} className="text-green-500 hover:text-green-700">
                          <FontAwesomeIcon icon={faSave} />
                        </button>
                        <button onClick={handleCancelClick} className="text-gray-500 hover:text-gray-700">
                          <FontAwesomeIcon icon={faTimes} />
                        </button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => handleEditClick(transaction)} className="text-yellow-500 hover:text-yellow-700">
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <button onClick={() => handleDeleteClick(transaction._id)} className="text-red-500 hover:text-red-700">
                          <FontAwesomeIcon icon={faTrashAlt} />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionTable;
