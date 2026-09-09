import React, { useState } from 'react';
import { GradeLevel, Course } from '../types';
import {
  MessageCircle,
  Phone,
  Facebook,
  Sparkles,
  MapPin,
  Clock,
  Copy,
  Check,
  ExternalLink,
  PhoneCall,
  Calendar
} from 'lucide-react';

interface ConsultationSectionProps {
  preselectedGrade?: GradeLevel;
  preselectedCourse?: Course | null;
  onClearPreselectedCourse?: () => void;
}

export const ConsultationSection: React.FC<ConsultationSectionProps> = ({
  preselectedGrade,
  preselectedCourse,
  onClearPreselectedCourse,
}) => {
  const [copiedPhone, setCopiedPhone] = useState<string | null>(null);

  const handleCopyPhone = (phoneNumber: string) => {
    navigator.clipboard.writeText(phoneNumber.replace(/[\s.]/g, ''));
    setCopiedPhone(phoneNumber);
    setTimeout(() => {
      setCopiedPhone(null);
    }, 2000);
  };

  return (
    <section
      id="dang-ky-tu-van"
      className="py-14 lg:py-20 bg-gradient-to-b from-blue-950 via-slate-900 to-blue-900 text-white scroll-mt-20 relative overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 bg-red-600/30 border border-red-500/40 text-red-300 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Kênh Kết Nối Trực Tiếp Nhanh Chóng</span>
          </div>

          <h2
            id="heading-ket-noi-truc-tiep"
            className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight tracking-tight"
          >
            Liên Hệ Trực Tiếp Với Trung Tâm Qua Facebook & Zalo
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Quý phụ huynh không cần điền form phức tạp. Hãy nhắn tin hoặc gọi điện trực tiếp qua Facebook, Zalo hoặc Hotline để trung tâm tư vấn cặn kẽ lộ trình học phù hợp nhất cho con.
          </p>
        </div>

        {/* Highlighted Preselected Course (if chosen from courses list) */}
        {preselectedCourse && (
          <div className="max-w-4xl mx-auto mb-8 bg-amber-500/15 border border-amber-400/40 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 backdrop-blur-sm">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="bg-amber-400 text-slate-950 font-black text-[10px] px-2 py-0.5 rounded uppercase tracking-wide">
                  Khóa học bạn đang quan tâm
                </span>
                <span className="text-xs text-amber-200">
                  Lớp {preselectedCourse.grade} • Môn {preselectedCourse.subject}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-white">
                {preselectedCourse.title}
              </h3>
              <p className="text-xs text-slate-300">
                Phụ trách: <strong>{preselectedCourse.teacher}</strong> • Lịch học: {preselectedCourse.schedule}
              </p>
            </div>

            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <a
                href={`https://zalo.me/0985972525?text=${encodeURIComponent(
                  `Chào trung tâm, tôi là phụ huynh muốn được tư vấn cụ thể về lớp: ${preselectedCourse.title} (Lớp ${preselectedCourse.grade} - Môn ${preselectedCourse.subject})`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat Zalo Với Trung Tâm</span>
              </a>
              {onClearPreselectedCourse && (
                <button
                  onClick={onClearPreselectedCourse}
                  className="px-3 py-2 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
                  title="Xóa lựa chọn"
                >
                  Bỏ chọn
                </button>
              )}
            </div>
          </div>
        )}

        {/* Primary Direct Channels Grid (4 Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {/* Channel 1: Zalo Thầy Hoàng */}
          <div
            id="card-zalo-thay-hoang"
            className="bg-white/10 hover:bg-white/[0.14] border border-emerald-400/30 rounded-3xl p-6 backdrop-blur-md flex flex-col justify-between space-y-5 transition-all duration-200 shadow-lg group"
          >
            <div className="space-y-3.5">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300 group-hover:scale-105 transition-transform">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold bg-emerald-500/30 text-emerald-200 border border-emerald-400/40 px-2.5 py-0.5 rounded-full">
                  Phản hồi ngay
                </span>
              </div>

              <div>
                <h3 className="text-lg font-black text-white">
                  Chat Zalo Với Trung Tâm
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  Kênh trao đổi học vụ nhanh nhất, trung tâm trực tiếp hỗ trợ, giải đáp và tư vấn cho phụ huynh từ 7h00 đến 22h00.
                </p>
              </div>

              <div className="bg-slate-900/60 rounded-xl p-3 border border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Số Zalo Trung Tâm</span>
                  <span className="text-base font-extrabold text-emerald-300">0985.972.525</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopyPhone('0985972525')}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
                  title="Sao chép số"
                >
                  {copiedPhone === '0985972525' ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <a
                href="https://zalo.me/0985972525"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat Zalo Với Trung Tâm</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a
                href="tel:0985972525"
                className="w-full py-2 px-3 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-1.5"
              >
                <PhoneCall className="w-3.5 h-3.5 text-emerald-300" />
                <span>Bấm Gọi Trung Tâm</span>
              </a>
            </div>
          </div>

          {/* Channel 2: Facebook Fanpage */}
          <div
            id="card-facebook-fanpage"
            className="bg-white/10 hover:bg-white/[0.14] border border-blue-400/30 rounded-3xl p-6 backdrop-blur-md flex flex-col justify-between space-y-5 transition-all duration-200 shadow-lg group"
          >
            <div className="space-y-3.5">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/20 border border-blue-400/40 flex items-center justify-center text-blue-300 group-hover:scale-105 transition-transform">
                  <Facebook className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold bg-blue-500/30 text-blue-200 border border-blue-400/40 px-2.5 py-0.5 rounded-full">
                  Chính thức
                </span>
              </div>

              <div>
                <h3 className="text-lg font-black text-white">
                  Fanpage Facebook
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  Trang thông tin chính thức của Cơ sở Thầy Hoàng - Vạn Phú. Cập nhật lịch thi, đề thi và hình ảnh lớp học.
                </p>
              </div>

              <div className="bg-slate-900/60 rounded-xl p-3 border border-white/10">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Trang Facebook</span>
                <span className="text-xs font-bold text-blue-300 truncate block">
                  Cơ sở giáo dục Thầy Hoàng - Vạn Phú
                </span>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <a
                href="https://www.facebook.com/share/1DErVey6i8/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Facebook className="w-4 h-4" />
                <span>Mở Facebook & Nhắn Tin</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://www.facebook.com/share/1DErVey6i8/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 px-3 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-1.5"
              >
                <span>Xem Bài Viết & Đề Ôn Mới</span>
              </a>
            </div>
          </div>

          {/* Channel 3: Hotline Tuyển Sinh 2 */}
          <div
            id="card-hotline-2"
            className="bg-white/10 hover:bg-white/[0.14] border border-amber-400/30 rounded-3xl p-6 backdrop-blur-md flex flex-col justify-between space-y-5 transition-all duration-200 shadow-lg group"
          >
            <div className="space-y-3.5">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 group-hover:scale-105 transition-transform">
                  <Phone className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold bg-amber-500/30 text-amber-200 border border-amber-400/40 px-2.5 py-0.5 rounded-full">
                  Hotline 2
                </span>
              </div>

              <div>
                <h3 className="text-lg font-black text-white">
                  Hotline Tuyển Sinh
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  Đường dây nóng hỗ trợ phụ huynh hỏi lịch học, tư vấn môn học và tiếp nhận phản hồi học vụ.
                </p>
              </div>

              <div className="bg-slate-900/60 rounded-xl p-3 border border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Hotline Tư Vấn</span>
                  <span className="text-base font-extrabold text-amber-300">0869.210.288</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopyPhone('0869210288')}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
                  title="Sao chép số"
                >
                  {copiedPhone === '0869210288' ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <a
                href="tel:0869210288"
                className="w-full py-3 px-4 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <PhoneCall className="w-4 h-4 text-slate-950" />
                <span>Bấm Gọi 0869.210.288</span>
              </a>
              <div className="text-center text-[11px] text-slate-300 py-1 flex items-center justify-center gap-1">
                <Clock className="w-3 h-3 text-amber-300" />
                <span>Hỗ trợ từ 07:00 - 22:00 hàng ngày</span>
              </div>
            </div>
          </div>

          {/* Channel 4: Trực Tiếp Tại Cơ Sở */}
          <div
            id="card-co-so-van-phu"
            className="bg-white/10 hover:bg-white/[0.14] border border-red-400/30 rounded-3xl p-6 backdrop-blur-md flex flex-col justify-between space-y-5 transition-all duration-200 shadow-lg group"
          >
            <div className="space-y-3.5">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-red-500/20 border border-red-400/40 flex items-center justify-center text-red-300 group-hover:scale-105 transition-transform">
                  <MapPin className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold bg-red-500/30 text-red-200 border border-red-400/40 px-2.5 py-0.5 rounded-full">
                  Trực tiếp
                </span>
              </div>

              <div>
                <h3 className="text-lg font-black text-white">
                  Cơ Sở Tại Vạn Phú
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  Quý phụ huynh có thể đến trực tiếp cơ sở để xem phòng học, trao đổi trực tiếp với Thầy Hoàng.
                </p>
              </div>

              <div className="bg-slate-900/60 rounded-xl p-3 border border-white/10 space-y-1">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Địa chỉ</span>
                <span className="text-xs font-bold text-white block">
                  Khu Đô Thị Vạn Phú - Vạn Phú - Thái Nguyên
                </span>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  'Khu Đô Thị Vạn Phú, Vạn Phú, Thái Nguyên'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-bold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <MapPin className="w-4 h-4" />
                <span>Mở Bản Đồ Chỉ Đường</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <div className="text-center text-[11px] text-slate-300 py-1 flex items-center justify-center gap-1">
                <Clock className="w-3 h-3 text-red-300" />
                <span>Tiếp đón trực tiếp: 7h00 - 18h00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
