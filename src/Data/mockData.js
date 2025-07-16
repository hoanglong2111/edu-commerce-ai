const mockData = [
  // ========== EXISTING PRODUCTS ==========
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
    image: "/images/courses/javascript.jpg",
    shortDesc: "Học JavaScript từ căn bản đến nâng cao với các dự án thực tế",
    level: "Tất cả cấp độ",
    language: "Tiếng Việt",
    subtitle: true,
    certificate: true,
    features: [
      "40 giờ video on-demand",
      "15 bài tập coding",
      "5 dự án thực tế",
      "Truy cập trọn đời",
      "Certificate hoàn thành"
    ],
    curriculum: [
      {
        title: "Giới thiệu JavaScript",
        lessons: ["Cài đặt môi trường", "Biến và kiểu dữ liệu", "Toán tử"]
      },
      {
        title: "Functions và Objects",
        lessons: ["Function cơ bản", "Arrow function", "Object literal"]
      }
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
    image: "/images/courses/react.jpg",
    shortDesc: "Xây dựng ứng dụng web hiện đại với React.js",
    level: "Trung cấp",
    language: "Tiếng Việt",
    subtitle: true,
    certificate: true,
    features: [
      "50 giờ video chất lượng cao",
      "10 dự án React",
      "State Management với Redux",
      "Deploy lên production",
      "Support 1-1"
    ],
    curriculum: [
      {
        title: "React Fundamentals",
        lessons: ["Components", "Props", "State", "Events"]
      },
      {
        title: "Advanced React",
        lessons: ["Hooks", "Context API", "Performance"]
      }
    ]
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
    image: "/images/courses/python-ds.jpg",
    shortDesc: "Phân tích dữ liệu và machine learning với Python",
    level: "Trung cấp",
    language: "Tiếng Việt",
    subtitle: true,
    certificate: true,
    features: [
      "35 giờ học Python DS",
      "Pandas, NumPy, Matplotlib",
      "Machine Learning cơ bản",
      "3 dự án thực tế",
      "Dataset thực tế"
    ],
    curriculum: [
      {
        title: "Python Basics for DS",
        lessons: ["NumPy", "Pandas", "Matplotlib"]
      },
      {
        title: "Machine Learning",
        lessons: ["Linear Regression", "Classification", "Clustering"]
      }
    ]
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
    image: "/images/courses/digital-marketing.jpg",
    shortDesc: "Chiến lược marketing số từ A-Z",
    level: "Tất cả cấp độ",
    language: "Tiếng Việt",
    subtitle: true,
    certificate: true,
    features: [
      "30 giờ video marketing",
      "Facebook & Google Ads",
      "SEO & Content Marketing",
      "Analytics & Tracking",
      "Case study thực tế"
    ],
    curriculum: [
      {
        title: "Marketing Foundation",
        lessons: ["Chiến lược", "Targeting", "Positioning"]
      },
      {
        title: "Paid Advertising",
        lessons: ["Facebook Ads", "Google Ads", "Analytics"]
      }
    ]
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
    image: "/images/courses/uiux.jpg",
    shortDesc: "Thiết kế giao diện và trải nghiệm người dùng chuyên nghiệp",
    level: "Tất cả cấp độ",
    language: "Tiếng Việt",
    subtitle: true,
    certificate: true,
    features: [
      "45 giờ thiết kế UI/UX",
      "Figma & Adobe XD",
      "Design System",
      "User Research",
      "Portfolio projects"
    ],
    curriculum: [
      {
        title: "UI Design",
        lessons: ["Typography", "Color Theory", "Layout", "Icons"]
      },
      {
        title: "UX Design",
        lessons: ["User Research", "Wireframing", "Prototyping", "Testing"]
      }
    ]
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
    image: "/images/courses/ielts.jpg",
    shortDesc: "Đạt IELTS 7.0+ với phương pháp học hiệu quả",
    level: "Trung cấp",
    language: "Tiếng Anh",
    subtitle: true,
    certificate: true,
    features: [
      "60 giờ luyện thi IELTS",
      "4 kỹ năng Reading/Writing/Listening/Speaking",
      "Mock tests hàng tuần",
      "Feedback chi tiết",
      "Cam kết 7.0+"
    ],
    curriculum: [
      {
        title: "IELTS Reading",
        lessons: ["Skimming & Scanning", "Question Types", "Time Management"]
      },
      {
        title: "IELTS Writing",
        lessons: ["Task 1 & 2", "Structure", "Vocabulary", "Grammar"]
      },
      {
        title: "IELTS Listening",
        lessons: ["Note-taking", "Prediction", "Different Accents"]
      },
      {
        title: "IELTS Speaking",
        lessons: ["Part 1,2,3", "Fluency", "Pronunciation", "Confidence"]
      }
    ]
  },

  // ========== NEW PROGRAMMING COURSES ==========
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
    image: "/images/courses/nodejs.jpg",
    shortDesc: "Xây dựng API và backend scalable với Node.js và Express",
    level: "Trung cấp",
    language: "Tiếng Việt",
    subtitle: true,
    certificate: true,
    features: [
      "42 giờ Node.js chuyên sâu",
      "REST API & GraphQL",
      "Database với MongoDB",
      "Authentication & Security",
      "Deploy với Docker"
    ],
    curriculum: [
      {
        title: "Node.js Fundamentals",
        lessons: ["Event Loop", "Modules", "NPM", "File System"]
      },
      {
        title: "Express Framework",
        lessons: ["Routing", "Middleware", "Error Handling", "Security"]
      }
    ]
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
    image: "/images/courses/vuejs.jpg",
    shortDesc: "Học Vue.js 3 từ cơ bản đến nâng cao với Composition API",
    level: "Trung cấp",
    language: "Tiếng Việt",
    subtitle: true,
    certificate: true,
    features: [
      "38 giờ Vue.js 3",
      "Composition API",
      "Vuex 4 & Pinia",
      "Vue Router",
      "TypeScript integration"
    ],
    curriculum: [
      {
        title: "Vue 3 Basics",
        lessons: ["Reactivity", "Components", "Directives", "Events"]
      },
      {
        title: "Advanced Vue",
        lessons: ["Composition API", "Vuex", "Router", "Performance"]
      }
    ]
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
    image: "/images/courses/flutter.jpg",
    shortDesc: "Phát triển ứng dụng mobile đa nền tảng với Flutter",
    level: "Trung cấp",
    language: "Tiếng Việt",
    subtitle: true,
    certificate: true,
    features: [
      "55 giờ Flutter development",
      "Dart programming",
      "State Management (Bloc, Provider)",
      "Firebase integration",
      "Publish to App Store & Play Store"
    ],
    curriculum: [
      {
        title: "Dart Language",
        lessons: ["Syntax", "OOP", "Async Programming", "Collections"]
      },
      {
        title: "Flutter Widgets",
        lessons: ["Stateless/Stateful", "Layout", "Navigation", "Animation"]
      }
    ]
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
    image: "/images/courses/angular.jpg",
    shortDesc: "Xây dựng ứng dụng web enterprise với Angular",
    level: "Nâng cao",
    language: "Tiếng Việt",
    subtitle: true,
    certificate: true,
    features: [
      "48 giờ Angular training",
      "TypeScript mastery",
      "RxJS & Observables",
      "Testing với Jasmine",
      "Enterprise patterns"
    ],
    curriculum: [
      {
        title: "Angular Fundamentals",
        lessons: ["Components", "Services", "Dependency Injection", "Routing"]
      },
      {
        title: "Advanced Angular",
        lessons: ["RxJS", "State Management", "Testing", "Performance"]
      }
    ]
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
    image: "/images/courses/tensorflow.jpg",
    shortDesc: "Deep Learning và Neural Networks với TensorFlow 2.0",
    level: "Nâng cao",
    language: "Tiếng Việt",
    subtitle: true,
    certificate: true,
    features: [
      "65 giờ ML chuyên sâu",
      "TensorFlow 2.0 & Keras",
      "CNN, RNN, LSTM",
      "Computer Vision",
      "NLP Projects"
    ],
    curriculum: [
      {
        title: "ML Fundamentals",
        lessons: ["Supervised Learning", "Unsupervised Learning", "Neural Networks"]
      },
      {
        title: "Deep Learning",
        lessons: ["CNN", "RNN", "GAN", "Transfer Learning"]
      }
    ]
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
    image: "/images/courses/r-programming.jpg",
    shortDesc: "Phân tích dữ liệu thống kê và visualization với R",
    level: "Trung cấp",
    language: "Tiếng Việt",
    subtitle: true,
    certificate: true,
    features: [
      "32 giờ R programming",
      "ggplot2 visualization",
      "Statistical analysis",
      "Tidyverse ecosystem",
      "Shiny applications"
    ],
    curriculum: [
      {
        title: "R Basics",
        lessons: ["Data Types", "Functions", "Packages", "Import/Export"]
      },
      {
        title: "Data Analysis",
        lessons: ["dplyr", "ggplot2", "Statistical Tests", "Modeling"]
      }
    ]
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
    image: "/images/courses/sql.jpg",
    shortDesc: "Làm chủ SQL từ cơ bản đến nâng cao cho Data Analysis",
    level: "Tất cả cấp độ",
    language: "Tiếng Việt",
    subtitle: true,
    certificate: true,
    features: [
      "28 giờ SQL training",
      "PostgreSQL & MySQL",
      "Advanced queries",
      "Window functions",
      "Database optimization"
    ],
    curriculum: [
      {
        title: "SQL Fundamentals",
        lessons: ["SELECT", "WHERE", "JOIN", "GROUP BY"]
      },
      {
        title: "Advanced SQL",
        lessons: ["Window Functions", "CTEs", "Stored Procedures", "Performance"]
      }
    ]
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
    image: "/images/courses/photoshop.jpg",
    shortDesc: "Làm chủ Photoshop từ cơ bản đến chuyên nghiệp",
    level: "Tất cả cấp độ",
    language: "Tiếng Việt",
    subtitle: true,
    certificate: true,
    features: [
      "35 giờ Photoshop training",
      "Photo retouching",
      "Digital art creation",
      "Print design",
      "Portfolio projects"
    ],
    curriculum: [
      {
        title: "Photoshop Basics",
        lessons: ["Interface", "Tools", "Layers", "Selections"]
      },
      {
        title: "Advanced Techniques",
        lessons: ["Masking", "Compositing", "Color Grading", "Typography"]
      }
    ]
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
    image: "/images/courses/illustrator.jpg",
    shortDesc: "Thiết kế vector chuyên nghiệp với Adobe Illustrator",
    level: "Trung cấp",
    language: "Tiếng Việt",
    subtitle: true,
    certificate: true,
    features: [
      "30 giờ Illustrator",
      "Logo design",
      "Icon creation",
      "Typography",
      "Brand identity"
    ],
    curriculum: [
      {
        title: "Vector Basics",
        lessons: ["Pen Tool", "Shapes", "Pathfinder", "Colors"]
      },
      {
        title: "Logo Design",
        lessons: ["Concept", "Sketching", "Refinement", "Brand Guidelines"]
      }
    ]
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
    image: "/images/courses/facebook-ads.jpg",
    shortDesc: "Chạy quảng cáo Facebook hiệu quả và tối ưu ROI",
    level: "Trung cấp",
    language: "Tiếng Việt",
    subtitle: true,
    certificate: true,
    features: [
      "25 giờ Facebook Ads",
      "Campaign optimization",
      "Audience targeting",
      "Creative strategies",
      "ROI tracking"
    ],
    curriculum: [
      {
        title: "Facebook Ads Basics",
        lessons: ["Campaign Structure", "Targeting", "Budgeting", "Bidding"]
      },
      {
        title: "Advanced Strategies",
        lessons: ["Lookalike Audiences", "Retargeting", "A/B Testing", "Scaling"]
      }
    ]
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
    image: "/images/courses/google-ads.jpg",
    shortDesc: "Quảng cáo Google Ads từ Search đến Display và Shopping",
    level: "Trung cấp",
    language: "Tiếng Việt",
    subtitle: true,
    certificate: true,
    features: [
      "30 giờ Google Ads",
      "Search & Display campaigns",
      "Shopping ads",
      "YouTube advertising",
      "Google Analytics integration"
    ],
    curriculum: [
      {
        title: "Search Campaigns",
        lessons: ["Keyword Research", "Ad Copy", "Landing Pages", "Quality Score"]
      },
      {
        title: "Advanced Campaigns",
        lessons: ["Display", "Shopping", "YouTube", "App Campaigns"]
      }
    ]
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
    image: "/images/courses/chinese-hsk.jpg",
    shortDesc: "Học tiếng Trung HSK 1-6 với giáo viên bản ngữ",
    level: "Tất cả cấp độ",
    language: "Tiếng Trung",
    subtitle: true,
    certificate: true,
    features: [
      "50 giờ học tiếng Trung",
      "HSK 1-6 curriculum",
      "Pinyin & Characters",
      "Speaking practice",
      "Cultural insights"
    ],
    curriculum: [
      {
        title: "HSK 1-2 Basics",
        lessons: ["Pinyin", "Basic Characters", "Greetings", "Numbers"]
      },
      {
        title: "HSK 3-4 Intermediate",
        lessons: ["Grammar Patterns", "Conversation", "Reading", "Writing"]
      }
    ]
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
    image: "/images/courses/japanese.jpg",
    shortDesc: "Tiếng Nhật từ N5 đến N3 với phương pháp tương tác",
    level: "Tất cả cấp độ",
    language: "Tiếng Nhật",
    subtitle: true,
    certificate: true,
    features: [
      "60 giờ tiếng Nhật",
      "Hiragana, Katakana, Kanji",
      "JLPT N5-N3 prep",
      "Speaking practice",
      "Japanese culture"
    ],
    curriculum: [
      {
        title: "Hiragana & Katakana",
        lessons: ["Writing Systems", "Pronunciation", "Basic Vocabulary"]
      },
      {
        title: "Grammar & Kanji",
        lessons: ["Particles", "Verb Forms", "Kanji Reading", "Conversation"]
      }
    ]
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
    image: "/images/courses/excel.jpg",
    shortDesc: "Làm chủ Excel với formulas nâng cao và Dashboard",
    level: "Trung cấp",
    language: "Tiếng Việt",
    subtitle: true,
    certificate: true,
    features: [
      "20 giờ Excel mastery",
      "Advanced formulas",
      "Pivot Tables",
      "VBA basics",
      "Dashboard creation"
    ],
    curriculum: [
      {
        title: "Advanced Formulas",
        lessons: ["VLOOKUP", "INDEX-MATCH", "Array Formulas", "Conditional Logic"]
      },
      {
        title: "Data Analysis",
        lessons: ["Pivot Tables", "Charts", "Dashboard", "VBA Macros"]
      }
    ]
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
    image: "/images/courses/pmp.jpg",
    shortDesc: "Chuẩn bị chứng chỉ PMP và kỹ năng quản lý dự án",
    level: "Nâng cao",
    language: "Tiếng Việt",
    subtitle: true,
    certificate: true,
    features: [
      "40 giờ PMP prep",
      "PMBOK Guide 7th edition",
      "Agile methodologies",
      "Practice exams",
      "Real-world scenarios"
    ],
    curriculum: [
      {
        title: "Project Management Fundamentals",
        lessons: ["Project Lifecycle", "Stakeholders", "Charter", "Planning"]
      },
      {
        title: "Execution & Control",
        lessons: ["Risk Management", "Quality", "Communication", "Agile"]
      }
    ]
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
    image: "/images/courses/photography.jpg",
    shortDesc: "Chụp ảnh chuyên nghiệp từ cơ bản đến nâng cao",
    level: "Tất cả cấp độ",
    language: "Tiếng Việt",
    subtitle: true,
    certificate: true,
    features: [
      "35 giờ photography",
      "Camera techniques",
      "Composition rules",
      "Lightroom editing",
      "Portfolio building"
    ],
    curriculum: [
      {
        title: "Camera Basics",
        lessons: ["Exposure Triangle", "Focus", "Composition", "Lighting"]
      },
      {
        title: "Advanced Photography",
        lessons: ["Portrait", "Landscape", "Street", "Post-processing"]
      }
    ]
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
    image: "/images/courses/guitar.jpg",
    shortDesc: "Học guitar acoustic từ zero đến có thể tự đệm hát",
    level: "Cơ bản",
    language: "Tiếng Việt",
    subtitle: true,
    certificate: true,
    features: [
      "30 giờ guitar lessons",
      "Chord progressions",
      "Strumming patterns",
      "Fingerpicking",
      "Popular songs"
    ],
    curriculum: [
      {
        title: "Guitar Fundamentals",
        lessons: ["Holding Guitar", "Basic Chords", "Strumming", "Tuning"]
      },
      {
        title: "Playing Songs",
        lessons: ["Chord Changes", "Rhythm", "Fingerpicking", "Performance"]
      }
    ]
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
    image: "/images/courses/yoga.jpg",
    shortDesc: "Yoga cơ bản cho người mới bắt đầu, cải thiện sức khỏe",
    level: "Cơ bản",
    language: "Tiếng Việt",
    subtitle: true,
    certificate: true,
    features: [
      "25 giờ yoga practice",
      "Basic poses",
      "Breathing techniques",
      "Meditation",
      "Flexibility improvement"
    ],
    curriculum: [
      {
        title: "Yoga Basics",
        lessons: ["Breathing", "Basic Poses", "Sun Salutation", "Alignment"]
      },
      {
        title: "Intermediate Practice",
        lessons: ["Vinyasa Flow", "Balance Poses", "Backbends", "Meditation"]
      }
    ]
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
    image: "/images/courses/workout.jpg",
    shortDesc: "Tập luyện tại nhà hiệu quả không cần dụng cụ",
    level: "Tất cả cấp độ",
    language: "Tiếng Việt",
    subtitle: true,
    certificate: true,
    features: [
      "20 giờ workout",
      "No equipment needed",
      "Full body training",
      "Nutrition guide",
      "Progress tracking"
    ],
    curriculum: [
      {
        title: "Bodyweight Basics",
        lessons: ["Push-ups", "Squats", "Planks", "Cardio"]
      },
      {
        title: "Advanced Training",
        lessons: ["HIIT", "Strength", "Flexibility", "Recovery"]
      }
    ]
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
    image: "/images/courses/blockchain.jpg",
    shortDesc: "Hiểu về Blockchain, Bitcoin, Ethereum và DeFi",
    level: "Trung cấp",
    language: "Tiếng Việt",
    subtitle: true,
    certificate: true,
    features: [
      "40 giờ blockchain",
      "Cryptocurrency trading",
      "Smart contracts",
      "DeFi protocols",
      "NFT marketplace"
    ],
    curriculum: [
      {
        title: "Blockchain Fundamentals",
        lessons: ["What is Blockchain", "Bitcoin", "Ethereum", "Mining"]
      },
      {
        title: "Advanced Topics",
        lessons: ["Smart Contracts", "DeFi", "NFTs", "Trading Strategies"]
      }
    ]
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
    image: "/images/courses/aws.jpg",
    shortDesc: "Làm chủ Amazon Web Services từ cơ bản đến nâng cao",
    level: "Trung cấp",
    language: "Tiếng Việt",
    subtitle: true,
    certificate: true,
    features: [
      "50 giờ AWS training",
      "EC2, S3, RDS, Lambda",
      "Solutions Architect prep",
      "Hands-on labs",
      "Real-world projects"
    ],
    curriculum: [
      {
        title: "AWS Fundamentals",
        lessons: ["IAM", "EC2", "S3", "VPC"]
      },
      {
        title: "Advanced Services",
        lessons: ["Lambda", "RDS", "CloudFormation", "Monitoring"]
      }
    ]
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
    image: "/images/courses/unity.jpg",
    shortDesc: "Tạo game 2D và 3D chuyên nghiệp với Unity Engine",
    level: "Trung cấp",
    language: "Tiếng Việt",
    subtitle: true,
    certificate: true,
    features: [
      "45 giờ Unity development",
      "2D & 3D game creation",
      "C# programming",
      "Physics & Animation",
      "Publish to stores"
    ],
    curriculum: [
      {
        title: "Unity Basics",
        lessons: ["Interface", "GameObjects", "Scripts", "Physics"]
      },
      {
        title: "Game Development",
        lessons: ["Level Design", "UI/UX", "Audio", "Publishing"]
      }
    ]
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
    image: "/images/courses/copywriting.jpg",
    shortDesc: "Viết content bán hàng và xây dựng thương hiệu",
    level: "Tất cả cấp độ",
    language: "Tiếng Việt",
    subtitle: true,
    certificate: true,
    features: [
      "25 giờ copywriting",
      "Sales funnel writing",
      "Email marketing",
      "Social media content",
      "Brand storytelling"
    ],
    curriculum: [
      {
        title: "Copywriting Fundamentals",
        lessons: ["Headlines", "AIDA Formula", "Emotional Triggers", "CTA"]
      },
      {
        title: "Content Strategy",
        lessons: ["Content Calendar", "SEO Writing", "Social Media", "Email"]
      }
    ]
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
    image: "/images/courses/cybersecurity.jpg",
    shortDesc: "Bảo mật mạng và ethical hacking cho người mới bắt đầu",
    level: "Nâng cao",
    language: "Tiếng Việt",
    subtitle: true,
    certificate: true,
    features: [
      "60 giờ cybersecurity",
      "Penetration testing",
      "Network security",
      "Web application security",
      "CEH certification prep"
    ],
    curriculum: [
      {
        title: "Security Fundamentals",
        lessons: ["Security Principles", "Threat Landscape", "Risk Assessment"]
      },
      {
        title: "Ethical Hacking",
        lessons: ["Reconnaissance", "Scanning", "Exploitation", "Post-exploitation"]
      }
    ]
  }
];

console.log('📦 MockData loaded:', mockData.length, 'products');
console.log('📂 Categories:', [...new Set(mockData.map(item => item.category))]);
console.log('💰 Price range:', Math.min(...mockData.map(item => item.price)), 'VND -', Math.max(...mockData.map(item => item.price)), 'VND');

export default mockData;
