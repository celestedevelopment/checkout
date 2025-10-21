'use client';

interface YourAccountTitleProps {
  className?: string;
}

export default function YourAccountTitle({ className = "" }: YourAccountTitleProps) {
  return (
    <h2 className={`text-2xl font-bold text-gray-900 mb-6 select-none ${className}`}>
      Your account
    </h2>
  );
}