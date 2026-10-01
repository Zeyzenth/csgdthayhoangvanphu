import React, { useState, useMemo, useEffect } from 'react';
import {
  X,
  Users,
  School,
  CheckCircle2,
  Printer,
  ChevronRight,
  AlertCircle,
  Search,
  Filter,
  ArrowUpDown,
  BookOpen,
  Lock,
  KeyRound,
  ShieldCheck,
  ShieldAlert,
  Eye,
  EyeOff
} from 'lucide-react';
import { Student, GradeLevel } from '../types';
import {
  ACTIVE_CLASSES,
  STUDENTS_TOAN_12_CO_BAN,
  STUDENTS_TOAN_12_CB1,
  STUDENTS_TOAN_12_CB2,
  STUDENTS_TOAN_12_CB3,
  STUDENTS_TOAN_11_CB1,
  STUDENTS_TOAN_11_CB2,
  STUDENTS_TOAN_11_ALL,
  STUDENTS_TOAN_10_CB,
  sortStudentsByClassAndName
} from '../data/activeClassesData';

interface ClassRosterModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialClassId?: string | null;
  onOpenConsultationModal: (grade?: GradeLevel) => void;
}

// Hàm lấy chữ cái đầu tiên của Tên (Given name) theo chuẩn tiếng Việt để làm avatar tròn
function getStudentInitial(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (!parts.length) return 'H';
  const givenName = parts[parts.length - 1];
  return givenName.charAt(0).toUpperCase();
}

