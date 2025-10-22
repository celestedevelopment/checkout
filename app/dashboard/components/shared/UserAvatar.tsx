'use client';

import { getUserInitials } from '../../utils';

interface UserAvatarProps {
  name: string;
  avatar?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeClasses = {
  sm: 'w-8 h-8 text-sm',
  md: 'w-12 h-12 text-lg',
  lg: 'w-16 h-16 text-xl',
  xl: 'w-20 h-20 text-2xl'
};

export default function UserAvatar({ 
  name, 
  avatar, 
  size = 'md', 
  className = '' 
}: UserAvatarProps) {
  const initials = getUserInitials(name);
  const sizeClass = sizeClasses[size];

  if (avatar) {
    return (
      <img
        src={avatar}
        alt={`${name} avatar`}
        className={`${sizeClass} rounded-full object-cover select-none ${className}`}
      />
    );
  }

  return (
    <div className={`${sizeClass} bg-green-600 rounded-full flex items-center justify-center select-none ${className}`}>
      <span className="text-white font-semibold">
        {initials}
      </span>
    </div>
  );
}