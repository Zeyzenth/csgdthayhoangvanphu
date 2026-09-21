export type GradeLevel = '6' | '7' | '8' | '9' | '10' | '11' | '12' | 'cntt' | 'van-chu-dep';

export type Subject =
  | 'Toán'
  | 'Lí'
  | 'Hoá'
  | 'Anh'
  | 'Văn'
  | 'Sinh'
  | 'Sử'
  | 'Địa'
  | 'Công nghệ thông tin'
  | 'Luyện viết chữ đẹp'
  | 'Tin học'
  | 'Luyện chữ';

export type AcademicGoal =
  | 'all'
  | 'mat-goc'
  | 'on-thi-10'
  | 'on-thi-thpt'
  | 'nang-cao';

export type AcademicLevel = 'Cơ Bản' | 'Nâng Cao';

export interface Course {
  id: string;
  grade: GradeLevel;
  subject: Subject;
  title: string;
  subtitle: string;
  targetGoal: 'mat-goc' | 'on-thi-10' | 'on-thi-thpt' | 'nang-cao' | 'co-ban';
  targetGoalLabel: string;
  levelBadge: string;
  teacher: string;
  schedule: string;
  classSize: string;
  duration: string;
  keyPoints: string[];
  description: string;
  suitableFor: string;
  tuitionNote: string;
}

export interface ConsultationRequest {
  id: string;
  parentName: string;
  phoneNumber: string;
  studentName: string;
  grade: GradeLevel;
  subjects: Subject[];
  currentLevel: string;
  note?: string;
  createdAt: string;
  status: 'new' | 'contacted' | 'registered';
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  studentInfo: string;
  content: string;
  rating: number;
  highlight: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'hoc-phi' | 'chuong-trinh' | 'xep-lop' | 'chat-luong';
}

export interface Student {
  id: string;
  stt: number;
  name: string;
  schoolClass: string;
  schoolName: string;
  assignedClass: string;
}

export interface ActiveClass {
  id: string;
  name: string;
  grade: GradeLevel;
  subject: Subject;
  level: string;
  classGroup: string;
  teacher: string;
  schedule: string;
  room?: string;
  status: 'active' | 'enrolling' | 'upcoming' | 'full';
  statusLabel: string;
  isOpen?: boolean;
  isFull?: boolean;
  students: Student[];
  note?: string;
}
