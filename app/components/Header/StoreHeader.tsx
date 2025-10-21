import Image from 'next/image';

interface Props {
  size?: 'default' | 'small';
  className?: string;
}

export default function StoreHeader({ size = 'default', className = '' }: Props) {
  const logoSize = size === 'small' ? 24 : 32;
  const textSize = size === 'small' ? 'text-lg' : 'text-xl';
  const gap = size === 'small' ? 'gap-2' : 'gap-3';

  return (
    <div className={`flex items-center ${gap} ${className}`}>
      <a 
        href="https://example-store.com" 
        target="_blank" 
        rel="noopener noreferrer"
        className="block"
      >
        <Image
          src="/Header/LogoBoomFI.png"
          alt="BoomFi Logo"
          width={logoSize}
          height={logoSize}
          className="rounded cursor-pointer hover:opacity-80 transition-opacity"
        />
      </a>
      <h1 className={`text-black ${textSize} font-bold select-none`}>BoomFi</h1>
    </div>
  );
}