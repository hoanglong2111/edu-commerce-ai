import { useState, useRef, useEffect } from 'react';
import { Input, List, Drawer, Tooltip, FloatButton, Avatar, Typography, Space, Button } from 'antd';
import { MessageOutlined, SendOutlined, RobotOutlined, UserOutlined } from '@ant-design/icons';
import { useCart } from '../context/CartContext';
import data from '../Data/mockData';

const { Text } = Typography;

// Language Detection Function
const detectLanguage = (text) => {
  const vietnamesePattern = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i;
  const englishPattern = /^[a-zA-Z\s0-9.,!?'"()-]+$/;
  
  if (vietnamesePattern.test(text)) {
    return 'vi';
  } else if (englishPattern.test(text) && !vietnamesePattern.test(text)) {
    return 'en';
  }
  return 'vi'; // Default to Vietnamese
};

// AI Learning System
class ChatBotLearning {
  constructor() {
    this.userPreferences = JSON.parse(localStorage.getItem('chatbot_learning') || '{}');
    this.conversationHistory = [];
    this.userLanguage = 'vi';
    this.userInterests = [];
    this.responsePatterns = {};
  }

  // Học ngôn ngữ người dùng
  learnLanguage(userInput) {
    const detectedLang = detectLanguage(userInput);
    this.userLanguage = detectedLang;
    
    // Lưu preference
    this.userPreferences.language = detectedLang;
    this.savePreferences();
  }

  // Học sở thích người dùng
  learnInterests(input) {
    const interests = {
      'programming': ['lập trình', 'code', 'developer', 'javascript', 'python'],
      'english': ['tiếng anh', 'english', 'ielts', 'toefl'],
      'business': ['kinh doanh', 'marketing', 'business', 'bán hàng'],
      'design': ['thiết kế', 'design', 'photoshop', 'ui/ux'],
      'finance': ['tài chính', 'finance', 'kế toán', 'accounting']
    };

    Object.keys(interests).forEach(category => {
      if (interests[category].some(keyword => input.toLowerCase().includes(keyword))) {
        if (!this.userInterests.includes(category)) {
          this.userInterests.push(category);
          this.userPreferences.interests = this.userInterests;
          this.savePreferences();
        }
      }
    });
  }

  // Lưu lịch sử conversation
  saveConversation(userInput, botResponse) {
    this.conversationHistory.push({
      user: userInput,
      bot: botResponse,
      timestamp: Date.now(),
      language: this.userLanguage
    });

    // Giữ tối đa 50 conversation gần nhất
    if (this.conversationHistory.length > 50) {
      this.conversationHistory = this.conversationHistory.slice(-50);
    }
  }

  // Lưu preferences
  savePreferences() {
    localStorage.setItem('chatbot_learning', JSON.stringify(this.userPreferences));
  }

  // Phân tích context từ lịch sử
  getContext() {
    const recentConversations = this.conversationHistory.slice(-5);
    const topics = recentConversations.map(conv => this.extractTopics(conv.user)).flat();
    return [...new Set(topics)]; // Remove duplicates
  }

  // Trích xuất chủ đề
  extractTopics(text) {
    const topics = [];
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes('lập trình') || lowerText.includes('programming')) topics.push('programming');
    if (lowerText.includes('tiếng anh') || lowerText.includes('english')) topics.push('english');
    if (lowerText.includes('kinh doanh') || lowerText.includes('business')) topics.push('business');
    if (lowerText.includes('giá') || lowerText.includes('price')) topics.push('pricing');
    
    return topics;
  }
}

// Initialize learning system
const learningSystem = new ChatBotLearning();

