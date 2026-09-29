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
  BookOpen
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
  const [sortBy, setSortBy] = useState<'assignedClass' | 'schoolClass' | 'name'>('assignedClass');

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
        tabTitle: 'BẢNG DANH SÁCH THÀNH VIÊN LỚP 1 (CB 1: 29 HỌC SINH - ĐÃ ĐẦY SĨ SỐ)',
        tabSubTitle: 'Sĩ số: 29 / 29 học sinh (100% học sinh 12A9 - THPT Lưu Nhân Chú)',
        isClassFull: true,
        capacityText: 'Lớp 1: 29 em • ĐÃ ĐẦY',
        noteText: 'Lớp 1 gồm 29 học sinh lớp 12A9 THPT Lưu Nhân Chú đã chốt danh sách. Phụ huynh & học sinh vui lòng đăng ký sang Lớp 4 (CB 4) đang mở tuyển sinh!'
      };
    }
    if (selectedTab === 'toan-12-cb2') {
      return {
        currentStudents: STUDENTS_TOAN_12_CB2,
        tabTitle: 'BẢNG DANH SÁCH THÀNH VIÊN LỚP 2 (CB 2: 23 HỌC SINH - ĐÃ ĐẦY SĨ SỐ)',
        tabSubTitle: 'Sĩ số: 23 / 23 học sinh (Gồm 12A6: 14 em, 12A7: 9 em - THPT Lưu Nhân Chú)',
        isClassFull: true,
        capacityText: 'Lớp 2: 23 em • ĐÃ ĐẦY',
        noteText: 'Lớp 2 gồm 23 học sinh lớp 12A6 & 12A7 đã chốt danh sách. Phụ huynh & học sinh vui lòng liên hệ tư vấn để xếp vào lớp phù hợp!'
      };
    }
    if (selectedTab === 'toan-12-cb3') {
      return {
        currentStudents: STUDENTS_TOAN_12_CB3,
        tabTitle: 'BẢNG DANH SÁCH THÀNH VIÊN LỚP 3 (CB 3: 23 HỌC SINH - ĐÃ ĐẦY SĨ SỐ)',
        tabSubTitle: 'Sĩ số: 23 / 23 học sinh (Gồm 12A8: 21 em, 12A5: 2 em - THPT Lưu Nhân Chú)',
        isClassFull: true,
        capacityText: 'Lớp 3: 23 em • ĐÃ ĐẦY',
        noteText: 'Lớp 3 gồm 23 học sinh lớp 12A8 & 12A5 đã chốt danh sách. Đã đủ sĩ số đào tạo chất lượng cao!'
      };
    }
    if (selectedTab === 'toan-12-cb-all') {
      return {
        currentStudents: STUDENTS_TOAN_12_CO_BAN,
        tabTitle: 'BẢNG DANH SÁCH TOÀN BỘ 3 PHÂN LỚP TOÁN 12 CƠ BẢN (75 HỌC SINH)',
        tabSubTitle: 'Tổng sĩ số: 75 / 75 học sinh (Chia làm 3 phân lớp CB1, CB2, CB3 - ĐÃ ĐẦY CẢ 3 LỚP)',
        isClassFull: true,
        capacityText: 'Tổng 3 lớp: 75 em • ĐÃ ĐẦY',
        noteText: 'Cả 3 phân lớp Toán 12 Cơ bản (CB1: 29 em, CB2: 23 em, CB3: 23 em) đã đủ chỉ tiêu 75 học sinh. Đang mở đăng ký cho các lớp bổ sung!'
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
        tabSubTitle: 'Sĩ số: 22 học sinh • GV: Cô Vũ Hằng (100% THPT Lưu Nhân Chú)',
        isClassFull: false,
        capacityText: 'Lớp 2: 22 em • Đang mở',
        noteText: 'Lớp Toán 11 Cơ Bản 2 (GV: Cô Vũ Hằng) bám sát cấu trúc kiểm tra học kỳ, rèn luyện kỹ năng giải toán tư duy và nâng cao điểm số.'
      };
    }
    if (selectedTab === 'toan-11-cb' || selectedTab === 'toan-11-all') {
      return {
        currentStudents: STUDENTS_TOAN_11_ALL,
        tabTitle: 'BẢNG DANH SÁCH TOÀN BỘ 2 PHÂN LỚP TOÁN 11 CƠ BẢN (41 HỌC SINH)',
        tabSubTitle: 'Tổng sĩ số: 41 học sinh (Gồm CB1: 19 em & CB2: 22 em • GV: Cô Vũ Hằng)',
        isClassFull: false,
        capacityText: 'Tổng 2 lớp: 41 em • Đang mở',
        noteText: 'Tổng cộng 41 học sinh đang theo học tại 2 phân lớp Toán 11 Cơ bản do Cô Vũ Hằng phụ trách. Lớp đang mở tiếp nhận học sinh mới.'
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
          <div className="flex flex-wrap items-center gap-2 mb-2 pr-8">
            <span className="bg-amber-400 text-slate-950 font-black text-[11px] sm:text-xs px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-xs tracking-wide uppercase">
              <Users className="w-3.5 h-3.5" />
              <span>DANH SÁCH THÀNH VIÊN LỚP HỌC</span>
            </span>
            <span className="bg-[#1e295d] text-blue-100 font-bold text-[11px] sm:text-xs px-3 py-0.5 rounded-full border border-blue-400/20">
              Môn Toán • Cơ sở Vạn Phú
            </span>
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

          {/* Tab CB1 (29 em) */}
          <button
            onClick={() => setSelectedTab('toan-12-cb1')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              selectedTab === 'toan-12-cb1'
                ? 'bg-white text-slate-900 shadow-sm border border-slate-300 font-black'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            <span>Lớp 1 (CB 1: 29 em • Đã đầy)</span>
          </button>

          {/* Tab CB2 (23 em) */}
          <button
            onClick={() => setSelectedTab('toan-12-cb2')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              selectedTab === 'toan-12-cb2'
                ? 'bg-white text-slate-900 shadow-sm border border-slate-300 font-black'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            <span>Lớp 2 (CB 2: 23 em • Đã đầy)</span>
          </button>

          {/* Tab CB3 (23 em) */}
          <button
            onClick={() => setSelectedTab('toan-12-cb3')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              selectedTab === 'toan-12-cb3'
                ? 'bg-white text-slate-900 shadow-sm border border-slate-300 font-black'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            <span>Lớp 3 (CB 3: 23 em • Đã đầy)</span>
          </button>

          {/* Tab Tổng cả 3 lớp (75 em) */}
          <button
            onClick={() => setSelectedTab('toan-12-cb-all')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              selectedTab === 'toan-12-cb-all'
                ? 'bg-white text-slate-900 shadow-sm border border-slate-300 font-black'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            <span>Toán 12 Cơ Bản (75 em)</span>
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

          {/* Tab Toán 11 - CB 2 (22 em) */}
          <button
            onClick={() => setSelectedTab('toan-11-cb2')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              selectedTab === 'toan-11-cb2'
                ? 'bg-white text-slate-900 shadow-sm border border-slate-300 font-black'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Toán 11 - CB 2 (22 em)</span>
          </button>

          {/* Tab Toán 11 - Toàn bộ (41 em) */}
          <button
            onClick={() => setSelectedTab('toan-11-cb')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              selectedTab === 'toan-11-cb'
                ? 'bg-white text-slate-900 shadow-sm border border-slate-300 font-black'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Toán 11 Cơ Bản (41 em)</span>
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
        <div className="flex-grow overflow-y-auto p-2.5 sm:p-5 bg-slate-50 space-y-3.5 scrollbar-thin">
          
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

            {/* Lọc theo lớp trường (A1 -> A9) */}
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <div className="relative">
                <select
                  value={schoolClassFilter}
                  onChange={(e) => setSchoolClassFilter(e.target.value)}
                  className="pl-8 pr-7 py-2 rounded-xl bg-white border border-slate-300 text-xs font-bold text-slate-700 hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 appearance-none shadow-2xs cursor-pointer"
                >
                  <option value="all">Lớp trường: Tất cả (A1 ➔ A9)</option>
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
                    ? 'THÔNG BÁO: LỚP 1 (CB 1) ĐÃ ĐẦY SĨ SỐ (29/29 HỌC SINH)'
                    : selectedTab === 'toan-12-cb2'
                    ? 'THÔNG BÁO: LỚP 2 (CB 2) ĐÃ ĐẦY SĨ SỐ (23/23 HỌC SINH)'
                    : selectedTab === 'toan-12-cb3'
                    ? 'THÔNG BÁO: LỚP 3 (CB 3) ĐÃ ĐẦY SĨ SỐ (23/23 HỌC SINH)'
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
                  <tr className="bg-slate-50 text-slate-600 font-extrabold border-b border-slate-200 text-[11px] uppercase tracking-wider">
                    <th className="py-2.5 px-3 text-center w-12">STT</th>
                    <th className="py-2.5 px-3 sm:px-4">HỌ VÀ TÊN</th>
                    <th className="py-2.5 px-3 text-center">LỚP Ở TRƯỜNG</th>
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
                            {selectedTab === 'toan-11-cb2' && sortBy === 'assignedClass' && student.stt ? student.stt : idx + 1}
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

                          {/* Cột Phân lớp (pill màu hồng viền đỏ cho Toán 12, hoặc xanh/tím cho Toán 11) */}
                          <td className="py-2.5 px-3 sm:px-4 text-center whitespace-nowrap">
                            {selectedTab.startsWith('toan-11') || student.assignedClass.includes('Toán 11') ? (
                              <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-50 text-indigo-800 border border-indigo-200">
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
        </div>

        {/* ============================================================== */}
        {/* FOOTER MODAL (ĐÚNG THEO ẢNH MẪU CỦA NGƯỜI DÙNG) */}
        {/* ============================================================== */}
        <div className="p-3 sm:px-5 bg-white border-t border-slate-200 flex-shrink-0 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-500 text-center sm:text-left">
            {selectedTab.startsWith('toan-11') ? (
              <span>Tổng cộng: <strong className="text-slate-800">41 học sinh</strong> thuộc 2 phân lớp Toán 11 Cơ Bản (CB1: 19 em, CB2: 22 em • GV: Cô Vũ Hằng)</span>
            ) : selectedTab.startsWith('toan-12-cb') ? (
              <span>Tổng cộng: <strong className="text-slate-800">75 học sinh</strong> thuộc 3 phân lớp Toán 12 Cơ Bản (CB1: 29 em, CB2: 23 em, CB3: 23 em)</span>
            ) : (
              <span>Tổng cộng: <strong className="text-slate-800">{filteredStudents.length} học sinh</strong> ({capacityText})</span>
            )}
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
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
