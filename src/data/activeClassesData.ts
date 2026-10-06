import { ActiveClass, Student } from '../types';

// Helper tách họ tên theo chuẩn tiếng Việt để sắp xếp Tên trước, rồi đến Họ & Đệm
export function getVietnameseNameParts(fullName: string) {
  const parts = fullName.trim().split(/\s+/);
  const firstName = parts[parts.length - 1] || '';
  const lastNameAndMiddle = parts.slice(0, parts.length - 1).join(' ');
  return { firstName, lastNameAndMiddle, fullName };
}

// So sánh tên chuẩn tiếng Việt (Tên trước A-Z, nếu trùng so sánh Họ & Đệm)
export function compareVietnameseNames(nameA: string, nameB: string): number {
  const pA = getVietnameseNameParts(nameA);
  const pB = getVietnameseNameParts(nameB);
  const fComp = pA.firstName.localeCompare(pB.firstName, 'vi');
  if (fComp !== 0) return fComp;
  return pA.lastNameAndMiddle.localeCompare(pB.lastNameAndMiddle, 'vi');
}

// Trọng số thứ tự phân lớp học: CB1 -> CB2 -> CB3 -> CB4 -> NC
export function getAssignedClassPriority(assignedClass: string): number {
  if (!assignedClass) return 999;
  const upper = assignedClass.toUpperCase();
  if (upper.includes('CB1') || upper.includes('CƠ BẢN 1') || upper.includes('LỚP 1')) return 1;
  if (upper.includes('CB2') || upper.includes('CƠ BẢN 2') || upper.includes('LỚP 2')) return 2;
  if (upper.includes('CB3') || upper.includes('CƠ BẢN 3') || upper.includes('LỚP 3')) return 3;
  if (upper.includes('CB4') || upper.includes('CƠ BẢN 4') || upper.includes('LỚP 4')) return 4;
  if (upper.includes('NC') || upper.includes('NÂNG CAO')) return 5;
  return 10;
}

// Hàm so sánh lớp trường (12A1 -> 12A9, rồi đến lớp khác)
export function compareSchoolClasses(classA: string, classB: string): number {
  if (classA === classB) return 0;
  const matchA = (classA || '').trim().match(/^(\d+)(.*)$/);
  const matchB = (classB || '').trim().match(/^(\d+)(.*)$/);
  if (matchA && matchB) {
    const gradeA = parseInt(matchA[1], 10);
    const gradeB = parseInt(matchB[1], 10);
    if (gradeA !== gradeB) return gradeA - gradeB;
    const suffA = matchA[2].trim();
    const suffB = matchB[2].trim();
    if (suffA && !suffB) return -1;
    if (!suffA && suffB) return 1;
    return suffA.localeCompare(suffB, 'vi', { numeric: true });
  }
  return (classA || '').localeCompare(classB || '', 'vi', { numeric: true });
}

// Hàm sắp xếp học sinh linh hoạt theo:
// - 'assignedClass' (Mặc định): Phân lớp học (CB1 -> CB2 -> CB3) -> Lớp trường (A1 -> A9) -> Tên A-Z
// - 'schoolClass': Lớp trường (A1 -> A9) -> Phân lớp học -> Tên A-Z
// - 'name': Tên A-Z -> Phân lớp học -> Lớp trường
export function sortStudentsByClassAndName(
  students: Student[],
  sortBy: 'assignedClass' | 'schoolClass' | 'name' = 'assignedClass'
): Student[] {
  return [...students].sort((a, b) => {
    if (sortBy === 'assignedClass') {
      // 1. Phân lớp học: CB1 -> CB2 -> CB3
      const prioA = getAssignedClassPriority(a.assignedClass || '');
      const prioB = getAssignedClassPriority(b.assignedClass || '');
      if (prioA !== prioB) return prioA - prioB;

      // 2. Lớp trường: 12A1 -> 12A9
      const classComp = compareSchoolClasses(a.schoolClass || '', b.schoolClass || '');
      if (classComp !== 0) return classComp;

      // 3. Tên học sinh A - Z (chuẩn tiếng Việt)
      return compareVietnameseNames(a.name, b.name);
    }

    if (sortBy === 'schoolClass') {
      // 1. Sắp xếp theo lớp trường: 12A1 -> 12A9
      const classComp = compareSchoolClasses(a.schoolClass || '', b.schoolClass || '');
      if (classComp !== 0) return classComp;

      // 2. Phân lớp học: CB1 -> CB2 -> CB3
      const prioA = getAssignedClassPriority(a.assignedClass || '');
      const prioB = getAssignedClassPriority(b.assignedClass || '');
      if (prioA !== prioB) return prioA - prioB;

      // 3. Tên học sinh A - Z
      return compareVietnameseNames(a.name, b.name);
    }

    // sortBy === 'name'
    const nameComp = compareVietnameseNames(a.name, b.name);
    if (nameComp !== 0) return nameComp;

    const prioA = getAssignedClassPriority(a.assignedClass || '');
    const prioB = getAssignedClassPriority(b.assignedClass || '');
    if (prioA !== prioB) return prioA - prioB;

    return compareSchoolClasses(a.schoolClass || '', b.schoolClass || '');
  });
}

// Alias cho việc sắp xếp theo phân lớp học
export const sortStudentsByAssignedClassAndSchoolClass = sortStudentsByClassAndName;

// ==========================================
// DANH SÁCH 3 PHÂN LỚP TOÁN 12 CƠ BẢN
// ==========================================

