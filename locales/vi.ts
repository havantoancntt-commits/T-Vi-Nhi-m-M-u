export const vi = {
  header: {
    title: 'Huyền Phong Phật Đạo',
    subtitle: 'Luận Giải Mệnh Lý - Soi Rọi Tương Lai',
  },
  tabs: {
    horoscope: 'Lá Số',
    divination: 'Gieo Quẻ',
    date_selection: 'Xem Ngày',
    talisman: 'Linh Phù',
    chat: 'AI Thiện Giác',
  },
  footer: {
    copyright: 'Huyền Phong Phật Đạo. Bảo lưu mọi quyền.',
  },
  modal: {
    close: 'Đóng cửa sổ',
  },
  audio: {
    mute: 'Tắt nhạc nền',
    unmute: 'Mở nhạc nền',
  },
  loader: {
    component: 'Đang Tải Tri Thức...',
  },
  horoscope: {
    form: {
      title: 'Nhập Thông Tin Thân Chủ',
      description: 'Cung cấp thông tin ngày sinh chính xác để luận giải lá số tử vi của bạn một cách chuẩn xác nhất.',
      dob: 'Ngày Sinh Dương Lịch',
      day: 'Ngày',
      month: 'Tháng',
      year: 'Năm',
      tob: 'Giờ Sinh',
      gender: 'Giới Tính',
      male: 'Nam',
      female: 'Nữ',
      submitButton: 'Xem Vận Mệnh',
      loadingButton: 'Đang Luận Giải...',
    },
    loaderMessage: 'AI Thiện Giác đang phân tích lá số của bạn. Quá trình này có thể mất một chút thời gian...',
    result: {
      tabs: {
        summary: 'Tổng Quan',
        lifetime: 'Luận Giải Trọn Đời',
        lucky: 'Cẩm Nang Cát Tường'
      },
      summary: {
        title: 'Bản Mệnh Tổng Quan',
        mainElement: 'Bản Mệnh',
        zodiacAnimal: 'Con Giáp',
        westernZodiac: 'Hoàng Đạo',
        destinyPalace: 'Cung Mệnh',
      },
      lifetime: {
        title: 'Luận Giải Trọn Đời',
        overview: 'Tổng Quan',
        career: 'Sự Nghiệp',
        wealth: 'Tài Lộc',
        love: 'Tình Duyên',
        health: 'Sức Khỏe',
        family: 'Gia Đạo',
        synthesis: 'Tổng Luận & Liên Kết',
        keyPeriodsTitle: 'Các Giai Đoạn Vận Hạn Chính',
        youth: 'Giai Đoạn Tiền Vận (18-35 tuổi)',
        middleAge: 'Giai Đoạn Trung Vận (36-55 tuổi)',
        oldAge: 'Giai Đoạn Hậu Vận (từ 56 tuổi)',
      },
      lucky: {
        title: 'Cẩm Nang Cát Tường',
        numbers: 'Số May Mắn',
        colors: 'Màu Hợp Mệnh',
        zodiacs: 'Tuổi Hợp',
        dos: 'Việc Nên Làm',
        donts: 'Việc Cần Tránh',
      },
    },
    support: {
      button: 'Gieo Duyên Lành',
      modalTitle: 'Gieo Duyên Cùng Phật Pháp',
      modalText1: 'Tri thức này là một món quà. Nếu bạn thấy hữu ích, hãy gieo một hạt giống duyên lành để hỗ trợ nền tảng phát triển và lan tỏa những lời dạy này.',
      modalText2: 'Mọi sự đóng góp đều là nguồn động viên quý báu. Xin chân thành công đức!',
    },
    pdf: {
      button: 'Tải Lá Số PDF',
      modalTitle: 'Tải Về Lá Số Vận Mệnh',
      modalText: 'Lá số chi tiết của bạn đã sẵn sàng. Để thể hiện sự trân trọng đối với bài luận giải sâu sắc này, chúng tôi mời bạn gieo duyên lành bằng một khoản tịnh tài để ủng hộ sứ mệnh của chúng tôi.',
      completeButton: 'Hoàn Tất & Tải Về',
      loadingButton: 'Đang tạo PDF...',
      errorNotFound: 'Không tìm thấy nội dung để tạo PDF.',
      errorGeneric: 'Đã có lỗi xảy ra khi tạo file PDF. Vui lòng thử lại.',
    }
  },
  chat: {
    initialMessage: 'A Di Đà Phật! Bần đạo là Thiện Giác. Thí chủ có điều gì cần luận giải về mệnh lý, phong thủy, hay triết lý nhân sinh không?',
    placeholder: 'Hỏi về vận mệnh, đường đời, quyết định...',
    sendButton: 'Gửi',
    starterPrompts: [
        "Ngày sinh của tôi nói lên điều gì về sự nghiệp?",
        "Làm thế nào để cải thiện vận may và tài lộc?",
        "Hãy giải thích về luật Nhân Quả.",
        "Mục đích sống của tôi là gì?"
    ],
    error: {
        unknown: 'Lỗi không xác định từ máy chủ.',
        server: 'Lỗi máy chủ',
        generic: 'Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại.',
    }
  },
  divination: {
    initial: {
      title: 'Thành Tâm Xin Quẻ',
      description: 'Hãy tĩnh tâm. Tập trung vào một câu hỏi duy nhất, rõ ràng mà bạn muốn thỉnh thị. Lòng thành sẽ nhận được chỉ dẫn tỏ tường nhất.',
      alt: 'Hũ Xăm',
      button: 'Bắt Đầu Gieo Quẻ',
      focusMessage: 'Khi tâm đã tĩnh và câu hỏi đã rõ ràng, hãy xóc hũ xăm để nhận lời chỉ dẫn.',
      shakeButton: 'Xóc Hũ Xăm',
      loadingButton: 'Đang Gieo Quẻ...',
    },
    result: {
      stickNumberLabel: 'Quẻ Xăm Số',
      poemTitle: 'Thơ Giải',
      interpretationTitle: 'Luận Giải Chi Tiết',
      adviceTitle: 'Lời Khuyên Của Thiện Giác',
      newButton: 'Gieo Quẻ Mới',
    },
    support: {
      title: 'Gieo Duyên Lành, Phúc Báo Viên Mãn',
      description: 'Quẻ xăm này là một ngọn đuốc dẫn đường. Nếu nó đã mang lại cho bạn sự sáng tỏ, hãy gieo một hạt giống duyên lành để phúc báo được viên mãn và các giá trị thiện lành được lan tỏa rộng hơn.',
    },
  },
  dateSelection: {
    tabTitle: 'Xem Ngày Tốt',
    form: {
      title: 'Chọn Ngày Lành Tháng Tốt',
      description: 'Chọn sự kiện và thông tin của bạn để tìm ra những ngày cát tường, hanh thông nhất cho công việc trọng đại.',
      eventType: 'Loại Sự Việc',
      birthDate: 'Ngày Sinh Thân Chủ',
      targetMonth: 'Tháng Cần Xem',
      targetYear: 'Năm Cần Xem',
      submitButton: 'Tìm Ngày Tốt',
      loadingButton: 'Đang tìm kiếm...',
      eventTypes: {
        wedding: 'Cưới Hỏi',
        groundbreaking: 'Động Thổ Xây Dựng',
        grandOpening: 'Khai Trương',
        movingHouse: 'Nhập Trạch (Về Nhà Mới)',
        contractSigning: 'Ký Kết Hợp Đồng',
        travel: 'Xuất Hành',
      }
    },
    results: {
      title: 'Danh Sách Ngày Cát Tường',
      noResults: 'Không tìm thấy ngày nào thực sự tốt cho sự việc này trong tháng đã chọn. Vui lòng thử tìm ở tháng khác.',
      lunarDate: 'Ngày Âm Lịch',
      goodHours: 'Giờ Hoàng Đạo',
      explanation: 'Luận Giải',
      conflictingZodiacs: 'Tuổi Kỵ',
      auspiciousStars: 'Cát Tinh',
      inauspiciousStars: 'Hung Tinh',
    },
    loaderMessage: 'AI Thiện Giác đang tính toán thiên năng để tìm ngày lành cho bạn...',
  },
  talisman: {
    form: {
      title: 'Thỉnh Linh Phù Hộ Mệnh',
      description: 'Nhập thông tin và thành tâm khấn nguyện. AI Thiện Giác sẽ đặc biệt trì chú, vẽ nên lá linh phù độc nhất mang năng lượng cát tường cho bạn.',
      name: 'Họ và Tên Thân Chủ',
      dob: 'Ngày Sinh Dương Lịch',
      wish: 'Điều Mong Cầu',
      submitButton: 'Thành Tâm Thỉnh Phù',
      loadingButton: 'Đang Trì Chú...',
    },
    wishTypes: {
      overall_luck: 'Tổng Hợp May Mắn & Bình An',
      career: 'Công Danh Sự Nghiệp',
      wealth: 'Tài Lộc Hanh Thông',
      love: 'Tình Duyên Viên Mãn',
      health: 'Bình An Sức Khỏe',
      education: 'Học Vấn Thi Cử',
    },
    loaderMessage: 'AI Thiện Giác đang trì chú và vẽ linh phù cho bạn. Xin hãy thành tâm chờ đợi...',
    result: {
      title: 'Linh Phù Hộ Mệnh Của Bạn',
      downloadButton: 'Tải Linh Phù',
      newButton: 'Thỉnh Phù Mới',
      symbolismTitle: 'Ý Nghĩa Linh Phù',
      instructionsTitle: 'Hướng Dẫn Sử Dụng',
    },
  },
  support: {
    scan_qr: 'Quét mã QR để chuyển khoản nhanh hoặc sao chép thông tin bên dưới.',
    copy: 'Sao chép',
    copied: 'Đã chép',
    copyError: 'Không thể sao chép. Vui lòng thử lại.',
    vcb: {
      bank: 'Ngân hàng Vietcombank',
      nameLabel: 'Chủ tài khoản',
      name: 'HA VAN TOAN',
      accountLabel: 'Số tài khoản',
    },
    zalo: {
      wallet: 'Ví ZaloPay',
      phoneLabel: 'Số điện thoại',
    }
  },
  printable: {
    title: 'Lá Số Tử Vi Trọn Đời',
    userInfo: 'Thông Tin Thân Chủ',
    footer: 'Luận giải bởi Huyền Phong Phật Đạo &copy; {{year}}. Nội dung chỉ mang tính chất tham khảo và chiêm nghiệm.',
  },
  quotes: [
    { text: "Gieo nhân nào, gặt quả nấy. Vận mệnh của bạn hôm nay là kết quả của những suy nghĩ và hành động trong quá khứ.", author: "Luật Nhân Quả" },
    { text: "Tâm an vạn sự an. Sự bình yên thực sự đến từ bên trong, không phải từ hoàn cảnh bên ngoài.", author: "Lời Phật Dạy" },
    { text: "Nguồn gốc của mọi khổ đau là sự bám chấp. Buông bỏ, tâm sẽ tự tại.", author: "Triết Lý Đông Phương" },
    { text: "Đừng truy tìm quá khứ, đừng vọng tưởng tương lai, hãy an trú trong giây phút hiện tại.", author: "Kinh Pháp Cú" },
    { text: "Tha thứ cho người khác không phải vì họ xứng đáng, mà vì bạn xứng đáng được bình yên.", author: "Thiền Sư Thích Nhất Hạnh" },
    { text: "Hiểu được tất cả là tha thứ được tất cả.", author: "Lời Vàng Ý Ngọc" }
  ],
};