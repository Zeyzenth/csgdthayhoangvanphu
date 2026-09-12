import React, { useState } from 'react';
import { Logo } from './Logo';
import { Phone, MapPin, MessageCircle, Menu, X, Facebook, Sparkles, Users } from 'lucide-react';
import { ZALO_COMMUNITY_LINK } from './CommunityQrModal';

interface NavbarProps {
  onOpenConsultationModal: () => void;
  onOpenCommunityModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenConsultationModal, onOpenCommunityModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Trang Chủ', href: '#trang-chu' },
    { name: 'Bảng Lớp & Môn Học', href: '#bang-mon-hoc' },
    { name: 'Cam Kết Chất Lượng', href: '#cam-ket' },
    { name: 'Liên Hệ & Bản Đồ', href: '#lien-he' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100 transition-all">
      {/* Top Info Bar */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white text-xs py-2 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-4 flex-wrap justify-center sm:justify-start">
            <div className="flex items-center gap-1.5 text-slate-200">
              <MapPin className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
              <span>Khu Đô Thị Vạn Phú - Vạn Phú - Thái Nguyên</span>
            </div>
            <div className="hidden md:flex items-center gap-2 text-slate-300">
              <span className="w-1 h-1 rounded-full bg-slate-400"></span>
              <span className="text-amber-300 font-medium">Tuyển sinh liên tục Lớp 6 - 12 (Toán • Lí • Hoá • Anh • Văn • Sinh)</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 font-semibold text-white">
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>Hotline:</span>
              <a href="tel:0985972525" className="hover:text-amber-300 transition-colors underline decoration-dotted">
                0985.972.525
              </a>
              <span className="text-slate-400">-</span>
              <a href="tel:0869210288" className="hover:text-amber-300 transition-colors underline decoration-dotted">
                0869.210.288
              </a>
            </div>

            <span className="text-slate-500">|</span>

            {/* Social Links & Community */}
            <div className="flex items-center gap-2">
              <button
                onClick={onOpenCommunityModal}
                className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black px-2.5 py-0.5 rounded text-[11px] transition-all cursor-pointer shadow-sm hover:scale-105"
                title="Nhóm Zalo cộng đồng hỗ trợ & giải đáp thắc mắc"
              >
                <Users className="w-3.5 h-3.5 text-slate-950" />
                <span>Nhóm Zalo Giải Đáp</span>
              </button>
              <a
                href="https://www.facebook.com/share/1DErVey6i8/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 bg-blue-700/60 hover:bg-blue-600 px-2 py-0.5 rounded text-[11px] transition-colors"
                title="Facebook Cơ sở Thầy Hoàng"
              >
                <Facebook className="w-3 h-3 text-white" />
                <span className="hidden xs:inline">Facebook</span>
              </a>
              <a
                href="https://zalo.me/0985972525"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 bg-emerald-600 hover:bg-emerald-500 px-2 py-0.5 rounded text-[11px] font-medium transition-colors"
                title="Chat Zalo với trung tâm"
              >
                <MessageCircle className="w-3 h-3 text-white" />
                <span>Chat Zalo</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <a href="#trang-chu" className="flex items-center" onClick={() => handleNavClick('#trang-chu')}>
          <Logo size="md" />
        </a>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-medium text-slate-700">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => handleNavClick(link.href)}
              className="px-3 py-2 rounded-lg hover:text-blue-900 hover:bg-blue-50/70 transition-colors cursor-pointer text-slate-700 font-semibold"
            >
              {link.name}
            </button>
          ))}
        </nav>

        {/* Action Button */}
        <div className="hidden sm:flex items-center gap-2.5">
          <button
            onClick={onOpenCommunityModal}
            className="inline-flex items-center gap-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 font-bold text-xs px-3.5 py-2.5 rounded-xl transition-all cursor-pointer shadow-sm"
            title="Nhóm Zalo hỗ trợ & giải đáp thắc mắc"
          >
            <Users className="w-4 h-4 text-amber-600" />
            <span>Nhóm Zalo Giải Đáp</span>
          </button>

          <button
            onClick={onOpenConsultationModal}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold text-sm px-4 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
            <span>Đăng Ký Tư Vấn</span>
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={onOpenConsultationModal}
            className="bg-red-600 text-white text-xs font-bold px-3 py-2 rounded-lg"
          >
            Đăng Ký
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.href)}
                className="w-full text-left px-4 py-2.5 rounded-lg font-semibold text-slate-800 hover:bg-blue-50 hover:text-blue-900 transition-colors"
              >
                {link.name}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCommunityModal();
              }}
              className="w-full py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black rounded-xl text-center shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <Users className="w-4 h-4 text-slate-950" />
              <span>Nhóm Zalo Cộng Đồng Hỗ Trợ & Giải Đáp</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultationModal();
              }}
              className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-center shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Đăng Ký Tư Vấn Lớp Học Trực Tuyến</span>
            </button>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <a
                href="tel:0985972525"
                className="py-2.5 bg-blue-900 text-white font-semibold text-xs rounded-lg text-center flex items-center justify-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-amber-300" />
                <span>Gọi 0985.972.525</span>
              </a>
              <a
                href="https://zalo.me/0985972525"
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 bg-emerald-600 text-white font-semibold text-xs rounded-lg text-center flex items-center justify-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Chat Zalo Với Trung Tâm</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
