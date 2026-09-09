import React from 'react';
import { ShieldCheck, MessageSquare, School, Sparkles, PhoneCall } from 'lucide-react';

export const WhyChooseUs: React.FC<{ onOpenConsultation: () => void }> = ({ onOpenConsultation }) => {
  const commitments = [
    {
      icon: MessageSquare,
      color: 'text-blue-600 bg-blue-50 border-blue-200',
      title: 'Báo Cáo Điểm Danh & Chuyên Cần Qua Zalo',
      desc: 'Ngay khi bắt đầu và kết thúc ca học, phụ huynh sẽ nhận được thông báo điểm danh qua Zalo. Kết quả kiểm tra định kỳ được gửi chi tiết hàng tháng giúp gia đình nắm rõ sự tiến bộ của con.'
    },
    {
      icon: ShieldCheck,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
      title: 'Khảo Sát Năng Lực & Xếp Lớp Chuẩn Xác',
      desc: 'Học sinh được giáo viên kiểm tra, khảo sát kỹ kiến thức hiện tại để xây dựng lộ trình học tập tối ưu và xếp vào lớp có trình độ tương đương, giúp con tự tin tiếp thu bài giảng.'
    },
    {
      icon: School,
      color: 'text-indigo-600 bg-indigo-50 border-indigo-200',
      title: 'Cơ Sở Vật Chất Đảm Bảo Tại KĐT Vạn Phú',
      desc: 'Tọa lạc tại Khu Đô Thị Vạn Phú - Vạn Phú - Thái Nguyên với không gian yên tĩnh, sạch sẽ; cơ sở vật chất khang trang, đồng bộ, luôn đảm bảo môi trường học tập lý tưởng nhất để các em học sinh tập trung và tiến bộ từng ngày.'
    },
    {
      icon: Sparkles,
      color: 'text-purple-600 bg-purple-50 border-purple-200',
      title: 'Thầy Cô Nhiệt Huyết, Phương Pháp Dễ Hiểu',
      desc: 'Đội ngũ giáo viên giỏi chuyên môn, phương pháp giảng dạy trực quan, biến những công thức khô khan thành bài toán gần gũi, truyền cảm hứng tự học và khơi dậy đam mê trong từng em.'
    }
  ];

  return (
    <section id="cam-ket" className="py-14 lg:py-20 bg-slate-50 border-b border-slate-200/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 bg-emerald-100 border border-emerald-200 text-emerald-950 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-800" />
            <span>Cam Kết Vàng Với Quý Phụ Huynh</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
            Vì Sao Hàng Trăm Phụ Huynh Tại Thái Nguyên Tin Tưởng Cơ Sở Thầy Hoàng?
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Chúng tôi hiểu nỗi lo lắng của cha mẹ khi con bước vào các giai đoạn chuyển cấp và thi cử. Cơ sở Thầy Hoàng cam kết đồng hành trách nhiệm và minh bạch đến cùng.
          </p>
        </div>

        {/* Commitments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {commitments.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition-all space-y-3.5 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center ${item.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-base sm:text-lg leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 bg-gradient-to-r from-blue-900 via-blue-950 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-black text-amber-300">
              Phụ Huynh Cần Tư Vấn Lộ Trình Học Cho Con?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Liên hệ trực tiếp ngay hôm nay để được trung tâm tư vấn lộ trình học tập, xếp lớp phù hợp và nhận bộ tài liệu ôn thi độc quyền.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <a
              href="https://www.facebook.com/share/1DErVey6i8/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-sm rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Tư Vấn & Xếp Lớp Ngay</span>
            </a>
            <a
              href="tel:0985972525"
              className="w-full sm:w-auto px-5 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-amber-400" />
              <span>Gọi 0985.972.525</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
