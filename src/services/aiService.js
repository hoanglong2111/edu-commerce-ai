import data from '../Data/mockData';

export const aiService = {
  async getSuggestions(userId, options = {}) {
    console.log('🤖 AI Service: Pure mock mode');
    
    const { limit = 6, includeHistory = true, includeFavorites = true, excludeViewed = true } = options;
    
    return new Promise((resolve) => {
      setTimeout(() => {
        const viewHistory = includeHistory ? JSON.parse(localStorage.getItem('viewHistory') || '[]') : [];
        const favorites = includeFavorites ? JSON.parse(localStorage.getItem('favorites') || '[]') : [];
        const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
        
        let suggestions = [];
        let reason = '';
        
        if (viewHistory.length > 0 || favorites.length > 0) {
          const interestedCategories = [
            ...viewHistory.map(p => p.category).filter(Boolean),
            ...data.filter(p => favorites.includes(p.id)).map(p => p.category).filter(Boolean)
          ];
          
          const categoryCount = {};
          interestedCategories.forEach(cat => {
            categoryCount[cat] = (categoryCount[cat] || 0) + 1;
          });
          
          const topCategories = Object.entries(categoryCount)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 3)
            .map(([cat]) => cat);
          
          suggestions = data.filter(product => {
            const isInterestedCategory = topCategories.includes(product.category);
            const notFavorited = !favorites.includes(product.id);
            const notViewed = !excludeViewed || !viewHistory.some(v => v.id === product.id);
            const notInCart = !cartItems.some(item => item.id === product.id);
            
            return isInterestedCategory && notFavorited && notViewed && notInCart;
          });
          
          reason = topCategories.length > 0 ? 
            `Dựa trên sở thích ${topCategories.join(', ')} của bạn` :
            'Dựa trên hoạt động học tập của bạn';
        } else {
          suggestions = data
            .filter(p => p.rating >= 4.0)
            .sort((a, b) => b.rating - a.rating);
          reason = 'Các khóa học phổ biến và được đánh giá cao';
        }
        
        suggestions = suggestions.slice(0, limit);
        
        resolve({
          success: true,
          data: {
            suggestions,
            reason,
            confidence: suggestions.length > 0 ? 0.85 + Math.random() * 0.1 : 0
          }
        });
      }, 1200);
    });
  },

  async chatWithAI(message, conversationId = null) {
    console.log('💬 AI Chat: Pure mock mode');
    
    return new Promise((resolve) => {
      setTimeout(() => {
        const lowerMessage = message.toLowerCase();
        let aiResponse = '';
        
        if (lowerMessage.includes('lập trình')) {
          aiResponse = 'Tôi khuyên bạn nên bắt đầu với khóa học "JavaScript Từ Cơ Bản Đến Nâng Cao". Bạn có muốn tôi gợi ý cụ thể hơn không?';
        } else if (lowerMessage.includes('tiếng anh')) {
          aiResponse = 'Để học tiếng Anh hiệu quả, tôi gợi ý khóa "IELTS 7.0+ Chinh Phục". Bạn đang ở trình độ nào?';
        } else if (lowerMessage.includes('marketing')) {
          aiResponse = 'Marketing số là xu hướng hiện tại! Tôi gợi ý "Digital Marketing Toàn Diện". Bạn muốn tập trung vào platform nào?';
        } else {
          aiResponse = 'Tôi hiểu bạn đang tìm kiếm khóa học phù hợp. Bạn có thể cho tôi biết lĩnh vực quan tâm không?';
        }
        
        resolve({
          success: true,
          data: {
            message: aiResponse,
            conversationId: conversationId || `conv_${Date.now()}`,
            timestamp: new Date().toISOString(),
            suggestedActions: ['Xem khóa học được gợi ý', 'Lọc theo giá', 'Tìm khóa học khác']
          }
        });
      }, 800);
    });
  }
};