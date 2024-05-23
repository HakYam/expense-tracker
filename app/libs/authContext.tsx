"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import * as jose from 'jose';

interface AuthContextType {
  userId: string | null;
  userName: string | null;
  login: (token: string, userName: string, userId: string) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
  loading: boolean; // Add loading to AuthContextType
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userId, setUser] = useState<string | null>(null);
  const [userName, setName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // Added loading state
  const router = useRouter();

  const verifyToken = useCallback(async (token: string, storedUserName: string, storedUserId: string) => {
    const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET as string;
    try {
      await jose.jwtVerify(token, new TextEncoder().encode(JWT_SECRET));
      setUser(storedUserId);
      setName(storedUserName);
    } catch (error) {
      console.error('Token verification failed:', error);
      localStorage.removeItem('authToken');
      localStorage.removeItem('userName');
      localStorage.removeItem('userId');
      setUser(null);
      setName(null);
      router.push('/');
    } finally {
      setLoading(false); // Ensure loading is set to false after token verification
    }
  }, [router]);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const storedUserName = localStorage.getItem('userName');
    const storedUserId = localStorage.getItem('userId');
    if (token && storedUserName && storedUserId) {
      verifyToken(token, storedUserName, storedUserId);
    } else {
      setLoading(false); // Set loading to false if no token is found
      router.push('/');
    }
  }, [router, verifyToken]);

  const login = (token: string, userName: string, userId: string) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('userName', userName);
    localStorage.setItem('userId', userId);
    setUser(userId);
    setName(userName);
    router.push('/dashboard');
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
    <AuthContext.Provider value={{ userId, userName, login, logout, isAuthenticated, loading }}>
      {loading ? <div>Loading...</div> : children} {/* Add a loading state UI if needed */}
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