// LỚP TOÁN 12 - CƠ BẢN 1 (GV: Cô Hường) - 29 học sinh (100% 12A9 THPT Lưu Nhân Chú - Cập nhật chính xác theo danh sách mới)
export const STUDENTS_TOAN_12_CB1: Student[] = [
  { id: '12cb1-1', stt: 1, name: 'Dương Thế Anh', schoolClass: '12A9', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'CB1 - Toán 12 (GV: Cô Hường)' },
  { id: '12cb1-2', stt: 2, name: 'Lê Khánh Chi', schoolClass: '12A9', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'CB1 - Toán 12 (GV: Cô Hường)' },
  { id: '12cb1-3', stt: 3, name: 'Đặng Xuân Chiều', schoolClass: '12A9', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'CB1 - Toán 12 (GV: Cô Hường)' },
  { id: '12cb1-4', stt: 4, name: 'Nguyễn Văn Đại', schoolClass: '12A9', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'CB1 - Toán 12 (GV: Cô Hường)' },
  { id: '12cb1-5', stt: 5, name: 'Lê Đăng Đức', schoolClass: '12A9', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'CB1 - Toán 12 (GV: Cô Hường)' },
  { id: '12cb1-6', stt: 6, name: 'Lê Quỳnh Diễm', schoolClass: '12A9', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'CB1 - Toán 12 (GV: Cô Hường)' },
  { id: '12cb1-7', stt: 7, name: 'Nguyễn Viết Dương', schoolClass: '12A9', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'CB1 - Toán 12 (GV: Cô Hường)' },
  { id: '12cb1-8', stt: 8, name: 'Trần Đặng Phương Hiếu', schoolClass: '12A9', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'CB1 - Toán 12 (GV: Cô Hường)' },
  { id: '12cb1-9', stt: 9, name: 'Dương Chí Huy', schoolClass: '12A9', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'CB1 - Toán 12 (GV: Cô Hường)' },
  { id: '12cb1-10', stt: 10, name: 'Nguyễn Quang Huyên', schoolClass: '12A9', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'CB1 - Toán 12 (GV: Cô Hường)' },
  { id: '12cb1-11', stt: 11, name: 'Dương Hồng Lê', schoolClass: '12A9', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'CB1 - Toán 12 (GV: Cô Hường)' },
  { id: '12cb1-12', stt: 12, name: 'Lưu Quang Linh', schoolClass: '12A9', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'CB1 - Toán 12 (GV: Cô Hường)' },
  { id: '12cb1-13', stt: 13, name: 'Đỗ Thị Mỹ Linh', schoolClass: '12A9', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'CB1 - Toán 12 (GV: Cô Hường)' },
  { id: '12cb1-14', stt: 14, name: 'Đào Thùy Loan', schoolClass: '12A9', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'CB1 - Toán 12 (GV: Cô Hường)' },
  { id: '12cb1-15', stt: 15, name: 'Vũ Gia Long', schoolClass: '12A9', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'CB1 - Toán 12 (GV: Cô Hường)' },
  { id: '12cb1-16', stt: 16, name: 'Vũ Ngọc Cẩm Ly', schoolClass: '12A9', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'CB1 - Toán 12 (GV: Cô Hường)' },
  { id: '12cb1-17', stt: 17, name: 'Ngô Kiều Mỹ', schoolClass: '12A9', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'CB1 - Toán 12 (GV: Cô Hường)' },
  { id: '12cb1-18', stt: 18, name: 'Trần Bảo Ngọc', schoolClass: '12A9', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'CB1 - Toán 12 (GV: Cô Hường)' },
  { id: '12cb1-19', stt: 19, name: 'Nguyễn Hồng Nhung', schoolClass: '12A9', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'CB1 - Toán 12 (GV: Cô Hường)' },
  { id: '12cb1-20', stt: 20, name: 'Đặng Thuỳ Trang', schoolClass: '12A9', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'CB1 - Toán 12 (GV: Cô Hường)' },
  { id: '12cb1-21', stt: 21, name: 'Nguyễn Thị Cẩm Tú', schoolClass: '12A9', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'CB1 - Toán 12 (GV: Cô Hường)' },
  { id: '12cb1-22', stt: 22, name: 'Phạm Thế Vinh', schoolClass: '12A9', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'CB1 - Toán 12 (GV: Cô Hường)' },
  { id: '12cb1-23', stt: 23, name: 'Nguyễn Văn Xuân', schoolClass: '12A9', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'CB1 - Toán 12 (GV: Cô Hường)' },
  { id: '12cb1-24', stt: 24, name: 'Nguyễn Thị Thùy Trang', schoolClass: '12A9', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'CB1 - Toán 12 (GV: Cô Hường)' },
  { id: '12cb1-25', stt: 25, name: 'Bùi Khánh Vy', schoolClass: '12A9', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'CB1 - Toán 12 (GV: Cô Hường)' },
  { id: '12cb1-26', stt: 26, name: 'Triệu Ngọc Duy', schoolClass: '12A9', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'CB1 - Toán 12 (GV: Cô Hường)' },
  { id: '12cb1-27', stt: 27, name: 'Đào Anh Tài', schoolClass: '12A9', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'CB1 - Toán 12 (GV: Cô Hường)' },
  { id: '12cb1-28', stt: 28, name: 'Lê Hồng Minh', schoolClass: '12A9', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'CB1 - Toán 12 (GV: Cô Hường)' },
  { id: '12cb1-29', stt: 29, name: 'Dương Tuấn Vinh', schoolClass: '12A9', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'CB1 - Toán 12 (GV: Cô Hường)' },
];

