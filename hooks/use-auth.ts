'use client';

import { useState } from 'react';
import { AuthState, User } from '@/lib/types';

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isGuest: false,
  });

  const login = async (email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user: User = {
      id: '1',
      email,
      name: email.split('@')[0],
      avatar: `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face`
    };
    
    setAuthState({
      user,
      isAuthenticated: true,
      isGuest: false,
    });
  };

  const signUp = async (email: string, password: string, name: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user: User = {
      id: '1',
      email,
      name,
      avatar: `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face`
    };
    
    setAuthState({
      user,
      isAuthenticated: true,
      isGuest: false,
    });
  };

  const continueAsGuest = () => {
    setAuthState({
      user: null,
      isAuthenticated: false,
      isGuest: true,
    });
  };

  const logout = () => {
    setAuthState({
      user: null,
      isAuthenticated: false,
      isGuest: false,
    });
  };

  return {
    ...authState,
    login,
    signUp,
    continueAsGuest,
    logout,
  };
}