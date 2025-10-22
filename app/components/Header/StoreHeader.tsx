interface StoreHeaderProps {
  className?: string;
}

export default function StoreHeader({ className = '' }: StoreHeaderProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="w-8 h-8 flex items-center justify-center">
        <img 
          src="/Header/LogoBoomFI.png" 
          alt="BoomFi Logo" 
          className="w-8 h-8 object-contain select-none"
        />
      </div>
      <span className="text-xl font-bold text-gray-900 select-none">BoomFi</span>
    </div>
  );
}