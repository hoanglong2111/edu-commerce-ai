import { useState, useEffect, useRef } from 'react';
import { Input, Select, Space, Typography, Tag, Skeleton } from 'antd';
import { SearchOutlined, FilterOutlined, BookOutlined, LoadingOutlined } from '@ant-design/icons';

// Import Product Service
import { productService } from '../services/productService';
import { analyticsService } from '../services/analyticsService';

const { Option } = Select;
const { Text } = Typography;

export default function SearchFilterBar({ 
  keyword, 
  setKeyword, 
  priceRange, 
  setPriceRange,
  category,
  setCategory
}) {
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const searchContainerRef = useRef(null);
  const inputRef = useRef(null);

  // Categories từ productService thay vì hardcode
  const [categories, setCategories] = useState([]);

  // Load categories
  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      // Trong thực tế sẽ có API endpoint riêng cho categories
      const response = await productService.getProducts({ limit: 100 });
      if (response.success) {
        const uniqueCategories = [...new Set(response.data.products.map(p => p.category))].sort();
        setCategories(uniqueCategories);
      }
    } catch (error) {
      console.error('Load Categories Error:', error);
      // Fallback categories
      setCategories(['Lập trình', 'Data Science', 'Tiếng Anh', 'Marketing', 'Thiết kế']);
    }
  };

  // Search suggestions using productService
  useEffect(() => {
    if (keyword && keyword.length > 1) {
      setLoadingSuggestions(true);
      setShowSuggestions(true);
      
      const searchTimer = setTimeout(async () => {
        try {
          const response = await productService.searchProducts(keyword, 6);
          
          if (response.success) {
            setSuggestions(response.data.suggestions);
            
            // Track search suggestions
            await analyticsService.trackUserAction('view_search_suggestions', {
              keyword,
              suggestionsCount: response.data.suggestions.length
            });
          }
        } catch (error) {
          console.error('Search Suggestions Error:', error);
          setSuggestions([]);
        } finally {
          setLoadingSuggestions(false);
        }
      }, 300);

      return () => clearTimeout(searchTimer);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
      setLoadingSuggestions(false);
    }
  }, [keyword]);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSuggestionClick = async (product) => {
    setKeyword(product.name);
    setShowSuggestions(false);
    
    // Track suggestion click
    await analyticsService.trackUserAction('click_search_suggestion', {
      productId: product.id,
      productName: product.name,
      searchKeyword: keyword
    });
    
    if (inputRef.current?.focus) {
      inputRef.current.focus();
    }
  };

  const handleInputFocus = () => {
    if (keyword && keyword.length > 0 && suggestions.length > 0) {
      setShowSuggestions(true);
    }
  };

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setKeyword(value);
    
    // Track search input
    if (value.length > 2) {
      await analyticsService.trackUserAction('search_input', {
        keyword: value,
        length: value.length
      });
    }
  };

  const highlightText = (text, searchTerm) => {
    if (!searchTerm) return text;
    
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} style={{ 
          background: 'linear-gradient(135deg, #3498db 0%, #2980b9 100%)',
          color: 'white',
          padding: '1px 3px',
          borderRadius: 3,
          fontWeight: 600
        }}>
          {part}
        </mark>
      ) : part
    );
  };

  const SuggestionSkeleton = () => (
    <div style={{ padding: '12px 16px', borderBottom: '1px solid #f0f0f0' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <Skeleton.Avatar size={40} />
        <div style={{ flex: 1 }}>
          <Skeleton.Input style={{ width: '70%', marginBottom: 4 }} size="small" active />
          <Skeleton.Input style={{ width: '50%', marginBottom: 4 }} size="small" active />
          <Skeleton.Input style={{ width: '40%' }} size="small" active />
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ marginBottom: 24 }}>
      <Space direction="vertical" size={16} style={{ width: '100%' }}>
        {/* Main Filter Bar */}
        <div style={{ 
          background: 'linear-gradient(135deg, #f8fafe 0%, #eef7ff 100%)',
          padding: '20px',
          borderRadius: 12,
          border: '1px solid #d6eaf8',
          boxShadow: '0 2px 8px rgba(52, 152, 219, 0.1)'
        }}>
          <Space size={16} wrap style={{ width: '100%' }}>
            {/* Search Input */}
            <div 
              ref={searchContainerRef}
              style={{ position: 'relative', flex: 1, minWidth: 250 }}
            >
              <Input
                ref={inputRef}
                placeholder="🔍 Tìm kiếm khóa học, giảng viên..."
                value={keyword}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                prefix={
                  loadingSuggestions ? 
                    <LoadingOutlined style={{ color: '#3498db' }} /> :
                    <SearchOutlined style={{ color: '#3498db' }} />
                }
                size="large"
                style={{
                  borderRadius: 8,
                  border: '2px solid #aed6f1',
                  fontSize: 16
                }}
                allowClear
                onClear={() => {
                  setKeyword('');
                  setShowSuggestions(false);
                }}
              />
              
              {/* Suggestions Dropdown */}
              {showSuggestions && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  right: 0,
                  zIndex: 1000,
                  marginTop: 4,
                  background: 'white',
                  borderRadius: 8,
                  border: '1px solid #d6eaf8',
                  boxShadow: '0 4px 20px rgba(52, 152, 219, 0.15)',
                  maxHeight: 400,
                  overflowY: 'auto'
                }}>
                  {loadingSuggestions ? (
                    <>
                      <div style={{
                        padding: '12px 16px',
                        background: '#f8fafe',
                        borderBottom: '1px solid #f0f0f0',
                        textAlign: 'center'
                      }}>
                        <Space>
                          <LoadingOutlined style={{ color: '#3498db' }} />
                          <Text style={{ color: '#3498db', fontSize: 13 }}>
                            Đang tìm kiếm...
                          </Text>
                        </Space>
                      </div>
                      {Array.from({ length: 3 }).map((_, index) => (
                        <SuggestionSkeleton key={index} />
                      ))}
                    </>
                  ) : suggestions.length > 0 ? (
                    <>
                      {suggestions.map((product) => (
                        <div
                          key={product.id}
                          style={{
                            padding: '12px 16px',
                            cursor: 'pointer',
                            borderBottom: '1px solid #f0f0f0',
                            transition: 'all 0.2s ease',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 12
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#f0f8ff';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'white';
                          }}
                          onClick={() => handleSuggestionClick(product)}
                        >
                          <div style={{
                            width: 40,
                            height: 40,
                            borderRadius: 6,
                            background: 'linear-gradient(135deg, #3498db 0%, #2980b9 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: 14,
                            fontWeight: 600,
                            flexShrink: 0
                          }}>
                            <BookOutlined />
                          </div>

                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ 
                              fontSize: 14, 
                              fontWeight: 600, 
                              marginBottom: 4,
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap'
                            }}>
                              {highlightText(product.name, keyword)}
                            </div>
                            
                            <div style={{ marginBottom: 4 }}>
                              <Space size={4}>
                                <Tag color="blue" size="small">
                                  {product.category}
                                </Tag>
                                <Tag color="green" size="small">
                                  👨‍🏫 {product.instructor}
                                </Tag>
                              </Space>
                            </div>
                            
                            <div style={{ fontSize: 12, color: '#666' }}>
                              {product.price.toLocaleString('vi-VN')}₫ • ⭐ {product.rating} • 👥 {product.students}
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      <div style={{
                        padding: '8px 16px',
                        background: '#f8fafe',
                        borderTop: '1px solid #f0f0f0',
                        textAlign: 'center'
                      }}>
                        <Text type="secondary" style={{ fontSize: 12 }}>
                          {suggestions.length} kết quả cho "{keyword}"
                        </Text>
                      </div>
                    </>
                  ) : keyword && !loadingSuggestions ? (
                    <div style={{
                      padding: '20px',
                      textAlign: 'center',
                      color: '#666'
                    }}>
                      <div style={{ fontSize: 32, marginBottom: 8 }}>🔍</div>
                      <Text type="secondary">
                        Không tìm thấy kết quả cho "{keyword}"
                      </Text>
                    </div>
                  ) : null}
                </div>
              )}
            </div>

            {/* Category Filter */}
            <Select
              placeholder="🏷️ Chọn lĩnh vực"
              value={category}
              onChange={setCategory}
              size="large"
              style={{ minWidth: 180 }}
              allowClear
            >
              <Option value="all">🌐 Tất cả lĩnh vực</Option>
              {categories.map(cat => (
                <Option key={cat} value={cat}>
                  {getCategoryIcon(cat)} {cat}
                </Option>
              ))}
            </Select>

            {/* Price Filter */}
            <Select
              placeholder="💰 Mức giá"
              value={priceRange}
              onChange={setPriceRange}
              size="large"
              style={{ minWidth: 160 }}
            >
              <Option value="all">💳 Tất cả mức giá</Option>
              <Option value="<500">💵 Dưới 500K</Option>
              <Option value="500-1000">💴 500K - 1M</Option>
              <Option value=">1000">💶 Trên 1M</Option>
            </Select>
          </Space>
        </div>

        {/* Filter Summary */}
        {(keyword || category !== 'all' || priceRange !== 'all') && (
          <div style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #f8fafe 100%)',
            padding: 12,
            borderRadius: 8,
            border: '1px solid #aed6f1'
          }}>
            <Space wrap>
              <FilterOutlined style={{ color: '#3498db' }} />
              <Text strong style={{ color: '#2980b9' }}>Bộ lọc hiện tại:</Text>
              
              {keyword && (
                <Tag 
                  color="blue" 
                  closable 
                  onClose={() => setKeyword('')}
                  style={{ borderRadius: 12 }}
                >
                  🔍 "{keyword}"
                </Tag>
              )}
              
              {category && category !== 'all' && (
                <Tag 
                  color="green" 
                  closable 
                  onClose={() => setCategory('all')}
                  style={{ borderRadius: 12 }}
                >
                  🏷️ {category}
                </Tag>
              )}
              
              {priceRange && priceRange !== 'all' && (
                <Tag 
                  color="orange" 
                  closable 
                  onClose={() => setPriceRange('all')}
                  style={{ borderRadius: 12 }}
                >
                  💰 {getPriceRangeText(priceRange)}
                </Tag>
              )}
            </Space>
          </div>
        )}
      </Space>
    </div>
  );
}

// Helper functions remain the same...
function getCategoryIcon(category) {
  const icons = {
    'Lập trình': '💻',
    'Data Science': '📊',
    'Tiếng Anh': '🇬🇧',
    'Marketing': '📈',
    'Kinh doanh': '💼',
    'Thiết kế': '🎨',
    'Kế toán': '📋',
    'Đầu tư': '💹',
    'Kỹ năng mềm': '💡',
    'Quản lý': '👑'
  };
  return icons[category] || '📚';
}

function getPriceRangeText(priceRange) {
  const texts = {
    '<500': 'Dưới 500K',
    '500-1000': '500K - 1M',
    '>1000': 'Trên 1M'
  };
  return texts[priceRange] || priceRange;
}