// Enhanced multilingual responses
const getLocalizedResponse = (responseKey, language = 'vi', data = {}) => {
  const responses = {
    greeting: {
      vi: `👋 Xin chào! Tôi là AI Assistant của Edu-AI Commerce. Tôi có thể giúp bạn:

🎯 Tư vấn khóa học phù hợp
📚 Tìm kiếm theo chuyên ngành  
💰 Thông tin giá cả & khuyến mãi
🛒 Hỗ trợ mua hàng

Bạn đang quan tâm đến lĩnh vực nào?`,
      en: `👋 Hello! I'm the AI Assistant of Edu-AI Commerce. I can help you with:

🎯 Course recommendations
📚 Search by specialization
💰 Pricing & promotion information  
🛒 Shopping assistance

What field are you interested in?`
    },
    
    course_consultation: {
      vi: '🎯 Tôi có thể tư vấn khóa học theo nhiều lĩnh vực khác nhau. Bạn quan tâm đến:',
      en: '🎯 I can recommend courses in various fields. Are you interested in:'
    },
    
    programming_intro: {
      vi: `💻 Tuyệt vời! Công nghệ thông tin là lĩnh vực có triển vọng cao. Đây là các khóa học lập trình phổ biến:

🚀 Phù hợp cho cả người mới bắt đầu và chuyên nghiệp`,
      en: `💻 Excellent! Information technology is a promising field. Here are popular programming courses:

🚀 Suitable for both beginners and professionals`
    },
    
    english_intro: {
      vi: `🇬🇧 Lựa chọn tuyệt vời! Tiếng Anh rất quan trọng cho sự phát triển nghề nghiệp. Đây là các khóa học tiếng Anh hàng đầu của chúng tôi:

✨ Từ cơ bản đến nâng cao
🎯 Tập trung vào giao tiếp thực tế`,
      en: `🇬🇧 Excellent choice! English is essential for career growth. Here are our top English courses:

✨ From basic to advanced levels
🎯 Focused on practical communication`
    },
    
    empty_cart: {
      vi: `🛒 Giỏ hàng của bạn đang trống. Hãy khám phá các khóa học tuyệt vời:

✨ Tất cả khóa học đều có chứng chỉ
🎯 Học online linh hoạt  
👨‍🏫 Giảng viên chuyên nghiệp`,
      en: `🛒 Your cart is empty. Explore our amazing courses:

✨ All courses come with certificates
🎯 Flexible online learning
👨‍🏫 Professional instructors`
    },
    
    not_understand: {
      vi: `🤔 Tôi chưa hiểu rõ yêu cầu "${data.input}" của bạn.

Nhưng đừng lo! Tôi có thể giúp bạn với nhiều vấn đề khác nhau. Hãy thử hỏi về:`,
      en: `🤔 I don't quite understand your request "${data.input}".

But don't worry! I can help you with many different things. Try asking about:`
    }
  };
  
  return responses[responseKey]?.[language] || responses[responseKey]?.['vi'] || '';
};

