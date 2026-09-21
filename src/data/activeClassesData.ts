import { ActiveClass, Student } from '../types';

// Helper tách họ tên theo chuẩn tiếng Việt để sắp xếp Tên trước, rồi đến Họ & Đệm
export function getVietnameseNameParts(fullName: string) {
  const parts = fullName.trim().split(/\s+/);
  const firstName = parts[parts.length - 1] || '';
  const lastNameAndMiddle = parts.slice(0, parts.length - 1).join(' ');
  return { firstName, lastNameAndMiddle, fullName };
}

// Hàm sắp xếp danh sách học sinh: Ưu tiên lớp trường A1 -> A9, sau đó sắp xếp tên theo A -> Z (chuẩn tiếng Việt)
export function sortStudentsByClassAndName(students: Student[]): Student[] {
  return [...students].sort((a, b) => {
    // 1. Sắp xếp theo lớp trường: 12A5 -> 12A6 -> 12A7 -> 12A8 -> 12A9
    const classA = a.schoolClass || '';
    const classB = b.schoolClass || '';
    const classCompare = classA.localeCompare(classB, 'vi', { numeric: true });
    if (classCompare !== 0) return classCompare;

    // 2. Sắp xếp theo tên học sinh A - Z (Tên chính, nếu trùng tên xét họ và đệm)
    const nameA = getVietnameseNameParts(a.name);
    const nameB = getVietnameseNameParts(b.name);
    const firstNameCompare = nameA.firstName.localeCompare(nameB.firstName, 'vi');
    if (firstNameCompare !== 0) return firstNameCompare;

    return nameA.lastNameAndMiddle.localeCompare(nameB.lastNameAndMiddle, 'vi');
  });
}

// Danh sách 23 học sinh lớp Toán 12 (Cơ bản) đã được sắp xếp chuẩn:
// 1. Theo lớp từ A1 đến A9 (12A5 -> 12A6 -> 12A7 -> 12A8 -> 12A9)
// 2. Trong từng lớp, tên học sinh được sắp xếp theo thứ tự A-Z
export const STUDENTS_TOAN_12_CO_BAN: Student[] = [
  // Lớp 12A5 (1 học sinh)
  { id: 'hs-1', stt: 1, name: 'Dương Thị Thảo', schoolClass: '12A5', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'Lớp CB 2' },

  // Lớp 12A6 (6 học sinh: Bích -> Duyên -> Khoa -> Ly -> Phong -> Yến)
  { id: 'hs-2', stt: 2, name: 'Lưu Thị Bích', schoolClass: '12A6', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'Lớp CB 1' },
  { id: 'hs-3', stt: 3, name: 'Nguyễn Thị Mai Duyên', schoolClass: '12A6', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'Lớp CB 1' },
  { id: 'hs-4', stt: 4, name: 'Trần Duy Khoa', schoolClass: '12A6', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'Lớp CB 1' },
  { id: 'hs-5', stt: 5, name: 'Nguyễn Khánh Ly', schoolClass: '12A6', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'Lớp CB 1' },
  { id: 'hs-6', stt: 6, name: 'Trần Quang Phong', schoolClass: '12A6', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'Lớp CB 1' },
  { id: 'hs-7', stt: 7, name: 'Nguyễn Hải Yến', schoolClass: '12A6', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'Lớp CB 1' },

  // Lớp 12A7 (1 học sinh)
  { id: 'hs-8', stt: 8, name: 'Nguyễn Thị Việt Hà', schoolClass: '12A7', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'Lớp CB 2' },

  // Lớp 12A8 (1 học sinh)
  { id: 'hs-9', stt: 9, name: 'Nguyễn Thị Quỳnh Như', schoolClass: '12A8', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'Lớp CB 2' },

  // Lớp 12A9 (14 học sinh: Anh -> Chi -> Diễm -> Dương -> Đại -> Hiếu -> Huy -> Huyên -> Linh (Đỗ) -> Linh (Lưu) -> Long -> Tú -> Vinh -> Xuân)
  { id: 'hs-10', stt: 10, name: 'Dương Thế Anh', schoolClass: '12A9', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'Lớp CB 1' },
  { id: 'hs-11', stt: 11, name: 'Lê Khánh Chi', schoolClass: '12A9', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'Lớp CB 1' },
  { id: 'hs-12', stt: 12, name: 'Lê Quỳnh Diễm', schoolClass: '12A9', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'Lớp CB 1' },
  { id: 'hs-13', stt: 13, name: 'Nguyễn Thuỳ Dương', schoolClass: '12A9', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'Lớp CB 1' },
  { id: 'hs-14', stt: 14, name: 'Nguyễn Văn Đại', schoolClass: '12A9', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'Lớp CB 1' },
  { id: 'hs-15', stt: 15, name: 'Trần Đặng Phương Hiếu', schoolClass: '12A9', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'Lớp CB 1' },
  { id: 'hs-16', stt: 16, name: 'Dương Chí Huy', schoolClass: '12A9', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'Lớp CB 1' },
  { id: 'hs-17', stt: 17, name: 'Nguyễn Quang Huyên', schoolClass: '12A9', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'Lớp CB 1' },
  { id: 'hs-18', stt: 18, name: 'Đỗ Thị Mỹ Linh', schoolClass: '12A9', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'Lớp CB 1' },
  { id: 'hs-19', stt: 19, name: 'Lưu Quang Linh', schoolClass: '12A9', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'Lớp CB 1' },
  { id: 'hs-20', stt: 20, name: 'Vũ Gia Long', schoolClass: '12A9', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'Lớp CB 1' },
  { id: 'hs-21', stt: 21, name: 'Nguyễn Thị Cẩm Tú', schoolClass: '12A9', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'Lớp CB 1' },
  { id: 'hs-22', stt: 22, name: 'Phạm Thế Vinh', schoolClass: '12A9', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'Lớp CB 1' },
  { id: 'hs-23', stt: 23, name: 'Nguyễn Văn Xuân', schoolClass: '12A9', schoolName: 'THPT Lưu Nhân Chú', assignedClass: 'Lớp CB 1' },
];

