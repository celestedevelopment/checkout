'use client';

import { DashboardLayoutProps, DashboardMenuItem } from '../../types';
import DashboardHeader from './DashboardHeader';
import DashboardSidebar from './DashboardSidebar';
import { useT } from '@/app/hooks/useTranslation';

// Default menu items for the dashboard
const getDefaultMenuItems = (t: (key: string, fallback: string) => string): DashboardMenuItem[] => [
  {
    id: 'invoices',
    label: t('invoices', 'Invoices'),
    icon: 'invoices',
    path: '/dashboard/invoices'
  },
  {
    id: 'payments',
    label: t('payments', 'Payments'),
    icon: 'payments',
    path: '/dashboard/payments'
  },
  {
    id: 'bills',
    label: t('bills', 'Bills'),
    icon: 'bills',
    path: '/dashboard/bills'
  },
  {
    id: 'contacts',
    label: t('contacts', 'Contacts'),
    icon: 'contacts',
    path: '/dashboard/contacts'
  }
];

export default function DashboardLayout({ 
  children, 
  user
}: DashboardLayoutProps) {
  const t = useT();
  const menuItems = getDefaultMenuItems(t);
  
  // Get current path (in a real app, you'd use useRouter or similar)
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/dashboard';

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Fixed Sidebar */}
      <DashboardSidebar
        menuItems={menuItems}
        currentPath={currentPath}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <DashboardHeader
          user={user}
          notificationCount={3} // This would come from props or state
        />

        {/* Main Content */}
        <main className="flex-1 bg-gray-100 overflow-hidden">
          <div className="h-full p-8">
            <div className="bg-white rounded-lg shadow-sm h-full overflow-auto">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}