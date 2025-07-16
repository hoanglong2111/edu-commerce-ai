import { useState, useEffect, useCallback } from 'react';
import { Row, Col, message, Typography, Divider, Space, Tag, Pagination, Card, Button } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import TrialModal from '../components/TrialModal';
import SearchFilterBar from '../components/SearchFilterBar';
import SuggestionButton from '../components/SuggestionButton';
import ViewedHistory from '../components/ViewedHistory';
import { useCart } from '../context/CartContext';

// Import Services
import { productService } from '../services/productService';
import { userService } from '../services/userService';
import { analyticsService } from '../services/analyticsService';

// Import mockData DIRECTLY
import mockData from '../Data/mockData';

const { Title, Text } = Typography;

export default function Home() {
  // States
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalProduct, setModalProduct] = useState(null);
  const [trialProduct, setTrialProduct] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const { addToCart } = useCart();
  
  // Filter states
  const [keyword, setKeyword] = useState('');
  const [priceRange, setPriceRange] = useState('all');
  const [category, setCategory] = useState('all');
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(6);
  const [totalProducts, setTotalProducts] = useState(0);
  
  // AI states
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [isAIMode, setIsAIMode] = useState(false);
  
  // Debug states
  const [debugInfo, setDebugInfo] = useState({});

  // 🔍 IMMEDIATE DEBUG CHECK
  useEffect(() => {
    console.log('🚀 Home component mounted');
    console.log('📦 Direct mockData check:', mockData);
    console.log('📦 MockData length:', mockData?.length);
    console.log('📦 First product:', mockData?.[0]);
    console.log('🔧 ProductService available:', typeof productService?.getProducts);
    
    setDebugInfo({
      mockDataLength: mockData?.length || 0,
      mockDataAvailable: Array.isArray(mockData),
      firstProduct: mockData?.[0]?.name || 'N/A',
      serviceAvailable: typeof productService?.getProducts === 'function'
    });
    
    // ✅ FORCE LOAD MOCKDATA IMMEDIATELY
    if (mockData && mockData.length > 0) {
      console.log('🔧 Force loading mockData immediately...');
      setProducts(mockData.slice(0, pageSize));
      setTotalProducts(mockData.length);
      setLoading(false);
      message.success(`✅ Loaded ${mockData.length} courses from mockData`);
    } else {
      console.error('❌ MockData is empty or unavailable!');
      setLoading(false);
      message.error('❌ MockData not available');
    }
  }, [pageSize]);

  // ✅ IMPROVED loadProducts với fallback
  const loadProducts = useCallback(async (params = {}) => {
    try {
      setLoading(true);
      console.log('📊 Loading products with params:', params);
      
      // ✅ TRY SERVICE FIRST
      try {
        const response = await productService.getProducts({
          page: currentPage,
          limit: pageSize,
          category: category !== 'all' ? category : undefined,
          priceRange: priceRange !== 'all' ? priceRange : undefined,
          keyword: keyword || undefined,
          ...params
        });
        
        console.log('📊 Product service response:', response);
        
        if (response.success && response.data.products.length > 0) {
          console.log('✅ Service worked! Products loaded:', response.data.products.length);
          setProducts(response.data.products);
          setTotalProducts(response.data.total);
          
          // Track analytics
          await analyticsService.trackPageView('/home');
          if (keyword) {
            await analyticsService.trackSearch(keyword, response.data.total, null, {
              category, priceRange
            });
          }
        } else {
          throw new Error('Service returned empty data');
        }
      } catch (serviceError) {
        console.warn('⚠️ Service failed, using direct mockData:', serviceError.message);
        
        // ✅ FALLBACK TO DIRECT MOCKDATA
        if (mockData && mockData.length > 0) {
          let filtered = [...mockData];
          
          // Apply filters manually
          if (category && category !== 'all') {
            filtered = filtered.filter(p => p.category === category);
          }
          
          if (priceRange && priceRange !== 'all') {
            switch (priceRange) {
              case '<500':
                filtered = filtered.filter(p => p.price < 500000);
                break;
              case '500-1000':
                filtered = filtered.filter(p => p.price >= 500000 && p.price <= 1000000);
                break;
              case '>1000':
                filtered = filtered.filter(p => p.price > 1000000);
                break;
              default:
                break;
            }
          }
          
          if (keyword) {
            filtered = filtered.filter(p => 
              p.name.toLowerCase().includes(keyword.toLowerCase()) ||
              p.category.toLowerCase().includes(keyword.toLowerCase()) ||
              p.instructor.toLowerCase().includes(keyword.toLowerCase())
            );
          }
          
          // Apply pagination
          const total = filtered.length;
          const startIndex = (currentPage - 1) * pageSize;
          const paginatedProducts = filtered.slice(startIndex, startIndex + pageSize);
          
          console.log('🔧 Direct mockData filtering result:', paginatedProducts.length);
          setProducts(paginatedProducts);
          setTotalProducts(total);
          
          message.info('📦 Using mockData (service unavailable)');
        } else {
          throw new Error('Both service and mockData unavailable');
        }
      }
    } catch (error) {
      console.error('❌ Complete Load Products Error:', error);
      message.error('❌ Không thể tải dữ liệu: ' + error.message);
      
      // LAST RESORT: Empty state
      setProducts([]);
      setTotalProducts(0);
    } finally {
      setLoading(false);
    }
  }, [currentPage, pageSize, category, priceRange, keyword]);

  // Load favorites
  const loadFavorites = useCallback(async () => {
    try {
      const response = await userService.getFavorites();
      if (response.success) {
        setFavorites(response.data.favoriteIds);
        console.log('✅ Favorites loaded:', response.data.favoriteIds.length);
      }
    } catch (error) {
      console.error('⚠️ Load Favorites Error:', error);
    }
  }, []);

  // Search effect
  useEffect(() => {
    if (keyword) {
      const searchTimer = setTimeout(() => {
        console.log('🔍 Searching for:', keyword);
        setCurrentPage(1);
        loadProducts();
      }, 500);
      return () => clearTimeout(searchTimer);
    }
  }, [keyword, loadProducts]);

  // Page change effect
  useEffect(() => {
    if (currentPage > 1) {
      loadProducts();
    }
  }, [currentPage, loadProducts]);

  // ✅ MANUAL RELOAD FUNCTION
  const manualReload = () => {
    console.log('🔄 Manual reload triggered');
    if (mockData && mockData.length > 0) {
      setProducts(mockData.slice(0, pageSize));
      setTotalProducts(mockData.length);
      setLoading(false);
      message.success('🔄 Manually reloaded with mockData');
    } else {
      message.error('❌ MockData still not available');
    }
  };

  // ✅ TEST SERVICES FUNCTION
  const testServices = async () => {
    console.log('🧪 Testing all services...');
    
    try {
      // Test ProductService
      const productTest = await productService.getProducts({ limit: 3 });
      console.log('🧪 ProductService test:', productTest);
      
      // Test UserService
      const userTest = await userService.getFavorites();
      console.log('🧪 UserService test:', userTest);
      
      // Test AnalyticsService
      const analyticsTest = await analyticsService.trackPageView('/test');
      console.log('🧪 AnalyticsService test:', analyticsTest);
      
      message.success('🧪 All services are working!');
    } catch (error) {
      console.error('🧪 Service test failed:', error);
      message.error('🧪 Service test failed: ' + error.message);
    }
  };

  // Event handlers
  const viewProduct = async (product) => {
    try {
      console.log('👁️ Viewing product:', product);
      await userService.addToHistory(product);
      await analyticsService.trackProductView(product.id, null, {
        name: product.name,
        category: product.category,
        price: product.price,
        instructor: product.instructor
      });
      setModalProduct(product);
      message.info(`👁️ Viewing: ${product.name}`);
    } catch (error) {
      console.error('View Product Error:', error);
      setModalProduct(product);
    }
  };

  const toggleFavorite = async (productId) => {
    try {
      const isFavorited = favorites.includes(productId);
      console.log('❤️ Toggle favorite:', productId, 'Currently favorited:', isFavorited);
      
      if (isFavorited) {
        const response = await userService.removeFavorite(productId);
        if (response.success) {
          setFavorites(response.data.favoriteIds);
          message.success('💔 Đã xóa khỏi yêu thích');
        }
      } else {
        const response = await userService.addFavorite(productId);
        if (response.success) {
          setFavorites(response.data.favoriteIds);
          message.success('❤️ Đã thêm vào yêu thích');
        }
      }
      
      await analyticsService.trackUserAction(
        isFavorited ? 'remove_favorite' : 'add_favorite',
        { productId }
      );
    } catch (error) {
      console.error('Toggle Favorite Error:', error);
      message.error('❌ Lỗi toggle favorite: ' + error.message);
    }
  };

  const handleAddToCart = async (product) => {
    try {
      console.log('🛒 Adding to cart:', product.name);
      addToCart(product);
      
      await analyticsService.trackUserAction('add_to_cart', {
        productId: product.id,
        productName: product.name,
        price: product.price
      });
      
      message.success(`🛒 Đã thêm "${product.name}" vào giỏ hàng!`);
    } catch (error) {
      console.error('Add to Cart Error:', error);
      message.error('❌ Không thể thêm vào giỏ hàng: ' + error.message);
    }
  };

  const handleTrial = async (product) => {
    try {
      console.log('🎯 Starting trial:', product.name);
      setTrialProduct(product);
      
      await analyticsService.trackUserAction('start_trial', {
        productId: product.id,
        productName: product.name
      });
      
      message.info(`🎯 Bắt đầu dùng thử: ${product.name}`);
    } catch (error) {
      console.error('Trial Error:', error);
      message.error('❌ Lỗi dùng thử: ' + error.message);
    }
  };

  const handleAISuggestion = async (suggestedProducts) => {
    try {
      console.log('🤖 AI Suggestions received:', suggestedProducts.length);
      setIsLoadingSuggestions(true);
      setIsAIMode(true);
      
      setProducts(suggestedProducts);
      setTotalProducts(suggestedProducts.length);
      setCurrentPage(1);
      
      await analyticsService.trackUserAction('use_ai_suggestions', {
        suggestionsCount: suggestedProducts.length
      });
      
      message.success(`🤖 AI đã gợi ý ${suggestedProducts.length} khóa học!`);
    } catch (error) {
      console.error('AI Suggestion Error:', error);
      message.error('🤖 AI lỗi: ' + error.message);
    } finally {
      setIsLoadingSuggestions(false);
    }
  };

  const clearAllFilters = () => {
    setKeyword('');
    setCategory('all');
    setPriceRange('all');
    setCurrentPage(1);
    setIsAIMode(false);
    loadProducts();
    message.info('🔄 Đã reset tất cả filter');
  };

  // Calculate display
  const currentProducts = products;
  const shouldShowPagination = !isAIMode && totalProducts > pageSize;

  return (
    <div>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '40px 0',
        marginBottom: 32,
        textAlign: 'center',
        color: 'white'
      }}>
        <Title level={1} style={{ color: 'white', marginBottom: 16 }}>
          🎓 Khám Phá Khóa Học Chất Lượng
        </Title>
        <Text style={{ fontSize: 18, color: '#f0f0f0' }}>
          Hàng ngàn khóa học từ các chuyên gia hàng đầu
        </Text>
      </div>

      {/* 🔧 DEBUG PANEL */}
      <div style={{
        background: '#001529',
        color: 'white',
        padding: 20,
        marginBottom: 24,
        borderRadius: 8,
        fontFamily: 'monospace',
        fontSize: 12
      }}>
        <Title level={4} style={{ color: 'white', marginBottom: 12 }}>
          🔍 DEBUG PANEL
        </Title>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div>
            <strong>📊 Data Status:</strong><br/>
            MockData Length: {debugInfo.mockDataLength}<br/>
            MockData Available: {debugInfo.mockDataAvailable ? '✅' : '❌'}<br/>
            First Product: {debugInfo.firstProduct}<br/>
            Service Available: {debugInfo.serviceAvailable ? '✅' : '❌'}<br/>
          </div>
          <div>
            <strong>🔄 Current State:</strong><br/>
            Products Loaded: {products.length}<br/>
            Total Products: {totalProducts}<br/>
            Loading: {loading ? '⏳' : '✅'}<br/>
            Current Page: {currentPage}<br/>
          </div>
        </div>
        
        <Space style={{ marginTop: 16 }}>
          <Button 
            icon={<ReloadOutlined />} 
            onClick={manualReload}
            type="primary"
            size="small"
          >
            🔄 Manual Reload
          </Button>
          <Button 
            onClick={testServices}
            size="small"
          >
            🧪 Test Services
          </Button>
          <Button 
            onClick={() => console.log('Current state:', { products, mockData, debugInfo })}
            size="small"
          >
            📋 Log State
          </Button>
        </Space>
      </div>

      {/* Search & Filters */}
      <SearchFilterBar
        keyword={keyword}
        setKeyword={setKeyword}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        category={category}
        setCategory={setCategory}
      />

      {/* AI Suggestion Button */}
      <SuggestionButton
        userId="user_123"
        onSuggest={handleAISuggestion}
        loading={isLoadingSuggestions}
      />

      {/* Results Summary */}
      <div style={{ marginBottom: 24 }}>
        <Space>
          <Text strong style={{ fontSize: 16 }}>
            {isAIMode ? '🤖 Gợi ý từ AI:' : 'Kết quả:'} 
            <span style={{ color: '#3498db', marginLeft: 8 }}>
              {totalProducts} khóa học
            </span>
          </Text>
          
          {isAIMode && (
            <Tag 
              color="orange" 
              style={{ cursor: 'pointer' }}
              onClick={clearAllFilters}
            >
              🔄 Xem tất cả khóa học
            </Tag>
          )}
        </Space>
      </div>

      {/* Products Grid */}
      {loading ? (
        <div>
          <Title level={3}>⏳ Đang tải dữ liệu...</Title>
          <Row gutter={[16, 16]}>
            {Array.from({ length: 6 }).map((_, index) => (
              <Col xs={24} sm={12} md={8} lg={8} xl={8} key={index}>
                <Card loading style={{ height: 400 }} />
              </Col>
            ))}
          </Row>
        </div>
      ) : currentProducts.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '60px 20px',
          background: '#f8f9fa',
          borderRadius: 12,
          border: '2px dashed #d9d9d9'
        }}>
          <div style={{ fontSize: 64, marginBottom: 16 }}>😕</div>
          <Title level={3}>Không có dữ liệu</Title>
          <Text style={{ display: 'block', marginBottom: 16 }}>
            Hãy kiểm tra console và thử các nút debug ở trên
          </Text>
          <Space>
            <Button 
              type="primary" 
              icon={<ReloadOutlined />} 
              onClick={manualReload}
              size="large"
            >
              🔄 Reload MockData
            </Button>
            <Button 
              onClick={testServices}
              size="large"
            >
              🧪 Test Services
            </Button>
          </Space>
        </div>
      ) : (
        <>
          <Row gutter={[16, 16]}>
            {currentProducts.map((product) => (
              <Col xs={24} sm={12} md={8} lg={8} xl={8} key={product.id}>
                <ProductCard
                  product={product}
                  onDetail={viewProduct}
                  onFavorite={toggleFavorite}
                  isFavorited={favorites.includes(product.id)}
                  onAddToCart={() => handleAddToCart(product)}
                  onTrial={handleTrial}
                />
              </Col>
            ))}
          </Row>

          {shouldShowPagination && (
            <div style={{ 
              textAlign: 'center', 
              marginTop: 32,
              padding: 20,
              background: '#fafafa',
              borderRadius: 8
            }}>
              <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={totalProducts}
                onChange={(page) => setCurrentPage(page)}
                showSizeChanger={false}
                showQuickJumper
                showTotal={(total, range) => 
                  `${range[0]}-${range[1]} của ${total} khóa học`
                }
              />
            </div>
          )}
        </>
      )}

      <Divider style={{ margin: '48px 0 32px' }} />
      <ViewedHistory />

      {modalProduct && (
        <ProductModal
          product={modalProduct}
          visible={!!modalProduct}
          onClose={() => setModalProduct(null)}
          onAddToCart={() => handleAddToCart(modalProduct)}
          onFavorite={toggleFavorite}
          isFavorited={favorites.includes(modalProduct.id)}
        />
      )}

      {trialProduct && (
        <TrialModal
          product={trialProduct}
          visible={!!trialProduct}
          onClose={() => setTrialProduct(null)}
        />
      )}
    </div>
  );
}