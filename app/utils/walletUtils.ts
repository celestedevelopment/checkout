export interface WalletOption {
  id: string;
  name: string;
  network: string;
  icon: string;
}

export const walletOptions: WalletOption[] = [
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
    icon: '/CryptoIcon/Other/12114250.png'
  },
  {
    id: 'USDC',
    name: 'USDC',
    network: 'Ethereum',
    icon: '/CryptoIcon/USDC/Circle_USDC_Logo.png'
  }
];

export const getWalletById = (walletId: string): WalletOption | undefined => {
  return walletOptions.find(wallet => wallet.id === walletId);
};

export const getWalletIcon = (walletId: string): string => {
  const wallet = getWalletById(walletId);
  return wallet?.icon || walletOptions[0].icon;
};

export const getWalletName = (walletId: string): string => {
  const wallet = getWalletById(walletId);
  return wallet?.name || walletOptions[0].name;
};

export const getWalletNetwork = (walletId: string): string => {
  const wallet = getWalletById(walletId);
  return wallet?.network || walletOptions[0].network;
};