// LỚP TOÁN 12 - CƠ BẢN 2 (GV: Cô Hân) - 23 học sinh (12A6: 19 em, 12A7: 2 em, THPT Đội Cấn: 2 em)
export const STUDENTS_TOAN_12_CB2: Student[] = [
  { id: '12cb2-1', stt: 1, name: 'Lê Ngọc Bách', schoolClass: '12A6', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'CB2 - Toán 12 (GV: Cô Hân)' },
  { id: '12cb2-2', stt: 2, name: 'Lưu Thị Bích', schoolClass: '12A6', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'CB2 - Toán 12 (GV: Cô Hân)' },
  { id: '12cb2-3', stt: 3, name: 'Nguyễn Thanh Bình', schoolClass: '12A6', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'CB2 - Toán 12 (GV: Cô Hân)' },
  { id: '12cb2-4', stt: 4, name: 'Nguyễn Thị Mai Duyên', schoolClass: '12A6', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'CB2 - Toán 12 (GV: Cô Hân)' },
  { id: '12cb2-5', stt: 5, name: 'Trần Thị Hoài', schoolClass: '12A6', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'CB2 - Toán 12 (GV: Cô Hân)' },
  { id: '12cb2-6', stt: 6, name: 'Trần Duy Khoa', schoolClass: '12A6', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'CB2 - Toán 12 (GV: Cô Hân)' },
  { id: '12cb2-7', stt: 7, name: 'Nguyễn Khánh Ly', schoolClass: '12A6', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'CB2 - Toán 12 (GV: Cô Hân)' },
  { id: '12cb2-8', stt: 8, name: 'Nguyễn Thị Ánh Ngọc', schoolClass: '12A6', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'CB2 - Toán 12 (GV: Cô Hân)' },
  { id: '12cb2-9', stt: 9, name: 'Lê Thanh Nhật', schoolClass: '12A6', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'CB2 - Toán 12 (GV: Cô Hân)' },
  { id: '12cb2-10', stt: 10, name: 'Trần Quang Phong', schoolClass: '12A6', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'CB2 - Toán 12 (GV: Cô Hân)' },
  { id: '12cb2-11', stt: 11, name: 'Lương Khánh Phương', schoolClass: '12A6', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'CB2 - Toán 12 (GV: Cô Hân)' },
  { id: '12cb2-12', stt: 12, name: 'Lê Thảo Quyên', schoolClass: '12A6', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'CB2 - Toán 12 (GV: Cô Hân)' },
  { id: '12cb2-13', stt: 13, name: 'Nguyễn Phương Thảo', schoolClass: '12A6', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'CB2 - Toán 12 (GV: Cô Hân)' },
  { id: '12cb2-14', stt: 14, name: 'Trần Thị Thanh Trúc', schoolClass: '12A6', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'CB2 - Toán 12 (GV: Cô Hân)' },
  { id: '12cb2-15', stt: 15, name: 'Nguyễn Thị Thanh Tú', schoolClass: '12A6', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'CB2 - Toán 12 (GV: Cô Hân)' },
  { id: '12cb2-16', stt: 16, name: 'Trần Thanh Tú', schoolClass: '12A6', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'CB2 - Toán 12 (GV: Cô Hân)' },
  { id: '12cb2-17', stt: 17, name: 'Lê Thanh Tùng', schoolClass: '12A6', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'CB2 - Toán 12 (GV: Cô Hân)' },
  { id: '12cb2-18', stt: 18, name: 'Nguyễn Hải Yến', schoolClass: '12A6', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'CB2 - Toán 12 (GV: Cô Hân)' },
  { id: '12cb2-19', stt: 19, name: 'Lê Minh Châu', schoolClass: '12A6', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'CB2 - Toán 12 (GV: Cô Hân)' },
  { id: '12cb2-20', stt: 20, name: 'Nguyễn Thị Việt Hà', schoolClass: '12A7', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'CB2 - Toán 12 (GV: Cô Hân)' },
  { id: '12cb2-21', stt: 21, name: 'Dương Quốc Việt', schoolClass: '12A7', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'CB2 - Toán 12 (GV: Cô Hân)' },
  { id: '12cb2-22', stt: 22, name: 'Ngô Minh Hiếu', schoolClass: '12', schoolName: 'THPT Đội Cấn', assignedClass: 'CB2 - Toán 12 (GV: Cô Hân)' },
  { id: '12cb2-23', stt: 23, name: 'Nguyễn Thị Hiền Trang', schoolClass: '12', schoolName: 'THPT Đội Cấn', assignedClass: 'CB2 - Toán 12 (GV: Cô Hân)' },
];

// LỚP TOÁN 12 - CƠ BẢN 3 (GV: Cô Hường) - 24 học sinh (12A8: 22 em, 12A5: 2 em)
export const STUDENTS_TOAN_12_CB3: Student[] = [
  { id: '12cb3-1', stt: 1, name: 'Ngô Thị Minh Thư', schoolClass: '12A8', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'CB3 - Toán 12 (GV: Cô Hường)' },
  { id: '12cb3-2', stt: 2, name: 'Ngô Trần Hoàng Linh', schoolClass: '12A8', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'CB3 - Toán 12 (GV: Cô Hường)' },
  { id: '12cb3-3', stt: 3, name: 'Trần Thị Thanh Tú', schoolClass: '12A8', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'CB3 - Toán 12 (GV: Cô Hường)' },
  { id: '12cb3-4', stt: 4, name: 'Nguyễn Thị Thanh Hằng', schoolClass: '12A8', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'CB3 - Toán 12 (GV: Cô Hường)' },
  { id: '12cb3-5', stt: 5, name: 'Nguyễn Thị Bích', schoolClass: '12A8', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'CB3 - Toán 12 (GV: Cô Hường)' },
  { id: '12cb3-6', stt: 6, name: 'Ma Đỗ Bảo Châm', schoolClass: '12A8', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'CB3 - Toán 12 (GV: Cô Hường)' },
  { id: '12cb3-7', stt: 7, name: 'Trần Thị Khánh Dinh', schoolClass: '12A8', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'CB3 - Toán 12 (GV: Cô Hường)' },
  { id: '12cb3-8', stt: 8, name: 'Đỗ Ngọc Như', schoolClass: '12A8', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'CB3 - Toán 12 (GV: Cô Hường)' },
  { id: '12cb3-9', stt: 9, name: 'Nguyễn Thị Quỳnh Như', schoolClass: '12A8', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'CB3 - Toán 12 (GV: Cô Hường)' },
  { id: '12cb3-10', stt: 10, name: 'Đỗ Thị Phương', schoolClass: '12A8', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'CB3 - Toán 12 (GV: Cô Hường)' },
  { id: '12cb3-11', stt: 11, name: 'Nguyễn Bàn Phương Vy', schoolClass: '12A8', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'CB3 - Toán 12 (GV: Cô Hường)' },
  { id: '12cb3-12', stt: 12, name: 'Phạm Thị Yến', schoolClass: '12A8', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'CB3 - Toán 12 (GV: Cô Hường)' },
  { id: '12cb3-13', stt: 13, name: 'Lý Hoàng Ly Ly', schoolClass: '12A8', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'CB3 - Toán 12 (GV: Cô Hường)' },
  { id: '12cb3-14', stt: 14, name: 'Lục Thị Minh Huệ', schoolClass: '12A8', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'CB3 - Toán 12 (GV: Cô Hường)' },
  { id: '12cb3-15', stt: 15, name: 'Đỗ Anh Tuấn', schoolClass: '12A8', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'CB3 - Toán 12 (GV: Cô Hường)' },
  { id: '12cb3-16', stt: 16, name: 'Lê Đình Việt Hoàng', schoolClass: '12A8', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'CB3 - Toán 12 (GV: Cô Hường)' },
  { id: '12cb3-17', stt: 17, name: 'Hà Anh Tuấn', schoolClass: '12A8', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'CB3 - Toán 12 (GV: Cô Hường)' },
  { id: '12cb3-18', stt: 18, name: 'Nguyễn Huy Hoàng', schoolClass: '12A8', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'CB3 - Toán 12 (GV: Cô Hường)' },
  { id: '12cb3-19', stt: 19, name: 'Ngô Gia Mỹ', schoolClass: '12A8', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'CB3 - Toán 12 (GV: Cô Hường)' },
  { id: '12cb3-20', stt: 20, name: 'Nguyễn Khánh Ly', schoolClass: '12A8', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'CB3 - Toán 12 (GV: Cô Hường)' },
  { id: '12cb3-21', stt: 21, name: 'Lưu Minh Vũ', schoolClass: '12A8', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'CB3 - Toán 12 (GV: Cô Hường)' },
  { id: '12cb3-22', stt: 22, name: 'Nguyễn Quốc Khánh', schoolClass: '12A8', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'CB3 - Toán 12 (GV: Cô Hường)' },
  { id: '12cb3-23', stt: 23, name: 'Dương Thị Thảo', schoolClass: '12A5', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'CB3 - Toán 12 (GV: Cô Hường)' },
  { id: '12cb3-24', stt: 24, name: 'Hoàng Thanh Thương', schoolClass: '12A5', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'CB3 - Toán 12 (GV: Cô Hường)' },
];

