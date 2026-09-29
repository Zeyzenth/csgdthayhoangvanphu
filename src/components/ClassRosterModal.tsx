import React, { useState, useMemo, useEffect } from 'react';
import {
  X,
  Users,
  School,
  CheckCircle2,
  Printer,
  ChevronRight,
  BookOpen,
  Sparkles,
  Clock,
  AlertCircle,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  Search,
  ShieldCheck,
  ArrowUpDown,
  Download,
  LayoutGrid,
  Table as TableIcon,
  Copy,
  Check,
  CheckSquare,
  FileSpreadsheet,
  GraduationCap
} from 'lucide-react';
import { Student, GradeLevel } from '../types';
import {
  ACTIVE_CLASSES,
  STUDENTS_TOAN_12_CO_BAN,
  STUDENTS_TOAN_12_CB1,
  STUDENTS_TOAN_12_CB2,
  STUDENTS_TOAN_12_CB3,
  sortStudentsByClassAndName
} from '../data/activeClassesData';

interface ClassRosterModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialClassId?: string | null;
  onOpenConsultationModal: (grade?: GradeLevel) => void;
}

export const ClassRosterModal: React.FC<ClassRosterModalProps> = ({
  isOpen,
  onClose,
  initialClassId,
  onOpenConsultationModal,
}) => {
  const [selectedClassId, setSelectedClassId] = useState<string>('all');
  // Mặc định cho phép học sinh & phụ huynh xem ngay danh sách công khai
  const [isUnlocked, setIsUnlocked] = useState<boolean>(true);
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string>('');
  const [subClassFilter, setSubClassFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'assignedClass' | 'schoolClass' | 'name'>('assignedClass');
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
  const [copiedSuccess, setCopiedSuccess] = useState<boolean>(false);
  const [checkedAttendance, setCheckedAttendance] = useState<Record<string, boolean>>({});

  // Sync initialClassId if provided
  useEffect(() => {
    if (initialClassId) {
      if (initialClassId === 'toan-12-all' || initialClassId === 'all' || initialClassId === 'both-separate') {
        setSelectedClassId('all');
      } else if (
        initialClassId === 'toan-12-cb1' ||
        initialClassId === 'toan-12-cb2' ||
        initialClassId === 'toan-12-cb3' ||
        initialClassId === 'toan-12-cb4'
      ) {
        setSelectedClassId('toan-12-cb');
        if (initialClassId === 'toan-12-cb1') setSubClassFilter('cb1');
        else if (initialClassId === 'toan-12-cb2') setSubClassFilter('cb2');
        else if (initialClassId === 'toan-12-cb3') setSubClassFilter('cb3');
      } else if (initialClassId === 'toan-11-nc') {
        setSelectedClassId('toan-11-cb');
      } else {
        setSelectedClassId(initialClassId);
      }
    } else {
      setSelectedClassId('all');
    }
  }, [initialClassId, isOpen]);

  // Reset filter when switching class
  useEffect(() => {
    if (!initialClassId || (initialClassId !== 'toan-12-cb1' && initialClassId !== 'toan-12-cb2' && initialClassId !== 'toan-12-cb3')) {
      setSubClassFilter('all');
    }
    setSearchQuery('');
  }, [selectedClassId]);

  // Tổng số học sinh toàn trung tâm
  const totalCenterStudents = useMemo(() => {
    return ACTIVE_CLASSES.reduce((acc, c) => acc + (c.studentCount ?? 0), 0);
  }, []);

  const selectedClass = useMemo(() => {
    if (selectedClassId === 'all') return null;
    return ACTIVE_CLASSES.find((c) => c.id === selectedClassId) || null;
  }, [selectedClassId]);

  // Xác thực mật khẩu THVP2026 (nếu người dùng bấm Khóa bảo mật)
  const handleVerifyPassword = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (passwordInput.trim() === 'THVP2026') {
      setIsUnlocked(true);
      setAuthError('');
      sessionStorage.setItem('thvp_roster_auth', 'true');
      setPasswordInput('');
    } else {
      setAuthError('Mật khẩu không chính xác (Gợi ý: THVP2026). Vui lòng thử lại!');
    }
  };

  const handleLockAgain = () => {
    setIsUnlocked(false);
    sessionStorage.removeItem('thvp_roster_auth');
    setPasswordInput('');
    setAuthError('');
  };

  // Danh sách học sinh theo phân lớp và tìm kiếm
  const displayedStudents = useMemo(() => {
    if (!selectedClass || !selectedClass.students) return [];

    let list: Student[] = [...selectedClass.students];

    // Phân lớp cho Toán 12 Cơ bản
    if (selectedClass.id === 'toan-12-cb') {
      if (subClassFilter === 'cb1') {
        list = STUDENTS_TOAN_12_CB1;
      } else if (subClassFilter === 'cb2') {
        list = STUDENTS_TOAN_12_CB2;
      } else if (subClassFilter === 'cb3') {
        list = STUDENTS_TOAN_12_CB3;
      } else {
        list = STUDENTS_TOAN_12_CO_BAN;
      }
    }

    // Sắp xếp linh hoạt theo tùy chọn
    const sorted = sortStudentsByClassAndName(list, sortBy);

    // Lọc theo tìm kiếm
    if (!searchQuery.trim()) return sorted;

    const q = searchQuery.toLowerCase().trim();
    return sorted.filter((s) => {
      const matchName = s.name.toLowerCase().includes(q);
      const matchClass = s.schoolClass?.toLowerCase().includes(q);
      const matchSchool = s.schoolName?.toLowerCase().includes(q);
      const matchAssigned = s.assignedClass?.toLowerCase().includes(q);
      return matchName || matchClass || matchSchool || matchAssigned;
    });
  }, [selectedClass, subClassFilter, searchQuery, sortBy]);

  // Thống kê số lượng học sinh theo lớp trường đối với Toán 12 Cơ bản
  const schoolClassStats = useMemo(() => {
    if (selectedClass?.id !== 'toan-12-cb') return [];
    const counts: Record<string, number> = {};
    STUDENTS_TOAN_12_CO_BAN.forEach((s) => {
      const cls = s.schoolClass || 'Khác';
      counts[cls] = (counts[cls] || 0) + 1;
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }, [selectedClass]);

  // Xuất file CSV / Excel chuẩn UTF-8 có dấu
  const handleExportExcel = () => {
    if (!displayedStudents.length) return;

    const className = selectedClass ? selectedClass.name : 'DanhSachHocSinh';
    const subName = subClassFilter !== 'all' ? `_${subClassFilter.toUpperCase()}` : '';
    const filename = `${className.replace(/\s+/g, '_')}${subName}.csv`;

    const headers = ['STT', 'Họ và Tên', 'Lớp Trường', 'Trường Học', 'Phân Lớp Đào Tạo', 'Giáo Viên'];
    const rows = displayedStudents.map((s, idx) => {
      const teacher = s.assignedClass?.includes('Cô Hường')
        ? 'Cô Hường'
        : s.assignedClass?.includes('Cô Hân')
        ? 'Cô Hân'
        : selectedClass?.teacher || '';
      return [
        idx + 1,
        `"${s.name}"`,
        `"${s.schoolClass || ''}"`,
        `"${s.schoolName || ''}"`,
        `"${s.assignedClass || ''}"`,
        `"${teacher}"`,
      ];
    });

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Sao chép danh sách học sinh vào bộ nhớ tạm
  const handleCopyList = () => {
    if (!displayedStudents.length) return;
    const text = displayedStudents
      .map((s, idx) => `${idx + 1}. ${s.name} - ${s.schoolClass || ''} (${s.schoolName || ''}) - ${s.assignedClass || ''}`)
      .join('\n');

    navigator.clipboard.writeText(text).then(() => {
      setCopiedSuccess(true);
      setTimeout(() => setCopiedSuccess(false), 2000);
    });
  };

  // Toggle điểm danh nhanh cho từng học sinh
  const toggleAttendance = (id: string) => {
    setCheckedAttendance((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-6xl max-h-[94vh] flex flex-col overflow-hidden border border-slate-200">
        
        {/* ============================================================== */}
        {/* MODAL HEADER: TRANG TRỌNG THEO PHONG CÁCH GIÁO DỤC CHÍNH QUY */}
        {/* ============================================================== */}
        <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 text-white p-4 sm:p-5 flex-shrink-0 relative border-b border-slate-800">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors cursor-pointer z-10"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pr-10">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black tracking-wider uppercase bg-amber-400 text-slate-950 flex items-center gap-1 shadow-xs">
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>Sổ Quản Lý Học Sinh</span>
                </span>
                <span className="text-xs text-blue-200 hidden sm:inline">•</span>
                <span className="text-xs text-blue-200 hidden sm:inline">Năm Học 2025 - 2026</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                <span>BẢNG DANH SÁCH HỌC SINH PHÂN LỚP</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                Cơ Sở Giáo Dục Thầy Hoàng - Vạn Phú (Đại Từ - Thái Nguyên)
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/15 text-right">
                <span className="text-[11px] text-blue-200 block uppercase font-bold">Tổng Sĩ Số Toàn Cơ Sở</span>
                <span className="text-lg font-black text-amber-300">
                  {totalCenterStudents} <span className="text-xs font-semibold text-white">học sinh</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* QUICK CLASS SELECTOR TABS (THANH CHỌN LỚP NHANH) */}
        {/* ============================================================== */}
        <div className="bg-slate-100 px-3 sm:px-6 py-2.5 border-b border-slate-200 flex-shrink-0 flex items-center gap-2 overflow-x-auto scrollbar-thin">
          <span className="text-xs font-bold text-slate-600 hidden sm:inline flex-shrink-0 flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5 text-blue-800" />
            <span>Chọn bảng lớp:</span>
          </span>
          
          <button
            onClick={() => setSelectedClassId('all')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex-shrink-0 cursor-pointer flex items-center gap-1.5 ${
              selectedClassId === 'all'
                ? 'bg-blue-900 text-white shadow-sm ring-2 ring-blue-900/20'
                : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            <span>Tổng Hợp Tất Cả Các Lớp ({totalCenterStudents} em)</span>
          </button>

          <button
            onClick={() => setSelectedClassId('toan-12-cb')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex-shrink-0 cursor-pointer flex items-center gap-1.5 ${
              selectedClassId === 'toan-12-cb'
                ? 'bg-blue-900 text-white shadow-sm ring-2 ring-blue-900/20'
                : 'bg-white text-blue-950 hover:bg-blue-50 border border-blue-200'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Toán 12 Cơ Bản (75 em • 3 phân lớp)</span>
          </button>

          <button
            onClick={() => setSelectedClassId('toan-12-nc')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex-shrink-0 cursor-pointer flex items-center gap-1.5 ${
              selectedClassId === 'toan-12-nc'
                ? 'bg-purple-900 text-white shadow-sm ring-2 ring-purple-900/20'
                : 'bg-white text-purple-950 hover:bg-purple-50 border border-purple-300'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <span>Toán 12 Nâng Cao (5 em)</span>
          </button>

          <button
            onClick={() => setSelectedClassId('toan-11-cb')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex-shrink-0 cursor-pointer flex items-center gap-1.5 ${
              selectedClassId === 'toan-11-cb'
                ? 'bg-indigo-900 text-white shadow-sm ring-2 ring-indigo-900/20'
                : 'bg-white text-indigo-950 hover:bg-indigo-50 border border-indigo-200'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <span>Toán 11 (34 em • 2 phân lớp)</span>
          </button>

          <button
            onClick={() => setSelectedClassId('cntt-active')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex-shrink-0 cursor-pointer flex items-center gap-1.5 ${
              selectedClassId === 'cntt-active'
                ? 'bg-cyan-800 text-white shadow-sm ring-2 ring-cyan-800/20'
                : 'bg-white text-cyan-950 hover:bg-cyan-50 border border-cyan-300'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <span>CNTT & Kỹ Năng Số (18 em)</span>
          </button>

          <button
            onClick={() => setSelectedClassId('toan-10-cb')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex-shrink-0 cursor-pointer flex items-center gap-1.5 ${
              selectedClassId === 'toan-10-cb'
                ? 'bg-emerald-800 text-white shadow-sm ring-2 ring-emerald-800/20'
                : 'bg-white text-emerald-950 hover:bg-emerald-50 border border-emerald-300'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <span>Toán 10 (Đang mở lớp)</span>
          </button>
        </div>

        {/* ============================================================== */}
        {/* NỘI DUNG CUỘN CHÍNH */}
        {/* ============================================================== */}
        <div className="flex-grow overflow-y-auto p-3 sm:p-6 bg-slate-50 space-y-5">
          
          {/* ============================================================== */}
          {/* VIEW: TẤT CẢ CÁC LỚP (BẢNG THỐNG KÊ TỔNG THỂ) */}
          {/* ============================================================== */}
          {selectedClassId === 'all' && (
            <div className="space-y-5">
              {/* Thống kê 3 hộp */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-gradient-to-br from-blue-900 to-indigo-900 text-white p-4 rounded-2xl shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-blue-200 uppercase tracking-wider">Tổng Học Sinh Hiện Tại</span>
                    <Users className="w-5 h-5 text-amber-300" />
                  </div>
                  <div className="text-3xl font-black mt-2 text-white">{totalCenterStudents} <span className="text-sm font-semibold text-blue-200">em</span></div>
                  <p className="text-[11px] text-blue-200 mt-1">Đã hoàn tất thủ tục và xếp lớp</p>
                </div>

                <div className="bg-gradient-to-br from-indigo-800 to-indigo-950 text-white p-4 rounded-2xl shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-indigo-200 uppercase tracking-wider">Toán THPT (Khối 11 & 12)</span>
                    <CheckCircle2 className="w-5 h-5 text-emerald-300" />
                  </div>
                  <div className="text-3xl font-black mt-2 text-white">114 <span className="text-sm font-semibold text-indigo-200">em</span></div>
                  <p className="text-[11px] text-indigo-200 mt-1">Toán 12 CB (75 em) • Toán 12 NC (5 em) • Toán 11 (34 em)</p>
                </div>

                <div className="bg-gradient-to-br from-emerald-800 to-teal-950 text-white p-4 rounded-2xl shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-200 uppercase tracking-wider">Tình Trạng Mở Lớp</span>
                    <Sparkles className="w-5 h-5 text-emerald-300" />
                  </div>
                  <div className="text-3xl font-black mt-2 text-white">100% <span className="text-sm font-semibold text-emerald-200">Đang Mở</span></div>
                  <p className="text-[11px] text-emerald-200 mt-1">Đang tiếp nhận đăng ký các môn học</p>
                </div>
              </div>

              {/* Bảng tổng hợp các lớp */}
              <div className="bg-white rounded-2xl shadow-xs border border-slate-200 overflow-hidden">
                <div className="p-4 bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="font-black text-sm uppercase tracking-wide flex items-center gap-2">
                      <FileSpreadsheet className="w-4 h-4 text-amber-400" />
                      <span>Bảng Tổng Hợp Danh Sách & Sĩ Số Toàn Bộ Các Lớp</span>
                    </h3>
                    <p className="text-xs text-slate-300 mt-0.5">
                      Nhấn vào từng lớp để xem bảng danh sách học sinh chi tiết được phân theo từng phân lớp và lớp trường.
                    </p>
                  </div>
                  <button
                    onClick={() => window.print()}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-colors cursor-pointer self-start sm:self-auto"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>In bảng thống kê</span>
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                        <th className="py-3 px-3 sm:px-4 text-center w-12">STT</th>
                        <th className="py-3 px-3 sm:px-4">Tên Lớp Học</th>
                        <th className="py-3 px-3 sm:px-4 text-center">Khối</th>
                        <th className="py-3 px-3 sm:px-4 text-center">Trình Độ</th>
                        <th className="py-3 px-3 sm:px-4 text-center">Tổng Sĩ Số</th>
                        <th className="py-3 px-3 sm:px-4 text-center">Trạng Thái</th>
                        <th className="py-3 px-3 sm:px-4 text-right">Thao Tác</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {ACTIVE_CLASSES.map((cls, idx) => {
                        const count = cls.studentCount ?? 0;
                        const isOpen = cls.isOpen || cls.status === 'enrolling';

                        return (
                          <tr
                            key={cls.id}
                            className="hover:bg-blue-50/50 transition-colors"
                          >
                            <td className="py-3.5 px-3 sm:px-4 text-center font-bold text-slate-500">
                              {idx + 1}
                            </td>
                            <td className="py-3.5 px-3 sm:px-4">
                              <div className="font-extrabold text-slate-900">{cls.name}</div>
                              {cls.note && (
                                <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{cls.note}</div>
                              )}
                            </td>
                            <td className="py-3.5 px-3 sm:px-4 text-center font-semibold text-slate-700">
                              {cls.grade === 'cntt' ? 'CNTT' : cls.grade === 'van-chu-dep' ? 'Chữ Đẹp' : `Lớp ${cls.grade}`}
                            </td>
                            <td className="py-3.5 px-3 sm:px-4 text-center">
                              <span
                                className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                                  cls.level === 'Nâng Cao'
                                    ? 'bg-purple-100 text-purple-900 border border-purple-200'
                                    : cls.level === 'Cơ Bản'
                                    ? 'bg-blue-100 text-blue-900 border border-blue-200'
                                    : 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                                }`}
                              >
                                {cls.level}
                              </span>
                            </td>
                            <td className="py-3.5 px-3 sm:px-4 text-center">
                              {count > 0 ? (
                                <span className="inline-block px-3 py-1 rounded-full text-xs font-black bg-emerald-600 text-white shadow-2xs">
                                  {count} học sinh
                                </span>
                              ) : (
                                <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-600 border border-slate-200">
                                  Đang nhận hồ sơ
                                </span>
                              )}
                            </td>
                            <td className="py-3.5 px-3 sm:px-4 text-center">
                              {isOpen || count > 0 ? (
                                <span className="px-2.5 py-1 rounded-full text-[11px] font-black bg-emerald-100 text-emerald-900 border border-emerald-200 inline-flex items-center justify-center gap-1">
                                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                  <span>Đang mở lớp</span>
                                </span>
                              ) : (
                                <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-900 border border-amber-200 inline-flex items-center justify-center gap-1">
                                  <Clock className="w-3 h-3 text-amber-600" />
                                  <span>Sắp mở lớp</span>
                                </span>
                              )}
                            </td>
                            <td className="py-3.5 px-3 sm:px-4 text-right">
                              <button
                                onClick={() => setSelectedClassId(cls.id)}
                                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-900 hover:bg-blue-600 hover:text-white font-bold text-xs transition-colors cursor-pointer border border-blue-200"
                              >
                                <span>Xem danh sách</span>
                                <ChevronRight className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* VIEW: CHI TIẾT TỪNG LỚP HỌC (ĐẶC BIỆT: TOÁN 12 CƠ BẢN) */}
          {/* ============================================================== */}
          {selectedClass && (
            <div className="space-y-4">
              
              {/* ============================================================== */}
              {/* BẢNG THÔNG TIN HEADER CHÍNH THỨC CỦA LỚP */}
              {/* ============================================================== */}
              <div className="bg-white rounded-2xl border-2 border-slate-200 shadow-xs p-4 sm:p-5 relative overflow-hidden">
                {/* Viền trang trí kiểu văn bản trường học */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600"></div>

                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className="px-2.5 py-0.5 rounded-md text-[11px] font-black uppercase tracking-wide bg-blue-900 text-white">
                        {selectedClass.grade === 'cntt' ? 'CNTT' : `Khối ${selectedClass.grade}`}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-slate-100 text-slate-800 border border-slate-200">
                        {selectedClass.subject} • {selectedClass.level}
                      </span>
                      {selectedClass.id === 'toan-12-cb' && (
                        <span className="px-2.5 py-0.5 rounded-md text-[11px] font-extrabold bg-emerald-100 text-emerald-900 border border-emerald-300 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>Đang mở lớp • Chia 3 phân lớp (CB1, CB2, CB3)</span>
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                      {selectedClass.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1 flex flex-wrap items-center gap-x-4 gap-y-1">
                      <span><strong>Giáo viên:</strong> {selectedClass.teacher || 'Tổ bộ môn'}</span>
                      <span>•</span>
                      <span><strong>Tổng học sinh:</strong> <span className="font-extrabold text-blue-900">{selectedClass.studentCount} em</span></span>
                      <span>•</span>
                      <span><strong>Địa điểm:</strong> Cơ sở Vạn Phú - Đại Từ - Thái Nguyên</span>
                    </p>
                  </div>

                  {/* Nút thao tác nhanh trên header */}
                  <div className="flex flex-wrap items-center gap-2 self-start lg:self-center">
                    <button
                      onClick={handleExportExcel}
                      className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                      title="Tải bảng danh sách định dạng Excel"
                    >
                      <Download className="w-4 h-4" />
                      <span>Xuất Excel (.csv)</span>
                    </button>
                    
                    <button
                      onClick={() => window.print()}
                      className="px-3.5 py-2 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                      title="In bảng danh sách học sinh khổ A4"
                    >
                      <Printer className="w-4 h-4" />
                      <span>In danh sách</span>
                    </button>

                    <button
                      onClick={handleCopyList}
                      className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer border border-slate-200"
                      title="Sao chép danh sách học sinh"
                    >
                      {copiedSuccess ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-600" />
                          <span className="text-emerald-700 font-bold">Đã sao chép!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>Sao chép</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* THỐNG KÊ CƠ CẤU HỌC SINH THEO LỚP TRƯỜNG (Đối với Toán 12 Cơ bản) */}
                {selectedClass.id === 'toan-12-cb' && schoolClassStats.length > 0 && (
                  <div className="mt-4 pt-3.5 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs">
                    <span className="font-extrabold text-slate-700 flex items-center gap-1">
                      <School className="w-3.5 h-3.5 text-blue-700" />
                      <span>Cơ cấu lớp trường:</span>
                    </span>
                    {schoolClassStats.map(([clsName, count]) => (
                      <span
                        key={clsName}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 border border-slate-200 font-bold flex items-center gap-1"
                      >
                        <span className="text-blue-900 font-black">{clsName}:</span>
                        <span>{count} em</span>
                      </span>
                    ))}
                    <span className="text-[11px] text-slate-500 italic ml-1">
                      (Chủ yếu trường THPT Lưu Nhân Chú & Đội Cấn)
                    </span>
                  </div>
                )}
              </div>

              {/* ============================================================== */}
              {/* THÔNG BÁO QUAN TRỌNG: CẢ 3 PHÂN LỚP TOÁN 12 CƠ BẢN ĐÃ ĐẦY */}
              {/* ============================================================== */}
              {selectedClass.id === 'toan-12-cb' && (
                <div className="bg-gradient-to-r from-rose-50 via-amber-50 to-orange-50 border-2 border-rose-300 rounded-2xl p-4 shadow-xs">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-xl bg-rose-600 text-white flex items-center justify-center font-bold flex-shrink-0 shadow-xs mt-0.5">
                        <AlertCircle className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-black text-rose-900 text-sm uppercase tracking-wide">
                            THÔNG BÁO PHÂN LỚP HỌC: ĐÃ ĐẦY CẢ 3 PHÂN LỚP (75 / 75 HỌC SINH)
                          </span>
                        </div>
                        <p className="text-xs text-slate-700 mt-1 leading-relaxed">
                          Hiện tại cả 3 phân lớp <strong>CB1 (29 em)</strong>, <strong>CB2 (23 em)</strong>, và <strong>CB3 (23 em)</strong> đã đủ sĩ số theo quy chuẩn đào tạo chất lượng cao. Học sinh mới đăng ký sẽ được xếp vào <strong>danh sách chờ</strong> hoặc lớp chuyên đề tiếp theo.
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => onOpenConsultationModal(selectedClass.grade)}
                      className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition-colors flex-shrink-0 cursor-pointer"
                    >
                      Đăng Ký Danh Sách Chờ
                    </button>
                  </div>

                  {/* 3 THẺ TỔNG QUAN PHÂN LỚP */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3.5 pt-3 border-t border-rose-200/80 text-xs">
                    <div className="bg-white p-3 rounded-xl border border-blue-200 text-left shadow-2xs relative">
                      <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded text-[10px] font-black bg-rose-600 text-white">
                        ĐÃ ĐẦY
                      </span>
                      <span className="font-black text-blue-900 block text-sm">Phân Lớp CB1</span>
                      <div className="text-slate-600 mt-0.5">GV phụ trách: <strong>Cô Hường</strong></div>
                      <div className="text-base font-black text-slate-900 mt-1">29 học sinh</div>
                      <div className="text-[11px] text-slate-500">100% học sinh 12A9 Lưu Nhân Chú</div>
                    </div>

                    <div className="bg-white p-3 rounded-xl border border-purple-200 text-left shadow-2xs relative">
                      <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded text-[10px] font-black bg-rose-600 text-white">
                        ĐÃ ĐẦY
                      </span>
                      <span className="font-black text-purple-900 block text-sm">Phân Lớp CB2</span>
                      <div className="text-slate-600 mt-0.5">GV phụ trách: <strong>Cô Hân</strong></div>
                      <div className="text-base font-black text-slate-900 mt-1">23 học sinh</div>
                      <div className="text-[11px] text-slate-500">Gồm 12A6 (14 em), 12A7 (9 em)</div>
                    </div>

                    <div className="bg-white p-3 rounded-xl border border-emerald-200 text-left shadow-2xs relative">
                      <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded text-[10px] font-black bg-rose-600 text-white">
                        ĐÃ ĐẦY
                      </span>
                      <span className="font-black text-emerald-900 block text-sm">Phân Lớp CB3</span>
                      <div className="text-slate-600 mt-0.5">GV phụ trách: <strong>Cô Hường</strong></div>
                      <div className="text-base font-black text-slate-900 mt-1">23 học sinh</div>
                      <div className="text-[11px] text-slate-500">Gồm 12A8 (21 em), 12A5 (2 em)</div>
                    </div>
                  </div>
                </div>
              )}

              {/* ============================================================== */}
              {/* BỘ ĐIỀU KHIỂN & BỘ LỌC DANH SÁCH (TOOLBAR) */}
              {/* ============================================================== */}
              <div className="bg-white p-3 sm:p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
                  
                  {/* BỘ LỌC PHÂN LỚP (TABS KIỂU EXCEL CHO TOÁN 12 CƠ BẢN) */}
                  {selectedClass.id === 'toan-12-cb' ? (
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-xs font-bold text-slate-500 mr-1 flex items-center gap-1">
                        <FileSpreadsheet className="w-3.5 h-3.5 text-blue-600" />
                        <span>Xem phân lớp:</span>
                      </span>

                      <button
                        onClick={() => setSubClassFilter('all')}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          subClassFilter === 'all'
                            ? 'bg-blue-900 text-white shadow-xs'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        Tất cả 3 lớp (75 em)
                      </button>

                      <button
                        onClick={() => setSubClassFilter('cb1')}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                          subClassFilter === 'cb1'
                            ? 'bg-blue-700 text-white shadow-xs'
                            : 'bg-blue-50 text-blue-900 hover:bg-blue-100 border border-blue-200'
                        }`}
                      >
                        <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                        <span>CB1 - Cô Hường (29 em)</span>
                      </button>

                      <button
                        onClick={() => setSubClassFilter('cb2')}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                          subClassFilter === 'cb2'
                            ? 'bg-purple-700 text-white shadow-xs'
                            : 'bg-purple-50 text-purple-900 hover:bg-purple-100 border border-purple-200'
                        }`}
                      >
                        <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                        <span>CB2 - Cô Hân (23 em)</span>
                      </button>

                      <button
                        onClick={() => setSubClassFilter('cb3')}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                          subClassFilter === 'cb3'
                            ? 'bg-emerald-700 text-white shadow-xs'
                            : 'bg-emerald-50 text-emerald-900 hover:bg-emerald-100 border border-emerald-200'
                        }`}
                      >
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        <span>CB3 - Cô Hường (23 em)</span>
                      </button>
                    </div>
                  ) : (
                    <div className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-blue-600" />
                      <span>Danh sách học sinh chính thức: <strong>{displayedStudents.length} học sinh</strong></span>
                    </div>
                  )}

                  {/* Ô TÌM KIẾM TỨC THÌ */}
                  <div className="relative flex-1 max-w-md">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Tìm theo họ tên, lớp trường (12A9, 12A8...)..."
                      className="w-full pl-9 pr-8 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-sm font-bold p-1 cursor-pointer"
                        title="Xóa tìm kiếm"
                      >
                        &times;
                      </button>
                    )}
                  </div>
                </div>

                {/* HÀNG DƯỚI: NÚT SẮP XẾP & CHUYỂN CHẾ ĐỘ XEM (BẢNG TÍNH / THẺ) */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2.5 border-t border-slate-100 text-xs">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="font-bold text-slate-600 flex items-center gap-1 mr-1">
                      <ArrowUpDown className="w-3.5 h-3.5 text-blue-600" />
                      <span>Sắp xếp theo:</span>
                    </span>

                    <button
                      onClick={() => setSortBy('assignedClass')}
                      className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                        sortBy === 'assignedClass'
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      Phân lớp (CB1 ➔ CB2 ➔ CB3)
                    </button>

                    <button
                      onClick={() => setSortBy('schoolClass')}
                      className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                        sortBy === 'schoolClass'
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      Lớp trường (12A5 ➔ 12A9)
                    </button>

                    <button
                      onClick={() => setSortBy('name')}
                      className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                        sortBy === 'name'
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      Tên học sinh (A ➔ Z)
                    </button>
                  </div>

                  {/* Nút chuyển chế độ xem: Bảng tính (Table) hoặc Thẻ (Cards) */}
                  <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
                    <button
                      onClick={() => setViewMode('table')}
                      className={`px-2.5 py-1 rounded-lg font-bold text-xs transition-all flex items-center gap-1 cursor-pointer ${
                        viewMode === 'table'
                          ? 'bg-white text-blue-900 shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                      title="Xem dạng bảng tính Excel"
                    >
                      <TableIcon className="w-3.5 h-3.5" />
                      <span>Dạng bảng tính</span>
                    </button>

                    <button
                      onClick={() => setViewMode('cards')}
                      className={`px-2.5 py-1 rounded-lg font-bold text-xs transition-all flex items-center gap-1 cursor-pointer ${
                        viewMode === 'cards'
                          ? 'bg-white text-blue-900 shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                      title="Xem dạng thẻ học sinh"
                    >
                      <LayoutGrid className="w-3.5 h-3.5" />
                      <span>Dạng thẻ</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* ============================================================== */}
              {/* GIAO DIỆN BẢNG DANH SÁCH HỌC SINH (CHẾ ĐỘ BẢNG TÍNH EXCEL) */}
              {/* ============================================================== */}
              {viewMode === 'table' ? (
                <div className="bg-white rounded-2xl border-2 border-slate-300 shadow-sm overflow-hidden">
                  
                  {/* THANH TIÊU ĐỀ BẢNG TÍNH */}
                  <div className="bg-slate-900 text-white p-3 sm:px-4 flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-2">
                      <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                      <span className="font-black uppercase tracking-wide">
                        {selectedClass.name} • {displayedStudents.length} học sinh
                      </span>
                      {selectedClass.id === 'toan-12-cb' && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-black bg-rose-600 text-white uppercase">
                          ĐÃ ĐỦ SĨ SỐ
                        </span>
                      )}
                    </div>

                    <div className="text-slate-300 text-[11px] flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                      <span>
                        {sortBy === 'assignedClass' && 'Đang xếp: Phân lớp ➔ Lớp trường ➔ Tên A-Z'}
                        {sortBy === 'schoolClass' && 'Đang xếp: Lớp trường ➔ Phân lớp ➔ Tên A-Z'}
                        {sortBy === 'name' && 'Đang xếp: Họ tên A ➔ Z (tiếng Việt)'}
                      </span>
                    </div>
                  </div>

                  {/* TABLE CONTAINER VỚI HEADER CỐ ĐỊNH & VIỀN BẢNG RÕ NÉT */}
                  <div className="overflow-x-auto max-h-[520px] scrollbar-thin">
                    <table className="w-full text-left border-collapse text-xs sm:text-sm">
                      <thead className="sticky top-0 bg-slate-100 text-slate-800 font-extrabold border-b-2 border-slate-300 shadow-2xs z-10">
                        <tr>
                          <th className="py-3 px-3 text-center w-14 border-r border-slate-200">STT</th>
                          <th
                            onClick={() => setSortBy('name')}
                            className="py-3 px-4 border-r border-slate-200 cursor-pointer hover:bg-slate-200 transition-colors select-none"
                            title="Bấm để sắp xếp theo Tên A - Z"
                          >
                            <div className="flex items-center gap-1.5">
                              <span>Họ và Tên Học Sinh</span>
                              {sortBy === 'name' && <ArrowUpDown className="w-3 h-3 text-blue-600" />}
                            </div>
                          </th>
                          <th
                            onClick={() => setSortBy('schoolClass')}
                            className="py-3 px-3 text-center w-28 border-r border-slate-200 cursor-pointer hover:bg-slate-200 transition-colors select-none"
                            title="Bấm để sắp xếp theo Lớp trường"
                          >
                            <div className="flex items-center justify-center gap-1">
                              <span>Lớp Trường</span>
                              {sortBy === 'schoolClass' && <ArrowUpDown className="w-3 h-3 text-blue-600" />}
                            </div>
                          </th>
                          <th className="py-3 px-4 border-r border-slate-200">
                            <span>Trường Học</span>
                          </th>
                          <th
                            onClick={() => setSortBy('assignedClass')}
                            className="py-3 px-4 border-r border-slate-200 cursor-pointer hover:bg-slate-200 transition-colors select-none"
                            title="Bấm để sắp xếp theo Phân lớp"
                          >
                            <div className="flex items-center gap-1.5">
                              <span>Phân Lớp Đào Tạo & Giáo Viên</span>
                              {sortBy === 'assignedClass' && <ArrowUpDown className="w-3 h-3 text-blue-600" />}
                            </div>
                          </th>
                          <th className="py-3 px-3 text-center w-28">
                            <span>Điểm Danh</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        {displayedStudents.length === 0 ? (
                          <tr>
                            <td colSpan={6} className="py-12 text-center text-slate-500">
                              <AlertCircle className="w-6 h-6 text-slate-400 mx-auto mb-2" />
                              <span>Không tìm thấy học sinh nào phù hợp với bộ lọc tìm kiếm.</span>
                            </td>
                          </tr>
                        ) : (
                          displayedStudents.map((student, idx) => {
                            const isCB1 = student.assignedClass.includes('CB1');
                            const isCB2 = student.assignedClass.includes('CB2');
                            const isCB3 = student.assignedClass.includes('CB3');
                            const studentKey = student.id || `st-${idx}`;
                            const isChecked = !!checkedAttendance[studentKey];

                            return (
                              <tr
                                key={studentKey}
                                className={`transition-colors hover:bg-blue-50/70 ${
                                  idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'
                                } ${isChecked ? 'bg-emerald-50/50' : ''}`}
                              >
                                {/* STT */}
                                <td className="py-3 px-3 text-center font-bold text-slate-500 border-r border-slate-200">
                                  {idx + 1}
                                </td>

                                {/* Họ và Tên */}
                                <td className="py-3 px-4 font-black text-slate-900 border-r border-slate-200">
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm sm:text-base">{student.name}</span>
                                    {isChecked && (
                                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                                    )}
                                  </div>
                                </td>

                                {/* Lớp trường */}
                                <td className="py-3 px-3 text-center border-r border-slate-200">
                                  <span className="inline-block px-2.5 py-1 rounded-md font-black text-xs bg-slate-100 text-slate-800 border border-slate-300 shadow-2xs">
                                    {student.schoolClass}
                                  </span>
                                </td>

                                {/* Trường học */}
                                <td className="py-3 px-4 text-slate-700 font-medium border-r border-slate-200">
                                  {student.schoolName || 'THPT Lưu Nhân Chú'}
                                </td>

                                {/* Phân lớp & Giáo viên */}
                                <td className="py-3 px-4 border-r border-slate-200">
                                  <span
                                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black border shadow-2xs ${
                                      isCB1
                                        ? 'bg-blue-100 text-blue-950 border-blue-300'
                                        : isCB2
                                        ? 'bg-purple-100 text-purple-950 border-purple-300'
                                        : isCB3
                                        ? 'bg-emerald-100 text-emerald-950 border-emerald-300'
                                        : 'bg-indigo-100 text-indigo-950 border-indigo-300'
                                    }`}
                                  >
                                    <span
                                      className={`w-2 h-2 rounded-full ${
                                        isCB1
                                          ? 'bg-blue-600'
                                          : isCB2
                                          ? 'bg-purple-600'
                                          : isCB3
                                          ? 'bg-emerald-600'
                                          : 'bg-indigo-600'
                                      }`}
                                    ></span>
                                    <span>{student.assignedClass}</span>
                                  </span>
                                </td>

                                {/* Điểm danh / Ký nhận */}
                                <td className="py-3 px-3 text-center">
                                  <button
                                    onClick={() => toggleAttendance(studentKey)}
                                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1 mx-auto ${
                                      isChecked
                                        ? 'bg-emerald-600 text-white shadow-xs'
                                        : 'bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-200'
                                    }`}
                                    title="Tích điểm danh học sinh"
                                  >
                                    {isChecked ? (
                                      <>
                                        <Check className="w-3 h-3" />
                                        <span>Có mặt</span>
                                      </>
                                    ) : (
                                      <span>Điểm danh</span>
                                    )}
                                  </button>
                                </td>
                              </tr>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* THỐNG KÊ CUỐI BẢNG TÍNH */}
                  <div className="bg-slate-100 p-3 sm:px-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-700">
                    <span className="font-extrabold">
                      Tổng số: <span className="text-blue-900">{displayedStudents.length} học sinh</span> trong bảng hiển thị
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="text-slate-500">
                        Đã điểm danh: <strong>{Object.values(checkedAttendance).filter(Boolean).length}</strong> em
                      </span>
                      <span>•</span>
                      <button
                        onClick={handleExportExcel}
                        className="text-blue-800 hover:underline font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Tải file Excel đầy đủ</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                /* ============================================================== */
                /* GIAO DIỆN DẠNG THẺ HỌC SINH (CARDS VIEW) */
                /* ============================================================== */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {displayedStudents.map((student, idx) => {
                    const isCB1 = student.assignedClass.includes('CB1');
                    const isCB2 = student.assignedClass.includes('CB2');
                    const isCB3 = student.assignedClass.includes('CB3');
                    const studentKey = student.id || `st-${idx}`;
                    const isChecked = !!checkedAttendance[studentKey];

                    return (
                      <div
                        key={studentKey}
                        className={`bg-white p-3.5 rounded-2xl border-2 transition-all shadow-xs relative ${
                          isChecked
                            ? 'border-emerald-400 bg-emerald-50/20'
                            : 'border-slate-200 hover:border-blue-300'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center text-xs font-black">
                              {idx + 1}
                            </span>
                            <div>
                              <h4 className="font-black text-slate-900 text-sm">
                                {student.name}
                              </h4>
                              <span className="text-[11px] text-slate-500">
                                {student.schoolName || 'THPT Lưu Nhân Chú'}
                              </span>
                            </div>
                          </div>

                          <span className="px-2 py-0.5 rounded-md font-black text-xs bg-slate-100 text-slate-800 border border-slate-300">
                            {student.schoolClass}
                          </span>
                        </div>

                        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[11px] font-black border ${
                              isCB1
                                ? 'bg-blue-100 text-blue-900 border-blue-300'
                                : isCB2
                                ? 'bg-purple-100 text-purple-900 border-purple-300'
                                : isCB3
                                ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                                : 'bg-indigo-100 text-indigo-900 border-indigo-300'
                            }`}
                          >
                            {student.assignedClass}
                          </span>

                          <button
                            onClick={() => toggleAttendance(studentKey)}
                            className={`px-2 py-0.5 rounded-md text-[11px] font-bold cursor-pointer transition-colors ${
                              isChecked
                                ? 'bg-emerald-600 text-white'
                                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                            }`}
                          >
                            {isChecked ? '✓ Có mặt' : 'Điểm danh'}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* ============================================================== */}
              {/* KHỐI THÔNG TIN CHI TIẾT BỔ TRỢ (GIÁO VIÊN & LỊCH HỌC) */}
              {/* ============================================================== */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
                <h4 className="text-sm font-black text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Kế Hoạch & Thông Tin Giảng Dạy:</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                    <span className="font-bold text-slate-500 block mb-1">Đội ngũ giáo viên phụ trách:</span>
                    <span className="font-extrabold text-slate-900 block text-sm">
                      {selectedClass.teacher || 'Tổ bộ môn Toán phụ trách'}
                    </span>
                    <span className="text-[11px] text-slate-500 mt-1 block">
                      Cô Hường phụ trách lớp CB1 & CB3 • Cô Hân phụ trách lớp CB2
                    </span>
                  </div>

                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                    <span className="font-bold text-slate-500 block mb-1">Lịch học & phòng học:</span>
                    <span className="font-extrabold text-slate-900 block text-sm">
                      {selectedClass.schedule || 'Sắp xếp theo thời khóa biểu học sinh'}
                    </span>
                    <span className="text-[11px] text-slate-500 mt-1 block">
                      Phòng học tiêu chuẩn máy lạnh, máy chiếu, bảng trượt hiện đại
                    </span>
                  </div>
                </div>
              </div>

              {/* Nút hành động chân trang */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <button
                  onClick={() => {
                    onClose();
                    onOpenConsultationModal(selectedClass.grade);
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-blue-900 to-indigo-900 hover:from-blue-800 hover:to-indigo-800 text-white font-black text-xs sm:text-sm rounded-xl shadow-md cursor-pointer flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Đăng Ký Tư Vấn & Xếp Lớp Mới</span>
                </button>

                <button
                  onClick={() => setSelectedClassId('all')}
                  className="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm rounded-xl cursor-pointer"
                >
                  Xem tổng hợp các lớp khác ({totalCenterStudents} em)
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ============================================================== */}
        {/* MODAL FOOTER */}
        {/* ============================================================== */}
        <div className="p-3.5 sm:px-6 bg-white border-t border-slate-200 flex-shrink-0 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-600 flex items-center gap-2">
            <School className="w-4 h-4 text-blue-800 flex-shrink-0" />
            <span className="truncate">
              Cơ Sở Giáo Dục Thầy Hoàng - Vạn Phú (Đại Từ - Thái Nguyên)
            </span>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={() => {
                onClose();
                onOpenConsultationModal();
              }}
              className="flex-1 sm:flex-none px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-black text-xs rounded-xl shadow-xs cursor-pointer transition-colors"
            >
              Đăng Ký Xếp Lớp
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl cursor-pointer"
            >
              Đóng
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
