import React from 'react';
import { MapPin, Phone, MessageCircle, Facebook, Clock, Navigation, CheckCircle2 } from 'lucide-react';
import { Logo } from './Logo';

export const ContactMapSection: React.FC<{ onOpenConsultation: () => void }> = ({ onOpenConsultation }) => {
  return (
    <section id="lien-he" className="py-14 lg:py-20 bg-white border-b border-slate-200/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 bg-blue-100 border border-blue-200 text-blue-950 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5 text-blue-800" />
            <span>Địa Chỉ & Kết Nối Trực Tiếp</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
            Liên Hệ Cơ Sở Giáo Dục Thầy Hoàng - Vạn Phú
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Chúng tôi luôn sẵn sàng đón tiếp quý phụ huynh và các em học sinh đến tham quan cơ sở vật chất, trao đổi về tình hình học tập và nhận tư vấn định hướng.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Details Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-blue-950 text-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-xl">
            <div className="space-y-6">
              <Logo size="md" showText={true} />

              <div className="space-y-4 pt-2 border-t border-white/10 text-xs sm:text-sm">
                {/* Address */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-600/30 border border-blue-400/30 flex items-center justify-center flex-shrink-0 text-amber-400">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[11px] uppercase tracking-wider text-slate-400 font-bold">
                      Địa chỉ cơ sở:
                    </span>
                    <span className="font-extrabold text-white text-sm sm:text-base leading-snug">
                      Khu Đô Thị Vạn Phú - Vạn Phú - Thái Nguyên
                    </span>
                    <span className="block text-slate-300 text-xs mt-0.5">
                      (Vị trí trung tâm, đường rộng, phụ huynh đưa đón xe ô tô và xe máy thuận tiện)
                    </span>
                  </div>
                </div>

                {/* Hotlines */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-red-600/30 border border-red-400/30 flex items-center justify-center flex-shrink-0 text-red-400">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[11px] uppercase tracking-wider text-slate-400 font-bold">
                      Số điện thoại Hotline:
                    </span>
                    <div className="flex items-center gap-3 pt-0.5 flex-wrap">
                      <a
                        href="tel:0985972525"
                        className="text-amber-300 hover:text-amber-200 font-black text-base underline"
                      >
                        0985.972.525
                      </a>
                      <span className="text-slate-400">-</span>
                      <a
                        href="tel:0869210288"
                        className="text-amber-300 hover:text-amber-200 font-black text-base underline"
                      >
                        0869.210.288
                      </a>
                    </div>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-600/30 border border-emerald-400/30 flex items-center justify-center flex-shrink-0 text-emerald-400">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div className="space-y-1.5">
                    <div>
                      <span className="block text-[11px] uppercase tracking-wider text-slate-400 font-bold">
                        Thời gian tiếp đón trực tiếp:
                      </span>
                      <span className="font-bold text-white">07:00 - 18:00</span>
                      <span className="text-slate-300 text-xs"> (Tất cả các ngày trong tuần)</span>
                    </div>
                    <div className="pt-1.5 border-t border-white/10">
                      <span className="block text-[11px] uppercase tracking-wider text-slate-400 font-bold">
                        Thời gian hỗ trợ tư vấn (Hotline / Zalo):
                      </span>
                      <span className="font-bold text-emerald-300">07:00 - 22:00</span>
                      <span className="text-slate-300 text-xs"> (Phản hồi nhanh)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Action Links: Facebook & Zalo */}
            <div className="space-y-3 pt-4 border-t border-white/10">
              <a
                href="https://www.facebook.com/share/1DErVey6i8/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors shadow-md"
              >
                <Facebook className="w-4 h-4" />
                <span>Xem Fanpage Facebook Cơ Sở</span>
              </a>

              <a
                href="https://zalo.me/0985972525"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat Zalo Với Trung Tâm (0985.972.525)</span>
              </a>

              <a
                href="https://maps.google.com/?q=Khu+Đô+Thị+Vạn+Phú+Vạn+Phú+Thái+Nguyên"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <Navigation className="w-3.5 h-3.5 text-amber-300" />
                <span>Mở Chỉ Đường Trên Google Maps</span>
              </a>
            </div>
          </div>

          {/* Right Map Visual Display */}
          <div className="lg:col-span-7 bg-slate-50 rounded-3xl border border-slate-200 overflow-hidden flex flex-col justify-between shadow-sm">
            {/* Interactive map view container */}
            <div className="relative w-full h-[340px] sm:h-[400px] bg-slate-200">
              <iframe
                title="Bản đồ Khu Đô Thị Vạn Phú Thái Nguyên"
                src="https://maps.google.com/maps?q=Khu+%C4%90%C3%B4+Th%E1%BB%8B+V%E1%BA%A1n+Ph%C3%BA+Th%C3%A1i+Nguy%C3%AAn&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-md border border-slate-200 text-xs font-bold text-slate-800 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
                <span>Cơ sở giáo dục Thầy Hoàng - Vạn Phú</span>
              </div>
            </div>

            {/* Instruction bar below map */}
            <div className="p-5 sm:p-6 bg-white border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
              <div className="space-y-1 text-center sm:text-left">
                <p className="font-bold text-slate-900">
                  Phụ huynh có thể đưa con đến kiểm tra trình độ & nhận tài liệu trực tiếp
                </p>
                <p>
                  Vui lòng liên hệ trước qua điện thoại để Thầy Hoàng chuẩn bị đề khảo sát phù hợp với khối lớp của con.
                </p>
              </div>
              <button
                onClick={onOpenConsultation}
                className="flex-shrink-0 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-colors shadow-sm cursor-pointer"
              >
                Hẹn Lịch Ngay
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
