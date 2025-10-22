'use client';

import { useState, useEffect, useCallback } from 'react';
import { DashboardUser, DashboardStats, UserPreferences } from '../types';
import { getDashboardPreference, saveDashboardPreference } from '../utils';

interface UseDashboardReturn {
  user: DashboardUser | null;
  stats: DashboardStats | null;
  loading: boolean;
  error: string | null;
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  updateUserPreferences: (preferences: Partial<UserPreferences>) => Promise<void>;
  refreshData: () => Promise<void>;
}

export const useDashboard = (userId?: string): UseDashboardReturn => {
  const [user, setUser] = useState<DashboardUser | null>(null);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Load sidebar state from localStorage
  useEffect(() => {
    if (userId) {
      const collapsed = getDashboardPreference(userId, 'sidebarCollapsed', false);
      setSidebarCollapsed(collapsed);
    }
  }, [userId]);

  // Toggle sidebar and save state
  const toggleSidebar = useCallback(() => {
    const newCollapsed = !sidebarCollapsed;
    setSidebarCollapsed(newCollapsed);
    if (userId) {
      saveDashboardPreference(userId, 'sidebarCollapsed', newCollapsed);
    }
  }, [sidebarCollapsed, userId]);

  // Fetch user data
  const fetchUserData = useCallback(async () => {
    if (!userId) return;

    try {
      setLoading(true);
      setError(null);

      // Simulate API call with mock data
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
      
      const mockUserData: DashboardUser = {
        id: userId,
        name: 'Mario Rossi',
        email: 'mario.rossi@example.com',
        avatar: '',
        subscription: {
          id: 'sub_123',
          plan: 'premium',
          status: 'active',
          startDate: new Date('2024-01-01'),
          endDate: new Date('2024-12-31'),
          autoRenew: true,
          paymentMethod: 'card'
        },
        preferences: {
          theme: 'light',
          language: 'it',
          currency: 'EUR',
          timezone: 'Europe/Rome',
          notifications: {
            email: true,
            push: true,
            marketing: false
          }
        },
        createdAt: new Date('2024-01-01'),
        lastLogin: new Date()
      };

      setUser(mockUserData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch user data');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  // Fetch dashboard stats
  const fetchStats = useCallback(async () => {
    if (!userId) return;

    try {
      // Simulate API call with mock data
      await new Promise(resolve => setTimeout(resolve, 300)); // Simulate network delay
      
      const mockStatsData: DashboardStats = {
        totalTransactions: 1247,
        totalAmount: 45678.90,
        currency: 'EUR',
        activeSubscriptions: 3,
        monthlyGrowth: 12.5
      };

      setStats(mockStatsData);
    } catch (err) {
      console.error('Failed to fetch stats:', err);
    }
  }, [userId]);

  // Update user preferences
  const updateUserPreferences = useCallback(async (preferences: Partial<UserPreferences>) => {
    if (!userId || !user) return;

    try {
      // Simulate API call with mock response
      await new Promise(resolve => setTimeout(resolve, 200)); // Simulate network delay
      
      // Update user state locally (in a real app this would be handled by the API)
      const updatedUser = { ...user, preferences: { ...user.preferences, ...preferences } };
      setUser(updatedUser);
      
      // Save to localStorage for persistence
      saveDashboardPreference(userId, 'userPreferences', updatedUser.preferences);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update preferences');
      throw err;
    }
  }, [userId, user]);

  // Refresh all data
  const refreshData = useCallback(async () => {
    await Promise.all([fetchUserData(), fetchStats()]);
  }, [fetchUserData, fetchStats]);

  // Initial data fetch
  useEffect(() => {
    if (userId) {
      refreshData();
    }
  }, [userId, refreshData]);

  return {
    user,
    stats,
    loading,
    error,
    sidebarCollapsed,
    toggleSidebar,
    updateUserPreferences,
    refreshData,
  };
};