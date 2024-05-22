"use client"
import { useState } from 'react';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Image from 'next/image';

export default function Home() {
  const [tab, setTab] = useState<'login' | 'register'>('login');

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
      <h1 className="flex justify-center by-3 text-blue-500 text-3xl font-bold mb-6">Expense Tracker</h1>
          <div className="flex justify-around mb-4">
            
            <button
              className={`py-2 px-4 ${tab === 'login' ? 'border-b-2 border-blue-500' : ''}`}
              onClick={() => setTab('login')}
            >
              Login
            </button>
            <button
              className={`py-2 px-4 ${tab === 'register' ? 'border-b-2 border-blue-500' : ''}`}
              onClick={() => setTab('register')}
            >
              Register
            </button>
          </div>

          {tab === 'login' ? (
            <LoginForm />
          ) : (
            <RegisterForm />
          )}
        </div>
      </div>
      <div className="w-full md:w-1/2 flex items-center justify-center p-4">
        <div className="relative w-full h-64 md:h-full">
        <Image
            src="/assets/appImage.jpg"
            alt="Description of the image"
            fill 
            style={{ objectFit: 'contain' }}
            quality={75}
            priority
          />
        </div>
      </div>
    </div>
  );
}