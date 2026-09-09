import React, { useState } from 'react';
import { GradeLevel, Subject } from '../types';
import { BookOpen, Sparkles, MessageCircle, ExternalLink, Target, ArrowRight } from 'lucide-react';

interface GradeSubjectInfo {
  grade: GradeLevel;
  gradeLabel: string;
  levelGroup: 'THCS' | 'THPT';
  mainTarget: string;
  subjects: {
    name: Subject;
    focus: string;
    tag?: string;
  }[];
  suitableFor: string;
  schedulePattern: string;
  classSize: string;
  highlightNote: string;
}

const GRADE_SUBJECT_DATA: GradeSubjectInfo[] = [
  {
    grade: '6',
    gradeLabel: 'Lớp 6',
    levelGroup: 'THCS',
    mainTarget: 'Chuyển cấp vững vàng, làm quen chương trình mới GDPT 2018',
    subjects: [
      { name: 'Toán', focus: 'Số học, hình học trực quan, rèn tư duy tính toán nhanh' },
      { name: 'Văn', focus: 'Đọc hiểu văn bản, kỹ năng viết đoạn văn & cảm thụ' },
      { name: 'Anh', focus: 'Ngữ pháp căn bản, từ vựng theo SGK mới, phát âm chuẩn' },
      { name: 'Sinh', focus: 'KHTN phần Sinh học, quan sát thế giới sống & phương pháp khoa học' },
    ],
    suitableFor: 'Học sinh lớp 5 lên lớp 6, bỡ ngỡ với cách học THCS hoặc hổng kiến thức tiểu học.',
    schedulePattern: '2 buổi / tuần / môn (Ca chiều: 17:00 - 19:00 hoặc T7 - CN)',
    classSize: '15 - 20 học sinh / lớp (Phân nhóm kèm sát)',
    highlightNote: 'Rèn nền nếp tự học, không để hổng kiến thức ngay từ đầu cấp 2.',
  },
  {
    grade: '7',
    gradeLabel: 'Lớp 7',
    levelGroup: 'THCS',
    mainTarget: 'Củng cố nền tảng, làm chủ các dạng toán đại số & hình học chứng minh',
    subjects: [
      { name: 'Toán', focus: 'Số thực, biểu thức đại số, hình học tam giác bằng nhau' },
      { name: 'Lí', focus: 'KHTN phần Vật lí (Tốc độ, âm thanh, ánh sáng)', tag: 'KHTN' },
      { name: 'Văn', focus: 'Nghị luận xã hội, văn bản thông tin, thực hành tiếng Việt' },
      { name: 'Anh', focus: 'Mở rộng thì ngữ pháp, rèn phản xạ giao tiếp & từ vựng chủ điểm' },
      { name: 'Sinh', focus: 'KHTN phần Sinh thái & trao đổi chất ở sinh vật', tag: 'KHTN' },
    ],
    suitableFor: 'Học sinh cần bồi dưỡng kiến thức trọng tâm, học sinh đuối hình học hoặc tiếng Anh.',
    schedulePattern: '2 buổi / tuần / môn (Ca 17:30 - 19:30 hoặc 19:30 - 21:30)',
    classSize: '15 - 20 học sinh / lớp',
    highlightNote: 'Xây dựng phương pháp tư duy logic và kỹ năng trình bày bài thi tự luận chuẩn xác.',
  },
  {
    grade: '8',
    gradeLabel: 'Lớp 8',
    levelGroup: 'THCS',
    mainTarget: 'Bứt phá kiến thức then chốt, tiếp cận môn Hóa học từ số 0',
    subjects: [
      { name: 'Toán', focus: 'Hằng đẳng thức, phân thức đại số, định lý Ta-lét, tứ giác' },
      { name: 'Lí', focus: 'KHTN cơ học, áp suất, lực đẩy Ác-si-mét, quang học', tag: 'Trọng tâm' },
      { name: 'Hoá', focus: 'Nguyên tử, hóa trị, phương trình hóa học, giải bài toán mol từ gốc', tag: 'Môn mới' },
      { name: 'Anh', focus: 'Ngữ pháp nâng cao, mệnh đề quan hệ, kỹ năng đọc hiểu chuyên sâu' },
      { name: 'Văn', focus: 'Văn nghị luận văn học, phân tích tác phẩm & viết bài hoàn chỉnh' },
      { name: 'Sinh', focus: 'KHTN giải phẫu cơ thể người & hệ cơ quan', tag: 'KHTN' },
    ],
    suitableFor: 'Học sinh sợ môn Hóa học mới bắt đầu, học sinh chuẩn bị tâm thế thi vào 10 sớm.',
    schedulePattern: '2 - 3 buổi / tuần / môn (Linh hoạt theo thời khóa biểu trường)',
    classSize: '15 - 20 học sinh / lớp',
    highlightNote: 'Cam kết lấy lại gốc môn Hóa chỉ sau 4 - 6 tuần, học sinh hiểu bản chất không học vẹt.',
  },
  {
    grade: '9',
    gradeLabel: 'Lớp 9',
    levelGroup: 'THCS',
    mainTarget: 'Luyện thi cấp tốc vào lớp 10 THPT công lập & lớp Chuyên Thái Nguyên',
    subjects: [
      { name: 'Toán', focus: 'Căn thức, hàm số bậc nhất/bậc hai, hệ thức Vi-ét, đường tròn, chuyên đề phân loại 9+', tag: 'Thi vào 10' },
      { name: 'Văn', focus: 'Phân tích trọn bộ tác phẩm lớp 9, kỹ năng viết đoạn NLXH 200 chữ, đề thi thử', tag: 'Thi vào 10' },
      { name: 'Anh', focus: 'Tổng ôn 12 chuyên đề ngữ pháp trọng tâm, giải đề thi vào 10 các năm', tag: 'Thi vào 10' },
      { name: 'Lí', focus: 'Điện học, quang học, bài toán mạch hỗn hợp & ôn thi chuyên Lí', tag: 'Thi chuyên/KHTN' },
      { name: 'Hoá', focus: 'Vô cơ & hữu cơ, chuỗi biến hóa, kim loại, phi kim & ôn thi chuyên Hóa', tag: 'Thi chuyên/KHTN' },
      { name: 'Sinh', focus: 'Di truyền & biến dị, bài tập ADN, quy luật Men-đen & ôn thi chuyên Sinh', tag: 'Thi chuyên/KHTN' },
    ],
    suitableFor: 'Tất cả học sinh lớp 9: Cần lấy gốc chống liệt hoặc đặt mục tiêu đỗ trường THPT tốp đầu.',
    schedulePattern: '2 - 3 buổi / tuần (Có ca tăng cường giải đề thi thử thứ 7 & Chủ Nhật)',
    classSize: '15 - 20 học sinh / lớp (Phân lớp theo nguyện vọng trường thi)',
    highlightNote: 'Khảo sát định kỳ 2 tuần/lần với cấu trúc đề chuẩn Sở GD&ĐT Thái Nguyên, kèm 1-1 cho học sinh yếu.',
  },
  {
    grade: '10',
    gradeLabel: 'Lớp 10',
    levelGroup: 'THPT',
    mainTarget: 'Thích nghi chương trình THPT mới GDPT 2018, định hướng khối ngành Đại học',
    subjects: [
      { name: 'Toán', focus: 'Mệnh đề, tập hợp, bất phương trình bậc 2, vectơ, tọa độ Oxy' },
      { name: 'Lí', focus: 'Động học, động lực học chất điểm, năng lượng & công cơ học' },
      { name: 'Hoá', focus: 'Cấu tạo nguyên tử, bảng tuần hoàn, liên kết hóa học, phản ứng oxi hóa - khử' },
      { name: 'Anh', focus: 'Từ vựng B1 - B2, ngữ pháp học thuật, định hướng IELTS / tốt nghiệp THPT' },
      { name: 'Văn', focus: 'Thể loại văn học (Thần thoại, sử thi, thơ trữ tình, nghị luận)' },
      { name: 'Sinh', focus: 'Sinh học tế bào, phân tử sinh học, chu kỳ tế bào & phân bào' },
    ],
    suitableFor: 'Học sinh lớp 10 mới vào trường cấp 3, choáng ngợp với lượng kiến thức sâu rộng.',
    schedulePattern: '2 buổi / tuần / môn (Ca tối: 18:30 - 20:30 hoặc 19:30 - 21:30)',
    classSize: '15 - 20 học sinh / lớp',
    highlightNote: 'Giúp học sinh định hình sớm tổ hợp xét tuyển Đại học (A00, A01, B00, D01, D07).',
  },
  {
    grade: '11',
    gradeLabel: 'Lớp 11',
    levelGroup: 'THPT',
    mainTarget: 'Tăng tốc kiến thức cốt lõi (chiếm 30 - 40% đề thi THPT QG), rèn phản xạ trắc nghiệm',
    subjects: [
      { name: 'Toán', focus: 'Lượng giác, dãy số, cấp số cộng/nhân, đạo hàm, hình học không gian (quan hệ song song, vuông góc)' },
      { name: 'Lí', focus: 'Dao động cơ, sóng cơ, điện trường, dòng điện không đổi & từ trường' },
      { name: 'Hoá', focus: 'Hóa học hữu cơ (Hydrocarbon, dẫn xuất halogen, alcohol, phenol, aldehyde)' },
      { name: 'Anh', focus: 'Chuyên đề từ vựng nâng cao, đọc hiểu dài, rèn kỹ năng điền từ & sửa lỗi sai' },
      { name: 'Văn', focus: 'Văn học hiện thực & lãng mạn, kỹ năng phân tích so sánh văn học' },
      { name: 'Sinh', focus: 'Sinh học cơ thể thực vật & động vật (Tuần hoàn, hô hấp, bài tiết)' },
    ],
    suitableFor: 'Học sinh lớp 11 muốn tích lũy kiến thức sớm, không để dồn ứ áp lực sang năm lớp 12.',
    schedulePattern: '2 buổi / tuần / môn (Bố trí tránh trùng lịch học chính khóa)',
    classSize: '15 - 20 học sinh / lớp',
    highlightNote: 'Bắt đầu làm quen câu hỏi dạng trắc nghiệm đúng/sai và trả lời ngắn theo định dạng đề mới.',
  },
  {
    grade: '12',
    gradeLabel: 'Lớp 12',
    levelGroup: 'THPT',
    mainTarget: 'Tổng ôn toàn diện, luyện đề thực chiến Tốt nghiệp THPT & Đánh giá năng lực Đại học',
    subjects: [
      { name: 'Toán', focus: 'Ứng dụng đạo hàm khảo sát đồ thị hàm số, tích phân, số phức, hình học Oxyz, xác suất', tag: 'Luyện thi ĐH' },
      { name: 'Lí', focus: 'Tổng ôn Dao động cơ, Sóng cơ, Điện xoay chiều, Sóng ánh sáng, Vật lí hạt nhân', tag: 'Luyện thi ĐH' },
      { name: 'Hoá', focus: 'Este - Lipit, Cacbohidrat, Amin - Amino axit - Peptit, Polime, Hóa vô cơ tổng hợp', tag: 'Luyện thi ĐH' },
      { name: 'Anh', focus: 'Rèn tốc độ giải đề, bẫy ngữ pháp, phương pháp suy luận đọc hiểu đạt 8+ 9+', tag: 'Luyện thi ĐH' },
      { name: 'Văn', focus: 'Tổng ôn trọn bộ tác phẩm trọng tâm, cấu trúc bài viết điểm cao, rèn văn phong sâu sắc', tag: 'Luyện thi ĐH' },
      { name: 'Sinh', focus: 'Di truyền học quần thể, tiến hóa, sinh thái học & bài tập phả hệ điểm 9 - 10', tag: 'Luyện thi ĐH' },
    ],
    suitableFor: 'Toàn bộ học sinh lớp 12: Đặt mục tiêu đỗ nguyện vọng 1 Đại học tốp đầu (Bách Khoa, Kinh Tế, Y Dược, Ngoại Thương...).',
    schedulePattern: '2 - 3 buổi / tuần (Có phòng học tự học mở cửa hàng ngày cho học sinh)',
    classSize: '15 - 20 học sinh / lớp (Chia lớp theo mục tiêu điểm 7+, 8+, 9+)',
    highlightNote: 'Thi thử định kỳ hàng tháng trên giấy thi chuẩn, giáo viên sửa chi tiết từng lỗi sai nhỏ nhất.',
  },
];

