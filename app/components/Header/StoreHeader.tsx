interface StoreHeaderProps {
  className?: string;
}

export default function StoreHeader({ className = '' }: StoreHeaderProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center">
        <span className="text-black font-bold text-lg select-none">⚡</span>
      </div>
      <span className="text-xl font-bold text-gray-900 select-none">BoomFi</span>
    </div>
  );
}