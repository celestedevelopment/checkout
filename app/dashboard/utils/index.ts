import { DashboardUser, UserSubscription } from '../types';

// User utilities
export const getUserInitials = (name: string): string => {
  return name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .join('')
    .slice(0, 2);
};

export const formatUserName = (name: string): string => {
  return name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

// Subscription utilities
export const getSubscriptionStatus = (subscription?: UserSubscription): string => {
  if (!subscription) return 'No subscription';
  
  switch (subscription.status) {
    case 'active':
      return 'Active';
    case 'inactive':
      return 'Inactive';
    case 'cancelled':
      return 'Cancelled';
    case 'expired':
      return 'Expired';
    default:
      return 'Unknown';
  }
};

export const getSubscriptionBadgeColor = (subscription?: UserSubscription): string => {
  if (!subscription) return 'bg-gray-100 text-gray-800';
  
  switch (subscription.status) {
    case 'active':
      return 'bg-green-100 text-green-800';
    case 'inactive':
      return 'bg-yellow-100 text-yellow-800';
    case 'cancelled':
      return 'bg-red-100 text-red-800';
    case 'expired':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const getPlanDisplayName = (plan: string): string => {
  switch (plan) {
    case 'free':
      return 'Free';
    case 'basic':
      return 'Basic';
    case 'premium':
      return 'Premium';
    case 'enterprise':
      return 'Enterprise';
    default:
      return plan.charAt(0).toUpperCase() + plan.slice(1);
  }
};

// Date utilities
export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date);
};

export const formatDateTime = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

export const getRelativeTime = (date: Date): string => {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  
  return formatDate(date);
};

// Number utilities
export const formatCurrency = (amount: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency
  }).format(amount);
};

export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

// Validation utilities
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPassword = (password: string): boolean => {
  return password.length >= 8;
};

// Theme utilities
export const getThemeClass = (theme: 'light' | 'dark' | 'system'): string => {
  if (theme === 'system') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return theme;
};

// Storage utilities
export const getDashboardStorageKey = (userId: string, key: string): string => {
  return `dashboard_${userId}_${key}`;
};

export const saveDashboardPreference = (userId: string, key: string, value: any): void => {
  try {
    localStorage.setItem(getDashboardStorageKey(userId, key), JSON.stringify(value));
  } catch (error) {
    console.error('Failed to save dashboard preference:', error);
  }
};

export const getDashboardPreference = <T>(userId: string, key: string, defaultValue: T): T => {
  try {
    const stored = localStorage.getItem(getDashboardStorageKey(userId, key));
    return stored ? JSON.parse(stored) : defaultValue;
  } catch (error) {
    console.error('Failed to get dashboard preference:', error);
    return defaultValue;
  }
};