// Tổng hợp 76 học sinh của cả 3 phân lớp Toán 12 Cơ bản (CB1: 29 em, CB2: 23 em, CB3: 24 em - ĐÃ ĐẦY CẢ 3 LỚP)
export const STUDENTS_TOAN_12_CO_BAN: Student[] = [
  ...STUDENTS_TOAN_12_CB1,
  ...STUDENTS_TOAN_12_CB2,
  ...STUDENTS_TOAN_12_CB3,
];

// Lớp Toán 12 Nâng Cao 8.5+ (5 học sinh)
export const STUDENTS_TOAN_12_NC: Student[] = [
  { id: 'nc12-1', stt: 1, name: 'Vũ Đức Lương', schoolClass: '12A6', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'NC - Toán 12' },
  { id: 'nc12-2', stt: 2, name: 'Phạm Minh Trang', schoolClass: '12A6', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'NC - Toán 12' },
  { id: 'nc12-3', stt: 3, name: 'Ngô Thuỳ Linh', schoolClass: '12A8', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'NC - Toán 12' },
  { id: 'nc12-4', stt: 4, name: 'Nguyễn Văn Đạt', schoolClass: '12A9', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'NC - Toán 12' },
  { id: 'nc12-5', stt: 5, name: 'Nguyễn Thu Hiền', schoolClass: '12A9', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'NC - Toán 12' },
];

// Lớp Toán 11 - Phân lớp CB 1 (19 học sinh - GV: Cô Vũ Hằng - Cập nhật chính xác theo danh sách mới)
export const STUDENTS_TOAN_11_CB1: Student[] = [
  { id: 'cb11-1', stt: 1, name: 'Phạm Mạnh Tiến', schoolClass: '11A9', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'CB1 - Toán 11' },
  { id: 'cb11-2', stt: 2, name: 'Vũ Đức Mạnh', schoolClass: '11A2', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'CB1 - Toán 11' },
  { id: 'cb11-3', stt: 3, name: 'Nguyễn Thị Miền', schoolClass: '11A2', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'CB1 - Toán 11' },
  { id: 'cb11-4', stt: 4, name: 'Nguyễn Thị Thanh Trúc', schoolClass: '11A10', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'CB1 - Toán 11' },
  { id: 'cb11-5', stt: 5, name: 'Trần Thị Bích Ngọc', schoolClass: '11A9', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'CB1 - Toán 11' },
  { id: 'cb11-6', stt: 6, name: 'Lai Ngọc Diễm Kiều', schoolClass: '11A9', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'CB1 - Toán 11' },
  { id: 'cb11-7', stt: 7, name: 'Ngô Ngọc Bích', schoolClass: '11A2', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'CB1 - Toán 11' },
  { id: 'cb11-8', stt: 8, name: 'Nguyễn Thị Quỳnh Nga', schoolClass: '11A2', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'CB1 - Toán 11' },
  { id: 'cb11-9', stt: 9, name: 'Trần Thị Ngọc Ánh', schoolClass: '11A2', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'CB1 - Toán 11' },
  { id: 'cb11-10', stt: 10, name: 'Nguyễn Khánh Dinh', schoolClass: '11A5', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'CB1 - Toán 11' },
  { id: 'cb11-11', stt: 11, name: 'Lê Thị Quỳnh Anh', schoolClass: '11A4', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'CB1 - Toán 11' },
  { id: 'cb11-12', stt: 12, name: 'Nguyễn Tiến Duy', schoolClass: '11A4', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'CB1 - Toán 11' },
  { id: 'cb11-13', stt: 13, name: 'Đỗ Minh Đức', schoolClass: '11A1', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'CB1 - Toán 11' },
  { id: 'cb11-14', stt: 14, name: 'Ma Tuấn Nam', schoolClass: '11A1', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'CB1 - Toán 11' },
  { id: 'cb11-15', stt: 15, name: 'Nguyễn Huỳnh Đức', schoolClass: '11A1', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'CB1 - Toán 11' },
  { id: 'cb11-16', stt: 16, name: 'Hoàng Ngọc Mai', schoolClass: '11A10', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'CB1 - Toán 11' },
  { id: 'cb11-17', stt: 17, name: 'Phạm Hoàng Anh', schoolClass: '11A2', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'CB1 - Toán 11' },
  { id: 'cb11-18', stt: 18, name: 'Đỗ Khánh Linh', schoolClass: '11A3', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'CB1 - Toán 11' },
  { id: 'cb11-19', stt: 19, name: 'Ngô Quốc Ca', schoolClass: '11A4', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'CB1 - Toán 11' },
];