// Smart AI Response System với Machine Learning
const getAiResponse = (input, cartItems = []) => {
  const lowerInput = input.toLowerCase();
  
  // Học ngôn ngữ và sở thích của user
  learningSystem.learnLanguage(input);
  learningSystem.learnInterests(input);
  
  const userLang = learningSystem.userLanguage;
  const context = learningSystem.getContext();
  
  // ===== GREETINGS & BASIC INTERACTIONS =====
  if (lowerInput.includes('chào') || lowerInput.includes('hello') || lowerInput.includes('hi') || 
      lowerInput.includes('xin chào') || lowerInput.includes('hey')) {
    
    const response = {
      type: 'text',
      message: getLocalizedResponse('greeting', userLang)
    };
    
    learningSystem.saveConversation(input, response.message);
    return response;
  }

  // ===== COURSE CONSULTATION =====
  if (lowerInput.includes('tư vấn') || lowerInput.includes('recommend') || lowerInput.includes('suggest') ||
      lowerInput.includes('khóa học nào') || lowerInput.includes('course') || lowerInput.includes('lĩnh vực')) {
    
    const suggestions = userLang === 'en' ? [
      '💻 Information Technology (IT)',
      '🗣️ Languages (English, IELTS)', 
      '📊 Business & Marketing',
      '🎨 Design & Creative',
      '📈 Finance & Accounting',
      '🏗️ Engineering & Construction',
      '💡 Soft Skills & Personal Development',
      '🎓 I\'m not sure, please advise me'
    ] : [
      '💻 Công nghệ thông tin (IT)',
      '🗣️ Ngoại ngữ (Tiếng Anh, IELTS)',
      '📊 Kinh doanh & Marketing', 
      '🎨 Thiết kế & Sáng tạo',
      '📈 Tài chính & Kế toán',
      '🏗️ Kỹ thuật & Xây dựng',
      '💡 Kỹ năng mềm & Phát triển bản thân',
      '🎓 Tôi chưa biết chọn gì, hãy tư vấn cho tôi'
    ];
    
    const response = {
      type: 'suggestions',
      message: getLocalizedResponse('course_consultation', userLang),
      suggestions: suggestions
    };
    
    learningSystem.saveConversation(input, response.message);
    return response;
  }

  // ===== TECHNOLOGY & PROGRAMMING =====
  if (lowerInput.includes('lập trình') || lowerInput.includes('code') || lowerInput.includes('developer') ||
      lowerInput.includes('programming') || lowerInput.includes('IT') || lowerInput.includes('công nghệ') ||
      lowerInput.includes('javascript') || lowerInput.includes('python') || lowerInput.includes('web')) {
    
    const programmingCourses = data.filter(p => 
      p.name.toLowerCase().includes('lập trình') || 
      p.name.toLowerCase().includes('code') ||
      p.name.toLowerCase().includes('javascript') ||
      p.name.toLowerCase().includes('python') ||
      p.name.toLowerCase().includes('web') ||
      p.name.toLowerCase().includes('app')
    );
    
    const response = {
      type: 'products',
      message: getLocalizedResponse('programming_intro', userLang),
      products: programmingCourses.slice(0, 3)
    };
    
    learningSystem.saveConversation(input, response.message);
    return response;
  }

  // ===== ENGLISH & LANGUAGE LEARNING =====
  if (lowerInput.includes('tiếng anh') || lowerInput.includes('english') || lowerInput.includes('ielts') ||
      lowerInput.includes('toefl') || lowerInput.includes('ngoại ngữ') || lowerInput.includes('language')) {
    
    const englishCourses = data.filter(p => 
      p.name.toLowerCase().includes('tiếng anh') || 
      p.name.toLowerCase().includes('ielts') ||
      p.name.toLowerCase().includes('english') ||
      p.name.toLowerCase().includes('toefl')
    );
    
    const response = {
      type: 'products',
      message: getLocalizedResponse('english_intro', userLang),
      products: englishCourses.slice(0, 3)
    };
    
    learningSystem.saveConversation(input, response.message);
    return response;
  }

  // ===== SHOPPING CART =====
  if (lowerInput.includes('giỏ hàng') || lowerInput.includes('cart') || lowerInput.includes('mua') ||
      lowerInput.includes('buy') || lowerInput.includes('order') || lowerInput.includes('thanh toán')) {
    
    if (cartItems.length === 0) {
      const suggestions = userLang === 'en' ? [
        '🔥 Best-selling courses',
        '⭐ Highly rated courses', 
        '🆕 Latest courses',
        '💎 Premium courses',
        '🎯 Course recommendations for me'
      ] : [
        '🔥 Khóa học bán chạy nhất',
        '⭐ Khóa học được đánh giá cao',
        '🆕 Khóa học mới nhất', 
        '💎 Khóa học cao cấp',
        '🎯 Tư vấn khóa học phù hợp'
      ];
      
      const response = {
        type: 'suggestions',
        message: getLocalizedResponse('empty_cart', userLang),
        suggestions: suggestions
      };
      
      learningSystem.saveConversation(input, response.message);
      return response;
    }
    
    const cartMessage = userLang === 'en' ? 
      `🛒 You have ${cartItems.length} courses in your cart!

✅ All come with certificates
🎁 Free lifetime updates  
💯 Quality guarantee

Would you like to checkout now?` :
      `🛒 Bạn có ${cartItems.length} khóa học trong giỏ hàng!

✅ Tất cả đều có chứng chỉ
🎁 Miễn phí cập nhật trọn đời
💯 Bảo hành chất lượng

Bạn có muốn thanh toán ngay không?`;
    
    const response = {
      type: 'cart',
      message: cartMessage,
      cartItems
    };
    
    learningSystem.saveConversation(input, response.message);
    return response;
  }

  // ===== THANKS & GOODBYE =====
  if (lowerInput.includes('cảm ơn') || lowerInput.includes('thank') || lowerInput.includes('thanks') ||
      lowerInput.includes('tạm biệt') || lowerInput.includes('bye') || lowerInput.includes('goodbye')) {
    
    const thanksMessage = userLang === 'en' ?
      '🌟 Thank you! Wishing you success in your learning journey. Feel free to reach out anytime if you need more assistance! 📚💫' :
      '😊 Rất vui được hỗ trợ bạn! Chúc bạn học tập hiệu quả và đạt được mục tiêu. Nếu có thêm câu hỏi, hãy nhắn tin cho tôi bất cứ lúc nào! 🎓✨';
    
    const response = {
      type: 'text',
      message: thanksMessage
    };
    
    learningSystem.saveConversation(input, response.message);
    return response;
  }

  // ===== SMART DEFAULT RESPONSE =====
  const smartSuggestions = userLang === 'en' ? [
    '🎯 Course recommendations for my goals',
    '💻 Information Technology courses',
    '🗣️ English & IELTS courses', 
    '📊 Business & Marketing courses',
    '💰 Pricing & promotions',
    '🛒 Check my cart'
  ] : [
    '🎯 Tư vấn khóa học phù hợp với mục tiêu',
    '💻 Khóa học Công nghệ thông tin',
    '🗣️ Khóa học Tiếng Anh & IELTS',
    '📊 Khóa học Kinh doanh & Marketing', 
    '💰 Thông tin giá cả & khuyến mãi',
    '🛒 Kiểm tra giỏ hàng của tôi'
  ];

  const response = {
    type: 'suggestions',
    message: getLocalizedResponse('not_understand', userLang, { input }),
    suggestions: smartSuggestions
  };
  
  learningSystem.saveConversation(input, response.message);
  return response;
};

