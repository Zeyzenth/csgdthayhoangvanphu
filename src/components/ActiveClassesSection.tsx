import React, { useState, useMemo } from 'react';
import {
  ChevronRight,
  BookOpen,
  Filter,
  Layers,
  Sparkles,
  Users,
  CheckCircle2,
  Eye
} from 'lucide-react';
import { GradeLevel, Subject, AcademicLevel, ActiveClass } from '../types';
import { ACTIVE_CLASSES } from '../data/activeClassesData';

interface ActiveClassesSectionProps {
  onOpenRosterModal: (classId?: string) => void;
  onOpenConsultationModal: (grade?: GradeLevel) => void;
}

export const ActiveClassesSection: React.FC<ActiveClassesSectionProps> = ({
  onOpenRosterModal,
  onOpenConsultationModal,
}) => {
  // 3-Level Hierarchical State
  // Level 1: Môn học
  const [selectedSubject, setSelectedSubject] = useState<Subject | 'all'>('all');
  // Level 2: Khối lớp
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel | 'all'>('all');
  // Level 3: Trình độ (Cơ bản / Nâng cao)
  const [selectedLevel, setSelectedLevel] = useState<AcademicLevel | 'all'>('all');

  // Subject options requested: Toán — Lí — Hoá — Anh — Văn — Sinh - Sử - Địa - Công nghệ thông tin - Luyện viết chữ đẹp
  const subjects: { value: Subject | 'all'; label: string }[] = [
    { value: 'all', label: 'Tất cả môn' },
    { value: 'Toán', label: 'Toán' },
    { value: 'Lí', label: 'Lí' },
    { value: 'Hoá', label: 'Hoá' },
    { value: 'Anh', label: 'Anh' },
    { value: 'Văn', label: 'Văn' },
    { value: 'Sinh', label: 'Sinh' },
    { value: 'Sử', label: 'Sử' },
    { value: 'Địa', label: 'Địa' },
    { value: 'Công nghệ thông tin', label: 'Công nghệ thông tin' },
    { value: 'Luyện viết chữ đẹp', label: 'Luyện viết chữ đẹp' },
  ];

  // Grade options
  const grades: { value: GradeLevel | 'all'; label: string }[] = [
    { value: 'all', label: 'Tất cả khối' },
    { value: '12', label: 'Lớp 12' },
    { value: '11', label: 'Lớp 11' },
    { value: '10', label: 'Lớp 10' },
    { value: '9', label: 'Lớp 9' },
    { value: '8', label: 'Lớp 8' },
    { value: '7', label: 'Lớp 7' },
    { value: '6', label: 'Lớp 6' },
    { value: 'cntt', label: 'Khối CNTT' },
    { value: 'van-chu-dep', label: 'Khối Chữ Đẹp' },
  ];

  // Academic level options
  const levels: { value: AcademicLevel | 'all'; label: string; desc: string }[] = [
    { value: 'all', label: 'Tất cả trình độ', desc: 'Xem mọi cấp độ' },
    { value: 'Cơ Bản', label: 'Lớp Cơ Bản', desc: 'Vững nền tảng, chống liệt, thi tốt nghiệp 7-8+' },
    { value: 'Nâng Cao', label: 'Lớp Nâng Cao', desc: 'Vận dụng cao 8.5+, 9+, Chuyên, HSG' },
  ];

  // Filter classes by 3-level hierarchy
  const filteredClasses = useMemo(() => {
    return ACTIVE_CLASSES.filter((c) => {
      const matchSubject = selectedSubject === 'all' || c.subject === selectedSubject;
      const matchGrade = selectedGrade === 'all' || c.grade === selectedGrade;
      const matchLevel = selectedLevel === 'all' || c.level === selectedLevel;
      return matchSubject && matchGrade && matchLevel;
    });
  }, [selectedSubject, selectedGrade, selectedLevel]);

  return (
    <section id="lop-hoc-hien-co" className="py-16 sm:py-20 bg-slate-100/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-black bg-blue-100 text-blue-900 border border-blue-200 mb-3 shadow-sm">
            <BookOpen className="w-4 h-4 text-blue-800" />
            <span>DANH SÁCH LỚP HỌC & LỊCH KHAI GIẢNG</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
            Lịch Học & Phân Nhóm Lớp
          </h2>

          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            Phân chia khoa học theo <strong className="text-slate-900">Môn học</strong> &rarr;{' '}
            <strong className="text-slate-900">Khối lớp</strong> &rarr;{' '}
            <strong className="text-slate-900">Trình độ (Cơ bản / Nâng cao)</strong>. Sĩ số giới hạn 15 - 20 học sinh/lớp nhằm theo sát năng lực và hỗ trợ từng em tiến bộ vững chắc.
          </p>
        </div>

        {/* 3-STEP HIERARCHY FILTER BAR */}
        <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-md border border-slate-200 mb-10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-blue-900" />
              <h3 className="text-base sm:text-lg font-black text-slate-900">
                Bộ Lọc Phân Cấp Lớp Học
              </h3>
            </div>
            <span className="text-xs text-slate-500 font-medium">
              Tìm lớp theo: <strong>1. Môn học</strong> &rarr; <strong>2. Khối lớp</strong> &rarr; <strong>3. Trình độ</strong>
            </span>
          </div>

          {/* STEP 1: CHIA THEO MÔN HỌC */}
          <div>
            <div className="flex items-center justify-between gap-2 mb-2.5">
              <span className="text-xs font-black uppercase tracking-wider text-blue-900 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-blue-900 text-white flex items-center justify-center text-[10px]">
                  1
                </span>
                <span>Chia theo Môn học:</span>
              </span>
              {selectedSubject !== 'all' && (
                <button
                  onClick={() => setSelectedSubject('all')}
                  className="text-[11px] text-blue-700 hover:underline font-bold cursor-pointer"
                >
                  Tất cả môn
                </button>
              )}
            </div>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 flex-nowrap scrollbar-thin">
              {subjects.map((sub) => {
                const isSelected = selectedSubject === sub.value;
                return (
                  <button
                    key={sub.value}
                    onClick={() => setSelectedSubject(sub.value)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex-shrink-0 flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-blue-900 text-white shadow-sm ring-2 ring-blue-900/20'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <span>{sub.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 2: CHIA THEO LỚP (KHỐI) */}
          <div className="border-t border-slate-100 pt-4">
            <div className="flex items-center justify-between gap-2 mb-2.5">
              <span className="text-xs font-black uppercase tracking-wider text-indigo-900 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-indigo-800 text-white flex items-center justify-center text-[10px]">
                  2
                </span>
                <span>Chia theo Lớp (Khối):</span>
              </span>
              {selectedGrade !== 'all' && (
                <button
                  onClick={() => setSelectedGrade('all')}
                  className="text-[11px] text-indigo-700 hover:underline font-bold cursor-pointer"
                >
                  Tất cả khối
                </button>
              )}
            </div>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 flex-nowrap scrollbar-thin">
              {grades.map((grade) => {
                const isSelected = selectedGrade === grade.value;
                return (
                  <button
                    key={grade.value}
                    onClick={() => setSelectedGrade(grade.value)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex-shrink-0 ${
                      isSelected
                        ? grade.value === 'cntt'
                          ? 'bg-cyan-700 text-white shadow-sm'
                          : grade.value === 'van-chu-dep'
                          ? 'bg-fuchsia-700 text-white shadow-sm'
                          : 'bg-indigo-800 text-white shadow-sm ring-2 ring-indigo-800/20'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {grade.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 3: CHIA THEO TRÌNH ĐỘ (CƠ BẢN HOẶC NÂNG CAO) */}
          <div className="border-t border-slate-100 pt-4">
            <div className="flex items-center justify-between gap-2 mb-2.5">
              <span className="text-xs font-black uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-emerald-800 text-white flex items-center justify-center text-[10px]">
                  3
                </span>
                <span>Chia theo Trình độ (Cơ bản / Nâng cao):</span>
              </span>
              {selectedLevel !== 'all' && (
                <button
                  onClick={() => setSelectedLevel('all')}
                  className="text-[11px] text-emerald-700 hover:underline font-bold cursor-pointer"
                >
                  Tất cả trình độ
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
              {levels.map((lvl) => {
                const isSelected = selectedLevel === lvl.value;
                return (
                  <button
                    key={lvl.value}
                    onClick={() => setSelectedLevel(lvl.value)}
                    className={`p-3 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-emerald-900 text-white border-emerald-900 shadow-sm'
                        : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="font-extrabold text-xs sm:text-sm">{lvl.label}</span>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-emerald-300" />}
                    </div>
                    <span
                      className={`text-[11px] leading-snug ${
                        isSelected ? 'text-emerald-100' : 'text-slate-500'
                      }`}
                    >
                      {lvl.desc}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Current Filter Summary Badge */}
          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200/80 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-slate-600">Đang lọc:</span>
              <span className="px-2.5 py-0.5 rounded-md bg-blue-100 text-blue-900 font-extrabold">
                Môn: {selectedSubject === 'all' ? 'Tất cả' : selectedSubject}
              </span>
              <span className="px-2.5 py-0.5 rounded-md bg-indigo-100 text-indigo-900 font-extrabold">
                Lớp: {selectedGrade === 'all' ? 'Tất cả' : selectedGrade === 'cntt' ? 'CNTT' : selectedGrade === 'van-chu-dep' ? 'Chữ Đẹp' : `Khối ${selectedGrade}`}
              </span>
              <span className="px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-900 font-extrabold">
                Trình độ: {selectedLevel === 'all' ? 'Tất cả' : selectedLevel}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-500">
                Tìm thấy <strong>{filteredClasses.length} lớp học</strong>
              </span>
              {(selectedSubject !== 'all' || selectedGrade !== 'all' || selectedLevel !== 'all') && (
                <button
                  onClick={() => {
                    setSelectedSubject('all');
                    setSelectedGrade('all');
                    setSelectedLevel('all');
                  }}
                  className="px-2 py-0.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded cursor-pointer"
                >
                  Xóa lọc
                </button>
              )}
            </div>
          </div>
        </div>

        {/* SECTION: TẤT CẢ CÁC LỚP HỌC THEO BỘ LỌC HIERARCHY */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <h3 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
                <span>Danh Sách Lớp Học Đang Mở & Tuyển Sinh</span>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-900">
                  {filteredClasses.length} lớp
                </span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-500">
                Phân rõ Lớp 1, Lớp 2, phân loại Cơ bản và Nâng cao cho từng bộ môn
              </p>
            </div>

            <button
              onClick={() => onOpenRosterModal('toan-12-all')}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200 font-bold text-xs transition-colors cursor-pointer self-start sm:self-auto shadow-2xs"
            >
              <Eye className="w-4 h-4 text-blue-800" />
              <span>Xem danh sách học sinh hiện có (23 em)</span>
            </button>
          </div>

          {filteredClasses.length === 0 ? (
            <div className="bg-white rounded-3xl p-10 text-center border border-slate-200 shadow-sm max-w-lg mx-auto">
              <BookOpen className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <h4 className="text-base font-bold text-slate-800 mb-1">
                Chưa có lớp phù hợp với bộ lọc hiện tại
              </h4>
              <p className="text-xs text-slate-500 mb-4">
                Bạn có thể đặt lại bộ lọc môn học, khối lớp hoặc trình độ để xem tất cả các lớp đang mở.
              </p>
              <button
                onClick={() => {
                  setSelectedSubject('all');
                  setSelectedGrade('all');
                  setSelectedLevel('all');
                }}
                className="px-4 py-2 bg-blue-900 text-white font-bold text-xs rounded-xl shadow-sm hover:bg-blue-800 transition-colors cursor-pointer"
              >
                Xem tất cả các lớp
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredClasses.map((cls) => {
                const hasStudents = cls.students && cls.students.length > 0;
                const isMathCoBan = cls.id === 'toan-12-cb1' || cls.id === 'toan-12-cb2';

                return (
                  <div
                    key={cls.id}
                    onClick={() => onOpenRosterModal(cls.id)}
                    className={`bg-white rounded-3xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all flex flex-col justify-between relative group cursor-pointer ${
                      isMathCoBan
                        ? cls.id === 'toan-12-cb1'
                          ? 'border-2 border-blue-900/40 ring-1 ring-blue-900/10 hover:border-blue-900'
                          : 'border-2 border-emerald-500/40 ring-1 ring-emerald-500/10 hover:border-emerald-600'
                        : 'border border-slate-200/80 hover:border-blue-400'
                    }`}
                  >
                    <div>
                      {/* Top Badges */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-900 border border-blue-200">
                          Môn {cls.subject} • {cls.grade === 'cntt' ? 'Khối CNTT' : cls.grade === 'van-chu-dep' ? 'Khối Chữ Đẹp' : `Khối ${cls.grade}`}
                        </span>

                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                            cls.level === 'Nâng Cao'
                              ? 'bg-purple-50 text-purple-900 border border-purple-200'
                              : 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                          }`}
                        >
                          {cls.level}
                        </span>
                      </div>

                      {/* Class Group Tag */}
                      <div className="mb-2">
                        <span className="inline-block text-xs font-black text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-md">
                          Phân nhóm: {cls.classGroup}
                        </span>
                      </div>

                      {/* Class Title */}
                      <h4 className="text-lg font-black text-slate-900 group-hover:text-blue-900 transition-colors leading-snug">
                        {cls.name}
                      </h4>

                      {/* Details List */}
                      <div className="space-y-2 my-4 text-xs text-slate-600">
                        {/* Sĩ số row with quick View Roster badge */}
                        <div className="flex items-center justify-between gap-2 p-2 rounded-xl bg-slate-50 border border-slate-100 group-hover:border-blue-200 transition-colors">
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                            <span>
                              Sĩ số:{' '}
                              <strong className="text-slate-900">
                                {hasStudents ? `${cls.students.length} học sinh` : cls.statusLabel}
                              </strong>
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onOpenRosterModal(cls.id);
                            }}
                            className="text-[11px] font-bold text-blue-700 bg-blue-100 hover:bg-blue-900 hover:text-white px-2 py-0.5 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                          >
                            <Eye className="w-3 h-3" />
                            <span>Xem DS</span>
                          </button>
                        </div>

                        {cls.note && (
                          <p className="text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-100 leading-relaxed mt-2">
                            {cls.note}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Card Action Buttons */}
                    <div className="pt-4 border-t border-slate-100 space-y-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenRosterModal(cls.id);
                        }}
                        className="w-full py-2.5 px-4 bg-gradient-to-r from-blue-900 to-indigo-950 hover:from-blue-800 hover:to-indigo-900 text-white font-bold text-xs rounded-xl shadow-xs hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Eye className="w-4 h-4 text-amber-300" />
                        <span>
                          {hasStudents
                            ? `Xem Danh Sách Học Sinh Hiện Có (${cls.students.length} em)`
                            : `Xem Danh Sách Học Sinh Lớp Này`}
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenConsultationModal(cls.grade);
                        }}
                        className="w-full py-2 px-3 bg-red-50 hover:bg-red-100 text-red-700 font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <span>Đăng ký tham gia vào nhóm lớp này</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Bottom Call to Action */}
        <div className="mt-12 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 text-center max-w-3xl mx-auto shadow-sm">
          <h4 className="text-base sm:text-lg font-black text-slate-900 mb-1">
            Cần kiểm tra xếp lớp cho học sinh hoặc tư vấn chọn nhóm lớp phù hợp?
          </h4>
          <p className="text-xs sm:text-sm text-slate-600 mb-5 max-w-xl mx-auto">
            Học sinh được làm bài kiểm tra đánh giá năng lực đầu vào hoàn toàn miễn phí để xếp đúng vào Lớp 1 hoặc Lớp 2 (Cơ bản / Nâng cao) theo đúng tốc độ học.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => onOpenRosterModal('toan-12-all')}
              className="px-5 py-3 bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md cursor-pointer inline-flex items-center gap-2"
            >
              <Eye className="w-4 h-4 text-amber-300" />
              <span>Xem Danh Sách Toàn Bộ Học Sinh (23 em)</span>
            </button>
            <button
              onClick={() => onOpenConsultationModal()}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-black text-xs sm:text-sm rounded-xl transition-all shadow-md hover:shadow-red-600/20 cursor-pointer"
            >
              Đăng Ký Đánh Giá & Xếp Lớp Ngay
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
