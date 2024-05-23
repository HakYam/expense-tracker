"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import * as jose from 'jose';

interface AuthContextType {
  userId: string | null;
  userName: string | null;
  login: (token: string, userName: string, userId: string) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC = ({ children }) => {
  const [userId, setUser] = useState<string | null>(null);
  const [userName, setName] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userName = localStorage.getItem('userName');
    const userId = localStorage.getItem('userId');
    if (token && userName && userId) {
      verifyToken(token, userName, userId);
    }
  }, []);

  const verifyToken = async (token: string, userName: string, userId: string) => {
    const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET as string;
    try {
      const { payload } = await jose.jwtVerify(token, new TextEncoder().encode(JWT_SECRET));
      setUser(userId);
      setName(userName);
    } catch (error) {
      console.error('Token verification failed:', error);
      localStorage.removeItem('authToken');
      localStorage.removeItem('userName');
      localStorage.removeItem('userId');
      setUser(null);
      setName(null);
    }
  };

  const login = (token: string, userName: string, userId: string) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('userName', userName);
    localStorage.setItem('userId', userId);
    setUser(userId);
    setName(userName);
    router.push('/dashboard'); // Ensure redirection happens here
  };

  const logout = () => {
    setUser(null);
    setName(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('userId');
    router.push('/');
  };

  const isAuthenticated = () => !!userId;

  return (
    <AuthContext.Provider value={{ userId, userName, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