export default function ChatBotAI() {
  const [visible, setVisible] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: {
        type: 'text',
        message: '👋 Xin chào! Tôi là AI Assistant. Tôi có thể giúp bạn tìm khóa học phù hợp. Bạn đang quan tâm đến lĩnh vực nào?'
      },
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const { cartItems, addToCart } = useCart();

  // Responsive width function
  const getResponsiveWidth = () => {
    const width = window.innerWidth;
    if (width < 576) return '100%';     // Mobile
    if (width < 768) return '85%';      // Small tablet
    if (width < 992) return '70%';      // Tablet
    return 400;                         // Desktop
  };

  const [drawerWidth, setDrawerWidth] = useState(getResponsiveWidth());

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setDrawerWidth(getResponsiveWidth());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: { type: 'text', message: input },
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking time
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    // Get AI response
    const aiResponse = getAiResponse(currentInput, cartItems);
    const botMessage = {
      id: Date.now() + 1,
      type: 'bot',
      content: aiResponse,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, botMessage]);
    setIsTyping(false);
  };

  const handleAddToCart = (product) => {
    // Đảm bảo product có đầy đủ thông tin cần thiết
    const productToAdd = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category || 'Khóa học',
      description: product.description || '',
    };

    addToCart(productToAdd);
    
    // Thông báo xác nhận trong chat
    const confirmMessage = {
      id: Date.now(),
      type: 'bot',
      content: {
        type: 'text',
        message: `✅ Đã thêm "${product.name}" vào giỏ hàng với số lượng 1! 🛒\n\nBạn có muốn:\n• Tiếp tục mua sắm\n• Xem giỏ hàng\n• Thanh toán ngay?`
      },
      timestamp: new Date()
    };
    setMessages(prev => [...prev, confirmMessage]);

    // Hiển thị quick actions
    setTimeout(() => {
      const quickActions = {
        id: Date.now() + 1,
        type: 'bot',
        content: {
          type: 'suggestions',
          message: '🎯 Hành động tiếp theo:',
          suggestions: [
            '🛒 Xem giỏ hàng',
            '💳 Thanh toán ngay',
            '📚 Tìm khóa học khác',
            '❤️ Xem yêu thích'
          ]
        },
        timestamp: new Date()
      };
      setMessages(prev => [...prev, quickActions]);
    }, 1000);
  };

  const handleSuggestionClick = (suggestion) => {
    const lowerSuggestion = suggestion.toLowerCase();
    
    // Xử lý các suggestion đặc biệt
    if (lowerSuggestion.includes('giỏ hàng')) {
      window.location.href = '/cart';
      return;
    }
    
    if (lowerSuggestion.includes('thanh toán')) {
      window.location.href = '/checkout';
      return;
    }
    
    if (lowerSuggestion.includes('yêu thích')) {
      window.location.href = '/favorites';
      return;
    }
    
    // Xử lý suggestion thường
    setInput(suggestion);
    setTimeout(() => handleSendMessage(), 100);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  // Check if mobile
  const isMobile = window.innerWidth < 576;
  

  const renderMessageContent = (content) => {
    const isMobile = window.innerWidth < 576;
    const isTablet = window.innerWidth >= 576 && window.innerWidth < 992;
    
    switch (content.type) {
      case 'text':
        return (
          <Text className="chatbot-message-text">
            {content.message}
          </Text>
        );
        
      case 'products':
        return (
          <div>
            <Text className="chatbot-message-text" style={{ marginBottom: 12, display: 'block' }}>
              {content.message}
            </Text>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {content.products.map((product) => (
                <div
                  key={product.id}
                  className="chatbot-product-card"
                  style={{
                    background: '#f8f9fa',
                    borderRadius: 10,
                    padding: isMobile ? '10px' : '12px',
                    border: '1px solid #e9ecef',
                    display: 'flex',
                    alignItems: isMobile ? 'flex-start' : 'center',
                    gap: isMobile ? '8px' : '12px',
                    flexDirection: isMobile ? 'column' : 'row'
                  }}
                >
                  {/* Product Image */}
                  <div style={{ flexShrink: 0 }}>
                    <img
                      src={product.image}
                      alt={product.name}
                      style={{
                        width: isMobile ? '100%' : '60px',
                        height: isMobile ? '80px' : '40px',
                        maxWidth: isMobile ? '120px' : '60px',
                        borderRadius: 6,
                        objectFit: 'cover'
                      }}
                    />
                  </div>

                  {/* Product Info */}
                  <div style={{ 
                    flex: 1, 
                    minWidth: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px'
                  }}>
                    {/* Product Name */}
                    <Text 
                      strong 
                      className="chatbot-product-name"
                      style={{
                        fontSize: isMobile ? '13px' : '14px',
                        lineHeight: '1.3',
                        marginBottom: '2px',
                        display: 'block'
                      }}
                    >
                      {product.name}
                    </Text>

                    {/* Price and Category in one line on desktop */}
                    <div style={{
                      display: 'flex',
                      flexDirection: isMobile ? 'column' : 'row',
                      alignItems: isMobile ? 'flex-start' : 'center',
                      gap: isMobile ? '2px' : '12px',
                      flexWrap: 'wrap'
                    }}>
                      <Text 
                        className="chatbot-price"
                        style={{
                          fontSize: isMobile ? '12px' : '14px',
                          fontWeight: 600,
                          color: '#f5222d',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {formatPrice(product.price)}
                      </Text>
                      
                      <Text 
                        className="chatbot-category"
                        style={{
                          fontSize: isMobile ? '11px' : '12px',
                          color: '#666',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {product.category || 'Khóa học'}
                      </Text>
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <div style={{ flexShrink: 0 }}>
                    <Button
                      type="primary"
                      size={isMobile ? 'small' : 'middle'}
                      onClick={() => handleAddToCart(product)}
                      style={{
                        borderRadius: 6,
                        whiteSpace: 'nowrap',
                        width: isMobile ? '100%' : 'auto',
                        minWidth: isMobile ? 'auto' : '80px'
                      }}
                    >
                      {isMobile ? '+ Thêm vào giỏ' : '+ Thêm'}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
        
      case 'suggestions':
        return (
          <div>
            <Text className="chatbot-message-text" style={{ marginBottom: 12, display: 'block' }}>
              {content.message}
            </Text>
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: isMobile ? '6px' : '8px' 
            }}>
              {content.suggestions.map((suggestion, index) => (
                <Button
                  key={index}
                  block
                  size={isMobile ? 'small' : 'middle'}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="chatbot-suggestion-btn"
                  style={{
                    textAlign: 'left',
                    height: 'auto',
                    padding: isMobile ? '8px 12px' : '10px 14px',
                    borderRadius: 6,
                    whiteSpace: 'normal',
                    wordBreak: 'break-word'
                  }}
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          </div>
        );
        
      case 'cart':
        return (
          <div>
            <Text className="chatbot-message-text" style={{ marginBottom: 8, display: 'block' }}>
              {content.message}
            </Text>
            <div style={{ 
              display: 'flex', 
              flexDirection: isMobile ? 'column' : 'row', 
              gap: '8px' 
            }}>
              <Button
                type="primary"
                size="small"
                onClick={() => window.location.href = '/cart'}
                style={{
                  borderRadius: 6,
                  flex: isMobile ? 'none' : 1
                }}
              >
                🛒 Xem giỏ hàng
              </Button>
              <Button
                type="default"
                size="small"
                onClick={() => window.location.href = '/checkout'}
                style={{
                  borderRadius: 6,
                  flex: isMobile ? 'none' : 1
                }}
              >
                💳 Thanh toán
              </Button>
            </div>
          </div>
        );
        
      default:
        return <Text className="chatbot-message-text">{content.message}</Text>;
    }
  };

  // Draggable float button state
  const [position, setPosition] = useState({ x: 24, y: 24 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const floatButtonRef = useRef(null);

  // Handle drag start
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  // Handle drag move
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;
    
    // Constrain to viewport
    const maxX = window.innerWidth - 56;
    const maxY = window.innerHeight - 56;
    
    setPosition({
      x: Math.max(0, Math.min(newX, maxX)),
      y: Math.max(0, Math.min(newY, maxY))
    });
  };

  // Handle drag end
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Add event listeners for drag
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragStart]);

  return (
    <>
      {/* Custom Draggable Float Button */}
      <div
        ref={floatButtonRef}
        style={{
          position: 'fixed',
          right: `${window.innerWidth - position.x - 56}px`,
          bottom: `${window.innerHeight - position.y - 56}px`,
          zIndex: 1000,
          cursor: isDragging ? 'grabbing' : 'grab',
          transition: isDragging ? 'none' : 'all 0.3s ease',
        }}
        onMouseDown={handleMouseDown}
      >
        <Tooltip title="Tư vấn AI (Kéo để di chuyển)" placement="left">
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: '50%',
              background: 'linear-gradient(-45deg, #3498db, #5dade2, #85c1e9, #aed6f1)',
              backgroundSize: '400% 400%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 25px rgba(52, 152, 219, 0.4)',
              cursor: 'pointer',
              transform: isDragging ? 'scale(1.1)' : 'scale(1)',
              transition: 'transform 0.3s ease',
              border: '3px solid white',
              position: 'relative',
              overflow: 'hidden',
              animation: 'eduFloat 8s ease infinite'
            }}
            onClick={() => !isDragging && setVisible(true)}
          >
            {/* Education glow effect */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'radial-gradient(circle at 30% 20%, rgba(255,255,255,0.6) 0%, transparent 60%)',
                borderRadius: '50%',
                pointerEvents: 'none'
              }}
            />
            
            <MessageOutlined 
              style={{ 
                fontSize: 26, 
                color: 'white',
                zIndex: 1,
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
              }} 
            />

            {/* Notification dot */}
            {!visible && (
              <div
                style={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  background: '#ff4d4f',
                  border: '2px solid white',
                  animation: 'pulse 2s infinite'
                }}
              />
            )}
          </div>
        </Tooltip>
      </div>

      <Drawer
        title={
          <Space align="center">
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #1890ff 0%, #722ed1 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              <RobotOutlined style={{ fontSize: 16, color: 'white' }} />
            </div>
            <span style={{ 
              fontSize: isMobile ? '14px' : '16px',
              fontWeight: 600,
              background: 'linear-gradient(135deg, #1890ff 0%, #722ed1 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              🤖 AI Tư vấn - Edu Commerce
            </span>
          </Space>
        }
        placement="right"
        width={drawerWidth}
        onClose={() => setVisible(false)}
        open={visible}
        styles={{
          body: { padding: 0 }
        }}
      >
        {/* Messages Container */}
        <div style={{ 
          height: 'calc(100vh - 180px)', 
          overflowY: 'auto', 
          padding: isMobile ? '12px' : '16px',
          background: '#fafafa'
        }}>
          {messages.map((message) => (
            <div
              key={message.id}
              style={{
                display: 'flex',
                justifyContent: message.type === 'user' ? 'flex-end' : 'flex-start',
                marginBottom: isMobile ? 12 : 16
              }}
            >
              <div style={{ 
                display: 'flex', 
                alignItems: 'flex-start', 
                maxWidth: isMobile ? '95%' : '85%',
                flexDirection: message.type === 'user' ? 'row-reverse' : 'row',
                gap: 8
              }}>
                {/* Enhanced Avatar */}
                <div
                  style={{
                    width: isMobile ? 28 : 32,
                    height: isMobile ? 28 : 32,
                    borderRadius: '50%',
                    background: message.type === 'bot' 
                      ? 'linear-gradient(135deg, #1890ff 0%, #722ed1 100%)'
                      : 'linear-gradient(135deg, #52c41a 0%, #389e0d 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    border: '2px solid white',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                    position: 'relative'
                  }}
                >
                  {message.type === 'bot' ? (
                    <RobotOutlined 
                      style={{ 
                        fontSize: isMobile ? 12 : 14, 
                        color: 'white' 
                      }} 
                    />
                  ) : (
                    <UserOutlined 
                      style={{ 
                        fontSize: isMobile ? 12 : 14, 
                        color: 'white' 
                      }} 
                    />
                  )}
                  
                  {/* Online indicator cho bot */}
                  {message.type === 'bot' && (
                    <div
                      style={{
                        position: 'absolute',
                        bottom: -1,
                        right: -1,
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        background: '#52c41a',
                        border: '1px solid white'
                      }}
                    />
                  )}
                </div>
                
                {/* Message bubble */}
                <div
                  style={{
                    background: message.type === 'user' 
                      ? 'linear-gradient(135deg, #1890ff 0%, #722ed1 100%)'
                      : 'white',
                    color: message.type === 'user' ? 'white' : 'black',
                    padding: isMobile ? '10px 12px' : '12px 16px',
                    borderRadius: 16,
                    boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
                    maxWidth: '100%',
                    wordBreak: 'break-word',
                    overflowWrap: 'break-word',
                    position: 'relative',
                    border: message.type === 'user' ? 'none' : '1px solid #f0f0f0'
                  }}
                >
                  {/* Message tail */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 8,
                      [message.type === 'user' ? 'right' : 'left']: -6,
                      width: 0,
                      height: 0,
                      borderTop: '6px solid transparent',
                      borderBottom: '6px solid transparent',
                      [message.type === 'user' ? 'borderLeft' : 'borderRight']: message.type === 'user' 
                        ? '6px solid #1890ff' 
                        : '6px solid white'
                    }}
                  />
                  
                  {renderMessageContent(message.content)}
                  
                  <div style={{ 
                    fontSize: isMobile ? 9 : 10, 
                    opacity: 0.7, 
                    marginTop: 6,
                    textAlign: message.type === 'user' ? 'right' : 'left'
                  }}>
                    {message.timestamp.toLocaleTimeString('vi-VN', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {/* Enhanced Typing Indicator */}
          {isTyping && (
            <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 16, gap: 8 }}>
              <div
                style={{
                  width: isMobile ? 28 : 32,
                  height: isMobile ? 28 : 32,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #1890ff 0%, #722ed1 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  border: '2px solid white',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                }}
              >
                <RobotOutlined style={{ fontSize: isMobile ? 12 : 14, color: 'white' }} />
              </div>
              
              <div style={{
                background: 'white',
                padding: isMobile ? '10px 12px' : '12px 16px',
                borderRadius: 16,
                boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
                border: '1px solid #f0f0f0',
                position: 'relative'
              }}>
                {/* Typing tail */}
                <div
                  style={{
                    position: 'absolute',
                    top: 8,
                    left: -6,
                    width: 0,
                    height: 0,
                    borderTop: '6px solid transparent',
                    borderBottom: '6px solid transparent',
                    borderRight: '6px solid white'
                  }}
                />
                
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Text type="secondary" style={{ fontSize: isMobile ? '13px' : '14px' }}>
                    AI đang soạn tin
                  </Text>
                  <div style={{ display: 'flex', gap: 2 }}>
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        style={{
                          width: 4,
                          height: 4,
                          borderRadius: '50%',
                          background: '#1890ff',
                          animation: `typingDot 1.4s infinite ease-in-out`,
                          animationDelay: `${i * 0.16}s`
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div style={{ 
          padding: isMobile ? 12 : 16, 
          borderTop: '1px solid #f0f0f0',
          background: 'white'
        }}>
          <Input.Search
            placeholder="Nhập tin nhắn..."
            enterButton={<SendOutlined />}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onSearch={handleSendMessage}
            size={isMobile ? 'middle' : 'large'}
            disabled={isTyping}
            style={{
              fontSize: isMobile ? '14px' : '15px'
            }}
          />
        </div>
      </Drawer>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.7; }
          100% { transform: scale(1); opacity: 1; }
        }
        
        @keyframes typingDot {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-10px); }
        }

        @keyframes eduFloat {
          0% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
          100% { transform: translateY(0); }
        }
      `}</style>
    </>
  );
}