import { useState } from 'react';

interface WalletDropdownProps {
  selectedWallet: string;
  onWalletSelect: (wallet: string) => void;
  isDisabled?: boolean;
}

const walletOptions = [
  {
    id: 'BTC',
    name: 'Bitcoin',
    network: 'BTC',
    icon: '/CryptoIcon/Bitcoin/Bitcoin.png'
  },
  {
    id: 'USDT-TRC20',
    name: 'USDT',
    network: 'Tron',
    icon: '/CryptoIcon/USDT/USDT_Logo.png'
  },
  {
    id: 'TRX',
    name: 'TRX',
    network: 'Tron',
    icon: '/CryptoIcon/Other/trx.svg'
  },
  {
    id: 'USDC',
    name: 'USDC',
    network: 'Ethereum',
    icon: '/CryptoIcon/USDC/USDC.svg'
  }
];

export default function WalletDropdown({ selectedWallet, onWalletSelect, isDisabled = false }: WalletDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = walletOptions.find(option => option.id === selectedWallet) || walletOptions[0];

  const handleWalletSelect = (walletId: string) => {
    onWalletSelect(walletId);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <div 
        className={`p-3 border border-gray-200 rounded-lg transition-colors cursor-pointer ${
          !isDisabled 
            ? 'hover:bg-gray-50' 
            : 'bg-gray-100 cursor-not-allowed opacity-60'
        }`}
        onClick={() => !isDisabled && setIsOpen(!isOpen)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src={selectedOption.icon}
              alt={selectedOption.name}
              className="w-6 h-6"
            />
            <div className="flex items-center gap-1">
              <span className="font-medium text-[#0f172a]" style={{fontFamily: 'Inter', fontWeight: 500}}>
                {selectedOption.name}
              </span>
              <span className="text-[#999999]" style={{fontFamily: 'Inter', fontWeight: 400}}>
                {selectedOption.network}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <svg 
              width="15" 
              height="15" 
              viewBox="0 0 15 15" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className={`ml-2 h-4 w-4 shrink-0 text-black transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            >
              <path 
                d="M4.18179 6.18181C4.35753 6.00608 4.64245 6.00608 4.81819 6.18181L7.49999 8.86362L10.1818 6.18181C10.3575 6.00608 10.6424 6.00608 10.8182 6.18181C10.9939 6.35755 10.9939 6.64247 10.8182 6.81821L7.81819 9.81821C7.73379 9.9026 7.61934 9.95001 7.49999 9.95001C7.38064 9.95001 7.26618 9.9026 7.18179 9.81821L4.18179 6.81821C4.00605 6.64247 4.00605 6.35755 4.18179 6.18181Z" 
                fill="currentColor" 
                fillRule="evenodd" 
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Dropdown Menu */}
      {isOpen && !isDisabled && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
          {walletOptions.map((option) => (
            <div 
              key={option.id}
              className={`p-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0 first:rounded-t-lg last:rounded-b-lg select-none ${selectedWallet === option.id ? 'bg-gray-100 m-2 rounded-lg' : ''}`}
              onClick={() => handleWalletSelect(option.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img 
                    src={option.icon} 
                    alt={option.name} 
                    className="w-6 h-6"
                  />
                  <div className="flex items-center gap-1">
                    <span className="font-medium text-[#0f172a]" style={{fontFamily: 'Inter', fontWeight: 500}}>
                      {option.name}
                    </span>
                    <span className="text-[#999999]" style={{fontFamily: 'Inter', fontWeight: 400}}>
                      {option.network}
                    </span>
                  </div>
                </div>
                {selectedWallet === option.id && (
                  <svg 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-black"
                  >
                    <path 
                      d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" 
                      fill="currentColor"
                    />
                  </svg>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}