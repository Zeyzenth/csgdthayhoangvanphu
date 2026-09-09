import React from 'react';
import { Logo } from './Logo';
import { Sparkles, Phone, MessageCircle, ArrowRight, CheckCircle, ShieldCheck, Users, Award, BookOpen, Clock } from 'lucide-react';
import { GradeLevel } from '../types';

interface HeroProps {
  onOpenConsultationModal: (prefillGrade?: GradeLevel) => void;
  onSelectGradeFilter: (grade: GradeLevel) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenConsultationModal,
  onSelectGradeFilter,
}) => {
  const grades: GradeLevel[] = ['6', '7', '8', '9', '10', '11', '12'];

  const handleGradeClick = (grade: GradeLevel) => {
    onSelectGradeFilter(grade);
    const element = document.querySelector('#bang-mon-hoc');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToCourses = () => {
    const element = document.querySelector('#bang-mon-hoc');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="trang-chu" className="relative overflow-hidden bg-gradient-to-b from-blue-950 via-slate-900 to-blue-900 text-white pt-8 pb-16 lg:pt-14 lg:pb-24">
      {/* Subtle Background Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Headlines & Call-To-Action */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Admission Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600/30 to-amber-500/30 border border-amber-400/40 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold text-amber-300">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <span>Tuyển sinh liên tục năm học 2026 - 2027</span>
              <span className="text-white/80">•</span>
              <span className="text-white">Lớp 6 đến Lớp 12</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <p className="text-amber-400 text-sm sm:text-base font-bold tracking-wider uppercase">
                Cơ Sở Giáo Dục Thầy Hoàng - Vạn Phú
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-black leading-tight tracking-tight text-white">
                Vững Vàng Nền Tảng, Bứt Phá Điểm Số &{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-200 to-amber-400">
                  Chinh Phục Mọi Kỳ Thi
                </span>
              </h1>
            </div>

            {/* Sub-description with Subjects */}
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Chuyên bồi dưỡng văn hóa 6 môn trọng điểm:{' '}
              <strong className="text-white font-bold">Toán — Lí — Hoá — Anh — Văn — Sinh</strong>.
              Lấy lại gốc nhanh chóng, rèn luyện phương pháp giải bài khoa học, dễ hiểu, đồng hành sát sao cùng phụ huynh trên từng chặng đường tiến bộ của con.
            </p>

            {/* Key Assurance Badges - Slogan động lực */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2 text-xs sm:text-sm">
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg p-2.5">
                <Sparkles className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span className="text-slate-200 font-medium">Học hiểu bản chất • Tự tin bứt phá</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg p-2.5">
                <Award className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span className="text-slate-200 font-medium">Chăm chỉ hôm nay • Tỏa sáng ngày mai</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg p-2.5 col-span-2 sm:col-span-1">
                <ShieldCheck className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span className="text-slate-200 font-medium">Kiên trì nỗ lực • Chinh phục ước mơ</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2 justify-center lg:justify-start">
              <button
                onClick={() => onOpenConsultationModal()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold text-base px-6 py-3.5 rounded-xl shadow-lg hover:shadow-red-500/25 transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
                <span>Đăng Ký Tư Vấn Trực Tuyến</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={scrollToCourses}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-base px-5 py-3.5 rounded-xl transition-all cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-amber-400" />
                <span>Xem Bảng Lớp & Môn Học</span>
              </button>
            </div>

            {/* Quick Contact hotline bar */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-slate-300">
              <div className="flex items-center gap-1.5">
                <Phone className="w-4 h-4 text-amber-400" />
                <span>Hotline trực tiếp:</span>
                <a href="tel:0985972525" className="text-white font-bold hover:text-amber-300 underline">
                  0985.972.525
                </a>
                <span>-</span>
                <a href="tel:0869210288" className="text-white font-bold hover:text-amber-300 underline">
                  0869.210.288
                </a>
              </div>
              <div className="flex items-center gap-1.5">
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <a
                  href="https://zalo.me/0985972525"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-300 hover:text-emerald-200 underline font-semibold"
                >
                  Chat Zalo với trung tâm (Phản hồi ngay)
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Logo Emblem & Quick Grade Finder Box */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full max-w-md bg-white/95 text-slate-900 rounded-3xl p-6 sm:p-7 shadow-2xl border border-white/20 relative">
              {/* Top Accent Tag */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 p-1 border border-slate-200 flex items-center justify-center">
                    <img
                      src="/logo.svg"
                      alt="Logo Thầy Hoàng Vạn Phú"
                      className="w-full h-full object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-blue-950 text-base leading-tight">
                      CƠ SỞ GIÁO DỤC
                    </h3>
                    <p className="text-red-600 font-black text-sm uppercase">
                      THẦY HOÀNG - VẠN PHÚ
                    </p>
                  </div>
                </div>
                <span className="text-[11px] font-bold bg-amber-100 text-amber-900 px-2.5 py-1 rounded-full">
                  Thái Nguyên
                </span>
              </div>

              {/* Quick Jump by Grade for Parents */}
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-blue-800" />
                    <span>Phụ huynh chọn lớp học của con:</span>
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Bấm để xem lịch học, mục tiêu & ưu đãi từng khối lớp
                  </p>
                </div>

                {/* Grade Grid */}
                <div className="grid grid-cols-4 gap-2">
                  {grades.map((g) => (
                    <button
                      key={g}
                      onClick={() => handleGradeClick(g)}
                      className="group flex flex-col items-center justify-center py-2.5 px-2 rounded-xl border border-slate-200 hover:border-blue-600 bg-slate-50 hover:bg-blue-50/80 transition-all cursor-pointer"
                    >
                      <span className="text-xs text-slate-500 group-hover:text-blue-700 font-medium">Lớp</span>
                      <span className="text-base font-black text-blue-900 group-hover:text-blue-700">{g}</span>
                    </button>
                  ))}
                  <button
                    onClick={scrollToCourses}
                    className="flex flex-col items-center justify-center py-2.5 px-2 rounded-xl border border-amber-300 bg-amber-50/70 hover:bg-amber-100 transition-all cursor-pointer"
                  >
                    <span className="text-[11px] text-amber-800 font-medium">Xem hết</span>
                    <span className="text-xs font-black text-amber-900">Tất cả</span>
                  </button>
                </div>

                {/* Location Box */}
                <div className="p-3.5 bg-blue-50/60 rounded-xl border border-blue-100/80 text-xs text-slate-700 space-y-1">
                  <div className="flex items-start gap-2">
                    <span className="text-blue-800 font-bold flex-shrink-0">Địa chỉ:</span>
                    <span className="font-medium text-slate-800">
                      Khu Đô Thị Vạn Phú - Vạn Phú - Thái Nguyên
                    </span>
                  </div>
                  <div className="space-y-0.5 text-slate-600 pt-1">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                      <span>Tiếp đón trực tiếp: <strong className="text-slate-900 font-semibold">7h00 - 18h00</strong></span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500 pl-5">
                      <span>Hỗ trợ tư vấn: <strong className="text-emerald-700 font-semibold">7h00 - 22h00</strong></span>
                    </div>
                  </div>
                </div>

                {/* Direct action button - Link to Fanpage */}
                <a
                  href="https://www.facebook.com/share/1DErVey6i8/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-sm rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Đăng Ký Tư Vấn & Xếp Lớp Ngay</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