// Lớp Toán 11 - Phân lớp CB 2 (22 học sinh - GV: Cô Vũ Hằng - Đã sắp xếp theo thứ tự lớp ở trường & tên A-Z)
export const STUDENTS_TOAN_11_CB2: Student[] = [
  // Lớp 11A2 (7 học sinh)
  { id: 'cb11_2-1', stt: 1, name: 'Khương Thị Bích Ngọc', schoolClass: '11A2', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'CB2 - Toán 11' },
  { id: 'cb11_2-2', stt: 2, name: 'Đặng Thị Hồng Nhung', schoolClass: '11A2', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'CB2 - Toán 11' },
  { id: 'cb11_2-3', stt: 3, name: 'Lại Thị Khai Tâm', schoolClass: '11A2', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'CB2 - Toán 11' },
  { id: 'cb11_2-4', stt: 4, name: 'Phạm Minh Trang', schoolClass: '11A2', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'CB2 - Toán 11' },
  { id: 'cb11_2-5', stt: 5, name: 'Lương Thanh Trúc', schoolClass: '11A2', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'CB2 - Toán 11' },
  { id: 'cb11_2-6', stt: 6, name: 'Trương Phương Uyên', schoolClass: '11A2', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'CB2 - Toán 11' },
  { id: 'cb11_2-7', stt: 7, name: 'Trần Luân Hà Vy', schoolClass: '11A2', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'CB2 - Toán 11' },

  // Lớp 11A3 (4 học sinh)
  { id: 'cb11_2-8', stt: 8, name: 'Phạm Thị Ngọc Huyền', schoolClass: '11A3', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'CB2 - Toán 11' },
  { id: 'cb11_2-9', stt: 9, name: 'Lê Xuân Nhi', schoolClass: '11A3', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'CB2 - Toán 11' },
  { id: 'cb11_2-10', stt: 10, name: 'Ngô Thị Phương Thảo', schoolClass: '11A3', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'CB2 - Toán 11' },
  { id: 'cb11_2-11', stt: 11, name: 'Mai Thị Thúy', schoolClass: '11A3', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'CB2 - Toán 11' },

  // Lớp 11A4 (1 học sinh)
  { id: 'cb11_2-12', stt: 12, name: 'Nguyễn Thúy Diệu', schoolClass: '11A4', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'CB2 - Toán 11' },

  // Lớp 11A7 (2 học sinh)
  { id: 'cb11_2-13', stt: 13, name: 'Lê Khánh Ly', schoolClass: '11A7', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'CB2 - Toán 11' },
  { id: 'cb11_2-14', stt: 14, name: 'Chu Trần Bảo Ngọc', schoolClass: '11A7', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'CB2 - Toán 11' },

  // Lớp 11A8 (2 học sinh)
  { id: 'cb11_2-15', stt: 15, name: 'Nguyễn Thị Dung Nhi', schoolClass: '11A8', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'CB2 - Toán 11' },
  { id: 'cb11_2-16', stt: 16, name: 'Nguyễn Thị Thu Hiền', schoolClass: '11A8', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'CB2 - Toán 11' },

  // Lớp 11A9 (5 học sinh)
  { id: 'cb11_2-17', stt: 17, name: 'Vũ Thị Ngọc Hân', schoolClass: '11A9', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'CB2 - Toán 11' },
  { id: 'cb11_2-18', stt: 18, name: 'Lê Thu Hoài', schoolClass: '11A9', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'CB2 - Toán 11' },
  { id: 'cb11_2-19', stt: 19, name: 'Vũ Anh Hoài', schoolClass: '11A9', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'CB2 - Toán 11' },
  { id: 'cb11_2-20', stt: 20, name: 'Dương Lê Thùy Linh', schoolClass: '11A9', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'CB2 - Toán 11' },
  { id: 'cb11_2-21', stt: 21, name: 'Nhâm Phương Linh', schoolClass: '11A9', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'CB2 - Toán 11' },

  // Lớp 11A10 (1 học sinh)
  { id: 'cb11_2-22', stt: 22, name: 'Ngô Quỳnh Trang', schoolClass: '11A10', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'CB2 - Toán 11' },
];

export const STUDENTS_TOAN_11_CB = STUDENTS_TOAN_11_CB1;
export const STUDENTS_TOAN_11_LOP1 = STUDENTS_TOAN_11_CB1;
export const STUDENTS_TOAN_11_LOP2 = STUDENTS_TOAN_11_CB2;

export const STUDENTS_TOAN_11_ALL: Student[] = [
  ...STUDENTS_TOAN_11_CB1,
  ...STUDENTS_TOAN_11_CB2,
];

