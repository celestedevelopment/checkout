'use client';

import { useState } from 'react';
import { DashboardHeaderProps } from '../../types';
import UserAvatar from '../shared/UserAvatar';
import { useT } from '@/app/hooks/useTranslation';

export default function DashboardHeader({ 
  user, 
  onUserMenuToggle,
  onNotificationClick,
  notificationCount = 0
}: DashboardHeaderProps) {
  const t = useT();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleUserClick = () => {
    setShowUserMenu(!showUserMenu);
    onUserMenuToggle?.();
  };

  return (
    <header className="bg-transparent px-8 py-6">
      <div className="flex items-center justify-between">
        {/* Left side - Title */}
        <div className="flex items-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Contacts
          </h1>
        </div>

        {/* Right side - Add contact button */}
        <div className="flex items-center gap-4">
          <button className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
            Add contact
          </button>
        </div>
      </div>
    </header>
  );
}