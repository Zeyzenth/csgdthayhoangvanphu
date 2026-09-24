import { Course, Testimonial, FAQItem } from '../types';

export const COURSES: Course[] = [
  // Khối 9 & 10 (Luyện thi vào 10)
  {
    id: 'toan-9-on-thi-10',
    grade: '9',
    subject: 'Toán',
    title: 'Toán 9 - Luyện Thi Vào 10 Chắc Suất 8.5+',
    subtitle: 'Quét sạch 5 chuyên đề trọng điểm đề thi vào 10 Thái Nguyên',
    targetGoal: 'on-thi-10',
    targetGoalLabel: 'Luyện thi vào 10',
    levelBadge: 'Luyện thi cấp tốc',
    teacher: 'Thầy Hoàng & Tổ bộ môn Toán',
    schedule: 'Tối Thứ 3 & Thứ 6 (18:30 - 20:30)',
    classSize: '12 - 15 học sinh',
    duration: '2 buổi / tuần (120 phút/buổi)',
    keyPoints: [
      'Rèn thành thạo dạng rút gọn biểu thức và bài toán phụ',
      'Giải toán bằng cách lập phương trình/hệ phương trình ăn trọn điểm',
      'Đột phá phần Hình học phẳng và bài toán tìm min/max phân loại',
      'Luyện đề thi thử sát cấu trúc Sở GD&ĐT Thái Nguyên hàng tuần'
    ],
    description: 'Khóa học được thiết kế đặc biệt cho học sinh lớp 9 chuẩn bị thi vào lớp 10 các trường THPT công lập top đầu tại Thái Nguyên như Chuyên Thái Nguyên, Lương Ngọc Quyến, Gang Thép,...',
    suitableFor: 'Học sinh lớp 9 muốn bứt phá từ 6-7 điểm lên 8.5 - 9.5 điểm Toán vào 10',
    tuitionNote: 'Tặng trọn bộ tài liệu & đề thi • Ưu đãi khi đăng ký combo'
  },
  {
    id: 'van-9-on-thi-10',
    grade: '9',
    subject: 'Văn',
    title: 'Ngữ Văn 9 - Chiến Thuật Viết Đoạn & Nghị Luận Đạt 8+',
    subtitle: 'Nắm chắc kiến thức trọng tâm tác phẩm trọng điểm và kỹ năng làm bài',
    targetGoal: 'on-thi-10',
    targetGoalLabel: 'Luyện thi vào 10',
    levelBadge: 'Trọng điểm thi vào 10',
    teacher: 'Cô Mai Lan (Tổ Ngữ Văn)',
    schedule: 'Chiều Thứ 7 (14:30 - 17:00) & Tối Chủ Nhật (18:00 - 20:30)',
    classSize: '12 - 15 học sinh',
    duration: '2 buổi / tuần',
    keyPoints: [
      'Sơ đồ tư duy thâu tóm toàn bộ tác phẩm thơ, truyện ngắn lớp 9',
      'Công thức mở đoạn, triển khai ý nghị luận xã hội sắc bén, giàu cảm xúc',
      'Kỹ năng đọc hiểu văn bản không lo mất điểm oan',
      'Sửa bài chi tiết từng câu từ, chữa lỗi hành văn cho từng học sinh'
    ],
    description: 'Giúp học sinh gạt bỏ nỗi sợ môn Văn, nắm vững dàn ý mẫu và cấu trúc ăn trọn điểm các đề thi tuyển sinh vào 10.',
    suitableFor: 'Học sinh lớp 9 cần nâng cao kỹ năng làm văn nghị luận và đọc hiểu',
    tuitionNote: 'Tặng trọn bộ tài liệu & sơ đồ tư duy tác phẩm'
  },
  {
    id: 'anh-9-on-thi-10',
    grade: '9',
    subject: 'Anh',
    title: 'Tiếng Anh 9 - Bứt Phá Ngữ Pháp & Từ Vựng Vào 10',
    subtitle: 'Ôn luyện chuẩn form đề thi tuyển sinh 10 Sở GD&ĐT Thái Nguyên',
    targetGoal: 'on-thi-10',
    targetGoalLabel: 'Luyện thi vào 10',
    levelBadge: 'Thực chiến đề thi',
    teacher: 'Thầy Quang & Cô Hương (Thạc sĩ Ngôn ngữ Anh)',
    schedule: 'Tối Thứ 2 & Thứ 5 (18:30 - 20:30)',
    classSize: '12 - 15 học sinh',
    duration: '2 buổi / tuần',
    keyPoints: [
      'Chinh phục 18 chuyên đề ngữ pháp then chốt thi vào 10',
      'Bí kíp nhận diện bẫy ngữ âm, trọng âm và cụm từ cố định (collocations)',
      'Chiến thuật xử lý nhanh bài đọc hiểu và hoàn thành câu trắc nghiệm',
      'Thi thử trên giấy chuẩn thời gian thực'
    ],
    description: 'Trang bị hệ thống từ vựng cốt lõi và ngữ pháp thực chiến giúp học sinh tự tin đạt điểm 8.0 - 9.5 môn Tiếng Anh.',
    suitableFor: 'Học sinh lớp 9 cần củng cố và nâng cao điểm số Tiếng Anh',
    tuitionNote: 'Tặng sổ tay ngữ pháp & 50 đề thi thử vào 10'
  },

  // Khối 12 & THPT Quốc Gia
  {
    id: 'toan-12-on-thi-thpt',
    grade: '12',
    subject: 'Toán',
    title: 'Toán 12 - Luyện Thi Tốt Nghiệp THPT & Đánh Giá Năng Lực',
    subtitle: 'Chinh phục mức 8.4 - 9.6 điểm xét tuyển các trường Đại học Top đầu',
    targetGoal: 'on-thi-thpt',
    targetGoalLabel: 'Luyện thi THPT & ĐH',
    levelBadge: 'Nước rút Đại học',
    teacher: 'Thầy Hoàng (Chuyên luyện thi THPT QG)',
    schedule: 'Tối Thứ 2 & Thứ 6 (19:00 - 21:15)',
    classSize: '15 - 18 học sinh',
    duration: '2 buổi / tuần',
    keyPoints: [
      'Bao quát toàn bộ chương trình Toán 12 theo chuẩn đề minh họa Bộ GD&ĐT',
      'Kỹ năng bấm máy tính cầm tay giải nhanh các câu mức 7 - 8 điểm trong 30s',
      'Tư duy phân loại câu hỏi vận dụng cao (Hàm số, Oxyz, Tích phân, Xác suất)',
      'Luyện đề chuẩn bấm giờ hàng tuần và nhận bảng phân tích lỗi sai chi tiết'
    ],
    description: 'Chương trình đào tạo chuyên sâu dành cho học sinh lớp 12 hướng tới các khối A00, A01, B00, D01 thi đỗ Bách Khoa, Kinh Tế Quốc Dân, Y Hà Nội, Sư Phạm,...',
    suitableFor: 'Học sinh lớp 12 quyết tâm đạt điểm cao xét tuyển Đại học',
    tuitionNote: 'Đầy đủ tài liệu và đề thi độc quyền • Ưu đãi đăng ký combo'
  },
  {
    id: 'li-12-on-thi-thpt',
    grade: '12',
    subject: 'Lí',
    title: 'Vật Lí 12 - Chuyên Đề Khối A00, A01 Chinh Phục Điểm 9+',
    subtitle: 'Nắm trọn bản chất hiện tượng vật lý và công thức giải nhanh',
    targetGoal: 'on-thi-thpt',
    targetGoalLabel: 'Luyện thi THPT & ĐH',
    levelBadge: 'Chuyên đề Vật Lí',
    teacher: 'Thầy Đức Anh (Thạc sĩ Vật Lí)',
    schedule: 'Tối Thứ 4 & Chủ Nhật (19:00 - 21:00)',
    classSize: '12 - 15 học sinh',
    duration: '2 buổi / tuần',
    keyPoints: [
      'Thấu hiểu bản chất Dao động cơ, Sóng cơ, Điện xoay chiều',
      'Phương pháp chuẩn hóa số liệu, vector quay, giản đồ vector giải nhanh',
      'Rèn kỹ năng nhận diện đồ thị sóng và điện xoay chiều cực trị',
      'Hệ thống đề ôn thi bám sát cấu trúc thi mới nhất'
    ],
    description: 'Giúp học sinh hiểu sâu bản chất hiện tượng vật lý, không học vẹt công thức, tự tin xử lý bài thi trắc nghiệm tốc độ cao.',
    suitableFor: 'Học sinh lớp 12 ôn thi khối A00, A01 và đánh giá năng lực',
    tuitionNote: 'Tặng bộ chuyên đề công thức giải nhanh Vật Lí'
  },
  {
    id: 'hoa-12-on-thi-thpt',
    grade: '12',
    subject: 'Hoá',
    title: 'Hóa Học 12 - Ôn Luyện Đột Phá Khối A00, B00',
    subtitle: 'Phương pháp dồn chất, đồng đẳng hóa và bảo toàn nguyên tố siêu tốc',
    targetGoal: 'on-thi-thpt',
    targetGoalLabel: 'Luyện thi THPT & ĐH',
    levelBadge: 'Phương pháp siêu tốc',
    teacher: 'Cô Thanh Thủy (Tổ Hóa Học)',
    schedule: 'Tối Thứ 3 & Thứ 7 (19:00 - 21:00)',
    classSize: '12 - 15 học sinh',
    duration: '2 buổi / tuần',
    keyPoints: [
      'Công phá lý thuyết Hóa học không để mất điểm ngớ ngẩn',
      'Kỹ thuật dồn chất este đa chức, quy đổi chất béo và peptit',
      'Xử lý dạng bài vô cơ phức tạp bằng bảo toàn mol e và điện tích',
      'Ngân hàng đề thi thử phong phú chọn lọc từ các trường THPT chuyên'
    ],
    description: 'Chuyên đề Hóa học từ cơ bản đến nâng cao, trang bị tư duy giải toán hóa học hiện đại nhất hiện nay.',
    suitableFor: 'Học sinh 12 ôn thi khối A00, B00 mục tiêu 8 - 9.5 điểm',
    tuitionNote: 'Tặng cẩm nang dồn chất & bảo toàn mol electron'
  },
  {
    id: 'sinh-12-on-thi-thpt',
    grade: '12',
    subject: 'Sinh',
    title: 'Sinh Học 12 - Chinh Phục Điểm 9+ Khối B00 & Y Dược',
    subtitle: 'Tối ưu hóa lý thuyết và phương pháp giải bài tập Di truyền học',
    targetGoal: 'on-thi-thpt',
    targetGoalLabel: 'Luyện thi THPT & ĐH',
    levelBadge: 'Chuyên Khối B00',
    teacher: 'Thầy Tuấn Dũng (Tổ Sinh Học)',
    schedule: 'Chiều Chủ Nhật (14:00 - 16:30) & Tối Thứ 5 (19:00 - 21:00)',
    classSize: '10 - 12 học sinh',
    duration: '2 buổi / tuần',
    keyPoints: [
      'Hệ thống hóa toàn bộ sơ đồ Di truyền học phân tử & quần thể',
      'Phương pháp giải nhanh bài toán quy luật di truyền và phả hệ phức tạp',
      'Chống sai sót lý thuyết Sinh thái và Tiến hóa',
      'Đề thi thử định dạng chuẩn phân loại cao của Bộ Giáo dục'
    ],
    description: 'Đặc thù đào tạo dành cho học sinh định hướng ngành Y Dược, Nông Lâm và Công nghệ Sinh học.',
    suitableFor: 'Học sinh lớp 12 thi tổ hợp B00',
    tuitionNote: 'Tặng tuyển tập đề thi phân hóa cao khối B00'
  },
  {
    id: 'van-12-on-thi-thpt',
    grade: '12',
    subject: 'Văn',
    title: 'Ngữ Văn 12 - Luyện Kỹ Năng Nghị Luận Văn Học Điểm 8.5+',
    subtitle: 'Khai phóng tư duy văn học, rèn luyện bài viết sâu sắc và độc đáo',
    targetGoal: 'on-thi-thpt',
    targetGoalLabel: 'Luyện thi THPT & ĐH',
    levelBadge: 'Nghị luận chuyên sâu',
    teacher: 'Cô Mai Lan & Thầy Việt (Chuyên Văn)',
    schedule: 'Chiều Thứ 7 (14:30 - 17:00)',
    classSize: '15 học sinh',
    duration: '1 buổi dài / tuần (150 phút)',
    keyPoints: [
      'Hệ thống luận điểm chi tiết tất cả tác phẩm văn xuôi và thơ lớp 12',
      'Kỹ năng đưa lý luận văn học và mở rộng dẫn chứng liên hệ thực tế',
      'Rèn chữ, rèn cách diễn đạt mượt mà, cảm xúc và logic',
      'Chấm chữa bài kiểm tra chi tiết theo thang điểm chấm thi quốc gia'
    ],
    description: 'Khóa học giúp học sinh tự tin bước vào phòng thi tốt nghiệp THPT, đạt điểm số mỹ mãn cho các khối D01, C00.',
    suitableFor: 'Học sinh 12 thi tốt nghiệp và xét tuyển Đại học',
    tuitionNote: 'Tặng tuyển tập bài văn mẫu đạt giải Quốc gia'
  },
  {
    id: 'anh-12-on-thi-thpt',
    grade: '12',
    subject: 'Anh',
    title: 'Tiếng Anh 12 - Tổng Ôn Toàn Diện Thi Đại Học',
    subtitle: 'Mở rộng vốn từ vựng học thuật, làm chủ bài đọc hiểu và dạng đề mới',
    targetGoal: 'on-thi-thpt',
    targetGoalLabel: 'Luyện thi THPT & ĐH',
    levelBadge: 'Bứt phá điểm số',
    teacher: 'Thầy Quang (IELTS 8.0, Giảng viên Tiếng Anh)',
    schedule: 'Tối Thứ 3 & Thứ 7 (19:30 - 21:30)',
    classSize: '12 - 15 học sinh',
    duration: '2 buổi / tuần',
    keyPoints: [
      '3000 từ vựng cốt lõi theo chủ đề thường gặp trong đề thi THPT QG',
      'Chiến thuật skim & scan bài đọc hiểu dài không bị hết giờ',
      'Phản xạ làm bài trắc nghiệm nhanh, tránh bẫy ngữ pháp tinh vi',
      'Hỗ trợ học sinh chuẩn bị bài thi đánh giá năng lực môn Tiếng Anh'
    ],
    description: 'Dành cho học sinh khối D01, A01 cần mức điểm 8.0 - 9.6 để vào các trường đại học danh tiếng.',
    suitableFor: 'Học sinh lớp 12',
    tuitionNote: 'Tặng ngân hàng 3000 từ vựng và collocations cốt lõi'
  },

  // Khối 10 & 11 (Xây dựng nền tảng THPT vững chắc)
  {
    id: 'toan-10-nen-tang',
    grade: '10',
    subject: 'Toán',
    title: 'Toán 10 - Khởi Đầu Vững Chắc Chương Trình Mới',
    subtitle: 'Thích ứng phương pháp học THPT, làm chủ Mệnh đề, Tập hợp & Hàm số bậc 2',
    targetGoal: 'co-ban',
    targetGoalLabel: 'Củng cố nền tảng',
    levelBadge: 'Nền tảng lớp 10',
    teacher: 'Thầy Hoàng & Tổ Toán',
    schedule: 'Tối Thứ 3 & Thứ 7 (17:30 - 19:30)',
    classSize: '12 - 15 học sinh',
    duration: '2 buổi / tuần',
    keyPoints: [
      'Làm quen ngay tư duy toán học THPT chương trình GDPT mới',
      'Làm chủ hàm số bậc 2, bất phương trình và hệ thức lượng trong tam giác',
      'Phương pháp hình học tọa độ Oxy trực quan, dễ nhớ',
      'Đảm bảo điểm kiểm tra trên lớp luôn đạt 8+ trở lên'
    ],
    description: 'Giai đoạn chuyển cấp từ THCS lên THPT thường khiến học sinh bị hụt hẫng. Khóa học giúp các em nhanh chóng bắt kịp nhịp độ và tạo đà bứt phá cho 3 năm cấp 3.',
    suitableFor: 'Học sinh lớp 10 mới vào trường cấp 3',
    tuitionNote: 'Tặng trọn bộ tài liệu Toán 10 chương trình GDPT mới'
  },
  {
    id: 'li-10-co-ban',
    grade: '10',
    subject: 'Lí',
    title: 'Vật Lí 10 - Nắm Vững Động Học & Động Lực Học Chất Điểm',
    subtitle: 'Bản chất cơ học cổ điển và các định luật Newton',
    targetGoal: 'co-ban',
    targetGoalLabel: 'Củng cố nền tảng',
    levelBadge: 'Nền tảng Vật Lí',
    teacher: 'Thầy Đức Anh',
    schedule: 'Tối Thứ 2 & Thứ 5 (17:30 - 19:30)',
    classSize: '12 học sinh',
    duration: '2 buổi / tuần',
    keyPoints: [
      'Phân biệt rõ ràng vận tốc, gia tốc, chuyển động biến đổi đều',
      'Vẽ hình phân tích lực chuẩn xác theo 3 định luật Newton',
      'Ứng dụng bảo toàn cơ năng, công và công suất',
      'Thực hành thí nghiệm mô phỏng trực quan'
    ],
    description: 'Xây dựng nền tảng vững chắc môn Lí từ năm đầu cấp 3 để không bị hổng kiến thức khi lên lớp 11 và 12.',
    suitableFor: 'Học sinh lớp 10',
    tuitionNote: 'Tặng trọn bộ chuyên đề Vật Lí 10 nền tảng'
  },
  {
    id: 'hoa-10-co-ban',
    grade: '10',
    subject: 'Hoá',
    title: 'Hóa Học 10 - Bản Chất Cấu Tạo Nguyên Tử & Liên Kết Hóa Học',
    subtitle: 'Nắm chắc bảng tuần hoàn và phản ứng Oxi hóa - Khử then chốt',
    targetGoal: 'co-ban',
    targetGoalLabel: 'Củng cố nền tảng',
    levelBadge: 'Nền tảng Hóa Học',
    teacher: 'Cô Thanh Thủy',
    schedule: 'Tối Thứ 4 & Chủ Nhật (17:30 - 19:30)',
    classSize: '12 học sinh',
    duration: '2 buổi / tuần',
    keyPoints: [
      'Bản chất cấu hình electron, cấu tạo nguyên tử trực quan',
      'Quy tắc cân bằng phản ứng oxi hóa - khử theo phương pháp thăng bằng electron',
      'Quy luật biến đổi tuần hoàn tính chất các nguyên tố',
      'Rèn kỹ năng tính toán mol, nồng độ dung dịch'
    ],
    description: 'Giải quyết triệt để vấn đề sợ Hóa học ngay từ lớp 10, biến môn Hóa thành môn thế mạnh.',
    suitableFor: 'Học sinh lớp 10',
    tuitionNote: 'Tặng cẩm nang cân bằng oxi hóa khử & bảng tuần hoàn'
  },
  {
    id: 'toan-11-co-ban',
    grade: '11',
    subject: 'Toán',
    title: 'Toán 11 - Củng Cố Nền Tảng, Vững Vàng Lượng Giác & Hình Không Gian',
    subtitle: 'Nắm chắc kiến thức cốt lõi, tự tin đạt điểm 7.0 - 8.0 trên lớp',
    targetGoal: 'co-ban',
    targetGoalLabel: 'Củng cố nền tảng',
    levelBadge: 'Nền tảng vững chắc',
    teacher: 'Thầy Hoàng & Tổ Toán THPT',
    schedule: 'Tối Thứ 3 & Thứ 6 (19:30 - 21:30)',
    classSize: '15 học sinh',
    duration: '2 buổi / tuần',
    keyPoints: [
      'Hệ thống công thức lượng giác, phương trình lượng giác cơ bản',
      'Rèn kỹ năng vẽ hình, xác định giao tuyến, giao điểm trong không gian',
      'Nắm chắc dãy số, cấp số cộng, cấp số nhân và giới hạn hàm số',
      'Chữa chi tiết bài tập SGK mới và bài tập trên lớp'
    ],
    description: 'Chương trình Toán 11 cơ bản giúp các em học sinh nắm vững kiến thức nền tảng của chương trình mới, khắc phục mất gốc và chuẩn bị tốt cho các bài kiểm tra định kỳ.',
    suitableFor: 'Học sinh lớp 11 cần nắm chắc kiến thức cơ bản và nâng cao điểm số học bạ',
    tuitionNote: 'Tặng trọn bộ cẩm nang công thức Toán 11 độc quyền'
  },
  {
    id: 'toan-11-nang-cao',
    grade: '11',
    subject: 'Toán',
    title: 'Toán 11 - Đột Phá Lượng Giác, Dãy Số & Hình Không Gian 11',
    subtitle: 'Trang bị 30% kiến thức nền tảng của kỳ thi THPT Quốc Gia',
    targetGoal: 'nang-cao',
    targetGoalLabel: 'Nâng cao & Luyện đề',
    levelBadge: 'Trọng tâm cấp 3',
    teacher: 'Thầy Hoàng',
    schedule: 'Tối Thứ 4 & Thứ 7 (19:30 - 21:30)',
    classSize: '15 học sinh',
    duration: '2 buổi / tuần',
    keyPoints: [
      'Làm chủ công thức lượng giác và phương trình lượng giác thường gặp',
      'Phương pháp tư duy trực quan hình học không gian (khoảng cách, góc)',
      'Giới hạn hàm số và đạo hàm ứng dụng cho chương trình lớp 12',
      'Tổ hợp, xác suất tư duy logic cao'
    ],
    description: 'Chương trình Toán 11 là bản lề quan trọng nhất của cấp 3. Học sinh vững Toán 11 sẽ nhẹ gánh hơn một nửa khi bước vào năm lớp 12.',
    suitableFor: 'Học sinh lớp 11 muốn đạt điểm 8.5+ và chuẩn bị thi Đại học sớm',
    tuitionNote: 'Tặng tài liệu Hình không gian & Lượng giác chuyên sâu'
  },

  // Khối 6, 7, 8 (Khối THCS - Lấy lại gốc & Bồi dưỡng)
  {
    id: 'toan-6-lay-lai-goc',
    grade: '6',
    subject: 'Toán',
    title: 'Toán 6 - Chuyển Cấp Vui Vẻ, Vững Vàng Tập Hợp & Phân Số',
    subtitle: 'Xóa bỏ bỡ ngỡ giữa Toán tiểu học và THCS, rèn tính tự giác',
    targetGoal: 'mat-goc',
    targetGoalLabel: 'Lấy lại gốc & Củng cố',
    levelBadge: 'Cơ bản vững vàng',
    teacher: 'Cô Thu Hà (Tổ Toán THCS)',
    schedule: 'Chiều Thứ 3 & Thứ 6 (16:30 - 18:15)',
    classSize: '10 - 12 học sinh',
    duration: '2 buổi / tuần (90 phút/buổi)',
    keyPoints: [
      'Chuyển đổi cách trình bày lời giải chuẩn mực cấp 2',
      'Rèn thành thạo các phép tính số nguyên, phân số và số thập phân',
      'Hình học trực quan, chu vi diện tích hình phẳng trong đời sống',
      'Kiên nhẫn hướng dẫn học sinh chưa tập trung hoặc tính toán chậm'
    ],
    description: 'Tạo môi trường học tập nhẹ nhàng, kích thích sự hứng thú và tự tin cho các em học sinh lớp 6 mới bước chân vào trường THCS.',
    suitableFor: 'Học sinh lớp 6 cần rèn thói quen tự học và tính toán chuẩn xác',
    tuitionNote: 'Kèm sát từng bài tập • Tặng vở bài tập Toán 6'
  },
  {
    id: 'toan-7-cung-co',
    grade: '7',
    subject: 'Toán',
    title: 'Toán 7 - Làm Chủ Số Hữu Tỉ, Biểu Thức Đại Số & Tam Giác Bằng Nhau',
    subtitle: 'Tăng cường tư duy chứng minh hình học và biến đổi đa thức',
    targetGoal: 'co-ban',
    targetGoalLabel: 'Củng cố nền tảng',
    levelBadge: 'Củng cố tư duy',
    teacher: 'Thầy Hoàng & Cô Thu Hà',
    schedule: 'Chiều Thứ 2 & Thứ 5 (16:30 - 18:15)',
    classSize: '10 - 12 học sinh',
    duration: '2 buổi / tuần',
    keyPoints: [
      'Khắc phục dứt điểm nhầm lẫn dấu và phép tính số hữu tỉ, số thực',
      'Phương pháp vẽ hình phụ và chứng minh tam giác bằng nhau logic',
      'Cộng trừ nhân chia đa thức một biến chuẩn xác',
      'Kèm cặp từng em bài tập về nhà hàng tuần'
    ],
    description: 'Giúp học sinh lớp 7 vượt qua giai đoạn chuyển giao tư duy hình học chứng minh, xây dựng nền tảng vững chắc cho các lớp trên.',
    suitableFor: 'Học sinh lớp 7 cần củng cố kiến thức và nâng cao điểm số',
    tuitionNote: 'Tặng sổ tay công thức Toán 7 & đề kiểm tra định kỳ'
  },
  {
    id: 'toan-8-nang-cao',
    grade: '8',
    subject: 'Toán',
    title: 'Toán 8 - 7 Hằng Đẳng Thức Đáng Nhớ & Tứ Giác, Tam Giác Đồng Dạng',
    subtitle: 'Bước đệm quyết định trước khi bước vào năm học lớp 9 thi chuyển cấp',
    targetGoal: 'mat-goc',
    targetGoalLabel: 'Lấy lại gốc & Nâng cao',
    levelBadge: 'Bước đệm lớp 9',
    teacher: 'Thầy Hoàng & Tổ Toán',
    schedule: 'Chiều Thứ 4 & Chủ Nhật (16:30 - 18:15)',
    classSize: '12 học sinh',
    duration: '2 buổi / tuần',
    keyPoints: [
      'Thành thạo 7 hằng đẳng thức và các phương pháp phân tích đa thức thành nhân tử',
      'Rút gọn phân thức đại số - nền tảng trực tiếp của bài thi vào 10',
      'Định lý Ta-lét và tam giác đồng dạng chứng minh tỉ số hình học',
      'Xóa tan nỗi sợ mất gốc hình học cấp 2'
    ],
    description: 'Kiến thức Toán 8 chiếm tỷ trọng lớn trong nền tảng ôn thi vào 10. Cơ sở cam kết giúp học sinh lấy lại căn bản chỉ sau 1 khóa học.',
    suitableFor: 'Học sinh lớp 8 mất gốc hoặc muốn học trước để chuẩn bị thi vào 10',
    tuitionNote: 'Lấy lại căn bản Đại số & Hình học cấp tốc'
  },
  {
    id: 'anh-7-8-giao-tiep-ngu-phap',
    grade: '8',
    subject: 'Anh',
    title: 'Tiếng Anh THCS - Chắc Ngữ Pháp, Chuẩn Phát Âm & Điểm Cao Trên Lớp',
    subtitle: 'Hệ thống thì tiếng Anh, câu bị động, câu điều kiện và từ vựng phong phú',
    targetGoal: 'co-ban',
    targetGoalLabel: 'Củng cố nền tảng',
    levelBadge: 'Ngữ pháp & Từ vựng',
    teacher: 'Cô Mai Hương',
    schedule: 'Chiều Thứ 7 & Chủ Nhật (15:00 - 16:45)',
    classSize: '12 học sinh',
    duration: '2 buổi / tuần',
    keyPoints: [
      'Ghi nhớ quy tắc phát âm đuôi -s/es và -ed chuẩn quốc tế',
      'Nắm chắc 6 thì cơ bản và biến đổi câu chủ động - bị động',
      'Mở rộng từ vựng theo các unit trong sách giáo khoa mới',
      'Luyện tập đề kiểm tra 15 phút, giữa kỳ và cuối kỳ đạt 8-9 điểm'
    ],
    description: 'Giúp học sinh tự tin nói, viết và đạt điểm cao trong các bài kiểm tra định kỳ tại trường.',
    suitableFor: 'Học sinh khối THCS từ lớp 6 đến lớp 8',
    tuitionNote: 'Tặng cẩm nang ngữ pháp Tiếng Anh THCS độc quyền'
  },
  {
    id: 'li-8-co-ban',
    grade: '8',
    subject: 'Lí',
    title: 'Vật Lí 8 - Làm Quen Cơ Học & Nhiệt Học',
    subtitle: 'Giải thích hiện tượng đời sống và bài toán chuyển động, áp suất, công',
    targetGoal: 'co-ban',
    targetGoalLabel: 'Củng cố nền tảng',
    levelBadge: 'Cơ sở Vật Lí',
    teacher: 'Thầy Đức Anh',
    schedule: 'Tối Thứ 4 (18:30 - 20:30)',
    classSize: '10 - 12 học sinh',
    duration: '1 buổi / tuần',
    keyPoints: [
      'Công thức vận tốc, chuyển động đều và chuyển động không đều',
      'Áp suất chất rắn, chất lỏng và lực đẩy Ác-si-mét',
      'Phương trình cân bằng nhiệt và nguyên lý truyền nhiệt',
      'Bài tập tính toán rèn kỹ năng suy luận logic'
    ],
    description: 'Khơi gợi niềm say mê khoa học tự nhiên, chuẩn bị cho Vật Lí 9 thi chuyển cấp.',
    suitableFor: 'Học sinh lớp 8 bắt đầu học Vật Lí tính toán',
    tuitionNote: 'Tặng hệ thống bài tập thực hành & chuyên đề Vật Lí 8'
  },
  {
    id: 'hoa-8-khoi-dau',
    grade: '8',
    subject: 'Hoá',
    title: 'Hóa Học 8 - Bước Chân Đầu Tiên Vào Thế Giới Hóa Học',
    subtitle: 'Học vui, nhớ lâu: Ký hiệu hóa học, Hóa trị, Phương trình hóa học & Mol',
    targetGoal: 'co-ban',
    targetGoalLabel: 'Củng cố nền tảng',
    levelBadge: 'Bắt đầu môn Hóa',
    teacher: 'Cô Thanh Thủy',
    schedule: 'Tối Thứ 6 (18:30 - 20:30)',
    classSize: '10 - 12 học sinh',
    duration: '1 buổi / tuần',
    keyPoints: [
      'Bài ca hóa trị vui nhộn giúp thuộc lòng hóa trị trong 1 buổi học',
      'Quy tắc lập công thức hóa học và phương trình phản ứng không bị sai',
      'Khái niệm Mol, khối lượng mol và thể tích mol chất khí',
      'Giải toán hóa học bằng phương pháp đặt ẩn mol chuẩn mực'
    ],
    description: 'Năm lớp 8 là năm đầu tiên học Hóa. Nếu học đúng phương pháp ngay từ đầu, học sinh sẽ thấy Hóa rất thú vị và đạt điểm 9, 10 dễ dàng.',
    suitableFor: 'Học sinh lớp 8 mới làm quen môn Hóa Học',
    tuitionNote: 'Tặng bài ca hóa trị độc quyền & phương pháp cân bằng mol'
  },
  // Khối Công Nghệ Thông Tin
  {
    id: 'cntt-cong-nghe-thong-tin',
    grade: 'cntt',
    subject: 'Tin học',
    title: 'Khối CNTT - Công Nghệ Thông Tin & Kỹ Năng Số',
    subtitle: 'Lập trình ứng dụng, tin học văn phòng thực chiến & kỹ năng số 4.0',
    targetGoal: 'nang-cao',
    targetGoalLabel: 'Kỹ năng công nghệ toàn diện',
    levelBadge: 'Khối Công Nghệ Thông Tin',
    teacher: 'Tổ bộ môn CNTT & Kỹ sư mời giảng',
    schedule: 'Chiều Thứ 7 & Chủ Nhật (Linh hoạt ca học)',
    classSize: '10 - 15 học sinh (1 máy/em)',
    duration: '1 - 2 buổi / tuần',
    keyPoints: [
      'Làm chủ Word, Excel, PowerPoint chuyên sâu phục vụ học tập và thuyết trình',
      'Tư duy lập trình khoa học từ Scratch, Python cơ bản đến thuật toán',
      'Kỹ năng số 4.0: Khai thác thông tin an toàn, sử dụng AI thông minh có trách nhiệm',
      'Thực hành 100% trên dàn máy tính hiện đại tại phòng máy của trung tâm'
    ],
    description: 'Chương trình đào tạo toàn diện trang bị từ kỹ năng văn phòng thực chiến đến tư duy lập trình và ứng dụng công nghệ 4.0.',
    suitableFor: 'Học sinh từ lớp 3 đến lớp 12 muốn làm chủ máy tính, lập trình và kỹ năng số',
    tuitionNote: 'Học tại phòng máy lạnh trang bị máy tính cấu hình cao (1 học sinh / 1 máy)'
  },
  // Khối Văn Hay Chữ Đẹp
  {
    id: 'van-chu-dep-luyen-chu',
    grade: 'van-chu-dep',
    subject: 'Luyện chữ',
    title: 'Khối Văn Hay Chữ Đẹp - Luyện Chữ Nét Thanh Nét Đậm',
    subtitle: 'Nét chữ nết người - Uốn nắn tư thế ngồi, cách cầm bút & viết đẹp',
    targetGoal: 'co-ban',
    targetGoalLabel: 'Rèn chữ nết người',
    levelBadge: 'Khối Văn Hay Chữ Đẹp',
    teacher: 'Cô Mai Lan & Giáo viên Chuyên Luyện Chữ',
    schedule: 'Sáng Thứ 7 (08:00 - 10:00) hoặc Sáng Chủ Nhật (08:00 - 10:00)',
    classSize: '8 - 10 học sinh',
    duration: '1 - 2 buổi / tuần',
    keyPoints: [
      'Uốn nắn tư thế ngồi thẳng lưng, khoảng cách mắt chuẩn chống cận thị',
      'Cách cầm bút chuẩn không mỏi tay, kỹ thuật lia bút và nối nét mềm mại',
      'Luyện chuẩn form chữ cái, nét thanh nét đậm chuẩn Bộ GD&ĐT',
      'Rèn tốc độ viết nhanh nhưng vẫn giữ được nét chữ ngay ngắn, sạch đẹp'
    ],
    description: 'Khóa học giúp các em học sinh xóa bỏ thói quen viết ẩu, chữ xấu, tẩy xóa trong bài thi, tạo thiện cảm lớn với thầy cô chấm bài.',
    suitableFor: 'Học sinh mọi lứa tuổi có nét chữ nguệch ngoạc, viết chậm hoặc sai tư thế',
    tuitionNote: 'Tặng trọn bộ bút mài thanh đậm & vở luyện chữ độc quyền'
  },
  {
    id: 'van-chu-dep-cam-thu-van-hoc',
    grade: 'van-chu-dep',
    subject: 'Văn',
    title: 'Khối Văn Hay Chữ Đẹp - Nghệ Thuật Cảm Thụ & Viết Văn Sáng Tạo',
    subtitle: 'Khơi nguồn cảm xúc văn học, trau chuốt câu từ và kỹ năng hành văn',
    targetGoal: 'nang-cao',
    targetGoalLabel: 'Bồi dưỡng cảm xúc',
    levelBadge: 'Khối Văn Hay Chữ Đẹp',
    teacher: 'Cô Mai Lan (Tổ Ngữ Văn)',
    schedule: 'Chiều Chủ Nhật (14:30 - 17:00)',
    classSize: '10 - 12 học sinh',
    duration: '1 buổi / tuần',
    keyPoints: [
      'Khơi gợi tình yêu với văn học và thói quen quan sát cuộc sống xung quanh',
      'Làm giàu vốn từ ngữ miêu tả, biểu cảm, các biện pháp tu từ độc đáo',
      'Phương pháp mở bài, kết bài sáng tạo gây ấn tượng mạnh mẽ',
      'Hướng dẫn sửa từng câu văn cộc lốc thành câu văn giàu hình ảnh, nhịp điệu'
    ],
    description: 'Đánh thức năng khiếu văn chương tiềm ẩn của học sinh, giúp các em tự tin thể hiện suy nghĩ và cảm xúc qua từng trang viết.',
    suitableFor: 'Học sinh muốn nâng cao kỹ năng hành văn, yêu thích văn học nghệ thuật',
    tuitionNote: 'Tặng tuyển tập các bài văn đoạt giải cao và sổ tay ngữ từ'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Cô Nguyễn Thị Lan',
    role: 'Phụ huynh em Trần Tuấn Anh',
    studentInfo: 'Đỗ Lớp 10 THPT Lương Ngọc Quyến (Toán: 9.0, Anh: 8.75)',
    content: 'Cháu Tuấn Anh nhà tôi trước đây rất lười học môn Toán, điểm kiểm tra chỉ lẹt đẹt 5 - 6 điểm khiến gia đình vô cùng lo lắng khi con lên lớp 9. May mắn được người quen giới thiệu đến Cơ sở Thầy Hoàng ở Vạn Phú. Thầy rất nghiêm khắc nhưng lại cực kỳ thương học sinh, giảng giải từng bước cặn kẽ. Sau 3 tháng con tiến bộ vượt bậc, tự giác học bài và thi vào 10 đạt 9 điểm Toán. Cảm ơn Thầy Hoàng và các thầy cô rất nhiều!',
    rating: 5,
    highlight: 'Từ 5 điểm Toán lên 9 điểm vào 10 THPT Lương Ngọc Quyến'
  },
  {
    id: 't2',
    name: 'Bác Lê Văn Thắng',
    role: 'Phụ huynh em Lê Thu Trang',
    studentInfo: 'Đỗ Đại học Kinh tế Quốc dân (Khối A01: 27.5 điểm)',
    content: 'Gia đình tôi cho cháu học cả 3 môn Toán, Lí, Anh tại cơ sở Thầy Hoàng từ năm lớp 11. Điểm tôi ưng ý nhất là cơ sở luôn thông báo tình hình học và điểm kiểm tra định kỳ của con về Zalo cho phụ huynh. Phòng học rộng rãi, mát mẻ có điều hòa đầy đủ. Thầy cô nhiệt tình hỗ trợ chữa bài đến tận khuya nếu các cháu chưa hiểu.',
    rating: 5,
    highlight: 'Đỗ Đại học KTQD với 27.5 điểm khối A01'
  },
  {
    id: 't3',
    name: 'Chị Hoàng Mai Phương',
    role: 'Phụ huynh em Nguyễn Đức Minh',
    studentInfo: 'Học sinh lớp 8 củng cố mất gốc môn Hóa & Toán',
    content: 'Con trai tôi bị mất gốc môn Hóa từ đầu năm lớp 8, cháu rất sợ mỗi khi đến giờ kiểm tra. Đến học cô Thủy và thầy Hoàng, con được kèm cặp lại từ ký hiệu, hóa trị, cách cân bằng phương trình. Giờ con đã tự tin giơ tay phát biểu trên lớp và điểm thi học kỳ vừa rồi đạt 8.5 điểm.',
    rating: 5,
    highlight: 'Xóa tan nỗi sợ mất gốc môn Hóa sau 1 tháng'
  }
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'xep-lop',
    question: 'Học sinh bị mất gốc, học lực yếu kém có theo kịp chương trình không?',
    answer: 'Cơ sở giáo dục Thầy Hoàng có quy trình kiểm tra năng lực đầu vào hoàn toàn MIỄN PHÍ để nắm rõ lỗ hổng kiến thức của từng em. Với những học sinh yếu hoặc mất gốc, thầy cô sẽ có lộ trình bổ trợ riêng, kèm phụ đạo 1-1 các chuyên đề căn bản trước khi ghép vào nhóm lớp phù hợp. Cơ sở cam kết học sinh sẽ có sự tiến bộ rõ rệt sau 4 - 8 tuần học tập nghiêm túc.'
  },
  {
    id: 'faq-2',
    category: 'xep-lop',
    question: 'Một lớp học tại cơ sở Thầy Hoàng có bao nhiêu học sinh?',
    answer: 'Để đảm bảo chất lượng giảng dạy cao nhất và giáo viên có thể quan sát, sửa bài chi tiết cho từng học sinh, mỗi lớp học tại cơ sở duy trì sĩ số vàng từ 10 đến 15 học sinh (tối đa 18 học sinh đối với lớp luyện đề tổng ôn). Chúng tôi tuyệt đối không dạy nhồi nhét đại trà 30 - 40 em như các lò luyện.'
  },
  {
    id: 'faq-3',
    category: 'chuong-trinh',
    question: 'Lịch học có linh hoạt và tránh bị trùng lịch học chính khóa ở trường không?',
    answer: 'Lịch học tại cơ sở được bố trí linh hoạt vào các khung giờ chiều muộn (16:30 - 18:30), ca tối (18:30 - 20:30 hoặc 19:00 - 21:00) và các ngày Thứ 7, Chủ Nhật. Cơ sở luôn khảo sát thời khóa biểu trường của học sinh để sắp xếp lớp học khoa học nhất. Nếu học sinh có việc đột xuất nghỉ học có phép, thầy cô sẽ bố trí buổi học bù hoặc gửi video/tài liệu hướng dẫn trực tiếp.'
  },
  {
    id: 'faq-4',
    category: 'chat-luong',
    question: 'Phụ huynh theo dõi kết quả học tập và chuyên cần của con bằng cách nào?',
    answer: 'Cơ sở áp dụng hệ thống quản lý học viên chặt chẽ: Điểm danh qua tin nhắn Zalo gửi phụ huynh ngay khi bắt đầu ca học; Báo cáo kết quả bài kiểm tra định kỳ (2 tuần/lần hoặc theo tháng); Giáo viên chủ nhiệm lớp thường xuyên gọi điện trao đổi trực tiếp với phụ huynh để cùng đồng hành giúp các em tiến bộ.'
  },
  {
    id: 'faq-5',
    category: 'hoc-phi',
    question: 'Chính sách học phí và các ưu đãi tại cơ sở như thế nào?',
    answer: 'Cơ sở áp dụng mức học phí hợp lý, phù hợp với mọi gia đình tại Thái Nguyên (chỉ từ 60.000đ - 100.000đ/buổi). Ngoài ra, cơ sở có nhiều chính sách hỗ trợ thiết thực: Giảm ngay 10% học phí khi phụ huynh đăng ký cho con từ 2 môn trở lên (ví dụ: Toán + Lí, Toán + Hóa, Toán + Văn + Anh), giảm 15% cho anh chị em ruột cùng theo học, và tặng trọn bộ giáo trình, đề thi thử in màu không phát sinh phụ phí.'
  },
  {
    id: 'faq-6',
    category: 'chuong-trinh',
    question: 'Cơ sở có tổ chức các đợt thi thử chuẩn cấu trúc đề thi vào 10 và THPT Quốc Gia không?',
    answer: 'Có! Định kỳ hàng tháng và đặc biệt trong giai đoạn nước rút (tháng 3 đến tháng 6), cơ sở tổ chức các kỳ thi thử trực tiếp trên giấy với đề thi chuẩn ma trận của Sở GD&ĐT Thái Nguyên và Bộ GD&ĐT. Các bài thi được rọc phách, chấm chéo và trả điểm kèm nhận xét lỗi sai chi tiết để học sinh rèn luyện tâm lý phòng thi vững vàng.'
  }
];
