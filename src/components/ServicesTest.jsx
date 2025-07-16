import { useState } from 'react';
import { Button, Card, Space, Typography, message } from 'antd';
import { productService } from '../services/productService';
import { aiService } from '../services/aiService';
import { userService } from '../services/userService';
import { analyticsService } from '../services/analyticsService';

const { Title, Text } = Typography;

export default function ServicesTest() {
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState({});

  const testService = async (serviceName, serviceMethod, params = {}) => {
    setLoading(prev => ({ ...prev, [serviceName]: true }));
    
    try {
      let result;
      
      switch (serviceName) {
        case 'product':
          result = await productService[serviceMethod](params);
          break;
        case 'ai':
          result = await aiService[serviceMethod](params);
          break;
        case 'user':
          result = await userService[serviceMethod](params);
          break;
        case 'analytics':
          result = await analyticsService[serviceMethod](params);
          break;
        default:
          throw new Error('Unknown service');
      }
      
      setResults(prev => ({
        ...prev,
        [serviceName]: { success: true, data: result }
      }));
      
      message.success(`${serviceName} service hoạt động ✅`);
    } catch (error) {
      setResults(prev => ({
        ...prev,
        [serviceName]: { success: false, error: error.message }
      }));
      
      message.error(`${serviceName} service lỗi ❌: ${error.message}`);
    } finally {
      setLoading(prev => ({ ...prev, [serviceName]: false }));
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <Title level={2}>🧪 Test Services Connection</Title>
      
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        {/* Product Service Test */}
        <Card title="📦 Product Service">
          <Space wrap>
            <Button
              type="primary"
              loading={loading.product}
              onClick={() => testService('product', 'getProducts', { limit: 3 })}
            >
              Test Get Products
            </Button>
            <Button
              loading={loading.product}
              onClick={() => testService('product', 'getProductById', 1)}
            >
              Test Get Product By ID
            </Button>
          </Space>
          
          {results.product && (
            <div style={{ marginTop: 16, padding: 12, background: '#f5f5f5', borderRadius: 6 }}>
              <Text code>{JSON.stringify(results.product, null, 2)}</Text>
            </div>
          )}
        </Card>

        {/* AI Service Test */}
        <Card title="🤖 AI Service">
          <Space wrap>
            <Button
              type="primary"
              loading={loading.ai}
              onClick={() => testService('ai', 'getSuggestions', 'user123')}
            >
              Test AI Suggestions
            </Button>
            <Button
              loading={loading.ai}
              onClick={() => testService('ai', 'chatWithAI', 'Tôi muốn học lập trình')}
            >
              Test AI Chat
            </Button>
          </Space>
          
          {results.ai && (
            <div style={{ marginTop: 16, padding: 12, background: '#f5f5f5', borderRadius: 6 }}>
              <Text code>{JSON.stringify(results.ai, null, 2)}</Text>
            </div>
          )}
        </Card>

        {/* User Service Test */}
        <Card title="👤 User Service">
          <Space wrap>
            <Button
              type="primary"
              loading={loading.user}
              onClick={() => testService('user', 'getFavorites')}
            >
              Test Get Favorites
            </Button>
            <Button
              loading={loading.user}
              onClick={() => testService('user', 'addFavorite', 1)}
            >
              Test Add Favorite
            </Button>
          </Space>
          
          {results.user && (
            <div style={{ marginTop: 16, padding: 12, background: '#f5f5f5', borderRadius: 6 }}>
              <Text code>{JSON.stringify(results.user, null, 2)}</Text>
            </div>
          )}
        </Card>

        {/* Analytics Service Test */}
        <Card title="📊 Analytics Service">
          <Space wrap>
            <Button
              type="primary"
              loading={loading.analytics}
              onClick={() => testService('analytics', 'trackPageView', '/test')}
            >
              Test Track Page View
            </Button>
            <Button
              loading={loading.analytics}
              onClick={() => testService('analytics', 'trackUserAction', 'test_action', { test: true })}
            >
              Test Track Action
            </Button>
          </Space>
          
          {results.analytics && (
            <div style={{ marginTop: 16, padding: 12, background: '#f5f5f5', borderRadius: 6 }}>
              <Text code>{JSON.stringify(results.analytics, null, 2)}</Text>
            </div>
          )}
        </Card>
      </Space>
    </div>
  );
}