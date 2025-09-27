
"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserRole } from '@/lib/types';
import useLocalStorage from '@/hooks/use-local-storage';
import { initialUsers } from '@/data/users';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  currentUser: User | null;
  users: User[];
  login: (email: string, password: string) => boolean;
  logout: () => void;
  register: (name: string, email: string, password: string, role: UserRole) => boolean;
  deleteUser: (userId: string) => void;
  toggleUserVerification: (userId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useLocalStorage<User[]>('users', initialUsers);
  const [currentUser, setCurrentUser] = useLocalStorage<User | null>('currentUser', null);
  const router = useRouter();
  
  const login = (email: string, password: string): boolean => {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    router.push('/login');
  };

  const register = (name: string, email: string, password: string, role: UserRole): boolean => {
    if (users.some(u => u.email === email)) {
      return false; // User already exists
    }
    const newUser: User = {
      id: `user-${Date.now()}`,
      name,
      email,
      password,
      role,
      isVerified: false,
    };
    setUsers([...users, newUser]);
    setCurrentUser(newUser);
    return true;
  };
  
  const deleteUser = (userId: string) => {
    if (currentUser?.role !== 'admin') return;
    setUsers(users.filter(u => u.id !== userId));
  };
  
  const toggleUserVerification = (userId: string) => {
    if (currentUser?.role !== 'admin') return;
    setUsers(users.map(u => u.id === userId ? { ...u, isVerified: !u.isVerified } : u));
  }


  return (
    <AuthContext.Provider value={{ currentUser, users, login, logout, register, deleteUser, toggleUserVerification }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
