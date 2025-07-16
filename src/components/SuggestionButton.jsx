import { useState } from 'react';
import { Button, message, Space, Typography } from 'antd';
import { LoadingOutlined, BulbOutlined } from '@ant-design/icons';

// Import AI Service
import { aiService } from '../services/aiService';

const { Text } = Typography;

export default function SuggestionButton({ userId, onSuggest, loading = false }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleGetSuggestions = async () => {
    try {
      setIsLoading(true);
      
      console.log('🤖 Getting AI suggestions for user:', userId);
      
      // Use aiService instead of mock function
      const response = await aiService.getSuggestions(userId, {
        limit: 6,
        includeHistory: true,
        includeFavorites: true,
        excludeViewed: true
      });
      
      if (response.success) {
        console.log('✅ AI suggestions received:', response.data.suggestions.length);
        
        // Pass suggestions to parent
        onSuggest(response.data.suggestions);
        
        // Show success message with AI reason
        message.success({
          content: `🤖 ${response.data.reason} - Tìm thấy ${response.data.suggestions.length} khóa học!`,
          duration: 4
        });
        
        // Provide feedback to AI
        await aiService.provideFeedback('suggestion_viewed', 'viewed', userId);
      }
    } catch (error) {
      console.error('❌ AI Suggestion Error:', error);
      message.error({
        content: '❌ AI tạm thời không khả dụng. Vui lòng thử lại sau!',
        duration: 4
      });
    } finally {
      setIsLoading(false);
    }
  };

  const currentLoading = loading || isLoading;

  return (
    <div style={{
      marginBottom: 24,
      textAlign: 'center',
      background: currentLoading 
        ? 'linear-gradient(135deg, #e8f4fd 0%, #d4edda 100%)'
        : 'linear-gradient(135deg, #fff3cd 0%, #ffeaa7 100%)',
      padding: '20px',
      borderRadius: 12,
      border: currentLoading 
        ? '2px solid #52c41a' 
        : '2px solid #fab005',
      transition: 'all 0.3s ease',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background animation */}
      {currentLoading && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: '-100%',
          width: '100%',
          height: '100%',
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
          animation: 'shimmer 1.5s infinite'
        }} />
      )}

      <Space direction="vertical" size={12}>
        <div style={{
          fontSize: 40,
          marginBottom: 8,
          animation: currentLoading ? 'bounce 1s infinite' : 'none'
        }}>
          🤖
        </div>
        
        <div>
          <Text strong style={{ 
            fontSize: 18, 
            color: currentLoading ? '#52c41a' : '#d4a007',
            display: 'block',
            marginBottom: 4
          }}>
            {currentLoading ? 'AI đang phân tích...' : 'Gợi ý thông minh từ AI'}
          </Text>
          
          <Text type="secondary" style={{ fontSize: 14 }}>
            {currentLoading 
              ? 'Đang phân tích lịch sử học tập và sở thích của bạn'
              : 'Để AI gợi ý những khóa học phù hợp với sở thích của bạn'
            }
          </Text>
        </div>

        <Button
          type="primary"
          size="large"
          icon={currentLoading ? <LoadingOutlined spin /> : <BulbOutlined />}
          onClick={handleGetSuggestions}
          loading={currentLoading}
          disabled={currentLoading}
          style={{
            height: 50,
            fontSize: 16,
            fontWeight: 600,
            background: currentLoading 
              ? 'linear-gradient(135deg, #52c41a 0%, #389e0d 100%)'
              : 'linear-gradient(135deg, #fab005 0%, #fd9644 100%)',
            border: 'none',
            borderRadius: 25,
            minWidth: 200,
            transition: 'all 0.3s ease'
          }}
        >
          {currentLoading ? 'Đang phân tích...' : '✨ Nhận gợi ý AI'}
        </Button>

        {currentLoading && (
          <div style={{ 
            marginTop: 12,
            padding: '8px 16px',
            background: 'rgba(82, 196, 26, 0.1)',
            borderRadius: 20,
            border: '1px solid rgba(82, 196, 26, 0.3)'
          }}>
            <Space>
              <LoadingOutlined style={{ color: '#52c41a' }} />
              <Text style={{ color: '#52c41a', fontSize: 13 }}>
                Đang xử lý dữ liệu học tập của bạn...
              </Text>
            </Space>
          </div>
        )}
      </Space>
    </div>
  );
}
