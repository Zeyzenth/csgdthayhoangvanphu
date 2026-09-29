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
  ArrowUpDown
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
  const [isUnlocked, setIsUnlocked] = useState<boolean>(() => {
    return sessionStorage.getItem('thvp_roster_auth') === 'true';
  });
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string>('');
  const [subClassFilter, setSubClassFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'assignedClass' | 'schoolClass' | 'name'>('assignedClass');

  // Sync initialClassId if provided
  useEffect(() => {
    if (initialClassId) {
      if (initialClassId === 'toan-12-all' || initialClassId === 'all' || initialClassId === 'both-separate') {
        setSelectedClassId('all');
      } else if (initialClassId === 'toan-12-cb1' || initialClassId === 'toan-12-cb2' || initialClassId === 'toan-12-cb3' || initialClassId === 'toan-12-cb4') {
        setSelectedClassId('toan-12-cb');
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
    setSubClassFilter('all');
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

  // Xác thực mật khẩu THVP2026
  const handleVerifyPassword = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (passwordInput.trim() === 'THVP2026') {
      setIsUnlocked(true);
      setAuthError('');
      sessionStorage.setItem('thvp_roster_auth', 'true');
      setPasswordInput('');
    } else {
      setAuthError('Mật khẩu không chính xác. Vui lòng kiểm tra lại!');
    }
  };

  const handleLockAgain = () => {
    setIsUnlocked(false);
    sessionStorage.removeItem('thvp_roster_auth');
    setPasswordInput('');
    setAuthError('');
  };

  // Danh sách học sinh theo phân lớp và tìm kiếm (được sắp xếp A1 -> A9, rồi A -> Z)
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

    // Sắp xếp linh hoạt theo tùy chọn (mặc định: Phân lớp CB1 -> CB2 -> CB3, sau đó đến Lớp trường A1-A9, rồi đến Tên A-Z)
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
  }, [selectedClass, subClassFilter, searchQuery]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl max-h-[92vh] flex flex-col overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-blue-900 text-white p-4 sm:p-6 flex-shrink-0 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/90 transition-colors cursor-pointer"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-amber-400 text-slate-950 flex items-center gap-1">
              <Users className="w-3.5 h-3.5" />
              <span>THỐNG KÊ SĨ SỐ & THÔNG TIN LỚP HỌC</span>
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white/15 text-blue-100 border border-white/20">
              Tổng số học sinh đang học: <strong className="text-amber-300 ml-1">{totalCenterStudents} em</strong>
            </span>
            {isUnlocked ? (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 flex items-center gap-1">
                <Unlock className="w-3 h-3 text-emerald-400" />
                <span>Đã mở khóa danh sách</span>
              </span>
            ) : (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-200 border border-amber-400/30 flex items-center gap-1">
                <Lock className="w-3 h-3 text-amber-300" />
                <span>Bảo mật danh sách</span>
              </span>
            )}
          </div>

          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white uppercase">
            {selectedClassId === 'all'
              ? `BẢNG TỔNG HỢP SĨ SỐ CÁC LỚP HỌC (${totalCenterStudents} HỌC SINH)`
              : selectedClass?.name
              ? `${selectedClass.name.toUpperCase()} - ${selectedClass.studentCount ? `${selectedClass.studentCount} HỌC SINH` : selectedClass.statusLabel}`
              : 'THÔNG TIN SĨ SỐ LỚP HỌC'}
          </h2>

          <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs sm:text-sm text-blue-200 mt-2">
            <div className="flex items-center gap-1.5">
              <School className="w-4 h-4 text-emerald-300" />
              <span>Cơ sở: <strong className="text-white">Khu Đô Thị Vạn Phú - Thái Nguyên</strong></span>
            </div>
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Tất cả các lớp đang mở tiếp nhận học sinh</span>
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="bg-slate-100 p-2 sm:px-6 border-b border-slate-200 flex-shrink-0 flex items-center gap-2 overflow-x-auto">
          <span className="text-xs font-bold text-slate-500 hidden sm:inline flex-shrink-0">
            Xem lớp:
          </span>
          <button
            onClick={() => setSelectedClassId('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex-shrink-0 cursor-pointer ${
              selectedClassId === 'all'
                ? 'bg-blue-900 text-white shadow-sm'
                : 'bg-white text-slate-700 hover:bg-slate-200'
            }`}
          >
            Tất Cả Các Lớp ({totalCenterStudents} em)
          </button>
          <button
            onClick={() => setSelectedClassId('toan-12-cb')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex-shrink-0 cursor-pointer flex items-center gap-1.5 ${
              selectedClassId === 'toan-12-cb'
                ? 'bg-blue-900 text-white shadow-sm'
                : 'bg-white text-blue-950 hover:bg-blue-50 border border-blue-200'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Toán 12 Cơ Bản (75 em • Đang mở)</span>
          </button>
          <button
            onClick={() => setSelectedClassId('toan-12-nc')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex-shrink-0 cursor-pointer flex items-center gap-1.5 ${
              selectedClassId === 'toan-12-nc'
                ? 'bg-purple-900 text-white shadow-sm'
                : 'bg-white text-purple-950 hover:bg-purple-50 border border-purple-300'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Toán 12 Nâng Cao (5 em • Đang mở)</span>
          </button>
          <button
            onClick={() => setSelectedClassId('toan-11-cb')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex-shrink-0 cursor-pointer flex items-center gap-1.5 ${
              selectedClassId === 'toan-11-cb'
                ? 'bg-indigo-900 text-white shadow-sm'
                : 'bg-white text-indigo-950 hover:bg-indigo-50 border border-indigo-200'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Toán 11 (34 em • Đang mở)</span>
          </button>
          <button
            onClick={() => setSelectedClassId('cntt-active')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex-shrink-0 cursor-pointer flex items-center gap-1.5 ${
              selectedClassId === 'cntt-active'
                ? 'bg-cyan-800 text-white shadow-sm'
                : 'bg-white text-cyan-950 hover:bg-cyan-50 border border-cyan-300'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>CNTT & Kỹ Năng Số (18 em • Đang mở)</span>
          </button>
          <button
            onClick={() => setSelectedClassId('toan-10-cb')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex-shrink-0 cursor-pointer flex items-center gap-1.5 ${
              selectedClassId === 'toan-10-cb'
                ? 'bg-emerald-800 text-white shadow-sm'
                : 'bg-white text-emerald-950 hover:bg-emerald-50 border border-emerald-300'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Toán 10 (Đang mở lớp)</span>
          </button>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-grow overflow-y-auto p-4 sm:p-6 bg-slate-50 space-y-6">
          {/* VIEW: TẤT CẢ CÁC LỚP (BẢNG TỔNG HỢP SĨ SỐ) */}
          {selectedClassId === 'all' && (
            <div className="space-y-6">
              {/* Stat Summary Boxes */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-gradient-to-br from-blue-900 to-indigo-900 text-white p-4 rounded-2xl shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-blue-200 uppercase tracking-wider">Tổng Học Sinh Đang Học</span>
                    <Users className="w-5 h-5 text-amber-300" />
                  </div>
                  <div className="text-3xl font-black mt-2 text-white">{totalCenterStudents} <span className="text-sm font-semibold text-blue-200">em</span></div>
                  <p className="text-[11px] text-blue-200 mt-1">Đã đăng ký và xếp lớp chính thức</p>
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
                    <span className="text-xs font-bold text-emerald-200 uppercase tracking-wider">Lớp Đang Tuyển Sinh Mới</span>
                    <Sparkles className="w-5 h-5 text-emerald-300" />
                  </div>
                  <div className="text-3xl font-black mt-2 text-white">100% <span className="text-sm font-semibold text-emerald-200">mở lớp</span></div>
                  <p className="text-[11px] text-emerald-200 mt-1">Nhận học viên liên tục các khối môn</p>
                </div>
              </div>

              {/* Master Summary Table */}
              <div className="bg-white rounded-2xl shadow-xs border border-slate-200 overflow-hidden">
                <div className="p-4 bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="font-black text-sm uppercase tracking-wide flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-amber-400" />
                      <span>Bảng Thống Kê Tổng Sĩ Số Từng Lớp Học</span>
                    </h3>
                    <p className="text-xs text-slate-300 mt-0.5">
                      Hiển thị số lượng học sinh theo từng lớp. Để xem chi tiết danh sách học sinh, vui lòng chọn lớp và nhập mật khẩu bảo mật.
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
                        <th className="py-3 px-3 sm:px-4 text-center">Khối Lớp</th>
                        <th className="py-3 px-3 sm:px-4 text-center">Trình Độ</th>
                        <th className="py-3 px-3 sm:px-4 text-center">Tổng Sĩ Số</th>
                        <th className="py-3 px-3 sm:px-4 text-center">Trạng Thái</th>
                        <th className="py-3 px-3 sm:px-4 text-right">Chi Tiết</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {ACTIVE_CLASSES.map((cls, idx) => {
                        const count = cls.studentCount ?? 0;
                        const isOpen = cls.isOpen || cls.status === 'enrolling';

                        return (
                          <tr
                            key={cls.id}
                            className="hover:bg-blue-50/50 transition-colors bg-emerald-50/15"
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
                                <span className="inline-block px-3 py-1 rounded-full text-xs font-black shadow-2xs bg-emerald-600 text-white">
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
                                <span className="px-2.5 py-1 rounded-full text-[11px] font-black bg-emerald-100 text-emerald-900 border border-emerald-200 flex items-center justify-center gap-1">
                                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                  <span>Đang mở lớp</span>
                                </span>
                              ) : (
                                <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-900 border border-amber-200 flex items-center justify-center gap-1">
                                  <Clock className="w-3 h-3 text-amber-600" />
                                  <span>Sắp mở lớp</span>
                                </span>
                              )}
                            </td>
                            <td className="py-3.5 px-3 sm:px-4 text-right">
                              <button
                                onClick={() => setSelectedClassId(cls.id)}
                                className="px-3 py-1.5 rounded-lg bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs transition-colors cursor-pointer inline-flex items-center gap-1"
                              >
                                <span>Xem</span>
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

          {/* VIEW: CHI TIẾT TỪNG LỚP HỌC */}
          {selectedClassId !== 'all' && selectedClass && (
            <div className="space-y-6">
              {/* Prominent Header Banner */}
              <div className="p-5 rounded-3xl border shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-emerald-50/80 border-emerald-300 text-emerald-950">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 font-bold shadow-xs bg-emerald-600 text-white">
                    <CheckCircle2 className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-xs font-black uppercase px-2.5 py-0.5 rounded-full bg-white/80 border">
                        {selectedClass.subject} • {selectedClass.grade === 'cntt' ? 'Khối CNTT' : selectedClass.grade === 'van-chu-dep' ? 'Khối Chữ Đẹp' : `Khối ${selectedClass.grade}`}
                      </span>
                      <span className="text-xs font-black uppercase px-2.5 py-0.5 rounded-full bg-emerald-200 text-emerald-900 border border-emerald-300">
                        {selectedClass.statusLabel}
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                      {selectedClass.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-700 mt-1 leading-relaxed">
                      {selectedClass.note}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenConsultationModal(selectedClass.grade);
                  }}
                  className="px-5 py-3 rounded-2xl font-black text-xs sm:text-sm text-white shadow-md transition-all flex-shrink-0 cursor-pointer bg-emerald-700 hover:bg-emerald-800"
                >
                  Đăng ký xếp lớp ngay
                </button>
              </div>

              {/* Sĩ số Highlight Card */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-5 rounded-2xl bg-blue-50 border border-blue-200 text-center">
                    <span className="text-xs font-bold text-blue-800 uppercase tracking-wider block mb-1">
                      Tổng Số Học Sinh
                    </span>
                    <div className="text-4xl font-black text-blue-950">
                      {selectedClass.studentCount ? selectedClass.studentCount : 0}{' '}
                      <span className="text-base font-bold text-slate-600">học sinh</span>
                    </div>
                    <span className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-black bg-emerald-100 text-emerald-900">
                      {selectedClass.statusLabel}
                    </span>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                    <span className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-1">
                      Trình Độ & Định Hướng
                    </span>
                    <div className="text-xl font-black text-slate-900 mt-2">
                      Lớp {selectedClass.level}
                    </div>
                    <p className="text-xs text-slate-600 mt-1">
                      {selectedClass.level === 'Nâng Cao'
                        ? 'Vận dụng cao 8.5+, 9+, Chuyên & HSG'
                        : 'Vững nền tảng, chống liệt, thi tốt nghiệp 7-8+'}
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                    <span className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-1">
                      Địa Điểm Học Tập
                    </span>
                    <div className="text-sm font-black text-slate-900 mt-2">
                      Khu Đô Thị Vạn Phú
                    </div>
                    <p className="text-xs text-slate-600 mt-1">
                      Cơ sở chính tại Vạn Phú - Thái Nguyên
                    </p>
                  </div>
                </div>

                {/* Sĩ số chi tiết theo phân lớp đối với Toán 12 Cơ bản - THÔNG BÁO ĐÃ ĐẦY CẢ 3 LỚP */}
                {selectedClass.id === 'toan-12-cb' && (
                  <div className="p-4 sm:p-5 bg-gradient-to-br from-rose-50 via-amber-50/60 to-blue-50/50 rounded-2xl border-2 border-rose-300 shadow-xs space-y-3">
                    {/* Banner Thông báo Lớp đã đầy cả 3 lớp */}
                    <div className="flex items-start sm:items-center gap-3 p-3 bg-gradient-to-r from-rose-600 to-red-600 text-white rounded-xl shadow-xs">
                      <div className="p-1.5 rounded-lg bg-white/20 text-white flex-shrink-0">
                        <AlertCircle className="w-5 h-5 animate-pulse" />
                      </div>
                      <div className="text-xs">
                        <span className="font-black uppercase tracking-wider block text-white text-xs sm:text-sm">
                          THÔNG BÁO: ĐÃ ĐẦY SĨ SỐ CẢ 3 PHÂN LỚP TOÁN 12 CƠ BẢN (75/75 HỌC SINH)
                        </span>
                        <p className="text-[11px] sm:text-xs text-rose-100 mt-0.5 leading-relaxed">
                          Hiện tại cả 3 phân lớp (<strong>CB1</strong>: 29 em, <strong>CB2</strong>: 23 em, <strong>CB3</strong>: 23 em) đều đã đạt 100% sĩ số và tạm ngừng nhận thêm học sinh mới để đảm bảo chất lượng giảng dạy tốt nhất.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-xs font-black text-slate-800 uppercase tracking-wide flex items-center gap-1.5">
                        <Users className="w-4 h-4 text-rose-600" />
                        <span>Sĩ Số Chi Tiết Từng Phân Lớp (ĐÃ ĐẦY CẢ 3 LỚP):</span>
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black bg-rose-100 text-rose-800 border border-rose-300 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-600"></span>
                        <span>Đã đủ sĩ số 100%</span>
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                      <div className="bg-white p-3.5 rounded-xl border-2 border-rose-200 text-center relative shadow-xs overflow-hidden">
                        <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded text-[10px] font-black bg-rose-600 text-white uppercase tracking-wider shadow-xs">
                          ĐÃ ĐẦY
                        </span>
                        <span className="font-bold text-blue-900 block pr-12 text-left">Lớp CB 1 (GV: Cô Hường)</span>
                        <strong className="text-xl font-black text-slate-900 block my-1">29 học sinh</strong>
                        <span className="text-[11px] text-slate-500 block">100% 12A9 THPT Lưu Nhân Chú</span>
                        <span className="inline-block mt-2 px-2 py-0.5 rounded-md text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                          Khóa tuyển sinh
                        </span>
                      </div>

                      <div className="bg-white p-3.5 rounded-xl border-2 border-rose-200 text-center relative shadow-xs overflow-hidden">
                        <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded text-[10px] font-black bg-rose-600 text-white uppercase tracking-wider shadow-xs">
                          ĐÃ ĐẦY
                        </span>
                        <span className="font-bold text-purple-900 block pr-12 text-left">Lớp CB 2 (GV: Cô Hân)</span>
                        <strong className="text-xl font-black text-slate-900 block my-1">23 học sinh</strong>
                        <span className="text-[11px] text-slate-500 block">12A6, 12A7, THPT Đội Cấn</span>
                        <span className="inline-block mt-2 px-2 py-0.5 rounded-md text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                          Khóa tuyển sinh
                        </span>
                      </div>

                      <div className="bg-white p-3.5 rounded-xl border-2 border-rose-200 text-center relative shadow-xs overflow-hidden">
                        <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded text-[10px] font-black bg-rose-600 text-white uppercase tracking-wider shadow-xs">
                          ĐÃ ĐẦY
                        </span>
                        <span className="font-bold text-emerald-900 block pr-12 text-left">Lớp CB 3 (GV: Cô Hường)</span>
                        <strong className="text-xl font-black text-slate-900 block my-1">23 học sinh</strong>
                        <span className="text-[11px] text-slate-500 block">12A8, 12A5 Lưu Nhân Chú</span>
                        <span className="inline-block mt-2 px-2 py-0.5 rounded-md text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                          Khóa tuyển sinh
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Sĩ số chi tiết đối với Toán 11 */}
                {selectedClass.id === 'toan-11-cb' && (
                  <div className="p-4 bg-indigo-50/80 rounded-2xl border border-indigo-200 space-y-2">
                    <span className="text-xs font-bold text-indigo-900 uppercase tracking-wide block">
                      Thống Kê Sĩ Số 2 Phân Lớp Toán 11:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <div className="bg-white p-3 rounded-xl border border-indigo-100 text-center">
                        <span className="font-bold text-indigo-900 block">Phân lớp CB 1</span>
                        <strong className="text-base font-black text-indigo-950">19 học sinh</strong>
                      </div>
                      <div className="bg-white p-3 rounded-xl border border-indigo-100 text-center">
                        <span className="font-bold text-indigo-900 block">Phân lớp CB 2</span>
                        <strong className="text-base font-black text-indigo-950">15 học sinh</strong>
                      </div>
                    </div>
                  </div>
                )}

                {/* PHẦN XÁC THỰC MẬT KHẨU / XEM DANH SÁCH CHI TIẾT */}
                {selectedClass.students && selectedClass.students.length > 0 ? (
                  <div className="pt-2">
                    {!isUnlocked ? (
                      /* KHỐI NHẬP MẬT KHẨU ĐỂ MỞ KHÓA DANH SÁCH */
                      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 text-white rounded-3xl p-6 sm:p-8 border border-slate-700 shadow-lg">
                        <div className="max-w-xl mx-auto text-center space-y-4">
                          <div className="w-14 h-14 rounded-2xl bg-amber-400/20 text-amber-400 mx-auto flex items-center justify-center font-bold shadow-inner">
                            <Lock className="w-7 h-7" />
                          </div>

                          <div>
                            <h4 className="text-lg sm:text-xl font-black text-white uppercase tracking-wide">
                              Xem Danh Sách Học Sinh Chi Tiết
                            </h4>
                            <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                              Khu vực bảo mật thông tin học sinh. Vui lòng nhập mật khẩu xác thực để mở khóa và xem danh sách chi tiết (phân định rõ ai ở lớp 1, 2 hay 3).
                            </p>
                          </div>

                          <form onSubmit={handleVerifyPassword} className="space-y-3 pt-2">
                            <div className="flex flex-col sm:flex-row gap-2.5 justify-center items-stretch max-w-md mx-auto">
                              <div className="relative flex-1">
                                <input
                                  type={showPassword ? 'text' : 'password'}
                                  value={passwordInput}
                                  onChange={(e) => {
                                    setPasswordInput(e.target.value);
                                    if (authError) setAuthError('');
                                  }}
                                  placeholder="Nhập mật khẩu xác thực..."
                                  className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-600 text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                                />
                                <button
                                  type="button"
                                  onClick={() => setShowPassword(!showPassword)}
                                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white cursor-pointer"
                                  aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                                >
                                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                              </div>

                              <button
                                type="submit"
                                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer flex-shrink-0"
                              >
                                <Lock className="w-4 h-4" />
                                <span>Mở Khóa</span>
                              </button>
                            </div>

                            {authError && (
                              <div className="text-xs font-bold text-rose-400 flex items-center justify-center gap-1.5 animate-bounce">
                                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                                <span>{authError}</span>
                              </div>
                            )}
                          </form>
                        </div>
                      </div>
                    ) : (
                      /* DANH SÁCH HỌC SINH ĐÃ ĐƯỢC MỞ KHÓA THÀNH CÔNG */
                      <div className="space-y-4 pt-2">
                        {/* Thanh trạng thái mở khóa */}
                        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-emerald-950">
                          <div className="flex items-center gap-2.5">
                            <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                            <div>
                              <span className="font-extrabold text-xs text-emerald-900 block">
                                ĐÃ XÁC THỰC THÀNH CÔNG • MỞ KHÓA DANH SÁCH HỌC SINH
                              </span>
                              <span className="text-[11px] text-slate-600">
                                Sắp xếp chuẩn: Lớp trường 12A5 &rarr; 12A9 &rarr; THPT Đội Cấn, tên học sinh sắp xếp A &rarr; Z
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 w-full sm:w-auto">
                            <button
                              onClick={() => window.print()}
                              className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs transition-colors flex items-center gap-1 cursor-pointer"
                            >
                              <Printer className="w-3.5 h-3.5" />
                              <span>In danh sách</span>
                            </button>
                            <button
                              onClick={handleLockAgain}
                              className="px-3 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs transition-colors flex items-center gap-1 cursor-pointer"
                            >
                              <Lock className="w-3.5 h-3.5" />
                              <span>Khóa lại</span>
                            </button>
                          </div>
                        </div>

                        {/* Bộ lọc phân lớp (cho Toán 12 Cơ bản), Bộ sắp xếp & Ô tìm kiếm */}
                        <div className="flex flex-col gap-3 bg-slate-50 p-3 sm:p-4 rounded-2xl border border-slate-200">
                          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
                            {selectedClass.id === 'toan-12-cb' && (
                              <div className="flex flex-wrap items-center gap-1.5">
                                <span className="text-xs font-bold text-slate-500 mr-1">Xem:</span>
                                <button
                                  onClick={() => setSubClassFilter('all')}
                                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                    subClassFilter === 'all'
                                      ? 'bg-blue-900 text-white shadow-xs'
                                      : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
                                  }`}
                                >
                                  Tất cả (75 em • ĐÃ ĐẦY CẢ 3 LỚP)
                                </button>
                                <button
                                  onClick={() => setSubClassFilter('cb1')}
                                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                    subClassFilter === 'cb1'
                                      ? 'bg-blue-700 text-white shadow-xs'
                                      : 'bg-white text-blue-900 hover:bg-blue-50 border border-blue-200'
                                  }`}
                                >
                                  Lớp CB1 - Cô Hường (29 em • ĐÃ ĐẦY)
                                </button>
                                <button
                                  onClick={() => setSubClassFilter('cb2')}
                                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                    subClassFilter === 'cb2'
                                      ? 'bg-purple-700 text-white shadow-xs'
                                      : 'bg-white text-purple-900 hover:bg-purple-50 border border-purple-200'
                                  }`}
                                >
                                  Lớp CB2 - Cô Hân (23 em • ĐÃ ĐẦY)
                                </button>
                                <button
                                  onClick={() => setSubClassFilter('cb3')}
                                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                    subClassFilter === 'cb3'
                                      ? 'bg-emerald-700 text-white shadow-xs'
                                      : 'bg-white text-emerald-900 hover:bg-emerald-50 border border-emerald-200'
                                  }`}
                                >
                                  Lớp CB3 - Cô Hường (23 em • ĐÃ ĐẦY)
                                </button>
                              </div>
                            )}

                            <div className="relative flex-1 max-w-md">
                              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                              <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Tìm theo tên học sinh, lớp trường (12A5, 12A6...)..."
                                className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-white border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                              {searchQuery && (
                                <button
                                  onClick={() => setSearchQuery('')}
                                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
                                >
                                  &times;
                                </button>
                              )}
                            </div>
                          </div>

                          {/* Tùy chọn sắp xếp thứ tự: Phân lớp học, Lớp trường, Tên A-Z */}
                          <div className="flex flex-wrap items-center justify-between gap-2 pt-2.5 border-t border-slate-200/80 text-xs">
                            <div className="flex flex-wrap items-center gap-1.5">
                              <span className="font-bold text-slate-600 flex items-center gap-1 mr-1">
                                <ArrowUpDown className="w-3.5 h-3.5 text-blue-600" />
                                <span>Sắp xếp:</span>
                              </span>
                              <button
                                onClick={() => setSortBy('assignedClass')}
                                className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1 ${
                                  sortBy === 'assignedClass'
                                    ? 'bg-blue-600 text-white shadow-xs'
                                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                                }`}
                              >
                                <span>Thứ tự Phân lớp (CB1 ➔ CB2 ➔ CB3)</span>
                              </button>
                              <button
                                onClick={() => setSortBy('schoolClass')}
                                className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1 ${
                                  sortBy === 'schoolClass'
                                    ? 'bg-blue-600 text-white shadow-xs'
                                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                                }`}
                              >
                                <span>Lớp trường (A1 ➔ A9)</span>
                              </button>
                              <button
                                onClick={() => setSortBy('name')}
                                className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1 ${
                                  sortBy === 'name'
                                    ? 'bg-blue-600 text-white shadow-xs'
                                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                                }`}
                              >
                                <span>Tên học sinh (A ➔ Z)</span>
                              </button>
                            </div>

                            <div className="text-[11px] text-slate-500 italic">
                              {sortBy === 'assignedClass' && 'Ưu tiên: Phân lớp CB1 ➔ CB2 ➔ CB3, tiếp đến Lớp trường A1-A9, sau đó Tên A-Z'}
                              {sortBy === 'schoolClass' && 'Ưu tiên: Lớp trường A1 ➔ A9, tiếp đến Phân lớp, sau đó Tên A-Z'}
                              {sortBy === 'name' && 'Ưu tiên: Bảng chữ cái họ tên học sinh A ➔ Z theo chuẩn tiếng Việt'}
                            </div>
                          </div>
                        </div>

                        {/* BẢNG DANH SÁCH HỌC SINH CHI TIẾT */}
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                          <div className="p-3.5 bg-slate-900 text-white flex flex-wrap items-center justify-between gap-2 text-xs">
                            <span className="font-bold flex items-center gap-1.5">
                              <Users className="w-4 h-4 text-amber-400" />
                              <span>
                                Danh Sách Học Sinh: {displayedStudents.length} học sinh
                                {selectedClass.id === 'toan-12-cb' && (
                                  <span className="ml-2 px-2 py-0.5 rounded-full text-[10px] font-black bg-rose-600 text-white uppercase tracking-wider">
                                    ĐÃ ĐẦY CẢ 3 LỚP
                                  </span>
                                )}
                                {selectedClass.id === 'toan-12-cb' && subClassFilter !== 'all' && (
                                  <span className="ml-1 text-amber-300 font-extrabold">
                                    ({subClassFilter.toUpperCase()})
                                  </span>
                                )}
                              </span>
                            </span>
                            <span className="text-slate-300 text-[11px] flex items-center gap-1.5">
                              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                              {sortBy === 'assignedClass' && 'Sắp xếp: Phân lớp (CB1 ➔ CB2 ➔ CB3) & Lớp trường (A1 ➔ A9) & Tên A - Z'}
                              {sortBy === 'schoolClass' && 'Sắp xếp: Lớp trường (A1 ➔ A9) & Phân lớp & Tên A - Z'}
                              {sortBy === 'name' && 'Sắp xếp: Tên học sinh A - Z (chuẩn tiếng Việt)'}
                            </span>
                          </div>

                          <div className="overflow-x-auto max-h-[460px]">
                            <table className="w-full text-left border-collapse text-xs sm:text-sm">
                              <thead className="sticky top-0 bg-slate-100 text-slate-700 font-bold border-b border-slate-200 shadow-xs z-10">
                                <tr>
                                  <th className="py-2.5 px-3 sm:px-4 text-center w-12">STT</th>
                                  <th
                                    onClick={() => setSortBy('name')}
                                    className="py-2.5 px-3 sm:px-4 cursor-pointer hover:bg-slate-200 transition-colors select-none"
                                    title="Nhấn để sắp xếp theo Tên học sinh A - Z"
                                  >
                                    <div className="flex items-center gap-1">
                                      <span>Họ và tên</span>
                                      {sortBy === 'name' && <ArrowUpDown className="w-3 h-3 text-blue-600" />}
                                    </div>
                                  </th>
                                  <th
                                    onClick={() => setSortBy('schoolClass')}
                                    className="py-2.5 px-3 sm:px-4 text-center cursor-pointer hover:bg-slate-200 transition-colors select-none"
                                    title="Nhấn để sắp xếp theo Lớp trường A1 - A9"
                                  >
                                    <div className="flex items-center justify-center gap-1">
                                      <span>Lớp trường</span>
                                      {sortBy === 'schoolClass' && <ArrowUpDown className="w-3 h-3 text-blue-600" />}
                                    </div>
                                  </th>
                                  <th className="py-2.5 px-3 sm:px-4">Trường</th>
                                  <th
                                    onClick={() => setSortBy('assignedClass')}
                                    className="py-2.5 px-3 sm:px-4 text-center cursor-pointer hover:bg-slate-200 transition-colors select-none"
                                    title="Nhấn để sắp xếp theo Thứ tự phân lớp CB1 -> CB2 -> CB3"
                                  >
                                    <div className="flex items-center justify-center gap-1">
                                      <span>Phân lớp học</span>
                                      {sortBy === 'assignedClass' && <ArrowUpDown className="w-3 h-3 text-blue-600" />}
                                    </div>
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-100">
                                {displayedStudents.length === 0 ? (
                                  <tr>
                                    <td colSpan={5} className="py-8 text-center text-slate-500">
                                      Không tìm thấy học sinh phù hợp với từ khóa tìm kiếm.
                                    </td>
                                  </tr>
                                ) : (
                                  displayedStudents.map((student, idx) => {
                                    // Tô màu huy hiệu phân lớp để phân biệt rõ CB1, CB2, CB3
                                    const isCB1 = student.assignedClass.includes('CB1');
                                    const isCB2 = student.assignedClass.includes('CB2');
                                    const isCB3 = student.assignedClass.includes('CB3');

                                    return (
                                      <tr
                                        key={student.id || idx}
                                        className="hover:bg-blue-50/60 transition-colors"
                                      >
                                        <td className="py-2.5 px-3 sm:px-4 text-center font-bold text-slate-500">
                                          {idx + 1}
                                        </td>
                                        <td className="py-2.5 px-3 sm:px-4 font-black text-slate-900">
                                          {student.name}
                                        </td>
                                        <td className="py-2.5 px-3 sm:px-4 text-center">
                                          <span className="inline-block px-2.5 py-0.5 rounded-md font-extrabold text-xs bg-slate-100 text-slate-800 border border-slate-200">
                                            {student.schoolClass}
                                          </span>
                                        </td>
                                        <td className="py-2.5 px-3 sm:px-4 text-slate-700">
                                          {student.schoolName}
                                        </td>
                                        <td className="py-2.5 px-3 sm:px-4 text-center">
                                          <span
                                            className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-black border ${
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
                    )}
                  </div>
                ) : (
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-center text-xs text-slate-500">
                    Lớp đang mở tuyển sinh học viên mới. Danh sách sẽ được cập nhật sau khi học sinh hoàn tất đăng ký.
                  </div>
                )}

                {/* Additional Information details */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <h4 className="text-sm font-black text-slate-900 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>Thông Tin Chi Tiết Lớp Học:</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="bg-white p-3 rounded-xl border border-slate-100">
                      <span className="font-bold text-slate-500 block">Giáo viên phụ trách:</span>
                      <span className="font-extrabold text-slate-900">{selectedClass.teacher || 'Tổ bộ môn phụ trách'}</span>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-slate-100">
                      <span className="font-bold text-slate-500 block">Lịch học / Phòng học:</span>
                      <span className="font-extrabold text-slate-900">{selectedClass.schedule || 'Sắp xếp theo thời khóa biểu học sinh'}</span>
                    </div>
                  </div>
                </div>

                {/* Bottom navigation buttons */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                  <button
                    onClick={() => {
                      onClose();
                      onOpenConsultationModal(selectedClass.grade);
                    }}
                    className="px-6 py-3 bg-gradient-to-r from-blue-900 to-indigo-900 hover:from-blue-800 hover:to-indigo-800 text-white font-black text-xs sm:text-sm rounded-xl shadow-md cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>Đăng Ký Tư Vấn & Đánh Giá Năng Lực Miễn Phí</span>
                  </button>
                  <button
                    onClick={() => setSelectedClassId('all')}
                    className="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm rounded-xl cursor-pointer"
                  >
                    Xem tất cả các lớp khác ({totalCenterStudents} em)
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:px-6 bg-white border-t border-slate-200 flex-shrink-0 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-600 flex items-center gap-2">
            <School className="w-4 h-4 text-blue-800" />
            <span>Trung Tâm Bồi Dưỡng Kiến Thức Văn Hóa & Ôn Luyện Thi Vạn Phú - Thái Nguyên</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => {
                onClose();
                onOpenConsultationModal();
              }}
              className="flex-1 sm:flex-none px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-black text-xs rounded-xl shadow-sm cursor-pointer transition-colors"
            >
              Đăng ký xếp lớp mới
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