interface GradeSubjectTableProps {
  selectedGrade?: GradeLevel | 'all';
  onSelectGrade?: (grade: GradeLevel | 'all') => void;
}

export const GradeSubjectTable: React.FC<GradeSubjectTableProps> = ({
  selectedGrade = 'all',
  onSelectGrade,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'thcs' | 'thpt' | GradeLevel>(
    selectedGrade !== 'all' ? selectedGrade : 'all'
  );

  const filterGrades = () => {
    if (activeTab === 'thcs') {
      return GRADE_SUBJECT_DATA.filter((g) => g.levelGroup === 'THCS');
    }
    if (activeTab === 'thpt') {
      return GRADE_SUBJECT_DATA.filter((g) => g.levelGroup === 'THPT');
    }
    if (activeTab !== 'all') {
      return GRADE_SUBJECT_DATA.filter((g) => g.grade === activeTab);
    }
    return GRADE_SUBJECT_DATA;
  };

  const currentList = filterGrades();

  const handleTabChange = (tab: 'all' | 'thcs' | 'thpt' | GradeLevel) => {
    setActiveTab(tab);
    if (onSelectGrade) {
      if (tab === 'thcs' || tab === 'thpt' || tab === 'all') {
        onSelectGrade('all');
      } else {
        onSelectGrade(tab);
      }
    }
  };

  const getSubjectBadgeColor = (sub: Subject) => {
    switch (sub) {
      case 'Toán':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Lí':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'Hoá':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Anh':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Văn':
        return 'bg-rose-100 text-rose-800 border-rose-200';
      case 'Sinh':
        return 'bg-teal-100 text-teal-800 border-teal-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  return (
    <section id="bang-mon-hoc" className="py-12 sm:py-16 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-900 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold tracking-wide">
            <BookOpen className="w-4 h-4 text-blue-700" />
            <span>HỆ THỐNG ĐÀO TẠO TỪ LỚP 6 ĐẾN LỚP 12</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-blue-950 tracking-tight">
            Bảng Khối Lớp & Các Môn Bồi Dưỡng Văn Hóa
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Cơ sở bồi dưỡng chuyên sâu 6 môn trọng điểm:{' '}
            <strong className="text-blue-950 font-bold">Toán — Lí — Hoá — Anh — Văn — Sinh</strong>.
            Sĩ số giới hạn, phân loại lớp theo đúng học lực từng em để đảm bảo sự tiến bộ rõ rệt nhất.
          </p>
        </div>

        {/* Quick Filter Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          <button
            onClick={() => handleTabChange('all')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'all'
                ? 'bg-blue-900 text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            Tất Cả Khối Lớp (Lớp 6 - 12)
          </button>

          <button
            onClick={() => handleTabChange('thcs')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'thcs'
                ? 'bg-blue-900 text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            Khối THCS (Lớp 6 - 9)
          </button>

          <button
            onClick={() => handleTabChange('thpt')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'thpt'
                ? 'bg-blue-900 text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            Khối THPT (Lớp 10 - 12)
          </button>

          <div className="h-5 w-[1px] bg-slate-300 mx-1 hidden sm:block" />

          {/* Quick grade buttons */}
          {(['6', '7', '8', '9', '10', '11', '12'] as GradeLevel[]).map((grade) => (
            <button
              key={grade}
              onClick={() => handleTabChange(grade)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === grade
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:text-blue-900 hover:bg-blue-50 border border-slate-200'
              }`}
            >
              Lớp {grade}
            </button>
          ))}
        </div>

        {/* Master Table View (Desktop & Tablet) */}
        <div className="hidden lg:block bg-white rounded-2xl shadow-sm border border-slate-200/90 overflow-hidden mb-8">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900 text-white text-xs font-bold uppercase tracking-wider">
                <th className="py-3.5 px-4 w-28 text-center">Khối Lớp</th>
                <th className="py-3.5 px-4 w-48">Môn Giảng Dạy</th>
                <th className="py-3.5 px-5">Chương Trình & Mục Tiêu Trọng Tâm</th>
                <th className="py-3.5 px-4 w-52 text-center">Tư Vấn & Xếp Lớp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {currentList.map((item) => (
                <tr
                  key={item.grade}
                  className="hover:bg-blue-50/40 transition-colors"
                >
                  {/* Grade Badge */}
                  <td className="py-4 px-4 text-center align-top">
                    <div className="inline-flex flex-col items-center">
                      <span className="w-14 h-14 rounded-2xl bg-blue-950 text-white font-black text-lg flex items-center justify-center shadow-md">
                        Lớp {item.grade}
                      </span>
                      <span className="text-[11px] font-bold text-slate-500 mt-1.5 uppercase">
                        {item.levelGroup}
                      </span>
                    </div>
                  </td>

                  {/* Subjects Offered */}
                  <td className="py-4 px-4 align-top">
                    <div className="flex flex-wrap gap-1.5">
                      {item.subjects.map((sub, idx) => (
                        <span
                          key={idx}
                          className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold border ${getSubjectBadgeColor(
                            sub.name
                          )}`}
                        >
                          {sub.name}
                        </span>
                      ))}
                    </div>
                  </td>

                  {/* Program Focus & Highlight */}
                  <td className="py-4 px-5 align-top">
                    <div className="font-bold text-blue-950 text-sm mb-1.5 flex items-center gap-1.5">
                      <Target className="w-4 h-4 text-red-600 flex-shrink-0" />
                      <span>{item.mainTarget}</span>
                    </div>
                    <ul className="space-y-1 text-xs text-slate-600 mt-2">
                      {item.subjects.map((sub, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="font-bold text-slate-800 flex-shrink-0">
                            • {sub.name}:
                          </span>
                          <span>{sub.focus}</span>
                          {sub.tag && (
                            <span className="text-[10px] font-bold px-1.5 py-0.2 bg-red-100 text-red-700 rounded ml-1">
                              {sub.tag}
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </td>

                  {/* Actions: Tư Vấn & Xếp Lớp -> Fanpage */}
                  <td className="py-4 px-4 align-top text-center">
                    <div className="space-y-2">
                      <a
                        href="https://www.facebook.com/share/1DErVey6i8/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 w-full px-3.5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all transform hover:-translate-y-0.5 cursor-pointer"
                        title="Tư Vấn & Xếp Lớp sang Fanpage Facebook"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                        <span>Tư Vấn & Xếp Lớp</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>

                      <a
                        href="https://zalo.me/0985972525"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1 w-full px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold text-xs rounded-xl transition-colors"
                      >
                        <MessageCircle className="w-3 h-3 text-emerald-600" />
                        <span>Chat Zalo</span>
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Responsive Mobile / Card Layout (Mobile & Tablet) */}
        <div className="lg:hidden space-y-4 mb-8">
          {currentList.map((item) => (
            <div
              key={item.grade}
              className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/90 space-y-4"
            >
              {/* Card Header: Grade + Level + Subjects */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-blue-950 text-white font-black text-lg flex items-center justify-center shadow">
                    Lớp {item.grade}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-red-600 uppercase tracking-wider block">
                      Khối {item.levelGroup}
                    </span>
                    <h3 className="font-extrabold text-blue-950 text-sm sm:text-base leading-tight">
                      {item.mainTarget}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Subjects tags */}
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                  Các môn giảng dạy:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {item.subjects.map((sub, idx) => (
                    <span
                      key={idx}
                      className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-bold border ${getSubjectBadgeColor(
                        sub.name
                      )}`}
                    >
                      {sub.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key breakdown */}
              <div className="space-y-1.5 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                {item.subjects.map((sub, idx) => (
                  <div key={idx} className="flex items-start gap-1">
                    <span className="font-bold text-slate-800 flex-shrink-0">• {sub.name}:</span>
                    <span>{sub.focus}</span>
                  </div>
                ))}
              </div>

              {/* Buttons: Tư Vấn & Xếp Lớp */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                <a
                  href="https://www.facebook.com/share/1DErVey6i8/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1 py-2.5 px-3 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow transition-colors cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>Tư Vấn & Xếp Lớp</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <a
                  href="https://zalo.me/0985972525"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1 py-2.5 px-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold text-xs rounded-xl transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Chat Zalo</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Consultation Callout strip below table */}
        <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-950 rounded-2xl p-5 sm:p-6 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-base sm:text-lg font-bold text-amber-300 flex items-center justify-center sm:justify-start gap-2">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Phụ Huynh Muốn Xếp Lịch Riêng Hoặc Học Kèm Nhóm?</span>
            </h4>
            <p className="text-xs sm:text-sm text-slate-300">
              Cơ sở nhận học sinh liên tục trong năm. Bấm vào nút bên cạnh để gửi yêu cầu xếp lớp trực tiếp sang Fanpage cơ sở.
            </p>
          </div>

          <a
            href="https://www.facebook.com/share/1DErVey6i8/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 px-5 py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>Tư Vấn & Xếp Lớp Trên Fanpage</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};
