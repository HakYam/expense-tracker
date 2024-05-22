"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import * as jose from 'jose';

interface AuthContextType {
  user: string | null;
  name: string | null;
  login: (token: string, name: string, userId: string) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
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

  const login = (token: string, name: string, userId: string) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('userName', name);
    localStorage.setItem('userId', userId);
    setUser(userId);
    setName(name);
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

  const isAuthenticated = () => !!user;

  return (
    <AuthContext.Provider value={{ user, name, login, logout, isAuthenticated }}>
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