// Lớp Công Nghệ Thông Tin & Kỹ Năng Số (18 học sinh)
export const STUDENTS_CNTT: Student[] = [
  { id: 'cntt-1', stt: 1, name: 'Dương Nghĩa Minh', schoolClass: '3B3', schoolName: 'TH Vạn Phú', assignedClass: 'Lớp CNTT' },
  { id: 'cntt-2', stt: 2, name: 'Vũ Tiến Đạt', schoolClass: '5A', schoolName: 'TH Vạn Phú', assignedClass: 'Lớp CNTT' },
  { id: 'cntt-3', stt: 3, name: 'Dương Minh Nghĩa', schoolClass: '7A1', schoolName: 'THCS Nguyễn Tất Thành', assignedClass: 'Lớp CNTT' },
  { id: 'cntt-4', stt: 4, name: 'Đỗ Kim Ngân', schoolClass: '7A5', schoolName: 'THCS Vạn Phú', assignedClass: 'Lớp CNTT' },
  { id: 'cntt-5', stt: 5, name: 'Trần Nhật Quang', schoolClass: '6A8', schoolName: 'THCS Vạn Phú', assignedClass: 'Lớp CNTT' },
  { id: 'cntt-6', stt: 6, name: 'Đặng Gia Huy', schoolClass: '5A', schoolName: 'TH Vạn Phú', assignedClass: 'Lớp CNTT' },
  { id: 'cntt-7', stt: 7, name: 'Trần Xuân Bách', schoolClass: '3A', schoolName: 'TH Vạn Phú', assignedClass: 'Lớp CNTT' },
  { id: 'cntt-8', stt: 8, name: 'Nông Cát Tường Vi', schoolClass: '4B', schoolName: 'TH Vạn Phú', assignedClass: 'Lớp CNTT' },
  { id: 'cntt-9', stt: 9, name: 'Nguyễn Ngọc Hân', schoolClass: '5D', schoolName: 'TH Văn Yên', assignedClass: 'Lớp CNTT' },
  { id: 'cntt-10', stt: 10, name: 'Lê Phương Thảo', schoolClass: '7A7', schoolName: 'THCS Vạn Phú', assignedClass: 'Lớp CNTT' },
  { id: 'cntt-11', stt: 11, name: 'Nguyễn Thu Vân', schoolClass: '7A5', schoolName: 'THCS Vạn Phú', assignedClass: 'Lớp CNTT' },
  { id: 'cntt-12', stt: 12, name: 'Trần Ngọc Khánh', schoolClass: '7A1', schoolName: 'THCS Vạn Phú', assignedClass: 'Lớp CNTT' },
  { id: 'cntt-13', stt: 13, name: 'Đỗ Xuân An', schoolClass: '6A2', schoolName: 'THCS Vạn Phú', assignedClass: 'Lớp CNTT' },
  { id: 'cntt-14', stt: 14, name: 'Trần Thanh Mai', schoolClass: '5A', schoolName: 'TH Vạn Phú', assignedClass: 'Lớp CNTT' },
  { id: 'cntt-15', stt: 15, name: 'Trần Thanh Hằng', schoolClass: '6A2', schoolName: 'TH Vạn Phú', assignedClass: 'Lớp CNTT' },
  { id: 'cntt-16', stt: 16, name: 'Trần Xuân Mai', schoolClass: '5A', schoolName: 'TH Vạn Phú', assignedClass: 'Lớp CNTT' },
  { id: 'cntt-17', stt: 17, name: 'Ma Vũ Tú Anh', schoolClass: '4A2', schoolName: 'TH Vạn Phú', assignedClass: 'Lớp CNTT' },
  { id: 'cntt-18', stt: 18, name: 'Trần Thị Hương Trà', schoolClass: '5A4', schoolName: 'TH Vạn Phú', assignedClass: 'Lớp CNTT' },
];

// Lớp Toán 10 - Cơ Bản (9 học sinh - GV: Thầy Hoàng & Tổ bộ môn Toán - Cập nhật chính xác theo danh sách mới)
export const STUDENTS_TOAN_10_CB: Student[] = [
  { id: '10cb-1', stt: 1, name: 'Đỗ Quốc Đạt', schoolClass: '10A5', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'CB - Toán 10' },
  { id: '10cb-2', stt: 2, name: 'Trần Hương Giang', schoolClass: '10A10', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'CB - Toán 10' },
  { id: '10cb-3', stt: 3, name: 'Nguyễn Hoàng Quân', schoolClass: '10A4', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'CB - Toán 10' },
  { id: '10cb-4', stt: 4, name: 'Nguyễn Quốc Đạt', schoolClass: '10A5', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'CB - Toán 10' },
  { id: '10cb-5', stt: 5, name: 'Đào Gia Bảo', schoolClass: '10A5', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'CB - Toán 10' },
  { id: '10cb-6', stt: 6, name: 'Trần Anh Đức', schoolClass: '10A5', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'CB - Toán 10' },
  { id: '10cb-7', stt: 7, name: 'Lê Duy Hoàng', schoolClass: '10A4', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'CB - Toán 10' },
  { id: '10cb-8', stt: 8, name: 'Lê Thị Quỳnh Nga', schoolClass: '10A1', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'CB - Toán 10' },
  { id: '10cb-9', stt: 9, name: 'Nguyễn Thành Lộc', schoolClass: '10A10', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'CB - Toán 10' },
];