export const ACTIVE_CLASSES: ActiveClass[] = [
  {
    id: 'toan-12-cb1',
    name: 'Lớp Toán 12 (Cơ Bản) - Lớp 1 (CB 1)',
    grade: '12',
    subject: 'Toán',
    level: 'Cơ Bản',
    classGroup: 'Lớp 1 (CB 1)',
    teacher: 'Thầy Hoàng & Trợ giảng',
    schedule: 'Tối Thứ 3 & Thứ 6 (19:30 - 21:30)',
    room: 'Phòng 101 - Cơ sở Vạn Phú',
    status: 'active',
    statusLabel: 'Đang học ổn định (20 học sinh)',
    students: STUDENTS_TOAN_12_CO_BAN.filter((s) => s.assignedClass === 'Lớp CB 1'),
    note: 'Gồm 20 học sinh từ lớp 12A6 (6 em) và 12A9 (14 em) - THPT Lưu Nhân Chú. Tập trung củng cố kiến thức nền tảng và rèn kỹ năng làm đề thi THPT.',
  },
  {
    id: 'toan-12-cb2',
    name: 'Lớp Toán 12 (Cơ Bản) - Lớp 2 (CB 2)',
    grade: '12',
    subject: 'Toán',
    level: 'Cơ Bản',
    classGroup: 'Lớp 2 (CB 2)',
    teacher: 'Thầy Hoàng & Trợ giảng',
    schedule: 'Tối Thứ 4 & Chủ Nhật (19:30 - 21:30)',
    room: 'Phòng 102 - Cơ sở Vạn Phú',
    status: 'enrolling',
    statusLabel: 'Đang học & tuyển bổ sung (3 học sinh)',
    students: STUDENTS_TOAN_12_CO_BAN.filter((s) => s.assignedClass === 'Lớp CB 2'),
    note: 'Gồm 3 học sinh từ 12A5, 12A7, 12A8 - THPT Lưu Nhân Chú. Đang tiếp tục nhận thêm học sinh để kiện toàn sĩ số.',
  },
  {
    id: 'toan-12-nc',
    name: 'Lớp Toán 12 (Nâng Cao - Vận Dụng Cao 8.5+)',
    grade: '12',
    subject: 'Toán',
    level: 'Nâng Cao',
    classGroup: 'Lớp 1 (NC 8.5+)',
    teacher: 'Thầy Hoàng trực tiếp giảng dạy',
    schedule: 'Tối Thứ 2 & Thứ 5 (19:30 - 21:30)',
    room: 'Phòng 201 - Cơ sở Vạn Phú',
    status: 'active',
    statusLabel: 'Đang học (16 học sinh)',
    students: [],
    note: 'Lớp chuyên sâu giải đề thi thử 8.5+, 9.0+, rèn tư duy Hàm số, Hình không gian Oxyz và Tích phân phân loại.',
  },
  {
    id: 'li-12-thpt',
    name: 'Lớp Vật Lí 12 (Cơ Bản & Luyện Thi THPT) - Lớp 1',
    grade: '12',
    subject: 'Lí',
    level: 'Cơ Bản',
    classGroup: 'Lớp 1 (Lí 12)',
    teacher: 'Thầy Đức (Chuyên đề Vật lí 12)',
    schedule: 'Chiều Thứ 7 & Sáng Chủ Nhật',
    room: 'Phòng 103 - Cơ sở Vạn Phú',
    status: 'active',
    statusLabel: 'Đang học (14 học sinh)',
    students: [],
    note: 'Học theo chuẩn cấu trúc chương trình mới, luyện đề phân loại và thực hành thí nghiệm mô phỏng.',
  },
  {
    id: 'hoa-12-thpt',
    name: 'Lớp Hoá Học 12 (Cơ Bản & Luyện Thi) - Lớp 1',
    grade: '12',
    subject: 'Hoá',
    level: 'Cơ Bản',
    classGroup: 'Lớp 1 (Hoá 12)',
    teacher: 'Thầy Tuấn & Cô Lan',
    schedule: 'Tối Thứ 4 & Tối Thứ 7 (19:30 - 21:30)',
    room: 'Phòng 103 - Cơ sở Vạn Phú',
    status: 'active',
    statusLabel: 'Đang học (12 học sinh)',
    students: [],
    note: 'Lấy lại gốc Hóa Hữu cơ 11 - 12, phương pháp giải nhanh bài toán hóa học bằng đồ thị và bảo toàn khối lượng.',
  },
  {
    id: 'anh-12-thpt',
    name: 'Lớp Tiếng Anh 12 (Luyện Thi Tốt Nghiệp) - Lớp 1',
    grade: '12',
    subject: 'Anh',
    level: 'Cơ Bản',
    classGroup: 'Lớp 1 (Anh 12)',
    teacher: 'Cô Linh (Tổ Tiếng Anh)',
    schedule: 'Tối Thứ 3 & Tối Thứ 6 (18:00 - 19:30)',
    room: 'Phòng 201 - Cơ sở Vạn Phú',
    status: 'active',
    statusLabel: 'Đang học (15 học sinh)',
    students: [],
    note: 'Bồi dưỡng ngữ pháp trọng tâm, từ vựng theo chủ điểm đề thi và kỹ năng đọc hiểu nhanh tránh bẫy đề thi.',
  },
  {
    id: 'van-12-thpt',
    name: 'Lớp Ngữ Văn 12 (Trọng Tâm Thi Tốt Nghiệp) - Lớp 1',
    grade: '12',
    subject: 'Văn',
    level: 'Cơ Bản',
    classGroup: 'Lớp 1 (Văn 12)',
    teacher: 'Cô Mai Lan (Tổ Ngữ Văn)',
    schedule: 'Sáng Chủ Nhật (08:00 - 10:30)',
    room: 'Phòng 202 - Cơ sở Vạn Phú',
    status: 'active',
    statusLabel: 'Đang học (18 học sinh)',
    students: [],
    note: 'Nắm chắc kiến thức các tác phẩm văn học 12, phương pháp làm bài nghị luận xã hội sắc sảo và nghị luận văn học đạt 8.5+.',
  },
  {
    id: 'sinh-12-thpt',
    name: 'Lớp Sinh Học 12 (Luyện Thi Khối B) - Lớp 1',
    grade: '12',
    subject: 'Sinh',
    level: 'Nâng Cao',
    classGroup: 'Lớp 1 (Sinh 12)',
    teacher: 'Thầy Tuấn Dũng',
    schedule: 'Chiều Thứ 7 (14:30 - 17:00)',
    room: 'Phòng 102 - Cơ sở Vạn Phú',
    status: 'active',
    statusLabel: 'Đang học (10 học sinh)',
    students: [],
    note: 'Ôn tập di truyền học, sinh thái học và bài tập phả hệ điểm 9 - 10 cho học sinh hướng tới xét tuyển Y Dược.',
  },
  {
    id: 'su-12-thpt',
    name: 'Lớp Lịch Sử 12 (Ôn Thi Tốt Nghiệp & ĐGNL) - Lớp 1',
    grade: '12',
    subject: 'Sử',
    level: 'Cơ Bản',
    classGroup: 'Lớp 1 (Sử 12)',
    teacher: 'Thầy Minh (Tổ Khoa học Xã hội)',
    schedule: 'Tối Thứ 5 (19:30 - 21:30)',
    room: 'Phòng 103 - Cơ sở Vạn Phú',
    status: 'active',
    statusLabel: 'Đang học & tuyển sinh (9 học sinh)',
    students: [],
    note: 'Phương pháp học Sử bằng sơ đồ tư duy (Mindmap), xâu chuỗi sự kiện lịch sử Việt Nam và Thế giới dễ nhớ, không học vẹt.',
  },
  {
    id: 'dia-12-thpt',
    name: 'Lớp Địa Lí 12 (Ôn Thi Tốt Nghiệp & Kỹ Năng Atlat) - Lớp 1',
    grade: '12',
    subject: 'Địa',
    level: 'Cơ Bản',
    classGroup: 'Lớp 1 (Địa 12)',
    teacher: 'Cô Thu Hương',
    schedule: 'Chiều Chủ Nhật (14:00 - 16:00)',
    room: 'Phòng 103 - Cơ sở Vạn Phú',
    status: 'active',
    statusLabel: 'Đang học (11 học sinh)',
    students: [],
    note: 'Khai thác tối đa Atlat Địa lí Việt Nam lấy trọn 3 - 4 điểm, phân tích bảng số liệu và biểu đồ dễ dàng đạt 8+.',
  },
  {
    id: 'toan-9-on-thi-10-active',
    name: 'Lớp Toán 9 (Luyện Thi Vào 10 Công Lập) - Lớp 1 (Cơ Bản)',
    grade: '9',
    subject: 'Toán',
    level: 'Cơ Bản',
    classGroup: 'Lớp 1 (Toán 9A)',
    teacher: 'Thầy Hoàng & Tổ Toán THCS',
    schedule: 'Tối Thứ 3 & Thứ 7 (18:30 - 20:30)',
    room: 'Phòng 102 - Cơ sở Vạn Phú',
    status: 'active',
    statusLabel: 'Đang học (15 học sinh)',
    students: [],
    note: 'Bám sát đề tuyển sinh vào 10 Sở GD&ĐT Thái Nguyên. Rèn chắc 5 dạng bài trọng tâm ăn trọn điểm.',
  },
  {
    id: 'van-9-on-thi-10-active',
    name: 'Lớp Ngữ Văn 9 (Ôn Thi Tuyển Sinh Vào 10) - Lớp 1',
    grade: '9',
    subject: 'Văn',
    level: 'Cơ Bản',
    classGroup: 'Lớp 1 (Văn 9)',
    teacher: 'Cô Mai Lan (Tổ Ngữ Văn)',
    schedule: 'Chiều Thứ 7 & Tối Chủ Nhật',
    room: 'Phòng 202 - Cơ sở Vạn Phú',
    status: 'active',
    statusLabel: 'Đang học (12 học sinh)',
    students: [],
    note: 'Rèn phương pháp viết văn nghị luận xã hội, nghị luận văn học và kỹ năng đọc hiểu văn bản.',
  },
  {
    id: 'cntt-lap-trinh-active',
    name: 'Lớp Lập Trình Python & Kỹ Năng Số - Lớp 1 (Khối CNTT)',
    grade: 'cntt',
    subject: 'Công nghệ thông tin',
    level: 'Nâng Cao',
    classGroup: 'Lớp 1 (CNTT - Python)',
    teacher: 'Thầy Hoàng & Kỹ sư CNTT',
    schedule: 'Tối Thứ 7 (19:00 - 21:00)',
    room: 'Phòng Máy Tính 104 - Cơ sở Vạn Phú',
    status: 'active',
    statusLabel: 'Đang học (10 học sinh)',
    students: [],
    note: 'Học sinh thực hành trực tiếp trên máy tính riêng, học tư duy thuật toán, viết code Python và kỹ năng số an toàn.',
  },
  {
    id: 'cntt-van-phong-active',
    name: 'Lớp Tin Học Văn Phòng Thực Chiến - Lớp 2 (Khối CNTT)',
    grade: 'cntt',
    subject: 'Công nghệ thông tin',
    level: 'Cơ Bản',
    classGroup: 'Lớp 2 (CNTT - Văn Phòng)',
    teacher: 'Tổ bộ môn Tin học & Kỹ năng số',
    schedule: 'Chiều Thứ 7 (14:30 - 16:30)',
    room: 'Phòng Máy Tính 104 - Cơ sở Vạn Phú',
    status: 'active',
    statusLabel: 'Đang học (12 học sinh)',
    students: [],
    note: 'Thực hành Word, Excel, PowerPoint chuyên sâu, kỹ năng thuyết trình và ứng dụng công nghệ trong học tập.',
  },
  {
    id: 'van-chu-dep-active',
    name: 'Lớp Luyện Chữ Đẹp Nét Thanh Nét Đậm - Lớp 1 (Khối Chữ Đẹp)',
    grade: 'van-chu-dep',
    subject: 'Luyện viết chữ đẹp',
    level: 'Cơ Bản',
    classGroup: 'Lớp 1 (Rèn Chữ Chuẩn)',
    teacher: 'Cô Mai Lan & Giáo viên Luyện Chữ',
    schedule: 'Sáng Chủ Nhật (08:00 - 10:00)',
    room: 'Phòng 102 - Cơ sở Vạn Phú',
    status: 'active',
    statusLabel: 'Đang học & tuyển sinh (8 học sinh)',
    students: [],
    note: 'Chỉnh sửa tư thế ngồi, cách cầm bút chuẩn, rèn nét thanh nét đậm chuẩn Bộ GD&ĐT và nâng cao tính cẩn thận.',
  },
  {
    id: 'van-chu-dep-nc-active',
    name: 'Lớp Cảm Thụ Văn Học & Chữ Đẹp Nghệ Thuật - Lớp 2 (Khối Chữ Đẹp)',
    grade: 'van-chu-dep',
    subject: 'Luyện viết chữ đẹp',
    level: 'Nâng Cao',
    classGroup: 'Lớp 2 (Chữ Đẹp & Cảm Thụ)',
    teacher: 'Cô Mai Lan (Tổ Ngữ Văn)',
    schedule: 'Chiều Chủ Nhật (14:30 - 16:30)',
    room: 'Phòng 102 - Cơ sở Vạn Phú',
    status: 'active',
    statusLabel: 'Đang học (10 học sinh)',
    students: [],
    note: 'Luyện viết chữ đẹp nghệ thuật, mở rộng vốn từ vựng và rèn luyện kỹ năng diễn đạt văn chương mượt mà.',
  },
];