export const ClassRosterModal: React.FC<ClassRosterModalProps> = ({
  isOpen,
  onClose,
  initialClassId,
  onOpenConsultationModal,
}) => {
  // Chế độ xem: 'toan-12-cb' (hoặc các phân lớp cb1, cb2, cb3), 'toan-12-nc', 'toan-11-cb', 'cntt-active', 'toan-10-cb'
  const [selectedTab, setSelectedTab] = useState<string>('toan-12-cb1');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [schoolClassFilter, setSchoolClassFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'assignedClass' | 'schoolClass' | 'name'>('schoolClass');

  // Trạng thái bảo mật & khóa danh sách học sinh: yêu cầu mật khẩu mới xem được (mật khẩu đúng: THVP2026 - không có gợi ý mật khẩu)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('roster_auth_status') === 'authenticated';
    }
    return false;
  });
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [showPasswordText, setShowPasswordText] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<string>('');

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordInput.trim()) {
      setPasswordError('Vui lòng nhập mật khẩu để xem danh sách.');
      return;
    }
    if (passwordInput.trim() === 'THVP2026') {
      setIsAuthenticated(true);
      setPasswordError('');
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('roster_auth_status', 'authenticated');
      }
    } else {
      setPasswordError('Mật khẩu không chính xác. Vui lòng thử lại.');
      setPasswordInput('');
    }
  };

  const handleLock = () => {
    setIsAuthenticated(false);
    setPasswordInput('');
    setPasswordError('');
    setShowPasswordText(false);
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('roster_auth_status');
    }
  };

  // Reset form nhập mật khẩu khi đóng modal
  useEffect(() => {
    if (!isOpen) {
      setPasswordInput('');
      setPasswordError('');
      setShowPasswordText(false);
    }
  }, [isOpen]);

  // Đồng bộ initialClassId khi mở modal
  useEffect(() => {
    if (initialClassId) {
      if (initialClassId === 'toan-12-cb1' || initialClassId === 'cb1') {
        setSelectedTab('toan-12-cb1');
      } else if (initialClassId === 'toan-12-cb2' || initialClassId === 'cb2') {
        setSelectedTab('toan-12-cb2');
      } else if (initialClassId === 'toan-12-cb3' || initialClassId === 'cb3') {
        setSelectedTab('toan-12-cb3');
      } else if (initialClassId === 'toan-12-cb') {
        setSelectedTab('toan-12-cb1');
      } else if (initialClassId === 'toan-12-all' || initialClassId === 'all') {
        setSelectedTab('toan-12-cb-all');
      } else if (initialClassId === 'toan-11-cb' || initialClassId === 'toan-11' || initialClassId === 'toan-11-cb1') {
        setSelectedTab('toan-11-cb1');
      } else if (initialClassId === 'toan-11-cb2') {
        setSelectedTab('toan-11-cb2');
      } else {
        setSelectedTab(initialClassId);
      }
    } else {
      setSelectedTab('toan-12-cb1');
    }
  }, [initialClassId, isOpen]);

  // Reset tìm kiếm khi chuyển tab
  useEffect(() => {
    setSearchQuery('');
    setSchoolClassFilter('all');
  }, [selectedTab]);

  // Xác định danh sách học sinh theo tab đang chọn
  const { currentStudents, tabTitle, tabSubTitle, isClassFull, capacityText, noteText } = useMemo(() => {
    if (selectedTab === 'toan-12-cb1') {
      return {
        currentStudents: STUDENTS_TOAN_12_CB1,
        tabTitle: `BẢNG DANH SÁCH THÀNH VIÊN LỚP 1 (CB 1: ${STUDENTS_TOAN_12_CB1.length} HỌC SINH - GV: CÔ HƯỜNG)`,
        tabSubTitle: `Sĩ số: ${STUDENTS_TOAN_12_CB1.length} / ${STUDENTS_TOAN_12_CB1.length} học sinh (100% học sinh 12A9 - THPT Lưu Nhân Chú • GV: Cô Hường)`,
        isClassFull: true,
        capacityText: `Lớp 1: ${STUDENTS_TOAN_12_CB1.length} em • ĐÃ ĐẦY`,
        noteText: `Lớp 1 gồm ${STUDENTS_TOAN_12_CB1.length} học sinh lớp 12A9 THPT Lưu Nhân Chú do Cô Hường phụ trách đã chốt danh sách!`
      };
    }
    if (selectedTab === 'toan-12-cb2') {
      return {
        currentStudents: STUDENTS_TOAN_12_CB2,
        tabTitle: `BẢNG DANH SÁCH THÀNH VIÊN LỚP 2 (CB 2: ${STUDENTS_TOAN_12_CB2.length} HỌC SINH - GV: CÔ HÂN)`,
        tabSubTitle: `Sĩ số: ${STUDENTS_TOAN_12_CB2.length} / ${STUDENTS_TOAN_12_CB2.length} học sinh (Gồm 12A6: 19 em, 12A7: 2 em, THPT Đội Cấn: 2 em • GV: Cô Hân)`,
        isClassFull: true,
        capacityText: `Lớp 2: ${STUDENTS_TOAN_12_CB2.length} em • ĐÃ ĐẦY`,
        noteText: `Lớp 2 gồm ${STUDENTS_TOAN_12_CB2.length} học sinh (12A6: 19 em, 12A7: 2 em, THPT Đội Cấn: 2 em) do Cô Hân phụ trách đã đủ sĩ số đào tạo chất lượng cao!`
      };
    }
    if (selectedTab === 'toan-12-cb3') {
      return {
        currentStudents: STUDENTS_TOAN_12_CB3,
        tabTitle: `BẢNG DANH SÁCH THÀNH VIÊN LỚP 3 (CB 3: ${STUDENTS_TOAN_12_CB3.length} HỌC SINH - ĐÃ ĐẦY SĨ SỐ)`,
        tabSubTitle: `Sĩ số: ${STUDENTS_TOAN_12_CB3.length} / ${STUDENTS_TOAN_12_CB3.length} học sinh (Gồm 12A8: 22 em, 12A5: 2 em - THPT Lưu Nhân Chú)`,
        isClassFull: true,
        capacityText: `Lớp 3: ${STUDENTS_TOAN_12_CB3.length} em • ĐÃ ĐẦY`,
        noteText: `Lớp 3 gồm ${STUDENTS_TOAN_12_CB3.length} học sinh lớp 12A8 & 12A5 đã chốt danh sách. Đã đủ sĩ số đào tạo chất lượng cao!`
      };
    }
    if (selectedTab === 'toan-12-cb-all') {
      return {
        currentStudents: STUDENTS_TOAN_12_CO_BAN,
        tabTitle: `BẢNG DANH SÁCH TOÀN BỘ 3 PHÂN LỚP TOÁN 12 CƠ BẢN (${STUDENTS_TOAN_12_CO_BAN.length} HỌC SINH)`,
        tabSubTitle: `Tổng sĩ số: ${STUDENTS_TOAN_12_CO_BAN.length} / ${STUDENTS_TOAN_12_CO_BAN.length} học sinh (Chia làm 3 phân lớp CB1, CB2, CB3 - ĐÃ ĐẦY CẢ 3 LỚP)`,
        isClassFull: true,
        capacityText: `Tổng 3 lớp: ${STUDENTS_TOAN_12_CO_BAN.length} em • ĐÃ ĐẦY`,
        noteText: `Cả 3 phân lớp Toán 12 Cơ bản (CB1: ${STUDENTS_TOAN_12_CB1.length} em, CB2: ${STUDENTS_TOAN_12_CB2.length} em, CB3: ${STUDENTS_TOAN_12_CB3.length} em) đã đủ chỉ tiêu ${STUDENTS_TOAN_12_CO_BAN.length} học sinh. Đang mở đăng ký cho các lớp bổ sung!`
      };
    }
    if (selectedTab === 'toan-11-cb1') {
      return {
        currentStudents: STUDENTS_TOAN_11_CB1,
        tabTitle: 'BẢNG DANH SÁCH THÀNH VIÊN LỚP TOÁN 11 - CƠ BẢN 1 (19 HỌC SINH)',
        tabSubTitle: 'Sĩ số: 19 / 19 học sinh • GV: Cô Vũ Hằng (THPT Lưu Nhân Chú)',
        isClassFull: false,
        capacityText: 'Lớp 1: 19 em • Đang mở',
        noteText: 'Lớp Toán 11 Cơ Bản 1 (GV: Cô Vũ Hằng) bám sát chương trình GDPT mới, củng cố Lượng giác, Cấp số cộng/nhân, Giới hạn và Hình học không gian.'
      };
    }
    if (selectedTab === 'toan-11-cb2') {
      return {
        currentStudents: STUDENTS_TOAN_11_CB2,
        tabTitle: 'BẢNG DANH SÁCH THÀNH VIÊN LỚP TOÁN 11 - CƠ BẢN 2 (GV: CÔ VŨ HẰNG)',
        tabSubTitle: `Sĩ số: ${STUDENTS_TOAN_11_CB2.length} học sinh • GV: Cô Vũ Hằng (100% THPT Lưu Nhân Chú)`,
        isClassFull: false,
        capacityText: `Lớp 2: ${STUDENTS_TOAN_11_CB2.length} em • Đang mở`,
        noteText: 'Lớp Toán 11 Cơ Bản 2 (GV: Cô Vũ Hằng) bám sát cấu trúc kiểm tra học kỳ, rèn luyện kỹ năng giải toán tư duy và nâng cao điểm số.'
      };
    }
    if (selectedTab === 'toan-11-cb' || selectedTab === 'toan-11-all') {
      return {
        currentStudents: STUDENTS_TOAN_11_ALL,
        tabTitle: `BẢNG DANH SÁCH TOÀN BỘ 2 PHÂN LỚP TOÁN 11 CƠ BẢN (${STUDENTS_TOAN_11_ALL.length} HỌC SINH)`,
        tabSubTitle: `Tổng sĩ số: ${STUDENTS_TOAN_11_ALL.length} học sinh (Gồm CB1: ${STUDENTS_TOAN_11_CB1.length} em & CB2: ${STUDENTS_TOAN_11_CB2.length} em • GV: Cô Vũ Hằng)`,
        isClassFull: false,
        capacityText: `Tổng 2 lớp: ${STUDENTS_TOAN_11_ALL.length} em • Đang mở`,
        noteText: `Tổng cộng ${STUDENTS_TOAN_11_ALL.length} học sinh đang theo học tại 2 phân lớp Toán 11 Cơ bản do Cô Vũ Hằng phụ trách. Lớp đang mở tiếp nhận học sinh mới.`
      };
    }
    if (selectedTab === 'toan-10-cb' || selectedTab === 'toan-10') {
      return {
        currentStudents: STUDENTS_TOAN_10_CB,
        tabTitle: `BẢNG DANH SÁCH THÀNH VIÊN LỚP TOÁN 10 - CƠ BẢN (${STUDENTS_TOAN_10_CB.length} HỌC SINH)`,
        tabSubTitle: `Sĩ số: ${STUDENTS_TOAN_10_CB.length} học sinh • GV: Thầy Hoàng & Tổ bộ môn Toán (THPT Lưu Nhân Chú)`,
        isClassFull: false,
        capacityText: `Lớp 10: ${STUDENTS_TOAN_10_CB.length} em • Đang mở`,
        noteText: 'Lớp Toán 10 Cơ Bản bám sát chương trình GDPT mới, củng cố kiến thức Đại số và Hình học 10. Lớp đang mở và tiếp tục nhận đăng ký bổ sung!'
      };
    }

    // Các lớp khác
    const found = ACTIVE_CLASSES.find((c) => c.id === selectedTab);
    return {
      currentStudents: found?.students || [],
      tabTitle: `BẢNG DANH SÁCH HỌC SINH ${found?.name?.toUpperCase() || ''}`,
      tabSubTitle: `Sĩ số: ${found?.studentCount || 0} học sinh • ${found?.statusLabel || 'Đang mở'}`,
      isClassFull: found?.isFull || false,
      capacityText: `${found?.studentCount || 0} em`,
      noteText: found?.note || 'Lớp học chất lượng cao tại Cơ sở Vạn Phú - Đại Từ - Thái Nguyên.'
    };
  }, [selectedTab]);

  // Danh sách các lớp trường có trong tập học sinh hiện tại
  const availableSchoolClasses = useMemo(() => {
    const set = new Set<string>();
    currentStudents.forEach((s) => {
      if (s.schoolClass) set.add(s.schoolClass);
    });
    return Array.from(set).sort();
  }, [currentStudents]);

  // Lọc và sắp xếp danh sách học sinh
  const filteredStudents = useMemo(() => {
    let list = [...currentStudents];

    // Lọc theo lớp trường
    if (schoolClassFilter !== 'all') {
      list = list.filter((s) => s.schoolClass === schoolClassFilter);
    }

    // Sắp xếp
    const sorted = sortStudentsByClassAndName(list, sortBy);

    // Lọc theo từ khóa tìm kiếm
    if (!searchQuery.trim()) return sorted;

    const q = searchQuery.toLowerCase().trim();
    return sorted.filter((s) => {
      const matchName = s.name.toLowerCase().includes(q);
      const matchClass = s.schoolClass?.toLowerCase().includes(q);
      const matchSchool = s.schoolName?.toLowerCase().includes(q);
      const matchAssigned = s.assignedClass?.toLowerCase().includes(q);
      return matchName || matchClass || matchSchool || matchAssigned;
    });
  }, [currentStudents, schoolClassFilter, sortBy, searchQuery]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-1 sm:p-4 bg-slate-950/85 backdrop-blur-sm animate-fadeIn">
      {/* Khung modal rộng rãi, hiển thị thật dài trên điện thoại và máy tính */}
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-5xl h-[98vh] sm:h-[94vh] flex flex-col overflow-hidden border border-slate-200">
        
        {/* ============================================================== */}
        {/* HEADER MODAL XANH NAVY ĐẬM (ĐÚNG NHƯ ẢNH MẪU) */}
        {/* ============================================================== */}
        <div className="bg-[#101736] text-white p-3.5 sm:p-5 flex-shrink-0 relative border-b border-slate-800">
          {/* Nút đóng tròn góc phải */}
          <button
            onClick={onClose}
            className="absolute top-3.5 right-3.5 text-slate-400 hover:text-white bg-white/10 hover:bg-white/20 w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer z-10"
            aria-label="Đóng"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Dòng huy hiệu phía trên tiêu đề */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2 pr-8">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-amber-400 text-slate-950 font-black text-[11px] sm:text-xs px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-xs tracking-wide uppercase">
                <Users className="w-3.5 h-3.5" />
                <span>DANH SÁCH THÀNH VIÊN LỚP HỌC</span>
              </span>
              <span className="bg-[#1e295d] text-blue-100 font-bold text-[11px] sm:text-xs px-3 py-0.5 rounded-full border border-blue-400/20">
                Môn Toán • Cơ sở Vạn Phú
              </span>
            </div>

            {/* Trạng thái bảo mật */}
            <div className="flex items-center gap-2">
              {!isAuthenticated ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold bg-amber-400/20 text-amber-200 border border-amber-400/30">
                  <Lock className="w-3 h-3 text-amber-300" />
                  <span>Bảo mật danh sách</span>
                </span>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-200 border border-emerald-400/30">
                    <CheckCircle2 className="w-3 h-3 text-emerald-300" />
                    <span>Đã mở khóa</span>
                  </span>
                  <button
                    type="button"
                    onClick={handleLock}
                    className="px-2.5 py-0.5 text-xs font-bold text-blue-200 hover:text-white bg-white/10 hover:bg-white/20 rounded-md transition-colors flex items-center gap-1 cursor-pointer"
                    title="Khóa lại danh sách học sinh"
                  >
                    <Lock className="w-3 h-3" />
                    <span>Khóa lại</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Tiêu đề chính */}
          <h2 className="text-base sm:text-xl font-black text-white tracking-wide pr-6 uppercase leading-snug">
            {tabTitle}
          </h2>

          {/* Dòng chú thích địa điểm & sắp xếp */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-blue-200/90 mt-1.5">
            <span className="flex items-center gap-1.5">
              <School className="w-3.5 h-3.5 text-amber-300" />
              <span>Cơ sở: Khu Đô Thị Vạn Phú - Thái Nguyên</span>
            </span>
            <span className="hidden sm:inline text-blue-400">•</span>
            <span className="flex items-center gap-1.5 text-amber-200">
              <ArrowUpDown className="w-3.5 h-3.5" />
              <span>Thứ tự sắp xếp: Lớp trường từ A1 đến A10 ➔ Tên theo A-Z</span>
            </span>
          </div>
        </div>

        {/* ============================================================== */}
        {/* THANH CHỌN CHẾ ĐỘ XEM / TABS CÁC PHÂN LỚP */}
        {/* ============================================================== */}
        <div className="bg-slate-100 px-3 sm:px-5 py-2 border-b border-slate-200 flex-shrink-0 flex items-center gap-2 overflow-x-auto scrollbar-thin">
          <span className="text-xs font-bold text-slate-500 whitespace-nowrap hidden sm:inline">
            Chế độ xem:
          </span>

          {/* Tab CB1 */}
          <button
            onClick={() => setSelectedTab('toan-12-cb1')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              selectedTab === 'toan-12-cb1'
                ? 'bg-white text-slate-900 shadow-sm border border-slate-300 font-black'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            <span>Lớp 1 (CB 1: {STUDENTS_TOAN_12_CB1.length} em • Đã đầy)</span>
          </button>

          {/* Tab CB2 */}
          <button
            onClick={() => setSelectedTab('toan-12-cb2')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              selectedTab === 'toan-12-cb2'
                ? 'bg-white text-slate-900 shadow-sm border border-slate-300 font-black'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            <span>Lớp 2 (CB 2: {STUDENTS_TOAN_12_CB2.length} em • Đã đầy)</span>
          </button>

          {/* Tab CB3 */}
          <button
            onClick={() => setSelectedTab('toan-12-cb3')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              selectedTab === 'toan-12-cb3'
                ? 'bg-white text-slate-900 shadow-sm border border-slate-300 font-black'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            <span>Lớp 3 (CB 3: {STUDENTS_TOAN_12_CB3.length} em • Đã đầy)</span>
          </button>

          {/* Tab Tổng cả 3 lớp */}
          <button
            onClick={() => setSelectedTab('toan-12-cb-all')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              selectedTab === 'toan-12-cb-all'
                ? 'bg-white text-slate-900 shadow-sm border border-slate-300 font-black'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            <span>Toán 12 Cơ Bản ({STUDENTS_TOAN_12_CO_BAN.length} em)</span>
          </button>

          {/* Tab Toán 12 Nâng cao */}
          <button
            onClick={() => setSelectedTab('toan-12-nc')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              selectedTab === 'toan-12-nc'
                ? 'bg-white text-slate-900 shadow-sm border border-slate-300 font-black'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Toán 12 Nâng Cao (5 em • Đang mở)</span>
          </button>

          {/* Tab Toán 11 - CB 1 (19 em) */}
          <button
            onClick={() => setSelectedTab('toan-11-cb1')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              selectedTab === 'toan-11-cb1'
                ? 'bg-white text-slate-900 shadow-sm border border-slate-300 font-black'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Toán 11 - CB 1 (19 em)</span>
          </button>

          {/* Tab Toán 11 - CB 2 */}
          <button
            onClick={() => setSelectedTab('toan-11-cb2')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              selectedTab === 'toan-11-cb2'
                ? 'bg-white text-slate-900 shadow-sm border border-slate-300 font-black'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Toán 11 - CB 2 ({STUDENTS_TOAN_11_CB2.length} em)</span>
          </button>

          {/* Tab Toán 11 - Toàn bộ */}
          <button
            onClick={() => setSelectedTab('toan-11-cb')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              selectedTab === 'toan-11-cb'
                ? 'bg-white text-slate-900 shadow-sm border border-slate-300 font-black'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Toán 11 Cơ Bản ({STUDENTS_TOAN_11_ALL.length} em)</span>
          </button>

          {/* Tab Toán 10 - Cơ Bản */}
          <button
            onClick={() => setSelectedTab('toan-10-cb')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              selectedTab === 'toan-10-cb'
                ? 'bg-white text-slate-900 shadow-sm border border-slate-300 font-black'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Toán 10 Cơ Bản ({STUDENTS_TOAN_10_CB.length} em)</span>
          </button>

          {/* Tab CNTT */}
          <button
            onClick={() => setSelectedTab('cntt-active')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              selectedTab === 'cntt-active'
                ? 'bg-white text-slate-900 shadow-sm border border-slate-300 font-black'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>CNTT & Kỹ Năng Số (18 em)</span>
          </button>
        </div>

        {/* ============================================================== */}
        {/* NỘI DUNG CHÍNH (HIỂN THỊ THẬT DÀI THEO CHIỀU DỌC TRÊN ĐIỆN THOẠI) */}
        {/* ============================================================== */}
        <div className="flex-grow overflow-y-auto p-2.5 sm:p-5 bg-slate-50 space-y-3.5 scrollbar-thin flex flex-col">
          
          {!isAuthenticated ? (
            /* ============================================================== */
            /* KHỐI BẢO MẬT & NHẬP MẬT KHẨU (KHÔNG CÓ GỢI Ý MẬT KHẨU) */
            /* ============================================================== */
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-12 flex flex-col items-center justify-center text-center my-auto min-h-[380px]">
              <div className="relative mb-5">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br from-[#0c1a40] via-[#162f6b] to-[#1e295d] text-white flex items-center justify-center shadow-xl shadow-blue-950/20 ring-4 ring-blue-100">
                  <Lock className="w-10 h-10 sm:w-12 sm:h-12 text-amber-400" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center ring-2 ring-white shadow-xs">
                  <ShieldCheck className="w-4 h-4" />
                </div>
              </div>

              <h3 className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight uppercase">
                Danh Sách Học Sinh Được Bảo Mật
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mt-2 leading-relaxed">
                Để bảo vệ quyền riêng tư và thông tin cá nhân của học sinh, danh sách thành viên các lớp học yêu cầu nhập mật khẩu xác thực để mở khóa.
              </p>

              <form onSubmit={handleUnlock} className="w-full max-w-sm mt-6 space-y-3.5">
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                    <KeyRound className="w-4 h-4" />
                  </div>
                  <input
                    type={showPasswordText ? 'text' : 'password'}
                    value={passwordInput}
                    onChange={(e) => {
                      setPasswordInput(e.target.value);
                      if (passwordError) setPasswordError('');
                    }}
                    placeholder="Nhập mật khẩu..."
                    autoFocus
                    className={`w-full pl-10 pr-11 py-3 bg-white border ${
                      passwordError ? 'border-rose-500 ring-2 ring-rose-200' : 'border-slate-300 focus:ring-2 focus:ring-blue-600'
                    } rounded-2xl text-sm font-semibold text-slate-900 placeholder-slate-400 focus:outline-none shadow-2xs transition-all`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswordText(!showPasswordText)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer p-1"
                    title={showPasswordText ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                    aria-label={showPasswordText ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                  >
                    {showPasswordText ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {passwordError && (
                  <div className="flex items-center gap-2 text-xs font-bold text-rose-700 bg-rose-50 border border-rose-200 px-3.5 py-2.5 rounded-xl text-left">
                    <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                    <span>{passwordError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3 px-6 bg-gradient-to-r from-[#162f6b] to-[#1e3a8a] hover:from-[#122557] hover:to-[#172554] text-white font-black text-xs sm:text-sm rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                >
                  <Lock className="w-4 h-4 text-amber-400" />
                  <span>Mở Khóa Xem Danh Sách</span>
                </button>
              </form>

              <div className="mt-8 flex items-center gap-2 text-[11px] text-slate-500 bg-slate-50 px-4 py-2 rounded-full border border-slate-200">
                <ShieldAlert className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                <span>Thông tin được bảo mật nội bộ theo quy định của Trung tâm.</span>
              </div>
            </div>
          ) : (
            <>
              {/* ============================================================== */}
              {/* THANH TÌM KIẾM & BỘ LỌC LỚP TRƯỜNG & NÚT IN DANH SÁCH */}
              {/* ============================================================== */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 text-xs">
            {/* Ô tìm kiếm */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm theo tên học sinh, lớp ở trường (12A5, 12A6, 12A7, 12A8, 12A9...)..."
                className="w-full pl-9 pr-7 py-2 rounded-xl bg-white border border-slate-300 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-2xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 font-bold"
                >
                  &times;
                </button>
              )}
            </div>

            {/* Bộ lọc & Sắp xếp */}
            <div className="flex flex-wrap items-center gap-1.5 flex-shrink-0">
              {/* Sắp xếp thứ tự */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'assignedClass' | 'schoolClass' | 'name')}
                  className="pl-8 pr-7 py-2 rounded-xl bg-white border border-slate-300 text-xs font-bold text-slate-700 hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 appearance-none shadow-2xs cursor-pointer"
                  title="Chọn cách sắp xếp danh sách"
                >
                  <option value="schoolClass">Thứ tự: Lớp trường ➔ Tên A-Z</option>
                  <option value="name">Thứ tự: Tên học sinh (A ➔ Z)</option>
                  <option value="assignedClass">Thứ tự: Phân lớp ➔ Lớp trường</option>
                </select>
                <ArrowUpDown className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <span className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  ▾
                </span>
              </div>

              {/* Lọc theo lớp trường (A1 -> A10) */}
              <div className="relative">
                <select
                  value={schoolClassFilter}
                  onChange={(e) => setSchoolClassFilter(e.target.value)}
                  className="pl-8 pr-7 py-2 rounded-xl bg-white border border-slate-300 text-xs font-bold text-slate-700 hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 appearance-none shadow-2xs cursor-pointer"
                >
                  <option value="all">Lớp trường: Tất cả</option>
                  {availableSchoolClasses.map((cls) => (
                    <option key={cls} value={cls}>
                      Lớp trường: {cls}
                    </option>
                  ))}
                </select>
                <Filter className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <span className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  ▾
                </span>
              </div>

              {/* Nút in danh sách */}
              <button
                onClick={() => window.print()}
                className="px-3 py-2 bg-white hover:bg-slate-100 text-slate-800 font-bold rounded-xl border border-slate-300 flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs whitespace-nowrap"
              >
                <Printer className="w-3.5 h-3.5 text-slate-600" />
                <span>In Danh Sách</span>
              </button>
            </div>
          </div>

          {/* ============================================================== */}
          {/* KHỐI THÔNG BÁO ĐỎ (ĐÚNG NHƯ ẢNH MẪU CỦA NGƯỜI DÙNG) */}
          {/* ============================================================== */}
          <div className="bg-rose-50/70 border border-rose-200 rounded-2xl p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-rose-600 text-white flex items-center justify-center font-bold flex-shrink-0 shadow-xs mt-0.5">
                <AlertCircle className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-black text-rose-900 text-xs sm:text-sm uppercase tracking-wide">
                  {selectedTab === 'toan-12-cb1'
                    ? `THÔNG BÁO: LỚP 1 (CB 1) ĐÃ ĐẦY SĨ SỐ (${STUDENTS_TOAN_12_CB1.length}/${STUDENTS_TOAN_12_CB1.length} HỌC SINH)`
                    : selectedTab === 'toan-12-cb2'
                    ? `THÔNG BÁO: LỚP 2 (CB 2) ĐÃ ĐẦY SĨ SỐ (${STUDENTS_TOAN_12_CB2.length}/${STUDENTS_TOAN_12_CB2.length} HỌC SINH)`
                    : selectedTab === 'toan-12-cb3'
                    ? `THÔNG BÁO: LỚP 3 (CB 3) ĐÃ ĐẦY SĨ SỐ (${STUDENTS_TOAN_12_CB3.length}/${STUDENTS_TOAN_12_CB3.length} HỌC SINH)`
                    : isClassFull
                    ? 'THÔNG BÁO: PHÂN LỚP ĐÃ ĐỦ SĨ SỐ ĐÀO TẠO'
                    : 'THÔNG BÁO: LỚP HỌC ĐANG MỞ TIẾP NHẬN HỌC SINH MỚI'}
                </h4>
                <p className="text-[11px] sm:text-xs text-slate-600 mt-0.5 leading-relaxed">
                  {noteText}
                </p>
              </div>
            </div>

            <button
              onClick={() => onOpenConsultationModal(12)}
              className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs rounded-xl shadow-xs transition-colors whitespace-nowrap self-stretch sm:self-auto text-center flex items-center justify-center gap-1 cursor-pointer"
            >
              <span>Xem Lớp 4 đang mở</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* ============================================================== */}
          {/* BẢNG DANH SÁCH THÀNH VIÊN VỚI HEADER ĐỎ ĐẬM (ĐÚNG Y HỆT ẢNH MẪU) */}
          {/* ============================================================== */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            
            {/* Header đỏ đậm bo tròn trên cùng */}
            <div className="bg-[#780d19] text-white p-3 sm:px-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-black flex-shrink-0">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-black text-xs sm:text-sm uppercase tracking-wide">
                    {selectedTab === 'toan-12-cb1'
                      ? 'BẢNG DANH SÁCH THÀNH VIÊN: LỚP 1 (LỚP CB 1 - ĐÃ ĐẦY)'
                      : selectedTab === 'toan-12-cb2'
                      ? 'BẢNG DANH SÁCH THÀNH VIÊN: LỚP 2 (LỚP CB 2 - ĐÃ ĐẦY)'
                      : selectedTab === 'toan-12-cb3'
                      ? 'BẢNG DANH SÁCH THÀNH VIÊN: LỚP 3 (LỚP CB 3 - ĐÃ ĐẦY)'
                      : 'BẢNG DANH SÁCH THÀNH VIÊN LỚP HỌC'}
                  </h3>
                  <p className="text-[11px] text-amber-200/90 font-medium">
                    {tabSubTitle}
                  </p>
                </div>
              </div>

              {/* Huy hiệu sĩ số góc phải */}
              <span className="px-3 py-1 rounded-full text-[11px] font-black bg-white/15 border border-white/20 text-white tracking-wide uppercase self-end sm:self-auto">
                {capacityText}
              </span>
            </div>

            {/* BẢNG HỌC SINH HIỂN THỊ DÀI ĐẦY ĐỦ TẤT CẢ HỌC SINH */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-slate-50 text-slate-600 font-extrabold border-b border-slate-200 text-[11px] uppercase tracking-wider select-none">
                    <th className="py-2.5 px-3 text-center w-12">STT</th>
                    <th 
                      onClick={() => setSortBy(sortBy === 'name' ? 'schoolClass' : 'name')}
                      className="py-2.5 px-3 sm:px-4 cursor-pointer hover:text-blue-700 transition-colors"
                      title="Bấm để sắp xếp theo Tên A-Z"
                    >
                      <div className="flex items-center gap-1">
                        <span>HỌ VÀ TÊN</span>
                        <ArrowUpDown className={`w-3 h-3 ${sortBy === 'name' ? 'text-blue-600' : 'text-slate-400'}`} />
                      </div>
                    </th>
                    <th 
                      onClick={() => setSortBy(sortBy === 'schoolClass' ? 'name' : 'schoolClass')}
                      className="py-2.5 px-3 text-center cursor-pointer hover:text-blue-700 transition-colors"
                      title="Bấm để sắp xếp theo Lớp ở trường"
                    >
                      <div className="inline-flex items-center gap-1 justify-center">
                        <span>LỚP Ở TRƯỜNG</span>
                        <ArrowUpDown className={`w-3 h-3 ${sortBy === 'schoolClass' ? 'text-blue-600' : 'text-slate-400'}`} />
                      </div>
                    </th>
                    <th className="py-2.5 px-3 sm:px-4">TRƯỜNG HỌC</th>
                    <th className="py-2.5 px-3 sm:px-4 text-center">PHÂN LỚP</th>
                    <th className="py-2.5 px-3 text-center">TRẠNG THÁI</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {filteredStudents.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-slate-400 text-xs">
                        Không tìm thấy học sinh nào phù hợp với điều kiện tìm kiếm.
                      </td>
                    </tr>
                  ) : (
                    filteredStudents.map((student, idx) => {
                      const initial = getStudentInitial(student.name);

                      return (
                        <tr
                          key={student.id || idx}
                          className="hover:bg-slate-50 transition-colors"
                        >
                          {/* Cột STT */}
                          <td className="py-2.5 px-3 text-center font-semibold text-slate-400">
                            {idx + 1}
                          </td>

                          {/* Cột Họ và tên: Avatar chữ cái + Tên đậm */}
                          <td className="py-2.5 px-3 sm:px-4">
                            <div className="flex items-center gap-2 sm:gap-2.5">
                              <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-blue-100 text-blue-700 font-black text-xs flex items-center justify-center flex-shrink-0 shadow-2xs">
                                {initial}
                              </span>
                              <span className="font-bold text-slate-900 text-xs sm:text-sm whitespace-nowrap">
                                {student.name}
                              </span>
                            </div>
                          </td>

                          {/* Cột Lớp ở trường (badge vuông bo góc viền xanh/xám) */}
                          <td className="py-2.5 px-3 text-center">
                            <span className="inline-block px-2.5 py-0.5 rounded-md font-bold text-xs bg-sky-50 text-sky-800 border border-sky-200">
                              {student.schoolClass}
                            </span>
                          </td>

                          {/* Cột Trường học */}
                          <td className="py-2.5 px-3 sm:px-4 text-slate-600 text-xs whitespace-nowrap">
                            {student.schoolName || 'THPT Lưu Nhân Chú'}
                          </td>

                          {/* Cột Phân lớp (pill màu hồng viền đỏ cho Toán 12, xanh/tím cho Toán 11, xanh lá cho Toán 10) */}
                          <td className="py-2.5 px-3 sm:px-4 text-center whitespace-nowrap">
                            {selectedTab.startsWith('toan-11') || student.assignedClass.includes('Toán 11') ? (
                              <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-50 text-indigo-800 border border-indigo-200">
                                {student.assignedClass}
                              </span>
                            ) : selectedTab.startsWith('toan-10') || student.assignedClass.includes('Toán 10') ? (
                              <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                                {student.assignedClass}
                              </span>
                            ) : (
                              <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                                {student.assignedClass.includes('CB1') || student.assignedClass.includes('CB 1')
                                  ? 'Lớp CB 1 (Đã đầy)'
                                  : student.assignedClass.includes('CB2') || student.assignedClass.includes('CB 2')
                                  ? 'Lớp CB 2 (Đã đầy)'
                                  : student.assignedClass.includes('CB3') || student.assignedClass.includes('CB 3')
                                  ? 'Lớp CB 3 (Đã đầy)'
                                  : student.assignedClass}
                              </span>
                            )}
                          </td>

                          {/* Cột Trạng thái: icon tích xanh + Đang theo học */}
                          <td className="py-2.5 px-3 text-center whitespace-nowrap">
                            <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold text-xs">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                              <span>Đang theo học</span>
                            </span>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
          </>
          )}
        </div>

        {/* ============================================================== */}
        {/* FOOTER MODAL (ĐÚNG THEO ẢNH MẪU CỦA NGƯỜI DÙNG) */}
        {/* ============================================================== */}
        <div className="p-3 sm:px-5 bg-white border-t border-slate-200 flex-shrink-0 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-500 text-center sm:text-left">
            {!isAuthenticated ? (
              <span className="flex items-center gap-1.5 text-slate-600 font-medium">
                <Lock className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                <span>Danh sách học sinh đang ở chế độ bảo mật • Nhập mật khẩu để xem chi tiết</span>
              </span>
            ) : selectedTab.startsWith('toan-11') ? (
              <span>Tổng cộng: <strong className="text-slate-800">{STUDENTS_TOAN_11_ALL.length} học sinh</strong> thuộc 2 phân lớp Toán 11 Cơ Bản (CB1: {STUDENTS_TOAN_11_CB1.length} em, CB2: {STUDENTS_TOAN_11_CB2.length} em • GV: Cô Vũ Hằng)</span>
            ) : selectedTab.startsWith('toan-12-cb') ? (
              <span>Tổng cộng: <strong className="text-slate-800">{STUDENTS_TOAN_12_CO_BAN.length} học sinh</strong> thuộc 3 phân lớp Toán 12 Cơ Bản (CB1: {STUDENTS_TOAN_12_CB1.length} em, CB2: {STUDENTS_TOAN_12_CB2.length} em, CB3: {STUDENTS_TOAN_12_CB3.length} em)</span>
            ) : selectedTab === 'toan-10-cb' || selectedTab === 'toan-10' ? (
              <span>Tổng cộng: <strong className="text-slate-800">{STUDENTS_TOAN_10_CB.length} học sinh</strong> lớp Toán 10 Cơ Bản (GV: Thầy Hoàng & Tổ bộ môn Toán)</span>
            ) : (
              <span>Tổng cộng: <strong className="text-slate-800">{filteredStudents.length} học sinh</strong> ({capacityText})</span>
            )}
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            {isAuthenticated && (
              <button
                type="button"
                onClick={handleLock}
                className="px-3.5 py-2.5 bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-rose-700 font-bold text-xs sm:text-sm rounded-xl border border-slate-200 hover:border-rose-200 transition-colors flex items-center gap-1.5 cursor-pointer"
                title="Khóa lại danh sách học sinh"
              >
                <Lock className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Khóa lại</span>
              </button>
            )}

            <button
              onClick={() => {
                onClose();
                onOpenConsultationModal(12);
              }}
              className="flex-1 sm:flex-none px-5 py-2.5 bg-[#1b3a82] hover:bg-[#152e69] text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Đăng Ký Xếp Lớp & Tư Vấn</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="px-5 py-2.5 bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs sm:text-sm rounded-xl border border-slate-300 transition-colors cursor-pointer"
            >
              Đóng
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
