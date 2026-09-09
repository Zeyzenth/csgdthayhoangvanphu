import React, { useState } from 'react';
import { Phone, MessageCircle, Facebook, Sparkles, ChevronUp } from 'lucide-react';

interface FloatingContactsProps {
  onOpenConsultation: () => void;
}

export const FloatingContacts: React.FC<FloatingContactsProps> = ({ onOpenConsultation }) => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Monitor scroll for back-to-top
  React.useEffect(() => {
    const checkScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-2.5">
      {/* Back to Top */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="w-10 h-10 rounded-full bg-slate-800/80 hover:bg-slate-900 text-white shadow-lg backdrop-blur-sm flex items-center justify-center transition-all cursor-pointer"
          title="Lên đầu trang"
          aria-label="Lên đầu trang"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}

      {/* Floating Registration Button */}
      <button
        onClick={onOpenConsultation}
        className="group relative flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-black text-xs sm:text-sm px-4 py-3 rounded-full shadow-2xl transition-all transform hover:scale-105 cursor-pointer border-2 border-white/40"
      >
        <span className="absolute -top-1.5 -right-1.5 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-amber-500"></span>
        </span>
        <Sparkles className="w-4 h-4 text-amber-300 animate-spin" style={{ animationDuration: '3s' }} />
        <span>Đăng Ký Tư Vấn</span>
      </button>

      {/* Facebook Floating Button */}
      <a
        href="https://www.facebook.com/share/1DErVey6i8/"
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-500 text-white shadow-xl flex items-center justify-center transition-transform hover:scale-110 border-2 border-white cursor-pointer group relative"
        title="Fanpage Facebook Cơ sở Thầy Hoàng"
        aria-label="Facebook"
      >
        <Facebook className="w-6 h-6" />
        <span className="absolute right-14 bg-slate-900 text-white text-[11px] font-bold py-1 px-2.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md">
          Facebook Cơ Sở
        </span>
      </a>

      {/* Zalo Floating Button */}
      <a
        href="https://zalo.me/0985972525"
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl flex items-center justify-center transition-transform hover:scale-110 border-2 border-white cursor-pointer group relative"
        title="Chat Zalo với trung tâm"
        aria-label="Zalo"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="absolute right-14 bg-slate-900 text-white text-[11px] font-bold py-1 px-2.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md">
          Chat Zalo với trung tâm (0985.972.525)
        </span>
      </a>

      {/* Hotline Floating Button */}
      <a
        href="tel:0985972525"
        className="w-12 h-12 rounded-full bg-red-600 hover:bg-red-500 text-white shadow-xl flex items-center justify-center transition-transform hover:scale-110 border-2 border-white cursor-pointer group relative animate-bounce"
        style={{ animationDuration: '2s' }}
        title="Gọi Hotline Thầy Hoàng"
        aria-label="Hotline"
      >
        <Phone className="w-6 h-6" />
        <span className="absolute right-14 bg-slate-900 text-white text-[11px] font-bold py-1 px-2.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md">
          Gọi 0985.972.525
        </span>
      </a>
    </div>
  );
};
