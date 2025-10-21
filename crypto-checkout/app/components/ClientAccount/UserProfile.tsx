'use client';

interface UserProfileProps {
  customerName: string;
  email: string;
  onSignOut: () => void;
}

export default function UserProfile({ customerName, email, onSignOut }: UserProfileProps) {
  return (
    <div className="mb-4">
      {/* Profilo utente verificato */}
      <div className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg">
        {/* Avatar con iniziali */}
        <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
          <span className="text-white font-semibold text-lg">
            {customerName.split(' ').map(name => name.charAt(0)).join('')}
          </span>
        </div>
        
        {/* Informazioni utente */}
        <div className="flex-1">
          <h3 className="text-base font-semibold text-gray-900 select-none">{customerName}</h3>
          <p className="text-sm text-gray-600 select-none">{email}</p>
        </div>
        
        {/* Pulsante Sign out */}
        <button 
          onClick={onSignOut}
          className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
        >
          Sign out
        </button>
      </div>
    </div>
  );
}