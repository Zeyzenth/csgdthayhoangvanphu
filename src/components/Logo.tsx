import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
}) => {
  const sizeMap = {
    sm: 'w-10 h-10',
    md: 'w-14 h-14',
    lg: 'w-20 h-20',
    xl: 'w-28 h-28',
  };

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <div className={`relative flex-shrink-0 ${sizeMap[size]} transition-transform duration-200 hover:scale-105`}>
        <img
          src="/logo.svg"
          alt="Logo Cơ sở giáo dục Thầy Hoàng - Vạn Phú"
          className="w-full h-full object-contain drop-shadow-sm"
          referrerPolicy="no-referrer"
          onError={(e) => {
            // Fallback inline rendering if image fails
            const target = e.target as HTMLElement;
            target.style.display = 'none';
          }}
        />
      </div>
      {showText && (
        <div className="flex flex-col text-left leading-tight">
          <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-wider text-blue-900">
            Cơ Sở Giáo Dục
          </span>
          <span className="text-base sm:text-lg font-black uppercase text-red-600 tracking-tight">
            Thầy Hoàng - Vạn Phú
          </span>
          <span className="text-[10px] text-slate-500 font-medium hidden sm:inline-block">
            Toán • Lí • Hoá • Anh • Văn • Sinh (Lớp 6 - 12)
          </span>
        </div>
      )}
    </div>
  );
};
