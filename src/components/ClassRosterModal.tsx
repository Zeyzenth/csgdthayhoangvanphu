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
  Sparkles
} from 'lucide-react';
import { Student, GradeLevel } from '../types';
import {
  STUDENTS_TOAN_12_CO_BAN,
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
  // 'toan-12-all' (tất cả 23 em) | 'toan-12-cb1' | 'toan-12-cb2' | 'both-separate'
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

  // Danh sách các lớp trường thực tế (12A5, 12A6, 12A7, 12A8, 12A9...) sắp xếp từ A1 -> A9
  const schoolClasses = useMemo(() => {
    const set = new Set<string>();
    STUDENTS_TOAN_12_CO_BAN.forEach((s) => set.add(s.schoolClass));
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
                        className={`px-2.5 py-0.5 font-bold text-[11px] rounded-md ${
                          student.assignedClass === 'Lớp CB 1'
                            ? 'bg-blue-100 text-blue-900'
                            : 'bg-emerald-100 text-emerald-900'
                        }`}
                      >
                        {student.assignedClass}
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
              Môn Toán • Khối 12 (Cơ Bản) • Cơ sở Vạn Phú
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white uppercase">
            {selectedClassId === 'toan-12-all'
              ? 'BẢNG DANH SÁCH THÀNH VIÊN LỚP TOÁN 12 CƠ BẢN (23 HỌC SINH)'
              : selectedClassId === 'toan-12-cb1'
              ? 'BẢNG DANH SÁCH THÀNH VIÊN LỚP 1 (CB 1: 20 HỌC SINH)'
              : selectedClassId === 'toan-12-cb2'
              ? 'BẢNG DANH SÁCH THÀNH VIÊN LỚP 2 (CB 2: 3 HỌC SINH)'
              : selectedClassId === 'both-separate'
              ? 'DANH SÁCH THEO 2 PHÂN LỚP: LỚP 1 & LỚP 2'
              : `DANH SÁCH HỌC SINH: ${otherClassData?.name || 'LỚP HỌC'}`}
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
                  Lớp trường từ A1 đến A9 &rarr; Tên theo A-Z
                </strong>
              </span>
            </div>
          </div>
        </div>

        {/* Tab Switcher - Unified Design */}
        <div className="bg-slate-100 p-2 sm:px-6 border-b border-slate-200 flex-shrink-0 flex items-center gap-2 overflow-x-auto">
          <span className="text-xs font-bold text-slate-500 hidden sm:inline flex-shrink-0">
            Chế độ hiển thị:
          </span>
          <button
            onClick={() => setSelectedClassId('toan-12-all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex-shrink-0 cursor-pointer ${
              selectedClassId === 'toan-12-all'
                ? 'bg-blue-900 text-white shadow-sm'
                : 'bg-white text-slate-700 hover:bg-slate-200'
            }`}
          >
            Tất cả học sinh (23 em)
          </button>
          <button
            onClick={() => setSelectedClassId('toan-12-cb1')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex-shrink-0 cursor-pointer ${
              selectedClassId === 'toan-12-cb1'
                ? 'bg-blue-900 text-white shadow-sm'
                : 'bg-white text-slate-700 hover:bg-slate-200'
            }`}
          >
            Lớp 1 (CB 1: 20 em)
          </button>
          <button
            onClick={() => setSelectedClassId('toan-12-cb2')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex-shrink-0 cursor-pointer ${
              selectedClassId === 'toan-12-cb2'
                ? 'bg-blue-900 text-white shadow-sm'
                : 'bg-white text-slate-700 hover:bg-slate-200'
            }`}
          >
            Lớp 2 (CB 2: 3 em)
          </button>
          <button
            onClick={() => setSelectedClassId('both-separate')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex-shrink-0 cursor-pointer ${
              selectedClassId === 'both-separate'
                ? 'bg-blue-900 text-white shadow-sm'
                : 'bg-white text-slate-700 hover:bg-slate-200'
            }`}
          >
            Xem song song 2 lớp
          </button>
          {otherClassData && !['toan-12-all', 'toan-12-cb1', 'toan-12-cb2', 'both-separate'].includes(selectedClassId) && (
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
          {/* VIEW 1: TOÀN THỂ LỚP (TẤT CẢ 23 HỌC SINH TRONG 1 BẢNG DUY NHẤT) */}
          {selectedClassId === 'toan-12-all' && (
            <UniformStudentTable
              students={filteredAll}
              title="Bảng Danh Sách Toàn Thể Học Sinh Lớp Toán 12 (Cơ Bản)"
              subtitle={`Tổng số: ${filteredAll.length} / 23 học sinh`}
              badgeText={`Sĩ số: ${filteredAll.length} em`}
              badgeColorClass="bg-blue-950 text-white"
            />
          )}

          {/* VIEW 2: LỚP 1 (CB 1) */}
          {selectedClassId === 'toan-12-cb1' && (
            <UniformStudentTable
              students={filteredCb1}
              title="Bảng Danh Sách Thành Viên: Lớp 1 (Lớp CB 1)"
              subtitle={`Sĩ số: ${filteredCb1.length} / 20 học sinh`}
              badgeText={`Lớp 1: ${filteredCb1.length} em`}
              badgeColorClass="bg-blue-900 text-white"
            />
          )}

          {/* VIEW 3: LỚP 2 (CB 2) */}
          {selectedClassId === 'toan-12-cb2' && (
            <UniformStudentTable
              students={filteredCb2}
              title="Bảng Danh Sách Thành Viên: Lớp 2 (Lớp CB 2)"
              subtitle={`Sĩ số: ${filteredCb2.length} / 3 học sinh`}
              badgeText={`Lớp 2: ${filteredCb2.length} em`}
              badgeColorClass="bg-blue-900 text-white"
            />
          )}

          {/* VIEW 4: SONG SONG 2 LỚP VỚI CÙNG THIẾT KẾ BẢNG ĐỒNG BỘ */}
          {selectedClassId === 'both-separate' && (
            <div className="space-y-6">
              <UniformStudentTable
                students={filteredCb1}
                title="Bảng Danh Sách Thành Viên: Lớp 1 (Lớp CB 1)"
                subtitle={`Sĩ số: ${filteredCb1.length} / 20 học sinh`}
                badgeText={`Lớp 1: ${filteredCb1.length} em`}
                badgeColorClass="bg-blue-900 text-white"
              />
              <UniformStudentTable
                students={filteredCb2}
                title="Bảng Danh Sách Thành Viên: Lớp 2 (Lớp CB 2)"
                subtitle={`Sĩ số: ${filteredCb2.length} / 3 học sinh`}
                badgeText={`Lớp 2: ${filteredCb2.length} em`}
                badgeColorClass="bg-blue-900 text-white"
              />
            </div>
          )}

          {/* VIEW 5: LỚP HỌC ĐANG CHỌN KHÁC */}
          {selectedClassId !== 'toan-12-all' &&
            selectedClassId !== 'toan-12-cb1' &&
            selectedClassId !== 'toan-12-cb2' &&
            selectedClassId !== 'both-separate' && (
              otherClassData?.students && otherClassData.students.length > 0 ? (
                <UniformStudentTable
                  students={filterStudents(sortStudentsByClassAndName(otherClassData.students))}
                  title={`Bảng Danh Sách Học Sinh: ${otherClassData.name}`}
                  subtitle={`Sĩ số: ${otherClassData.students.length} học sinh`}
                  badgeText={`${otherClassData.students.length} học sinh`}
                  badgeColorClass="bg-blue-900 text-white"
                />
              ) : (
                <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 text-center shadow-xs max-w-xl mx-auto space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-900 mx-auto flex items-center justify-center font-bold">
                    <Users className="w-7 h-7 text-blue-900" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-900">
                      {otherClassData?.name || 'Lớp Học'}
                    </h3>
                  </div>
                  <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 text-left space-y-1.5">
                    <p className="font-bold flex items-center gap-1.5 text-amber-950">
                      <Sparkles className="w-4 h-4 text-amber-600" />
                      <span>Đang tiếp nhận hồ sơ đăng ký & xếp lớp:</span>
                    </p>
                    <p className="text-slate-700 leading-relaxed">
                      Lớp học này hiện đang tiếp nhận học sinh đăng ký cho năm học mới. Sau khi các em tham gia buổi kiểm tra đánh giá năng lực đầu vào miễn phí, cơ sở sẽ xếp lớp và công bố danh sách chính thức.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2.5 justify-center pt-2">
                    <button
                      onClick={() => {
                        onClose();
                        onOpenConsultationModal(otherClassData?.grade as GradeLevel);
                      }}
                      className="px-5 py-2.5 bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-sm cursor-pointer"
                    >
                      Đăng ký tham gia lớp này
                    </button>
                    <button
                      onClick={() => setSelectedClassId('toan-12-all')}
                      className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl cursor-pointer"
                    >
                      Xem danh sách lớp Toán 12 (23 học sinh)
                    </button>
                  </div>
                </div>
              )
            )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:px-6 bg-white border-t border-slate-200 flex-shrink-0 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-500 text-center sm:text-left">
            Tổng cộng: <strong className="text-slate-900">{filteredAll.length} học sinh</strong> thuộc Khối 12 (THPT Lưu Nhân Chú)
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