// DANH SÁCH LỚP HỌC (TẤT CẢ LỚP ĐANG MỞ, HIỂN THỊ TỔNG SỐ LƯỢNG HỌC SINH)
export const ACTIVE_CLASSES: ActiveClass[] = [
  {
    id: 'toan-12-cb',
    name: 'Lớp Toán 12 (Cơ Bản)',
    grade: '12',
    subject: 'Toán',
    level: 'Cơ Bản',
    classGroup: 'Khối 12',
    teacher: 'Cô Hường & Cô Hân (Tổ bộ môn Toán)',
    schedule: 'Theo lịch phân nhóm tuần (CB1, CB2, CB3)',
    room: 'Cơ sở Khu Đô Thị Vạn Phú',
    status: 'enrolling',
    statusLabel: 'ĐANG MỞ (76 học sinh)',
    isOpen: true,
    isFull: false,
    studentCount: 76,
    students: STUDENTS_TOAN_12_CO_BAN,
    note: 'Hiện có 76 học sinh đang theo học (gồm CB1: 29 em - GV Cô Hường; CB2: 23 em - GV Cô Hân; CB3: 24 em - GV Cô Hường). Bám sát cấu trúc đề thi tốt nghiệp THPT mới, củng cố toàn diện môn Toán 12.',
  },
  {
    id: 'toan-12-nc',
    name: 'Lớp Toán 12 (Nâng Cao - Vận Dụng Cao 8.5+)',
    grade: '12',
    subject: 'Toán',
    level: 'Nâng Cao',
    classGroup: 'Khối 12',
    teacher: 'Thầy Hoàng & Tổ bộ môn Toán',
    schedule: 'Lịch học chuyên đề 8.5+',
    room: 'Cơ sở Khu Đô Thị Vạn Phú',
    status: 'enrolling',
    statusLabel: 'ĐANG MỞ (5 học sinh)',
    isOpen: true,
    isFull: false,
    studentCount: 5,
    students: STUDENTS_TOAN_12_NC,
    note: 'Hiện có 5 học sinh. Lớp chuyên sâu rèn luyện tư duy Hàm số, Hình không gian Oxyz và Tích phân phân loại 8.5+, 9.0+. Lớp đang mở và tiếp tục nhận đăng ký bổ sung.',
  },
  {
    id: 'toan-11-cb',
    name: 'Lớp Toán 11 (Cơ Bản)',
    grade: '11',
    subject: 'Toán',
    level: 'Cơ Bản',
    classGroup: 'Khối 11',
    teacher: 'Cô Vũ Hằng (Tổ bộ môn Toán)',
    schedule: 'Theo lịch học trong tuần (CB1 & CB2)',
    room: 'Cơ sở Khu Đô Thị Vạn Phú',
    status: 'enrolling',
    statusLabel: 'ĐANG MỞ (41 học sinh)',
    isOpen: true,
    isFull: false,
    studentCount: 41,
    students: STUDENTS_TOAN_11_ALL,
    note: 'Tổng cộng 41 học sinh đang theo học (gồm CB1: 19 em - GV Cô Vũ Hằng; CB2: 22 em - GV Cô Vũ Hằng). Bám sát chương trình GDPT mới, củng cố Lượng giác, Cấp số cộng/nhân, Giới hạn và Hình học không gian 11. Lớp đang mở và tiếp tục nhận đăng ký bổ sung.',
  },
  {
    id: 'toan-10-cb',
    name: 'Lớp Toán 10 (Cơ Bản & Củng Cố Nền Tảng THPT)',
    grade: '10',
    subject: 'Toán',
    level: 'Cơ Bản',
    classGroup: 'Khối 10',
    teacher: 'Thầy Hoàng & Tổ bộ môn Toán',
    schedule: 'Tối Thứ 3 & Thứ 7 (17:30 - 19:30)',
    room: 'Phòng Chuyên Đề Khối 10',
    status: 'enrolling',
    statusLabel: 'ĐANG MỞ (9 học sinh)',
    isOpen: true,
    isFull: false,
    studentCount: 9,
    students: STUDENTS_TOAN_10_CB,
    note: 'Hiện có 9 học sinh đang theo học. Bám sát chương trình GDPT mới lớp 10: Xây dựng vững chắc nền tảng Mệnh đề, Tập hợp, Bất phương trình, Hàm số bậc hai, Hệ thức lượng trong tam giác và Tọa độ phẳng Oxy. Lớp đang mở và tiếp tục nhận đăng ký bổ sung.',
  },
  {
    id: 'toan-10-nc',
    name: 'Lớp Toán 10 (Nâng Cao - Bứt Phá Điểm 8.5+)',
    grade: '10',
    subject: 'Toán',
    level: 'Nâng Cao',
    classGroup: 'Khối 10',
    teacher: 'Thầy Hoàng & Tổ bộ môn Toán',
    schedule: 'Tối Thứ 5 & Chủ Nhật (18:30 - 20:30)',
    room: 'Phòng Chuyên Sâu Khối 10',
    status: 'enrolling',
    statusLabel: 'ĐANG MỞ LỚP',
    isOpen: true,
    isFull: false,
    studentCount: 0,
    students: [],
    note: 'Chuyên sâu tư duy giải toán vận dụng cao 8.5+, rèn kỹ năng chứng minh Đại số và Hình học nâng cao, xây dựng nền tảng tư duy vững chắc cho kỳ thi HSG và THPT Quốc Gia. Lớp đang mở tiếp nhận học sinh.',
  },
  {
    id: 'cntt-active',
    name: 'Lớp Công Nghệ Thông Tin & Kỹ Năng Số',
    grade: 'cntt',
    subject: 'Công nghệ thông tin',
    level: 'Thực Chiến',
    classGroup: 'Khối CNTT',
    teacher: 'Tổ bộ môn CNTT & Kỹ sư mời giảng',
    schedule: 'Lịch học cuối tuần',
    room: 'Phòng Máy Tính 4.0',
    status: 'enrolling',
    statusLabel: 'ĐANG MỞ (18 học sinh)',
    isOpen: true,
    isFull: false,
    studentCount: 18,
    students: STUDENTS_CNTT,
    note: 'Hiện có 18 học sinh đang theo học. Rèn luyện tư duy máy tính, kỹ năng số 4.0, tin học văn phòng thực chiến, lập trình cơ bản và an toàn mạng. Lớp đang mở và tiếp tục nhận đăng ký bổ sung.',
  },
  {
    id: 'li-12-thpt',
    name: 'Lớp Vật Lí 12 (Cơ Bản & Luyện Thi THPT)',
    grade: '12',
    subject: 'Lí',
    level: 'Cơ Bản',
    classGroup: 'Khối 12',
    teacher: 'Đội ngũ giáo viên Vật Lí',
    schedule: 'Theo thông báo khai giảng',
    room: 'Cơ sở Khu Đô Thị Vạn Phú',
    status: 'upcoming',
    statusLabel: 'Sắp mở lớp',
    studentCount: 0,
    students: [],
    note: 'Học theo chuẩn cấu trúc chương trình mới, luyện đề phân loại và thực hành thí nghiệm mô phỏng.',
  },
  {
    id: 'hoa-12-thpt',
    name: 'Lớp Hoá Học 12 (Cơ Bản & Luyện Thi)',
    grade: '12',
    subject: 'Hoá',
    level: 'Cơ Bản',
    classGroup: 'Khối 12',
    teacher: 'Đội ngũ giáo viên Hoá Học',
    schedule: 'Theo thông báo khai giảng',
    room: 'Cơ sở Khu Đô Thị Vạn Phú',
    status: 'upcoming',
    statusLabel: 'Sắp mở lớp',
    studentCount: 0,
    students: [],
    note: 'Lấy lại gốc Hóa Hữu cơ 11 - 12, phương pháp giải nhanh bài toán hóa học bằng đồ thị và bảo toàn khối lượng.',
  },
  {
    id: 'anh-12-thpt',
    name: 'Lớp Tiếng Anh 12 (Luyện Thi Tốt Nghiệp)',
    grade: '12',
    subject: 'Anh',
    level: 'Cơ Bản',
    classGroup: 'Khối 12',
    teacher: 'Đội ngũ giáo viên Tiếng Anh',
    schedule: 'Theo thông báo khai giảng',
    room: 'Cơ sở Khu Đô Thị Vạn Phú',
    status: 'upcoming',
    statusLabel: 'Sắp mở lớp',
    studentCount: 0,
    students: [],
    note: 'Bồi dưỡng ngữ pháp trọng tâm, từ vựng theo chủ điểm đề thi và kỹ năng đọc hiểu nhanh tránh bẫy đề thi.',
  },
  {
    id: 'van-12-thpt',
    name: 'Lớp Ngữ Văn 12 (Trọng Tâm Thi Tốt Nghiệp)',
    grade: '12',
    subject: 'Văn',
    level: 'Cơ Bản',
    classGroup: 'Khối 12',
    teacher: 'Đội ngũ giáo viên Ngữ Văn',
    schedule: 'Theo thông báo khai giảng',
    room: 'Cơ sở Khu Đô Thị Vạn Phú',
    status: 'upcoming',
    statusLabel: 'Sắp mở lớp',
    studentCount: 0,
    students: [],
    note: 'Nắm chắc kiến thức các tác phẩm văn học 12, phương pháp làm bài nghị luận xã hội sắc sảo và nghị luận văn học đạt 8.5+.',
  },
  {
    id: 'sinh-12-thpt',
    name: 'Lớp Sinh Học 12 (Luyện Thi Khối B)',
    grade: '12',
    subject: 'Sinh',
    level: 'Nâng Cao',
    classGroup: 'Khối 12',
    teacher: 'Đội ngũ giáo viên Sinh Học',
    schedule: 'Theo thông báo khai giảng',
    room: 'Cơ sở Khu Đô Thị Vạn Phú',
    status: 'upcoming',
    statusLabel: 'Sắp mở lớp',
    studentCount: 0,
    students: [],
    note: 'Ôn tập di truyền học, sinh thái học và bài tập phả hệ điểm 9 - 10 cho học sinh hướng tới xét tuyển Y Dược.',
  },
  {
    id: 'su-12-thpt',
    name: 'Lớp Lịch Sử 12 (Ôn Thi Tốt Nghiệp & ĐGNL)',
    grade: '12',
    subject: 'Sử',
    level: 'Cơ Bản',
    classGroup: 'Khối 12',
    teacher: 'Đội ngũ giáo viên Lịch Sử',
    schedule: 'Theo thông báo khai giảng',
    room: 'Cơ sở Khu Đô Thị Vạn Phú',
    status: 'upcoming',
    statusLabel: 'Sắp mở lớp',
    studentCount: 0,
    students: [],
    note: 'Phương pháp học Sử bằng sơ đồ tư duy (Mindmap), xâu chuỗi sự kiện lịch sử Việt Nam và Thế giới dễ nhớ, không học vẹt.',
  },
  {
    id: 'dia-12-thpt',
    name: 'Lớp Địa Lí 12 (Ôn Thi Tốt Nghiệp & Kỹ Năng Atlat)',
    grade: '12',
    subject: 'Địa',
    level: 'Cơ Bản',
    classGroup: 'Khối 12',
    teacher: 'Đội ngũ giáo viên Địa Lí',
    schedule: 'Theo thông báo khai giảng',
    room: 'Cơ sở Khu Đô Thị Vạn Phú',
    status: 'upcoming',
    statusLabel: 'Sắp mở lớp',
    studentCount: 0,
    students: [],
    note: 'Khai thác tối đa Atlat Địa lí Việt Nam lấy trọn 3 - 4 điểm, phân tích bảng số liệu và biểu đồ dễ dàng đạt 8+.',
  },
  {
    id: 'toan-9-on-thi-10-active',
    name: 'Lớp Toán 9 (Luyện Thi Vào 10 Công Lập)',
    grade: '9',
    subject: 'Toán',
    level: 'Cơ Bản',
    classGroup: 'Khối 9',
    teacher: 'Tổ bộ môn Toán THCS',
    schedule: 'Theo thông báo khai giảng',
    room: 'Cơ sở Khu Đô Thị Vạn Phú',
    status: 'upcoming',
    statusLabel: 'Sắp mở lớp',
    studentCount: 0,
    students: [],
    note: 'Bám sát đề tuyển sinh vào 10 Sở GD&ĐT Thái Nguyên. Rèn chắc 5 dạng bài trọng tâm ăn trọn điểm.',
  },
  {
    id: 'van-9-on-thi-10-active',
    name: 'Lớp Ngữ Văn 9 (Ôn Thi Tuyển Sinh Vào 10)',
    grade: '9',
    subject: 'Văn',
    level: 'Cơ Bản',
    classGroup: 'Khối 9',
    teacher: 'Tổ bộ môn Ngữ Văn THCS',
    schedule: 'Theo thông báo khai giảng',
    room: 'Cơ sở Khu Đô Thị Vạn Phú',
    status: 'upcoming',
    statusLabel: 'Sắp mở lớp',
    studentCount: 0,
    students: [],
    note: 'Rèn phương pháp viết văn nghị luận xã hội, nghị luận văn học và kỹ năng đọc hiểu văn bản.',
  },
  {
    id: 'van-chu-dep-active',
    name: 'Lớp Luyện Chữ Đẹp Nét Thanh Nét Đậm',
    grade: 'van-chu-dep',
    subject: 'Luyện viết chữ đẹp',
    level: 'Cơ Bản',
    classGroup: 'Khối Chữ Đẹp',
    teacher: 'Cô giáo chuyên ngành Rèn chữ',
    schedule: 'Theo thông báo khai giảng',
    room: 'Cơ sở Khu Đô Thị Vạn Phú',
    status: 'upcoming',
    statusLabel: 'Sắp mở lớp',
    studentCount: 0,
    students: [],
    note: 'Chỉnh sửa tư thế ngồi, cách cầm bút chuẩn, rèn nét thanh nét đậm chuẩn Bộ GD&ĐT và nâng cao tính cẩn thận.',
  },
  {
    id: 'van-chu-dep-nc-active',
    name: 'Lớp Cảm Thụ Văn Học & Chữ Đẹp Nghệ Thuật',
    grade: 'van-chu-dep',
    subject: 'Luyện viết chữ đẹp',
    level: 'Nâng Cao',
    classGroup: 'Khối Chữ Đẹp',
    teacher: 'Cô giáo chuyên ngành Rèn chữ & Văn học',
    schedule: 'Theo thông báo khai giảng',
    room: 'Cơ sở Khu Đô Thị Vạn Phú',
    status: 'upcoming',
    statusLabel: 'Sắp mở lớp',
    studentCount: 0,
    students: [],
    note: 'Luyện viết chữ đẹp nghệ thuật, mở rộng vốn từ vựng và rèn luyện kỹ năng diễn đạt văn chương mượt mà.',
  },
];
