import React from 'react';
import { Logo } from './Logo';
import { MapPin, Phone, MessageCircle, Facebook, Clock, ChevronRight, Users, QrCode, ExternalLink } from 'lucide-react';
import { GradeLevel, Subject } from '../types';
import { ZALO_COMMUNITY_LINK } from './CommunityQrModal';

interface FooterProps {
  onSelectGrade: (grade: GradeLevel) => void;
  onOpenConsultation: () => void;
  onOpenCommunityModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectGrade, onOpenConsultation, onOpenCommunityModal }) => {
  const grades: GradeLevel[] = ['6', '7', '8', '9', '10', '11', '12', 'cntt', 'van-chu-dep'];
  const subjects: Subject[] = [
    'Toán',
    'Lí',
    'Hoá',
    'Anh',
    'Văn',
    'Sinh',
    'Sử',
    'Địa',
    'Công nghệ thông tin',
    'Luyện viết chữ đẹp',
  ];

  const scrollTo = (selector: string) => {
    const el = document.querySelector(selector);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80">
          {/* Col 1: Brand & Overview (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white/95 rounded-2xl p-3 inline-block shadow-sm">
              <Logo size="md" showText={true} />
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-md">
              Cơ sở giáo dục Thầy Hoàng - Vạn Phú chuyên bồi dưỡng văn hóa, củng cố mất gốc và luyện thi chất lượng cao cho học sinh từ Lớp 6 đến Lớp 12 tại Thái Nguyên.
            </p>

            <div className="space-y-2 text-xs text-slate-300 pt-1">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">Địa chỉ:</strong> Khu Đô Thị Vạn Phú - Vạn Phú - Thái Nguyên
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-red-400 flex-shrink-0" />
                <span>
                  <strong className="text-white">Hotline 1:</strong>{' '}
                  <a href="tel:0985972525" className="text-amber-300 hover:underline">
                    0985.972.525
                  </a>
                  {' • '}
                  <strong className="text-white">Hotline 2:</strong>{' '}
                  <a href="tel:0869210288" className="text-amber-300 hover:underline">
                    0869.210.288
                  </a>
                </span>
              </div>
              <div className="space-y-1 text-slate-300">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Tiếp đón trực tiếp tại cơ sở: <strong className="text-white">07:00 - 18:00</strong> hàng ngày</span>
                </div>
                <div className="flex items-center gap-2 pl-6 text-xs text-slate-400">
                  <span>Thời gian hỗ trợ tư vấn: <strong className="text-emerald-300">07:00 - 22:00</strong></span>
                </div>
              </div>
            </div>

            {/* Social Connect & Community */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <button
                onClick={onOpenCommunityModal}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 text-xs font-black transition-all cursor-pointer shadow-sm hover:scale-105"
                title="Nhóm Zalo cộng đồng hỗ trợ & giải đáp thắc mắc"
              >
                <Users className="w-3.5 h-3.5 text-slate-950" />
                <span>Nhóm Zalo Giải Đáp</span>
              </button>
              <a
                href="https://www.facebook.com/share/1DErVey6i8/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors"
              >
                <Facebook className="w-3.5 h-3.5" />
                <span>Facebook Trung Tâm</span>
              </a>
              <a
                href="https://zalo.me/0985972525"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Chat Zalo</span>
              </a>
            </div>
          </div>

          {/* Col 2: Grades & Subjects (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider border-b border-slate-800 pb-2">
              Tuyển Sinh Liên Tục Các Lớp (6 - 12)
            </h4>

            <div className="space-y-3">
              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase mb-2">Chọn nhanh khối lớp:</p>
                <div className="flex flex-wrap gap-1.5">
                  {grades.map((g) => (
                    <button
                      key={g}
                      onClick={() => {
                        onSelectGrade(g);
                        scrollTo('#tim-kiem-lop-hoc');
                      }}
                      className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-blue-900/60 text-slate-300 hover:text-white text-xs font-semibold border border-slate-800 cursor-pointer transition-colors"
                    >
                      Lớp {g}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase mb-2">Các Môn Bồi Dưỡng Trọng Điểm:</p>
                <div className="flex flex-wrap gap-1.5">
                  {subjects.map((sub) => (
                    <span
                      key={sub}
                      className="px-2.5 py-1 rounded-lg bg-slate-900 text-amber-300 text-xs font-bold border border-slate-800"
                    >
                      Môn {sub}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Col 3: Quick Navigation & Consultation (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider border-b border-slate-800 pb-2">
              Liên Kết Nhanh
            </h4>
            <ul className="space-y-2 text-xs">
              {[
                { label: 'Trang Chủ', href: '#trang-chu' },
                { label: 'Bảng Lớp & Môn Học', href: '#bang-mon-hoc' },
                { label: 'Lớp Học Hiện Có (Danh Sách Học Sinh)', href: '#lop-hoc-hien-co' },
                { label: 'Cam Kết Chất Lượng', href: '#cam-ket' },
                { label: 'Địa Chỉ & Bản Đồ', href: '#lien-he' },
              ].map((link, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <ChevronRight className="w-3 h-3 text-slate-500" />
                    <span>{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>

            <div className="pt-2 space-y-3">
              <button
                onClick={onOpenConsultation}
                className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl transition-colors shadow-sm cursor-pointer"
              >
                Đăng Ký Tư Vấn Ngay
              </button>

              <div className="bg-slate-900/90 border border-amber-400/30 rounded-2xl p-3 space-y-2">
                <div className="flex items-center gap-1.5 text-amber-300 text-xs font-bold">
                  <Users className="w-3.5 h-3.5 text-amber-400" />
                  <span>Nhóm Giải Đáp Zalo</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-snug">
                  Tham gia cộng đồng để hỏi lịch học, tài liệu & giải đáp thắc mắc trực tiếp.
                </p>
                <div className="flex items-center gap-1.5 pt-0.5">
                  <a
                    href={ZALO_COMMUNITY_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-1.5 px-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-[11px] rounded-lg text-center transition-colors flex items-center justify-center gap-1"
                  >
                    <span>Vào Nhóm</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <button
                    onClick={onOpenCommunityModal}
                    className="py-1.5 px-2 bg-white/10 hover:bg-white/20 text-slate-200 text-[11px] font-semibold rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                    title="Xem mã QR"
                  >
                    <QrCode className="w-3 h-3 text-amber-300" />
                    <span>Mã QR</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} Cơ sở giáo dục Thầy Hoàng - Vạn Phú. Giữ toàn quyền.
          </p>
          <p className="text-slate-400 text-center sm:text-right">
            Địa chỉ: Khu Đô Thị Vạn Phú - Vạn Phú - Thái Nguyên • Hotline: 0985.972.525 - 0869.210.288
          </p>
        </div>
      </div>
    </footer>
  );
};
