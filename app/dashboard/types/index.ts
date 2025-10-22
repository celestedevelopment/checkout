// Dashboard User Types
export interface DashboardUser {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: Date;
  lastLogin?: Date;
  subscription?: UserSubscription;
  preferences: UserPreferences;
}

export interface UserSubscription {
  id: string;
  plan: 'free' | 'basic' | 'premium' | 'enterprise';
  status: 'active' | 'inactive' | 'cancelled' | 'expired';
  startDate: Date;
  endDate?: Date;
  autoRenew: boolean;
  paymentMethod?: string;
}

export interface UserPreferences {
  language: string;
  currency: string;
  theme: 'light' | 'dark' | 'system';
  notifications: {
    email: boolean;
    push: boolean;
    marketing: boolean;
  };
  timezone: string;
}

// Dashboard Navigation Types
export interface DashboardMenuItem {
  id: string;
  label: string;
  icon: string;
  path: string;
  badge?: string | number;
  children?: DashboardMenuItem[];
}

export interface DashboardStats {
  totalTransactions: number;
  totalAmount: number;
  currency: string;
  monthlyGrowth: number;
  activeSubscriptions: number;
}

// Dashboard Component Props
export interface DashboardLayoutProps {
  children: React.ReactNode;
  user: DashboardUser;
}

export interface DashboardHeaderProps {
  user: DashboardUser;
  onUserMenuToggle?: () => void;
  onNotificationClick?: () => void;
  notificationCount?: number;
}

export interface DashboardSidebarProps {
  menuItems: DashboardMenuItem[];
  currentPath: string;
}

// API Response Types
export interface DashboardApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  hasNext: boolean;
  hasPrev: boolean;
}