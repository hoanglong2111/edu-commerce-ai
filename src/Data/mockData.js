const mockData = [
  {
    id: 1,
    name: "JavaScript Từ Cơ Bản Đến Nâng Cao",
    category: "Lập trình",
    price: 599000,
    originalPrice: 899000,
    rating: 4.8,
    students: "12,450",
    duration: "40 giờ",
    instructor: "Nguyễn Văn An",
    // 🆕 4 HÌNH ẢNH CHO JAVASCRIPT COURSE
    images: [
      "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=250&fit=crop", // JS code
      "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400&h=250&fit=crop", // JS laptop
      "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=250&fit=crop", // Coding setup
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop"  // Programming
    ],
    image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=250&fit=crop", // Main image
    shortDesc: "Học JavaScript từ căn bản đến nâng cao với các dự án thực tế",
    level: "Tất cả cấp độ",
    language: "Tiếng Việt",
    certificate: true,
    features: [
      "40+ giờ video HD",
      "100+ bài tập thực hành", 
      "10 dự án thực tế",
      "Hỗ trợ trọn đời"
    ]
  },
  {
    id: 2,
    name: "React.js Development",
    category: "Lập trình",
    price: 799000,
    originalPrice: 1200000,
    rating: 4.9,
    students: "8,320",
    duration: "50 giờ",
    instructor: "Trần Thị Bình",
    images: [
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop", // React logo
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=250&fit=crop", // React code
      "https://images.unsplash.com/photo-1581276879432-15e50529f34b?w=400&h=250&fit=crop", // Web development
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=250&fit=crop"  // Computer coding
    ],
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop",
    shortDesc: "Xây dựng ứng dụng web hiện đại với React.js",
    level: "Trung cấp",
    language: "Tiếng Việt",
    certificate: true
  },
  {
    id: 3,
    name: "Python cho Data Science",
    category: "Data Science",
    price: 699000,
    originalPrice: 999000,
    rating: 4.7,
    students: "5,680",
    duration: "35 giờ",
    instructor: "Lê Văn Cường",
    images: [
      "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=250&fit=crop", // Python code
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop", // Data charts
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=400&h=250&fit=crop", // Data analysis
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop"  // Analytics
    ],
    image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=250&fit=crop",
    shortDesc: "Phân tích dữ liệu và machine learning với Python",
    level: "Trung cấp",
    language: "Tiếng Việt",
    certificate: true
  },
  {
    id: 4,
    name: "Digital Marketing Toàn Diện",
    category: "Marketing",
    price: 499000,
    originalPrice: 799000,
    rating: 4.6,
    students: "15,230",
    duration: "30 giờ",
    instructor: "Phạm Thị Dung",
    images: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop", // Marketing charts
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=250&fit=crop", // Digital marketing
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop", // Social media
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=250&fit=crop"  // Marketing team
    ],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop",
    shortDesc: "Chiến lược marketing số từ A-Z",
    level: "Cơ bản",
    language: "Tiếng Việt",
    certificate: true
  },
  {
    id: 5,
    name: "UI/UX Design Masterclass",
    category: "Thiết kế",
    price: 899000,
    originalPrice: 1299000,
    rating: 4.9,
    students: "7,890",
    duration: "45 giờ",
    instructor: "Hoàng Minh Tuấn",
    images: [
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop", // UI/UX design
      "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400&h=250&fit=crop", // Design process
      "https://images.unsplash.com/photo-1509395176047-4a66953fd231?w=400&h=250&fit=crop", // Wireframes
      "https://images.unsplash.com/photo-1558655146-d09347e92766?w=400&h=250&fit=crop"  // Design tools
    ],
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop",
    shortDesc: "Thiết kế giao diện và trải nghiệm người dùng chuyên nghiệp",
    level: "Trung cấp",
    language: "Tiếng Việt",
    certificate: true
  },
  {
    id: 6,
    name: "IELTS 7.0+ Chinh Phục",
    category: "Ngoại ngữ",
    price: 399000,
    originalPrice: 599000,
    rating: 4.8,
    students: "22,100",
    duration: "60 giờ",
    instructor: "Sarah Johnson",
    images: [
      "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=250&fit=crop", // English books
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=250&fit=crop", // Study materials
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop", // IELTS test
      "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=250&fit=crop"  // Language learning
    ],
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=250&fit=crop",
    shortDesc: "Đạt IELTS 7.0+ với phương pháp học hiệu quả",
    level: "Trung cấp",
    language: "Tiếng Anh",
    certificate: true
  },
  {
    id: 7,
    name: "Node.js Backend Development",
    category: "Lập trình",
    price: 749000,
    originalPrice: 1099000,
    rating: 4.8,
    students: "6,540",
    duration: "42 giờ",
    instructor: "Võ Minh Hoàng",
    images: [
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop", // Server/Backend
      "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&h=250&fit=crop", // Node.js
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=250&fit=crop", // API development
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400&h=250&fit=crop"  // Backend code
    ],
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop",
    shortDesc: "Xây dựng API và backend scalable với Node.js và Express",
    level: "Nâng cao",
    language: "Tiếng Việt",
    certificate: true
  },
  {
    id: 8,
    name: "Vue.js 3 Composition API",
    category: "Lập trình",
    price: 679000,
    originalPrice: 999000,
    rating: 4.7,
    students: "4,320",
    duration: "38 giờ",
    instructor: "Đặng Thị Lan",
    images: [
      "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=400&h=250&fit=crop", // Vue.js
      "https://images.unsplash.com/photo-1607706189992-eae578626c86?w=400&h=250&fit=crop", // Vue development
      "https://images.unsplash.com/photo-1484417894907-623942c8ee29?w=400&h=250&fit=crop", // Frontend dev
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=250&fit=crop"  // JavaScript frameworks
    ],
    image: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=400&h=250&fit=crop",
    shortDesc: "Học Vue.js 3 từ cơ bản đến nâng cao với Composition API",
    level: "Trung cấp",
    language: "Tiếng Việt",
    certificate: true
  },
  {
    id: 9,
    name: "Flutter Mobile Development",
    category: "Lập trình",
    price: 899000,
    originalPrice: 1399000,
    rating: 4.9,
    students: "3,780",
    duration: "55 giờ",
    instructor: "Nguyễn Đức Thắng",
    images: [
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=250&fit=crop", // Mobile app
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=250&fit=crop", // Flutter dev
      "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=400&h=250&fit=crop", // Mobile development
      "https://images.unsplash.com/photo-1574169208507-84376144848b?w=400&h=250&fit=crop"  // App development
    ],
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=250&fit=crop",
    shortDesc: "Phát triển ứng dụng mobile đa nền tảng với Flutter",
    level: "Nâng cao",
    language: "Tiếng Việt",
    certificate: true
  },
  {
    id: 10,
    name: "Angular Full Course",
    category: "Lập trình",
    price: 799000,
    originalPrice: 1199000,
    rating: 4.6,
    students: "5,210",
    duration: "48 giờ",
    instructor: "Lê Quang Minh",
    images: [
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=250&fit=crop", // Angular code
      "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?w=400&h=250&fit=crop", // Angular dev
      "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=400&h=250&fit=crop", // TypeScript
      "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=400&h=250&fit=crop"  // Web framework
    ],
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=250&fit=crop",
    shortDesc: "Xây dựng ứng dụng web enterprise với Angular",
    level: "Nâng cao",
    language: "Tiếng Việt",
    certificate: true
  },

  // ========== DATA SCIENCE & AI ==========
  {
    id: 11,
    name: "Machine Learning với TensorFlow",
    category: "Data Science",
    price: 999000,
    originalPrice: 1499000,
    rating: 4.9,
    students: "2,890",
    duration: "65 giờ",
    instructor: "Dr. Phạm Văn Khoa",
    images: [
      "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=400&h=250&fit=crop", // AI/ML
      "https://images.unsplash.com/photo-1507146426996-ef05306b995a?w=400&h=250&fit=crop", // Neural network
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=250&fit=crop", // AI robot
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=250&fit=crop"  // Machine learning
    ],
    image: "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=400&h=250&fit=crop",
    shortDesc: "Deep Learning và Neural Networks với TensorFlow 2.0",
    level: "Nâng cao",
    language: "Tiếng Việt",
    certificate: true
  },
  {
    id: 12,
    name: "Data Analysis với R",
    category: "Data Science",
    price: 599000,
    originalPrice: 899000,
    rating: 4.5,
    students: "3,450",
    duration: "32 giờ",
    instructor: "Trần Minh Đức",
    images: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop", // Data charts
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=400&h=250&fit=crop", // Data visualization
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop", // Analytics dashboard
      "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&h=250&fit=crop"  // Statistical analysis
    ],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
    shortDesc: "Phân tích dữ liệu thống kê và visualization với R",
    level: "Trung cấp",
    language: "Tiếng Việt",
    certificate: true
  },
  {
    id: 13,
    name: "SQL for Data Analysis",
    category: "Data Science",
    price: 449000,
    originalPrice: 699000,
    rating: 4.7,
    students: "8,760",
    duration: "28 giờ",
    instructor: "Nguyễn Thị Hồng",
    images: [
      "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400&h=250&fit=crop", // Database
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop", // SQL server
      "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=400&h=250&fit=crop", // Data warehouse
      "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=400&h=250&fit=crop"  // Database management
    ],
    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400&h=250&fit=crop",
    shortDesc: "Làm chủ SQL từ cơ bản đến nâng cao cho Data Analysis",
    level: "Cơ bản",
    language: "Tiếng Việt",
    certificate: true
  },

  // ========== DESIGN COURSES ==========
  {
    id: 14,
    name: "Photoshop CC Mastery",
    category: "Thiết kế",
    price: 549000,
    originalPrice: 799000,
    rating: 4.8,
    students: "11,200",
    duration: "35 giờ",
    instructor: "Lê Thị Mai",
    images: [
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&h=250&fit=crop", // Photoshop
      "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=400&h=250&fit=crop", // Photo editing
      "https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=400&h=250&fit=crop", // Graphic design
      "https://images.unsplash.com/photo-1558655146-d09347e92766?w=400&h=250&fit=crop"  // Design workspace
    ],
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&h=250&fit=crop",
    shortDesc: "Làm chủ Photoshop từ cơ bản đến chuyên nghiệp",
    level: "Tất cả cấp độ",
    language: "Tiếng Việt",
    certificate: true
  },
  {
    id: 15,
    name: "Illustrator Vector Design",
    category: "Thiết kế",
    price: 649000,
    originalPrice: 949000,
    rating: 4.6,
    students: "6,890",
    duration: "30 giờ",
    instructor: "Phạm Văn Tú",
    images: [
      "https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=400&h=250&fit=crop", // Vector design
      "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400&h=250&fit=crop", // Illustrator
      "https://images.unsplash.com/photo-1558655146-9f40138ecc05?w=400&h=250&fit=crop", // Logo design
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=250&fit=crop"  // Creative design
    ],
    image: "https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=400&h=250&fit=crop",
    shortDesc: "Thiết kế vector chuyên nghiệp với Adobe Illustrator",
    level: "Trung cấp",
    language: "Tiếng Việt",
    certificate: true
  },

  // ========== MARKETING COURSES ==========
  {
    id: 16,
    name: "Facebook Ads Mastery",
    category: "Marketing",
    price: 399000,
    originalPrice: 599000,
    rating: 4.7,
    students: "9,450",
    duration: "25 giờ",
    instructor: "Đinh Văn Nam",
    images: [
      "https://images.unsplash.com/photo-1611262588024-d12430b98920?w=400&h=250&fit=crop", // Facebook ads
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop", // Social media marketing
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=250&fit=crop", // Digital advertising
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop"  // Marketing analytics
    ],
    image: "https://images.unsplash.com/photo-1611262588024-d12430b98920?w=400&h=250&fit=crop",
    shortDesc: "Chạy quảng cáo Facebook hiệu quả và tối ưu ROI",
    level: "Trung cấp",
    language: "Tiếng Việt",
    certificate: true
  },
  {
    id: 17,
    name: "Google Ads Expert",
    category: "Marketing",
    price: 499000,
    originalPrice: 749000,
    rating: 4.8,
    students: "7,320",
    duration: "30 giờ",
    instructor: "Vũ Thị Linh",
    images: [
      "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=400&h=250&fit=crop", // Google ads
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=250&fit=crop", // Google Ads code
      "https://images.unsplash.com/photo-1581276879432-15e50529f34b?w=400&h=250&fit=crop", // PPC marketing
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=250&fit=crop"  // Online advertising
    ],
    image: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=400&h=250&fit=crop",
    shortDesc: "Quảng cáo Google Ads từ Search đến Display và Shopping",
    level: "Trung cấp",
    language: "Tiếng Việt",
    certificate: true
  },

  // ========== LANGUAGE COURSES ==========
  {
    id: 18,
    name: "HSK Chinese Mastery",
    category: "Ngoại ngữ",
    price: 599000,
    originalPrice: 899000,
    rating: 4.6,
    students: "4,560",
    duration: "50 giờ",
    instructor: "李小红 (Li Xiaohong)",
    images: [
      "https://images.unsplash.com/photo-1528716321680-815a8cdb8cbe?w=400&h=250&fit=crop", // Chinese books
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop", // Chinese characters
      "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?w=400&h=250&fit=crop", // Language learning
      "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=400&h=250&fit=crop"  // Chinese culture
    ],
    image: "https://images.unsplash.com/photo-1528716321680-815a8cdb8cbe?w=400&h=250&fit=crop",
    shortDesc: "Học tiếng Trung HSK 1-6 với giáo viên bản ngữ",
    level: "Tất cả cấp độ",
    language: "Tiếng Trung",
    certificate: true
  },
  {
    id: 19,
    name: "Japanese N5-N3 Complete",
    category: "Ngoại ngữ",
    price: 699000,
    originalPrice: 999000,
    rating: 4.8,
    students: "8,190",
    duration: "60 giờ",
    instructor: "田中先生 (Tanaka Sensei)",
    images: [
      "https://images.unsplash.com/photo-1528164344705-47542687000d?w=400&h=250&fit=crop", // Japanese books
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop", // Hiragana and Katakana
      "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?w=400&h=250&fit=crop", // Kanji learning
      "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=400&h=250&fit=crop"  // Japanese culture
    ],
    image: "https://images.unsplash.com/photo-1528164344705-47542687000d?w=400&h=250&fit=crop",
    shortDesc: "Tiếng Nhật từ N5 đến N3 với phương pháp tương tác",
    level: "Tất cả cấp độ",
    language: "Tiếng Nhật",
    certificate: true
  },

  // ========== BUSINESS COURSES ==========
  {
    id: 20,
    name: "Excel Advanced Formulas",
    category: "Kinh doanh",
    price: 299000,
    originalPrice: 499000,
    rating: 4.7,
    students: "15,670",
    duration: "20 giờ",
    instructor: "Hoàng Văn Đông",
    images: [
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=250&fit=crop", // Excel spreadsheet
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=250&fit=crop", // Excel formulas
      "https://images.unsplash.com/photo-1581276879432-15e50529f34b?w=400&h=250&fit=crop", // Data analysis
      "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=400&h=250&fit=crop"  // Business analytics
    ],
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=250&fit=crop",
    shortDesc: "Làm chủ Excel với formulas nâng cao và Dashboard",
    level: "Trung cấp",
    language: "Tiếng Việt",
    certificate: true
  },
  {
    id: 21,
    name: "Project Management PMP",
    category: "Kinh doanh",
    price: 799000,
    originalPrice: 1199000,
    rating: 4.8,
    students: "3,240",
    duration: "40 giờ",
    instructor: "MBA Trần Quốc Việt",
    images: [
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=250&fit=crop", // Project management
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=250&fit=crop", // PMP exam
      "https://images.unsplash.com/photo-1581276879432-15e50529f34b?w=400&h=250&fit=crop", // Agile methodology
      "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=400&h=250&fit=crop"  // Project planning
    ],
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=250&fit=crop",
    shortDesc: "Chuẩn bị chứng chỉ PMP và kỹ năng quản lý dự án",
    level: "Nâng cao",
    language: "Tiếng Việt",
    certificate: true
  },

  // ========== LIFESTYLE COURSES ==========
  {
    id: 22,
    name: "Photography Masterclass",
    category: "Sáng tạo",
    price: 549000,
    originalPrice: 799000,
    rating: 4.9,
    students: "6,780",
    duration: "35 giờ",
    instructor: "Nguyễn Hoàng Long",
    images: [
      "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=250&fit=crop", // Photography camera
      "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=400&h=250&fit=crop", // Photo composition
      "https://images.unsplash.com/photo-1558655146-d09347e92766?w=400&h=250&fit=crop", // Lightroom editing
      "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=250&fit=crop"  // Photography tips
    ],
    image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=250&fit=crop",
    shortDesc: "Chụp ảnh chuyên nghiệp từ cơ bản đến nâng cao",
    level: "Tất cả cấp độ",
    language: "Tiếng Việt",
    certificate: true
  },
  {
    id: 23,
    name: "Guitar Acoustic từ Zero",
    category: "Âm nhạc",
    price: 399000,
    originalPrice: 599000,
    rating: 4.6,
    students: "9,340",
    duration: "30 giờ",
    instructor: "Musician Hải Anh",
    images: [
      "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=400&h=250&fit=crop", // Acoustic guitar
      "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=400&h=250&fit=crop", // Guitar chords
      "https://images.unsplash.com/photo-1558655146-d09347e92766?w=400&h=250&fit=crop", // Strumming patterns
      "https://images.unsplash.com/photo-1572945378234-6a4f3e4f3e4b?w=400&h=250&fit=crop"  // Music theory
    ],
    image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=400&h=250&fit=crop",
    shortDesc: "Học guitar acoustic từ zero đến có thể tự đệm hát",
    level: "Cơ bản",
    language: "Tiếng Việt",
    certificate: true
  },

  // ========== HEALTH & FITNESS ==========
  {
    id: 24,
    name: "Yoga for Beginners",
    category: "Sức khỏe",
    price: 299000,
    originalPrice: 499000,
    rating: 4.8,
    students: "12,450",
    duration: "25 giờ",
    instructor: "Lê Thị Hương",
    images: [
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=250&fit=crop", // Yoga pose
      "https://images.unsplash.com/photo-1581276879432-15e50529f34b?w=400&h=250&fit=crop", // Meditation
      "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=400&h=250&fit=crop", // Yoga class
      "https://images.unsplash.com/photo-1574169208507-84376144848b?w=400&h=250&fit=crop"  // Wellness
    ],
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=250&fit=crop",
    shortDesc: "Yoga cơ bản cho người mới bắt đầu, cải thiện sức khỏe",
    level: "Cơ bản",
    language: "Tiếng Việt",
    certificate: true
  },
  {
    id: 25,
    name: "Home Workout Complete",
    category: "Sức khỏe",
    price: 199000,
    originalPrice: 399000,
    rating: 4.5,
    students: "18,230",
    duration: "20 giờ",
    instructor: "PT Minh Tuấn",
    images: [
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop", // Home workout
      "https://images.unsplash.com/photo-1581276879432-15e50529f34b?w=400&h=250&fit=crop", // Bodyweight exercises
      "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=400&h=250&fit=crop", // Fitness at home
      "https://images.unsplash.com/photo-1574169208507-84376144848b?w=400&h=250&fit=crop"  // Healthy lifestyle
    ],
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop",
    shortDesc: "Tập luyện tại nhà hiệu quả không cần dụng cụ",
    level: "Tất cả cấp độ",
    language: "Tiếng Việt",
    certificate: true
  },

  // ========== TECHNOLOGY TRENDS ==========
  {
    id: 26,
    name: "Blockchain & Cryptocurrency",
    category: "Công nghệ",
    price: 899000,
    originalPrice: 1299000,
    rating: 4.4,
    students: "2,890",
    duration: "40 giờ",
    instructor: "Blockchain Expert Tuấn",
    images: [
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=250&fit=crop", // Blockchain
      "https://images.unsplash.com/photo-1581276879432-15e50529f34b?w=400&h=250&fit=crop", // Bitcoin
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=250&fit=crop", // Ethereum
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=250&fit=crop"  // DeFi
    ],
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=250&fit=crop",
    shortDesc: "Hiểu về Blockchain, Bitcoin, Ethereum và DeFi",
    level: "Trung cấp",
    language: "Tiếng Việt",
    certificate: true
  },
  {
    id: 27,
    name: "Cloud Computing AWS",
    category: "Công nghệ",
    price: 999000,
    originalPrice: 1499000,
    rating: 4.7,
    students: "4,120",
    duration: "50 giờ",
    instructor: "AWS Solutions Architect Hùng",
    images: [
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=250&fit=crop", // Cloud computing
      "https://images.unsplash.com/photo-1581276879432-15e50529f34b?w=400&h=250&fit=crop", // AWS services
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=250&fit=crop", // Cloud architecture
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=250&fit=crop"  // DevOps
    ],
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=250&fit=crop",
    shortDesc: "Làm chủ Amazon Web Services từ cơ bản đến nâng cao",
    level: "Trung cấp",
    language: "Tiếng Việt",
    certificate: true
  },

  // ========== ADDITIONAL SPECIALIZED COURSES ==========
  {
    id: 28,
    name: "Game Development với Unity",
    category: "Lập trình",
    price: 799000,
    originalPrice: 1199000,
    rating: 4.6,
    students: "3,560",
    duration: "45 giờ",
    instructor: "Game Dev Phong",
    images: [
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=250&fit=crop", // Game development
      "https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=400&h=250&fit=crop", // Unity engine
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=250&fit=crop", // C# programming
      "https://images.unsplash.com/photo-1574169208507-84376144848b?w=400&h=250&fit=crop"  // Game design
    ],
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=250&fit=crop",
    shortDesc: "Tạo game 2D và 3D chuyên nghiệp với Unity Engine",
    level: "Trung cấp",
    language: "Tiếng Việt",
    certificate: true
  },
  {
    id: 29,
    name: "Copywriting & Content Marketing",
    category: "Marketing",
    price: 449000,
    originalPrice: 699000,
    rating: 4.8,
    students: "7,890",
    duration: "25 giờ",
    instructor: "Content Marketer Hà",
    images: [
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=250&fit=crop", // Writing
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=250&fit=crop", // Content strategy
      "https://images.unsplash.com/photo-1581276879432-15e50529f34b?w=400&h=250&fit=crop", // SEO writing
      "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=400&h=250&fit=crop"  // Brand storytelling
    ],
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=250&fit=crop",
    shortDesc: "Viết content bán hàng và xây dựng thương hiệu",
    level: "Tất cả cấp độ",
    language: "Tiếng Việt",
    certificate: true
  },
  {
    id: 30,
    name: "Ethical Hacking & Cybersecurity",
    category: "Công nghệ",
    price: 1299000,
    originalPrice: 1899000,
    rating: 4.9,
    students: "1,890",
    duration: "60 giờ",
    instructor: "Security Expert Minh",
    images: [
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=250&fit=crop", // Cybersecurity
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=250&fit=crop", // Ethical hacking
      "https://images.unsplash.com/photo-1581276879432-15e50529f34b?w=400&h=250&fit=crop", // Network security
      "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=400&h=250&fit=crop"  // Web application security
    ],
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=250&fit=crop",
    shortDesc: "Bảo mật mạng và ethical hacking cho người mới bắt đầu",
    level: "Nâng cao",
    language: "Tiếng Việt",
    certificate: true
  }
];

console.log('📦 MockData loaded:', mockData.length, 'products');
console.log('📂 Categories:', [...new Set(mockData.map(item => item.category))]);
console.log('💰 Price range:', Math.min(...mockData.map(item => item.price)), 'VND -', Math.max(...mockData.map(item => item.price)), 'VND');

export default mockData;
