import React, { useState, useMemo } from 'react';
import {
  X,
  Users,
  Search,
  School,
  CheckCircle2,
  Printer,
  ChevronRight,
  Filter,
  BookOpen,
  Sparkles,
  Clock,
  AlertCircle,
  Laptop
} from 'lucide-react';
import { Student, GradeLevel } from '../types';
import {
  STUDENTS_TOAN_12_CO_BAN,
  STUDENTS_TOAN_12_NC,
  STUDENTS_TOAN_11_CB,
  STUDENTS_CNTT,
  ACTIVE_CLASSES,
  sortStudentsByClassAndName,
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
  // 'toan-12-all' (tất cả 56 em cơ bản) | 'toan-12-nc' | 'toan-12-cb1' | 'toan-12-cb2' | 'toan-12-cb3' | 'both-separate'
  const [selectedClassId, setSelectedClassId] = useState<string>('toan-12-all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSchoolClass, setFilterSchoolClass] = useState<string>('all');

  // Sync initialClassId if changes when opened
  React.useEffect(() => {
    if (initialClassId) {
      if (initialClassId === 'toan-12-all' || initialClassId === 'all') {
        setSelectedClassId('toan-12-all');
      } else if (initialClassId === 'both-separate') {
        setSelectedClassId('both-separate');
      } else {
        setSelectedClassId(initialClassId);
      }
    }
  }, [initialClassId]);

  // Luôn sắp xếp danh sách học sinh: Lớp trường A1 -> A9 (12A5 -> 12A6 -> 12A7 -> 12A8 -> 12A9) và tên A -> Z
  const allStudentsSorted = useMemo(
    () => sortStudentsByClassAndName(STUDENTS_TOAN_12_CO_BAN),
    []
  );

  const studentsCb1 = useMemo(
    () => sortStudentsByClassAndName(STUDENTS_TOAN_12_CO_BAN.filter((s) => s.assignedClass === 'Lớp CB 1')),
    []
  );

  const studentsCb2 = useMemo(
    () => sortStudentsByClassAndName(STUDENTS_TOAN_12_CO_BAN.filter((s) => s.assignedClass === 'Lớp CB 2')),
    []
  );

  const studentsCb3 = useMemo(
    () => sortStudentsByClassAndName(STUDENTS_TOAN_12_CO_BAN.filter((s) => s.assignedClass === 'Lớp CB 3')),
    []
  );

  const studentsNc12 = useMemo(
    () => sortStudentsByClassAndName(STUDENTS_TOAN_12_NC),
    []
  );

  const studentsCb11 = useMemo(
    () => sortStudentsByClassAndName(STUDENTS_TOAN_11_CB),
    []
  );

  const studentsCntt = useMemo(
    () => sortStudentsByClassAndName(STUDENTS_CNTT),
    []
  );

  const otherClassData = ACTIVE_CLASSES.find((c) => c.id === selectedClassId);

  // Bộ lọc tìm kiếm học sinh
  const filterStudents = (list: Student[]) => {
    return list.filter((student) => {
      const matchSearch =
        searchQuery.trim() === '' ||
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.schoolClass.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.schoolName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        String(student.stt).includes(searchQuery.trim());

      const matchSchoolClass =
        filterSchoolClass === 'all' || student.schoolClass === filterSchoolClass;

      return matchSearch && matchSchoolClass;
    });
  };

  const filteredAll = useMemo(() => filterStudents(allStudentsSorted), [allStudentsSorted, searchQuery, filterSchoolClass]);
  const filteredCb1 = useMemo(() => filterStudents(studentsCb1), [studentsCb1, searchQuery, filterSchoolClass]);
  const filteredCb2 = useMemo(() => filterStudents(studentsCb2), [studentsCb2, searchQuery, filterSchoolClass]);
  const filteredCb3 = useMemo(() => filterStudents(studentsCb3), [studentsCb3, searchQuery, filterSchoolClass]);
  const filteredNc12 = useMemo(() => filterStudents(studentsNc12), [studentsNc12, searchQuery, filterSchoolClass]);
  const filteredCb11 = useMemo(() => filterStudents(studentsCb11), [studentsCb11, searchQuery, filterSchoolClass]);
  const filteredCntt = useMemo(() => filterStudents(studentsCntt), [studentsCntt, searchQuery, filterSchoolClass]);

  // Danh sách các lớp trường thực tế (3A, 3B3, 4B, 5A, 5D, 6A8, 7A1, 7A5, 7A7, 11A2, 12A5...)
  const schoolClasses = useMemo(() => {
    const set = new Set<string>();
    STUDENTS_TOAN_12_CO_BAN.forEach((s) => { if (s.schoolClass) set.add(s.schoolClass); });
    STUDENTS_TOAN_12_NC.forEach((s) => { if (s.schoolClass) set.add(s.schoolClass); });
    STUDENTS_TOAN_11_CB.forEach((s) => { if (s.schoolClass) set.add(s.schoolClass); });
    STUDENTS_CNTT.forEach((s) => { if (s.schoolClass) set.add(s.schoolClass); });
    return Array.from(set).sort((a, b) => a.localeCompare(b, 'vi', { numeric: true }));
  }, []);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  // Component Bảng Thành Viên chuẩn thống nhất cho tất cả các góc nhìn
  const UniformStudentTable: React.FC<{
    students: Student[];
    title: string;
    subtitle: string;
    badgeText: string;
    badgeColorClass?: string;
  }> = ({ students, title, subtitle, badgeText, badgeColorClass = 'bg-blue-900 text-white' }) => {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Table Header Banner */}
        <div className={`${badgeColorClass} px-4 py-3.5 flex flex-wrap items-center justify-between gap-2`}>
          <div className="flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black text-xs shadow-xs">
              <Users className="w-4 h-4" />
            </span>
            <div>
              <h3 className="font-extrabold text-sm sm:text-base tracking-tight text-white uppercase">
                {title}
              </h3>
              <p className="text-[11px] text-blue-100/90">
                {subtitle}
              </p>
            </div>
          </div>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-white/20 text-white border border-white/30 backdrop-blur-xs">
            {badgeText}
          </span>
        </div>

        {students.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-500">
            Không có học sinh nào phù hợp với từ khóa hoặc lớp đang lọc.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-100/90 border-b border-slate-200 text-[11px] font-bold uppercase text-slate-600">
                  <th className="py-2.5 px-3 sm:px-4 text-center w-12 sm:w-14">STT</th>
                  <th className="py-2.5 px-3 sm:px-4">Họ và tên</th>
                  <th className="py-2.5 px-3 sm:px-4 text-center">Lớp ở trường</th>
                  <th className="py-2.5 px-3 sm:px-4 hidden md:table-cell">Trường học</th>
                  <th className="py-2.5 px-3 sm:px-4 text-center">Phân lớp</th>
                  <th className="py-2.5 px-3 sm:px-4 text-center hidden sm:table-cell">Trạng thái</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                {students.map((student, idx) => (
                  <tr key={student.id} className="hover:bg-blue-50/40 transition-colors">
                    <td className="py-2.5 px-3 sm:px-4 text-center font-bold text-slate-400">
                      {idx + 1}
                    </td>
                    <td className="py-2.5 px-3 sm:px-4 font-bold text-slate-900">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-[10px] font-bold flex-shrink-0">
                          {student.name.split(' ').pop()?.charAt(0) || 'H'}
                        </span>
                        <span>{student.name}</span>
                      </div>
                    </td>
                    <td className="py-2.5 px-3 sm:px-4 text-center">
                      <span className="inline-block px-2.5 py-0.5 bg-blue-50 border border-blue-200 text-blue-900 font-extrabold text-xs rounded-md">
                        {student.schoolClass}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 sm:px-4 hidden md:table-cell text-slate-600 text-xs">
                      {student.schoolName}
                    </td>
                    <td className="py-2.5 px-3 sm:px-4 text-center">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 font-bold text-[11px] rounded-md ${
                          student.assignedClass === 'Lớp CB 1' || student.assignedClass === 'Lớp CB 2'
                            ? 'bg-rose-100 text-rose-900 border border-rose-200'
                            : student.assignedClass.includes('NC')
                            ? 'bg-purple-100 text-purple-900 border border-purple-300'
                            : student.assignedClass.includes('CNTT')
                            ? 'bg-cyan-100 text-cyan-900 border border-cyan-300'
                            : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                        }`}
                      >
                        <span>{student.assignedClass}</span>
                        {student.assignedClass === 'Lớp CB 1' || student.assignedClass === 'Lớp CB 2' ? (
                          <span className="text-[10px] text-rose-600 font-semibold">(Đã đầy)</span>
                        ) : student.assignedClass.includes('NC') ? (
                          <span className="text-[10px] text-purple-700 font-semibold">(Đang mở)</span>
                        ) : student.assignedClass.includes('CNTT') ? (
                          <span className="text-[10px] text-cyan-700 font-semibold">(Đang mở)</span>
                        ) : (
                          <span className="text-[10px] text-emerald-700 font-semibold">(Đang mở)</span>
                        )}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 sm:px-4 text-center hidden sm:table-cell">
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>Đang theo học</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[92vh] flex flex-col z-10 border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-950 text-white p-5 sm:p-6 flex-shrink-0 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 sm:top-5 sm:right-5 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors cursor-pointer"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-amber-400 text-slate-950 flex items-center gap-1">
              <Users className="w-3.5 h-3.5" />
              <span>DANH SÁCH THÀNH VIÊN LỚP HỌC</span>
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white/15 text-blue-100 border border-white/20">
              {selectedClassId === 'toan-12-nc'
                ? 'Môn Toán • Khối 12 (Nâng Cao 8.5+) • Cơ sở Vạn Phú'
                : selectedClassId === 'toan-11-cb'
                ? 'Môn Toán • Khối 11 (Cơ Bản) • Cơ sở Vạn Phú'
                : selectedClassId === 'toan-10-cb'
                ? 'Môn Toán • Khối 10 (Cơ Bản) • Cơ sở Vạn Phú'
                : selectedClassId === 'toan-10-nc'
                ? 'Môn Toán • Khối 10 (Nâng Cao 8.5+) • Cơ sở Vạn Phú'
                : selectedClassId === 'cntt-active'
                ? 'Công Nghệ Thông Tin & Kỹ Năng Số • Cơ sở Vạn Phú'
                : 'Môn Toán • Cơ sở Vạn Phú'}
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white uppercase">
            {selectedClassId === 'toan-12-all'
              ? 'BẢNG DANH SÁCH THÀNH VIÊN LỚP TOÁN 12 CƠ BẢN (60 HỌC SINH)'
              : selectedClassId === 'toan-12-nc'
              ? 'BẢNG DANH SÁCH HỌC SINH LỚP TOÁN 12 NÂNG CAO (5 HỌC SINH - ĐANG MỞ)'
              : selectedClassId === 'toan-11-cb'
              ? 'BẢNG DANH SÁCH HỌC SINH LỚP TOÁN 11 CƠ BẢN (16 HỌC SINH - ĐANG MỞ)'
              : selectedClassId === 'toan-10-cb'
              ? 'THÔNG BÁO MỞ LỚP TOÁN 10 CƠ BẢN (ĐANG MỞ LỚP & TIẾP NHẬN HỌC SINH)'
              : selectedClassId === 'toan-10-nc'
              ? 'THÔNG BÁO MỞ LỚP TOÁN 10 NÂNG CAO (ĐANG MỞ LỚP & TIẾP NHẬN HỌC SINH)'
              : selectedClassId === 'cntt-active'
              ? 'BẢNG DANH SÁCH HỌC SINH LỚP CÔNG NGHỆ THÔNG TIN & KỸ NĂNG SỐ (16 HỌC SINH - ĐANG MỞ)'
              : selectedClassId === 'toan-12-cb1'
              ? 'BẢNG DANH SÁCH THÀNH VIÊN LỚP 1 (CB 1: 23 HỌC SINH - ĐÃ ĐẦY SĨ SỐ)'
              : selectedClassId === 'toan-12-cb2'
              ? 'BẢNG DANH SÁCH THÀNH VIÊN LỚP 2 (CB 2: 19 HỌC SINH - ĐÃ ĐẦY SĨ SỐ)'
              : selectedClassId === 'toan-12-cb3'
              ? 'BẢNG DANH SÁCH THÀNH VIÊN LỚP 3 (CB 3: 18 HỌC SINH - ĐANG MỞ LỚP)'
              : selectedClassId === 'both-separate'
              ? 'DANH SÁCH THEO 3 PHÂN LỚP: LỚP 1, LỚP 2 & LỚP 3 (60 HỌC SINH)'
              : `THÔNG TIN LỚP: ${otherClassData?.name || 'LỚP HỌC'}`}
          </h2>

          <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs sm:text-sm text-blue-200 mt-2">
            <div className="flex items-center gap-1.5">
              <School className="w-4 h-4 text-emerald-300" />
              <span>Cơ sở: <strong className="text-white">Khu Đô Thị Vạn Phú - Thái Nguyên</strong></span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-amber-400" />
              <span>
                Thứ tự sắp xếp:{' '}
                <strong className="text-amber-300">
                  Lớp trường từ A1 đến A10 &rarr; Tên theo A-Z
                </strong>
              </span>
            </div>
          </div>
        </div>

        {/* Tab Switcher - Unified Design */}
        <div className="bg-slate-100 p-2 sm:px-6 border-b border-slate-200 flex-shrink-0 flex items-center gap-2 overflow-x-auto">
          <span className="text-xs font-bold text-slate-500 hidden sm:inline flex-shrink-0">
            Chế độ xem:
          </span>
          <button
            onClick={() => setSelectedClassId('toan-12-all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex-shrink-0 cursor-pointer ${
              selectedClassId === 'toan-12-all'
                ? 'bg-blue-900 text-white shadow-sm'
                : 'bg-white text-slate-700 hover:bg-slate-200'
            }`}
          >
            Toán 12 Cơ Bản (60 em)
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
                ? 'bg-blue-800 text-white shadow-sm'
                : 'bg-white text-blue-950 hover:bg-blue-50 border border-blue-300'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Toán 11 Cơ Bản (16 em • Đang mở)</span>
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
          <button
            onClick={() => setSelectedClassId('cntt-active')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex-shrink-0 cursor-pointer flex items-center gap-1.5 ${
              selectedClassId === 'cntt-active'
                ? 'bg-cyan-800 text-white shadow-sm'
                : 'bg-white text-cyan-950 hover:bg-cyan-50 border border-cyan-300'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>CNTT & Kỹ Năng Số (16 em • Đang mở)</span>
          </button>
          <button
            onClick={() => setSelectedClassId('toan-12-cb1')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex-shrink-0 cursor-pointer ${
              selectedClassId === 'toan-12-cb1'
                ? 'bg-rose-700 text-white shadow-sm'
                : 'bg-white text-rose-900 hover:bg-rose-50 border border-rose-200'
            }`}
          >
            Lớp 1 (CB 1: 23 em • Đã đầy)
          </button>
          <button
            onClick={() => setSelectedClassId('toan-12-cb2')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex-shrink-0 cursor-pointer ${
              selectedClassId === 'toan-12-cb2'
                ? 'bg-rose-700 text-white shadow-sm'
                : 'bg-white text-rose-900 hover:bg-rose-50 border border-rose-200'
            }`}
          >
            Lớp 2 (CB 2: 19 em • Đã đầy)
          </button>
          <button
            onClick={() => setSelectedClassId('toan-12-cb3')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex-shrink-0 cursor-pointer flex items-center gap-1.5 ${
              selectedClassId === 'toan-12-cb3'
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'bg-white text-emerald-900 hover:bg-emerald-50 border border-emerald-300'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Lớp 3 (CB 3: 18 em • Đang mở)</span>
          </button>
          <button
            onClick={() => setSelectedClassId('both-separate')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex-shrink-0 cursor-pointer ${
              selectedClassId === 'both-separate'
                ? 'bg-blue-900 text-white shadow-sm'
                : 'bg-white text-slate-700 hover:bg-slate-200'
            }`}
          >
            Xem song song 3 lớp CB
          </button>
          {otherClassData && !['toan-12-all', 'toan-12-nc', 'toan-11-cb', 'toan-10-cb', 'cntt-active', 'toan-12-cb1', 'toan-12-cb2', 'toan-12-cb3', 'both-separate'].includes(selectedClassId) && (
            <button
              onClick={() => setSelectedClassId(otherClassData.id)}
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex-shrink-0 bg-blue-900 text-white shadow-sm border border-blue-700 cursor-pointer"
            >
              {otherClassData.name}
            </button>
          )}
        </div>

        {/* Controls: Search & Filter */}
        <div className="p-4 sm:px-6 bg-white border-b border-slate-100 flex-shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm theo tên học sinh, lớp ở trường (12A5, 12A6, 12A7, 12A8, 12A9)..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                Xóa
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs text-slate-700">
              <Filter className="w-3.5 h-3.5 text-slate-500" />
              <span className="font-medium text-slate-500">Lớp trường:</span>
              <select
                value={filterSchoolClass}
                onChange={(e) => setFilterSchoolClass(e.target.value)}
                className="bg-transparent font-bold text-blue-900 focus:outline-none cursor-pointer"
              >
                <option value="all">Tất cả (A1 &rarr; A9)</option>
                {schoolClasses.map((sc) => (
                  <option key={sc} value={sc}>
                    {sc}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-colors cursor-pointer flex-shrink-0"
              title="In danh sách này"
            >
              <Printer className="w-3.5 h-3.5 text-slate-600" />
              <span className="hidden sm:inline">In Danh Sách</span>
            </button>
          </div>
        </div>

        {/* Scrollable Area */}
        <div className="flex-grow overflow-y-auto p-4 sm:p-6 bg-slate-50 space-y-6">
          {/* VIEW 1: TOÀN THỂ LỚP (TẤT CẢ 60 HỌC SINH TRONG 1 BẢNG DUY NHẤT) */}
          {selectedClassId === 'toan-12-all' && (
            <UniformStudentTable
              students={filteredAll}
              title="Bảng Danh Sách Toàn Thể Học Sinh Lớp Toán 12 (Cơ Bản)"
              subtitle={`Tổng số: ${filteredAll.length} / 60 học sinh (Lớp 1: 23 em • Lớp 2: 19 em • Lớp 3: 18 em)`}
              badgeText={`Tổng sĩ số: ${filteredAll.length} em`}
              badgeColorClass="bg-slate-900 text-white"
            />
          )}

          {/* VIEW 2: LỚP 1 (CB 1: 23 HỌC SINH - ĐÃ ĐẦY SĨ SỐ) */}
          {selectedClassId === 'toan-12-cb1' && (
            <div className="space-y-4">
              <div className="p-4 bg-rose-50 border border-rose-300 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-rose-950 shadow-xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-600 text-white flex items-center justify-center flex-shrink-0 font-bold shadow-xs">
                    <AlertCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-black text-sm text-rose-900">
                      THÔNG BÁO: LỚP 1 (CB 1) ĐÃ ĐẦY SĨ SỐ (23/23 HỌC SINH)
                    </h4>
                    <p className="text-xs text-slate-700 mt-0.5">
                      Lớp 1 gồm 23 học sinh lớp 12A9 THPT Lưu Nhân Chú đã chốt danh sách. Phụ huynh & học sinh vui lòng đăng ký sang <strong className="text-emerald-800">Lớp 3 (CB 3)</strong> đang mở tuyển sinh!
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedClassId('toan-12-cb3')}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex-shrink-0 cursor-pointer"
                >
                  Xem Lớp 3 đang mở &rarr;
                </button>
              </div>

              <UniformStudentTable
                students={filteredCb1}
                title="Bảng Danh Sách Thành Viên: Lớp 1 (Lớp CB 1 - ĐÃ ĐẦY)"
                subtitle={`Sĩ số: ${filteredCb1.length} / 23 học sinh (100% học sinh 12A9 - THPT Lưu Nhân Chú)`}
                badgeText={`Lớp 1: ${filteredCb1.length} em • ĐÃ ĐẦY`}
                badgeColorClass="bg-rose-950 text-white"
              />
            </div>
          )}

          {/* VIEW 3: LỚP 2 (CB 2: 19 HỌC SINH - ĐÃ ĐẦY SĨ SỐ) */}
          {selectedClassId === 'toan-12-cb2' && (
            <div className="space-y-4">
              <div className="p-4 bg-rose-50 border border-rose-300 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-rose-950 shadow-xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-600 text-white flex items-center justify-center flex-shrink-0 font-bold shadow-xs">
                    <AlertCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-black text-sm text-rose-900">
                      THÔNG BÁO: LỚP 2 (CB 2) ĐÃ ĐẦY SĨ SỐ (19/19 HỌC SINH)
                    </h4>
                    <p className="text-xs text-slate-700 mt-0.5">
                      Lớp 2 gồm 19 học sinh lớp 12A6 THPT Lưu Nhân Chú đã chốt danh sách. Phụ huynh & học sinh vui lòng đăng ký sang <strong className="text-emerald-800">Lớp 3 (CB 3)</strong> đang mở tuyển sinh!
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedClassId('toan-12-cb3')}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex-shrink-0 cursor-pointer"
                >
                  Xem Lớp 3 đang mở &rarr;
                </button>
              </div>

              <UniformStudentTable
                students={filteredCb2}
                title="Bảng Danh Sách Thành Viên: Lớp 2 (Lớp CB 2 - ĐÃ ĐẦY)"
                subtitle={`Sĩ số: ${filteredCb2.length} / 19 học sinh (100% học sinh 12A6 - THPT Lưu Nhân Chú)`}
                badgeText={`Lớp 2: ${filteredCb2.length} em • ĐÃ ĐẦY`}
                badgeColorClass="bg-rose-950 text-white"
              />
            </div>
          )}

          {/* VIEW 4: LỚP 3 (CB 3: 18 HỌC SINH - ĐANG MỞ LỚP) */}
          {selectedClassId === 'toan-12-cb3' && (
            <div className="space-y-4">
              <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-emerald-950 shadow-xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 font-bold shadow-xs">
                    <Sparkles className="w-5 h-5 text-emerald-100" />
                  </div>
                  <div>
                    <h4 className="font-black text-sm text-emerald-900 flex items-center gap-2">
                      <span>LỚP 3 (CB 3) - ĐANG MỞ LỚP & TIẾP NHẬN HỌC SINH</span>
                      <span className="px-2 py-0.5 text-[10px] font-black rounded-full bg-emerald-200 text-emerald-900 border border-emerald-300">
                        ĐANG MỞ
                      </span>
                    </h4>
                    <p className="text-xs text-slate-700 mt-0.5">
                      Hiện có <strong>18 học sinh (12A5: 2 em, 12A7: 2 em, 12A8: 7 em, 12A9: 6 em THPT Lưu Nhân Chú và THPT Đội Cấn: 1 em)</strong> đã đăng ký. Do Lớp 1 và Lớp 2 đã đầy sĩ số, trung tâm tập trung tiếp nhận hồ sơ vào Lớp 3 để hoàn thiện sĩ số.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenConsultationModal('12');
                  }}
                  className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex-shrink-0 cursor-pointer"
                >
                  Đăng ký vào Lớp CB 3 ngay
                </button>
              </div>

              <UniformStudentTable
                students={filteredCb3}
                title="Bảng Danh Sách Thành Viên: Lớp 3 (Lớp CB 3 - ĐANG MỞ)"
                subtitle={`Sĩ số: ${filteredCb3.length} / 18 học sinh (12A5: 2 em, 12A7: 2 em, 12A8: 7 em, 12A9: 6 em - THPT Lưu Nhân Chú và THPT Đội Cấn: 1 em)`}
                badgeText={`Lớp 3: ${filteredCb3.length} em • ĐANG MỞ`}
                badgeColorClass="bg-emerald-800 text-white"
              />
            </div>
          )}

          {/* VIEW: LỚP TOÁN 12 NÂNG CAO (5 HỌC SINH - ĐANG MỞ LỚP) */}
          {selectedClassId === 'toan-12-nc' && (
            <div className="space-y-4">
              <div className="p-4 bg-purple-50 border border-purple-300 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-purple-950 shadow-xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-700 text-white flex items-center justify-center flex-shrink-0 font-bold shadow-xs">
                    <Sparkles className="w-5 h-5 text-purple-100" />
                  </div>
                  <div>
                    <h4 className="font-black text-sm text-purple-900 flex items-center gap-2">
                      <span>LỚP TOÁN 12 NÂNG CAO (MỤC TIÊU 8.5+ & THI THPTQG)</span>
                      <span className="px-2 py-0.5 text-[10px] font-black rounded-full bg-emerald-200 text-emerald-900 border border-emerald-300">
                        ĐANG MỞ LỚP
                      </span>
                    </h4>
                    <p className="text-xs text-slate-700 mt-0.5">
                      Hiện có <strong>5 học sinh (12A6: 2 em, 12A8: 1 em, 12A9: 2 em - THPT Lưu Nhân Chú)</strong> đã xếp lớp. Lớp chuyên sâu vận dụng cao 8.5+, 9.0+, rèn luyện đề chuẩn Bộ GD&ĐT và đang tiếp tục nhận đăng ký bổ sung!
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenConsultationModal('12');
                  }}
                  className="px-4 py-2 bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-800 hover:to-indigo-800 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex-shrink-0 cursor-pointer"
                >
                  Đăng ký vào Lớp 12 NC ngay
                </button>
              </div>

              <UniformStudentTable
                students={filteredNc12}
                title="Bảng Danh Sách Học Sinh: Lớp Toán 12 Nâng Cao (Vận Dụng Cao 8.5+)"
                subtitle={`Sĩ số: ${filteredNc12.length} / 5 học sinh (12A6: 2 em, 12A8: 1 em, 12A9: 2 em - THPT Lưu Nhân Chú)`}
                badgeText={`Toán 12 NC: ${filteredNc12.length} em • ĐANG MỞ`}
                badgeColorClass="bg-purple-900 text-white"
              />
            </div>
          )}

          {/* VIEW: LỚP TOÁN 11 CƠ BẢN (16 HỌC SINH - ĐANG MỞ LỚP) */}
          {selectedClassId === 'toan-11-cb' && (
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 border border-blue-300 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-blue-950 shadow-xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-800 text-white flex items-center justify-center flex-shrink-0 font-bold shadow-xs">
                    <Sparkles className="w-5 h-5 text-blue-100" />
                  </div>
                  <div>
                    <h4 className="font-black text-sm text-blue-900 flex items-center gap-2">
                      <span>LỚP TOÁN 11 CƠ BẢN (CỦNG CỐ NỀN TẢNG) - ĐANG MỞ LỚP</span>
                      <span className="px-2 py-0.5 text-[10px] font-black rounded-full bg-emerald-200 text-emerald-900 border border-emerald-300">
                        ĐANG MỞ LỚP
                      </span>
                    </h4>
                    <p className="text-xs text-slate-700 mt-0.5">
                      Hiện có <strong>16 học sinh (11A2: 5 em, 11A3: 3 em, 11A9: 6 em, 11A10: 2 em - 100% THPT Lưu Nhân Chú)</strong> đã xếp lớp. Lớp bám sát chương trình mới, củng cố Lượng giác, Dãy số, Giới hạn và Hình không gian 11, đang tiếp tục nhận đăng ký bổ sung!
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenConsultationModal('11');
                  }}
                  className="px-4 py-2 bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-800 hover:to-indigo-800 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex-shrink-0 cursor-pointer"
                >
                  Đăng ký vào Lớp 11 CB ngay
                </button>
              </div>

              <UniformStudentTable
                students={filteredCb11}
                title="Bảng Danh Sách Học Sinh: Lớp Toán 11 Cơ Bản (Củng Cố Nền Tảng)"
                subtitle={`Sĩ số: ${filteredCb11.length} / 16 học sinh (11A2: 5 em, 11A3: 3 em, 11A9: 6 em, 11A10: 2 em - THPT Lưu Nhân Chú)`}
                badgeText={`Toán 11 CB: ${filteredCb11.length} em • ĐANG MỞ`}
                badgeColorClass="bg-blue-900 text-white"
              />
            </div>
          )}

          {/* VIEW: LỚP CÔNG NGHỆ THÔNG TIN & KỸ NĂNG SỐ (14 HỌC SINH - ĐANG MỞ LỚP) */}
          {selectedClassId === 'cntt-active' && (
            <div className="space-y-4">
              <div className="p-4 bg-cyan-50 border border-cyan-300 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-cyan-950 shadow-xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-700 text-white flex items-center justify-center flex-shrink-0 font-bold shadow-xs">
                    <Laptop className="w-5 h-5 text-cyan-100" />
                  </div>
                  <div>
                    <h4 className="font-black text-sm text-cyan-900 flex items-center gap-2">
                      <span>LỚP CÔNG NGHỆ THÔNG TIN & KỸ NĂNG SỐ - ĐANG MỞ LỚP</span>
                      <span className="px-2 py-0.5 text-[10px] font-black rounded-full bg-emerald-200 text-emerald-900 border border-emerald-300">
                        ĐANG MỞ LỚP
                      </span>
                    </h4>
                    <p className="text-xs text-slate-700 mt-0.5">
                      Hiện có <strong>16 học sinh (TH Vạn Phú: 8 em, THCS Vạn Phú: 6 em, THCS Nguyễn Tất Thành: 1 em, TH Văn Yên: 1 em)</strong> đã đăng ký. Đào tạo tư duy máy tính, kỹ năng số 4.0, tin học văn phòng thực chiến, lập trình căn bản và an toàn mạng. Lớp đang mở và tiếp tục nhận đăng ký bổ sung!
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenConsultationModal('cntt');
                  }}
                  className="px-4 py-2 bg-gradient-to-r from-cyan-700 to-blue-700 hover:from-cyan-800 hover:to-blue-800 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex-shrink-0 cursor-pointer"
                >
                  Đăng ký vào Lớp CNTT ngay
                </button>
              </div>

              <UniformStudentTable
                students={filteredCntt}
                title="Bảng Danh Sách Học Sinh: Lớp Công Nghệ Thông Tin & Kỹ Năng Số"
                subtitle={`Sĩ số: ${filteredCntt.length} / 16 học sinh (TH Vạn Phú: 8 em, THCS Vạn Phú: 6 em, THCS Nguyễn Tất Thành: 1 em, TH Văn Yên: 1 em)`}
                badgeText={`CNTT: ${filteredCntt.length} em • ĐANG MỞ`}
                badgeColorClass="bg-cyan-800 text-white"
              />
            </div>
          )}

          {/* VIEW 5: SONG SONG 3 LỚP VỚI CÙNG THIẾT KẾ BẢNG ĐỒNG BỘ */}
          {selectedClassId === 'both-separate' && (
            <div className="space-y-6">
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-900 flex items-center justify-between">
                <span>Tổng hợp cả 3 phân lớp Toán 12 Cơ Bản: <strong>60 học sinh</strong> (Lớp 1 & Lớp 2 đã đầy • Lớp 3 đang mở)</span>
                <span className="font-semibold text-[11px]">Cơ sở Vạn Phú - Đại Từ</span>
              </div>

              <UniformStudentTable
                students={filteredCb1}
                title="1. Lớp 1 (Lớp CB 1 - ĐÃ ĐẦY SĨ SỐ)"
                subtitle={`Sĩ số: ${filteredCb1.length} / 23 học sinh (12A9 - THPT Lưu Nhân Chú)`}
                badgeText={`Lớp 1: ${filteredCb1.length} em • ĐÃ ĐẦY`}
                badgeColorClass="bg-rose-950 text-white"
              />
              <UniformStudentTable
                students={filteredCb2}
                title="2. Lớp 2 (Lớp CB 2 - ĐÃ ĐẦY SĨ SỐ)"
                subtitle={`Sĩ số: ${filteredCb2.length} / 19 học sinh (12A6 - THPT Lưu Nhân Chú)`}
                badgeText={`Lớp 2: ${filteredCb2.length} em • ĐÃ ĐẦY`}
                badgeColorClass="bg-rose-950 text-white"
              />
              <UniformStudentTable
                students={filteredCb3}
                title="3. Lớp 3 (Lớp CB 3 - ĐANG MỞ LỚP)"
                subtitle={`Sĩ số: ${filteredCb3.length} / 18 học sinh (12A5: 2 em, 12A7: 2 em, 12A8: 7 em, 12A9: 6 em - THPT Lưu Nhân Chú và THPT Đội Cấn: 1 em)`}
                badgeText={`Lớp 3: ${filteredCb3.length} em • ĐANG MỞ`}
                badgeColorClass="bg-emerald-800 text-white"
              />
            </div>
          )}

          {/* VIEW 6: LỚP HỌC ĐANG CHỌN KHÁC */}
          {selectedClassId !== 'toan-12-all' &&
            selectedClassId !== 'toan-12-nc' &&
            selectedClassId !== 'toan-11-cb' &&
            selectedClassId !== 'cntt-active' &&
            selectedClassId !== 'toan-12-cb1' &&
            selectedClassId !== 'toan-12-cb2' &&
            selectedClassId !== 'toan-12-cb3' &&
            selectedClassId !== 'both-separate' && (
              otherClassData?.students && otherClassData.students.length > 0 ? (
                <UniformStudentTable
                  students={filterStudents(sortStudentsByClassAndName(otherClassData.students))}
                  title={`Bảng Danh Sách Học Sinh: ${otherClassData.name}`}
                  subtitle={`Sĩ số: ${otherClassData.students.length} học sinh`}
                  badgeText={`${otherClassData.students.length} học sinh`}
                  badgeColorClass="bg-blue-900 text-white"
                />
              ) : otherClassData?.isOpen || otherClassData?.status === 'enrolling' ? (
                <div className="bg-white rounded-3xl p-8 sm:p-10 border-2 border-emerald-400 ring-2 ring-emerald-100 text-center shadow-md max-w-xl mx-auto space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-800 mx-auto flex items-center justify-center font-bold shadow-xs">
                    <CheckCircle2 className="w-7 h-7 text-emerald-600" />
                  </div>
                  <div>
                    <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-600 text-white inline-flex items-center gap-1.5 mb-2 shadow-xs">
                      <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
                      <span>ĐANG MỞ LỚP • NHẬN ĐĂNG KÝ HỌC NGAY</span>
                    </span>
                    <h3 className="text-xl font-black text-slate-900">
                      {otherClassData?.name || 'Lớp Học'}
                    </h3>
                  </div>
                  <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-950 text-left space-y-1.5">
                    <p className="font-bold flex items-center gap-1.5 text-emerald-900">
                      <Sparkles className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>Thông báo mở lớp & Tiếp nhận học sinh:</span>
                    </p>
                    <p className="text-slate-700 leading-relaxed">
                      Lớp học này đang <strong>chính thức mở tiếp nhận đăng ký học viên mới</strong>. Sau khi phụ huynh/học sinh đăng ký, các em sẽ được tham gia bài kiểm tra đánh giá năng lực đầu vào miễn phí để xếp ca học và phân loại nhóm năng lực phù hợp nhất.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2.5 justify-center pt-2">
                    <button
                      onClick={() => {
                        onClose();
                        onOpenConsultationModal(otherClassData?.grade as GradeLevel);
                      }}
                      className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-black text-xs rounded-xl shadow-sm cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <Sparkles className="w-4 h-4 text-emerald-100" />
                      <span>Đăng ký tham gia vào lớp này ngay</span>
                    </button>
                    <button
                      onClick={() => setSelectedClassId('toan-12-all')}
                      className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl cursor-pointer"
                    >
                      Xem danh sách lớp Toán 12 (60 học sinh)
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 text-center shadow-xs max-w-xl mx-auto space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-800 mx-auto flex items-center justify-center font-bold">
                    <Sparkles className="w-7 h-7 text-amber-600" />
                  </div>
                  <div>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 inline-block mb-2 border border-amber-200">
                      Trạng thái: Sắp mở lớp
                    </span>
                    <h3 className="text-lg font-black text-slate-900">
                      {otherClassData?.name || 'Lớp Học'}
                    </h3>
                  </div>
                  <div className="p-4 bg-amber-50/70 rounded-2xl border border-amber-200 text-xs text-amber-900 text-left space-y-1.5">
                    <p className="font-bold flex items-center gap-1.5 text-amber-950">
                      <Clock className="w-4 h-4 text-amber-600" />
                      <span>Sắp mở lớp & Đang tiếp nhận đăng ký:</span>
                    </p>
                    <p className="text-slate-700 leading-relaxed">
                      Lớp học này hiện <strong>chưa có danh sách học sinh chính thức</strong> vì đang trong giai đoạn tiếp nhận học sinh đăng ký mở lớp mới. Sau khi các em tham gia buổi kiểm tra đánh giá năng lực đầu vào miễn phí, trung tâm sẽ xếp lớp và công bố danh sách chính thức.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2.5 justify-center pt-2">
                    <button
                      onClick={() => {
                        onClose();
                        onOpenConsultationModal(otherClassData?.grade as GradeLevel);
                      }}
                      className="px-5 py-2.5 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold text-xs rounded-xl shadow-sm cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <Sparkles className="w-4 h-4 text-amber-200" />
                      <span>Đăng ký tham gia lớp này</span>
                    </button>
                    <button
                      onClick={() => setSelectedClassId('toan-12-all')}
                      className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl cursor-pointer"
                    >
                      Xem danh sách lớp Toán 12 (60 học sinh)
                    </button>
                  </div>
                </div>
              )
            )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:px-6 bg-white border-t border-slate-200 flex-shrink-0 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-500 text-center sm:text-left">
            Tổng cộng: <strong className="text-slate-900">{filteredAll.length} học sinh</strong> thuộc 3 phân lớp Toán 12 Cơ Bản
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={() => {
                onClose();
                onOpenConsultationModal('12');
              }}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <span>Đăng Ký Xếp Lớp & Tư Vấn</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs sm:text-sm rounded-xl transition-colors cursor-pointer"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
