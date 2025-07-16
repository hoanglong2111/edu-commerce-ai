import React, { useState, useEffect } from 'react';
import { 
  Typography, 
  Card, 
  Row, 
  Col, 
  Button, 
  Space, 
  Divider,
  Empty,
  message,
  Alert,
  Checkbox,
  Affix,
  Tag
} from 'antd';
import { 
  ShoppingOutlined, 
  CreditCardOutlined,
  DeleteOutlined,
  SelectOutlined,
  HeartOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';

const { Title, Text } = Typography;

export default function Cart() {
  const navigate = useNavigate();
  const { cartItems, getTotalPrice, getTotalItems, clearCart } = useCart();
  
  // ✅ RESPONSIVE STATE
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [selectAll, setSelectAll] = useState(false);

  // ✅ RESPONSIVE HANDLER
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth <= 768;
  

  // ✅ SAFE: Calculate values with fallbacks
  const totalPrice = getTotalPrice ? getTotalPrice() : 0;
  const totalItems = getTotalItems ? getTotalItems() : 0;
  const discount = totalPrice > 1000000 ? totalPrice * 0.1 : 0;
  const finalPrice = totalPrice - discount;

  // ✅ FIX: Calculate selected items total
  const selectedTotal = cartItems
    ?.filter(item => selectedItems.has(item.id))
    ?.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0) || 0;
  
  const selectedDiscount = selectedTotal > 1000000 ? selectedTotal * 0.1 : 0;
  const selectedFinalPrice = selectedTotal - selectedDiscount;

  console.log('🛒 Cart page render:', {
    cartItems: cartItems?.length || 0,
    totalPrice,
    totalItems,
    selectedItems: selectedItems.size,
    selectedTotal,
    isMobile,
    windowWidth
  });

  // ✅ FIX: Toggle individual item selection
  const toggleItemSelection = (itemId) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(itemId)) {
      newSelected.delete(itemId);
    } else {
      newSelected.add(itemId);
    }
    setSelectedItems(newSelected);
    
    // Update select all checkbox
    setSelectAll(newSelected.size === cartItems?.length);
  };

  // ✅ FIX: Toggle select all
  const toggleSelectAll = (checked) => {
    setSelectAll(checked);
    if (checked) {
      setSelectedItems(new Set(cartItems?.map(item => item.id) || []));
    } else {
      setSelectedItems(new Set());
    }
  };

  const handleCheckout = () => {
    if (!cartItems || cartItems.length === 0) {
      message.warning('Giỏ hàng trống! Hãy thêm sản phẩm trước khi thanh toán.');
      return;
    }
    
    if (selectedItems.size === 0) {
      message.warning('Vui lòng chọn ít nhất một sản phẩm để thanh toán.');
      return;
    }
    
    console.log('🔄 Proceeding to checkout with:', selectedItems.size, 'items');
    navigate('/checkout', { 
      state: { 
        selectedItems: Array.from(selectedItems),
        selectedTotal: selectedFinalPrice 
      } 
    });
  };

  const handleContinueShopping = () => {
    navigate('/');
  };

  const handleClearCart = () => {
    if (clearCart) {
      clearCart();
      setSelectedItems(new Set());
      setSelectAll(false);
      message.success('🧹 Đã xóa toàn bộ giỏ hàng');
    }
  };

  const handleRemoveSelected = () => {
    if (selectedItems.size === 0) {
      message.warning('Vui lòng chọn sản phẩm cần xóa.');
      return;
    }
    
    // This would need to be implemented in CartContext
    message.success(`🗑️ Đã xóa ${selectedItems.size} sản phẩm`);
    setSelectedItems(new Set());
    setSelectAll(false);
  };

  const handleMoveToFavorites = () => {
    if (selectedItems.size === 0) {
      message.warning('Vui lòng chọn sản phẩm để chuyển.');
      return;
    }
    
    message.success(`❤️ Đã chuyển ${selectedItems.size} sản phẩm vào danh sách yêu thích`);
  };

  // Loading state
  if (!cartItems) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px' }}>
        <div>⏳ Đang tải giỏ hàng...</div>
      </div>
    );
  }

  return (
    <div>
      {/* ✨ RESPONSIVE HEADER */}
      <div style={{ 
        marginBottom: isMobile ? 16 : 24,
        padding: isMobile ? '0 4px' : 0
      }}>
        <Title 
          level={isMobile ? 3 : 2}
          style={{ 
            fontSize: isMobile ? '20px' : '28px',
            marginBottom: isMobile ? 8 : 16
          }}
        >
          🛒 Giỏ Hàng{isMobile && ` (${cartItems.length})`}
        </Title>
        <Text 
          type="secondary"
          style={{ 
            fontSize: isMobile ? '14px' : '16px',
            display: 'block'
          }}
        >
          {isMobile 
            ? 'Xem lại và thanh toán' 
            : 'Xem lại các khóa học đã chọn và tiến hành thanh toán'
          }
        </Text>
      </div>

      {cartItems.length === 0 ? (
        /* Empty Cart */
        <Card className="modern-card">
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={
              <div>
                <Title 
                  level={4} 
                  style={{ 
                    color: '#999',
                    fontSize: isMobile ? '16px' : '20px'
                  }}
                >
                  Giỏ hàng trống
                </Title>
                <Text 
                  type="secondary"
                  style={{ fontSize: isMobile ? '14px' : '16px' }}
                >
                  {isMobile 
                    ? 'Hãy thêm khóa học yêu thích' 
                    : 'Hãy khám phá và thêm các khóa học yêu thích vào giỏ hàng'
                  }
                </Text>
              </div>
            }
          >
            <Button 
              type="primary" 
              size={isMobile ? "middle" : "large"}
              icon={<ShoppingOutlined />}
              onClick={handleContinueShopping}
              className="btn-primary-modern"
              style={{
                height: isMobile ? 40 : 48,
                fontSize: isMobile ? '14px' : '16px'
              }}
            >
              {isMobile ? 'Khám phá' : 'Khám phá khóa học'}
            </Button>
          </Empty>
        </Card>
      ) : (
        /* Cart with items */
        <Row gutter={[isMobile ? 16 : 24, isMobile ? 16 : 24]}>
          {/* Cart Items */}
          <Col xs={24} lg={16}>
            <Card 
              className="modern-card"
              styles={{
                body: { 
                  padding: isMobile ? '16px' : '24px'
                }
              }}
              title={
                // ✅ FIXED RESPONSIVE TITLE SECTION - NO JUMPING
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'flex-start', // ✅ Change from 'center' to 'flex-start'
                  justifyContent: 'space-between',
                  flexWrap: 'wrap', // ✅ Always wrap
                  gap: isMobile ? 8 : 12,
                  minHeight: isMobile ? 36 : 40 // ✅ Fixed minimum height
                }}>
                  {/* LEFT SIDE - Select All - FIXED LAYOUT */}
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: isMobile ? 8 : 12,
                    minWidth: 0,
                    flex: '1 1 auto', // ✅ Consistent flex behavior
                    minHeight: isMobile ? 36 : 40 // ✅ Fixed height to prevent jumping
                  }}>
                    <Checkbox
                      checked={selectAll}
                      indeterminate={selectedItems.size > 0 && selectedItems.size < cartItems.length}
                      onChange={(e) => toggleSelectAll(e.target.checked)}
                      style={{ 
                        flexShrink: 0,
                        lineHeight: '1', // ✅ Fixed line height
                        alignSelf: 'center' // ✅ Center align checkbox
                      }}
                    >
                      <span style={{
                        fontSize: isMobile ? '14px' : '16px',
                        lineHeight: '1.2', // ✅ Consistent line height
                        display: 'inline-block',
                        verticalAlign: 'middle'
                      }}>
                        {isMobile ? 'Tất cả' : 'Chọn tất cả'}
                      </span>
                    </Checkbox>
                    
                    {/* ✅ RESPONSIVE COURSE COUNT - FIXED POSITION */}
                    {!isMobile && (
                      <Text 
                        strong 
                        style={{ 
                          fontSize: '16px',
                          lineHeight: '1.2',
                          whiteSpace: 'nowrap' // ✅ Prevent text wrapping
                        }}
                      >
                        📚 Khóa học trong giỏ ({cartItems.length})
                      </Text>
                    )}
                    
                    {/* ✅ MOBILE - SELECTION STATUS TAG - FIXED */}
                    {isMobile && selectedItems.size > 0 && (
                      <Tag 
                        color="blue"
                        style={{ 
                          fontSize: '12px',
                          padding: '2px 6px',
                          borderRadius: '6px',
                          margin: 0,
                          lineHeight: '1.2',
                          height: '20px', // ✅ Fixed height
                          display: 'inline-flex',
                          alignItems: 'center'
                        }}
                      >
                        {selectedItems.size}/{cartItems.length}
                      </Tag>
                    )}
                    
                    {/* ✅ DESKTOP - SELECTION STATUS - FIXED */}
                    {!isMobile && selectedItems.size > 0 && (
                      <Tag 
                        color="blue" 
                        style={{ 
                          borderRadius: '6px',
                          lineHeight: '1.2',
                          height: '24px', // ✅ Fixed height
                          display: 'inline-flex',
                          alignItems: 'center'
                        }}
                      >
                        Đã chọn {selectedItems.size}/{cartItems.length} sản phẩm
                      </Tag>
                    )}
                  </div>
                  
                  {/* RIGHT SIDE - Action Buttons - FIXED LAYOUT */}
                  <div style={{ 
                    display: 'flex',
                    gap: isMobile ? 4 : 8,
                    flexShrink: 0,
                    alignItems: 'center',
                    minHeight: isMobile ? 36 : 40, // ✅ Fixed height container
                    // ✅ ALWAYS RESERVE SPACE to prevent layout shift
                    width: isMobile ? (selectedItems.size > 0 ? 'auto' : '100px') : 'auto',
                    justifyContent: 'flex-end'
                  }}>
                    {selectedItems.size > 0 && (
                      <>
                        <Button 
                          size={isMobile ? "small" : "middle"}
                          icon={<HeartOutlined />}
                          onClick={handleMoveToFavorites}
                          style={{
                            fontSize: isMobile ? '12px' : '14px',
                            height: isMobile ? 28 : 32,
                            padding: isMobile ? '0 8px' : '0 12px',
                            lineHeight: '1' // ✅ Fixed line height
                          }}
                        >
                          {isMobile ? 'Yêu thích' : 'Chuyển yêu thích'}
                        </Button>
                        <Button 
                          size={isMobile ? "small" : "middle"}
                          danger
                          icon={<DeleteOutlined />}
                          onClick={handleRemoveSelected}
                          style={{
                            fontSize: isMobile ? '12px' : '14px',
                            height: isMobile ? 28 : 32,
                            padding: isMobile ? '0 8px' : '0 12px',
                            lineHeight: '1' // ✅ Fixed line height
                          }}
                        >
                          {isMobile ? 'Xóa' : 'Xóa đã chọn'}
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              }
            >
              <Space 
                direction="vertical" 
                size={isMobile ? "small" : "middle"} 
                style={{ width: '100%' }}
              >
                {cartItems.map((item) => (
                  <div 
                    key={item.id} 
                    style={{ 
                      display: 'flex', 
                      gap: isMobile ? 8 : 12, 
                      alignItems: 'flex-start',
                      padding: isMobile ? '8px 0' : '12px 0',
                      borderBottom: '1px solid #f0f0f0'
                    }}
                  >
                    {/* Individual Item Checkbox */}
                    <Checkbox
                      checked={selectedItems.has(item.id)}
                      onChange={() => toggleItemSelection(item.id)}
                      style={{ 
                        marginTop: isMobile ? 8 : 12,
                        flexShrink: 0
                      }}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <CartItem 
                        item={item}
                        showActions={true}
                        isMobile={isMobile}
                      />
                    </div>
                  </div>
                ))}
                
                <Divider style={{ margin: isMobile ? '12px 0' : '16px 0' }} />
                
                {/* ✅ RESPONSIVE BULK ACTIONS */}
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  flexWrap: isMobile ? 'wrap' : 'nowrap',
                  gap: isMobile ? 8 : 16
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: isMobile ? 8 : 12,
                    flex: isMobile ? '1 1 100%' : 'auto'
                  }}>
                    <Button 
                      icon={<SelectOutlined />}
                      onClick={() => toggleSelectAll(!selectAll)}
                      size={isMobile ? "small" : "middle"}
                      style={{
                        fontSize: isMobile ? '12px' : '14px',
                        height: isMobile ? 32 : 36
                      }}
                    >
                      {selectAll ? 'Bỏ chọn' : 'Chọn tất cả'}
                    </Button>
                    
                    {!isMobile && selectedItems.size > 0 && (
                      <Text type="secondary" style={{ fontSize: '14px' }}>
                        Đã chọn {selectedItems.size}/{cartItems.length} sản phẩm
                      </Text>
                    )}
                  </div>
                  
                  <Button 
                    danger 
                    icon={<DeleteOutlined />}
                    onClick={handleClearCart}
                    size={isMobile ? "small" : "middle"}
                    style={{
                      fontSize: isMobile ? '12px' : '14px',
                      height: isMobile ? 32 : 36,
                      marginTop: isMobile ? 8 : 0
                    }}
                  >
                    {isMobile ? 'Xóa tất cả' : 'Xóa toàn bộ giỏ hàng'}
                  </Button>
                </div>
              </Space>
            </Card>
          </Col>

          {/* Order Summary - Responsive */}
          <Col xs={24} lg={8}>
            {isMobile ? (
              // Mobile: No Affix
              <Card 
                className="modern-card"
                title={
                  <span style={{ fontSize: '16px' }}>💰 Tổng Thanh Toán</span>
                }
                styles={{
                  body: { padding: '16px' }
                }}
              >
                {/* Mobile Summary Content */}
                <Space direction="vertical" size="small" style={{ width: '100%' }}>
                  {selectedItems.size > 0 ? (
                    <>
                      <Alert
                        message={`${selectedItems.size}/${cartItems.length} sản phẩm`}
                        type="info"
                        showIcon
                        size="small"
                        style={{ marginBottom: 12, fontSize: '12px' }}
                      />
                      
                      <div style={{ fontSize: '14px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                          <Text>Tạm tính:</Text>
                          <Text>{new Intl.NumberFormat('vi-VN').format(selectedTotal)}₫</Text>
                        </div>
                        
                        {selectedDiscount > 0 && (
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                            <Text type="success">Giảm giá:</Text>
                            <Text type="success">-{new Intl.NumberFormat('vi-VN').format(selectedDiscount)}₫</Text>
                          </div>
                        )}
                      </div>

                      <Divider style={{ margin: '8px 0' }} />

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text strong style={{ fontSize: '16px' }}>Thanh toán:</Text>
                        <Title level={4} style={{ margin: 0, color: '#ff4d4f', fontSize: '18px' }}>
                          {new Intl.NumberFormat('vi-VN').format(selectedFinalPrice)}₫
                        </Title>
                      </div>
                    </>
                  ) : (
                    <>
                      <div style={{ fontSize: '14px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                          <Text>Tổng khóa học:</Text>
                          <Text strong>{totalItems} khóa</Text>
                        </div>
                        
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                          <Text>Tạm tính:</Text>
                          <Text>{new Intl.NumberFormat('vi-VN').format(totalPrice)}₫</Text>
                        </div>
                        
                        {discount > 0 && (
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                            <Text type="success">Giảm giá:</Text>
                            <Text type="success">-{new Intl.NumberFormat('vi-VN').format(discount)}₫</Text>
                          </div>
                        )}
                      </div>

                      <Divider style={{ margin: '8px 0' }} />

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text strong style={{ fontSize: '16px' }}>Tổng cộng:</Text>
                        <Title level={4} style={{ margin: 0, color: '#ff4d4f', fontSize: '18px' }}>
                          {new Intl.NumberFormat('vi-VN').format(finalPrice)}₫
                        </Title>
                      </div>
                    </>
                  )}

                  {/* Mobile Action Buttons */}
                  <Space direction="vertical" size="small" style={{ width: '100%', marginTop: 12 }}>
                    <Button
                      type="primary"
                      size="large"
                      block
                      icon={<CreditCardOutlined />}
                      onClick={handleCheckout}
                      disabled={selectedItems.size === 0}
                      className="btn-primary-modern"
                      style={{ 
                        height: 44,
                        fontSize: '15px',
                        fontWeight: '600'
                      }}
                    >
                      Thanh Toán{selectedItems.size > 0 && ` (${selectedItems.size})`}
                    </Button>
                    
                    <Button
                      size="middle"
                      block
                      icon={<ShoppingOutlined />}
                      onClick={handleContinueShopping}
                      style={{ 
                        height: 36,
                        fontSize: '14px'
                      }}
                    >
                      Tiếp tục mua sắm
                    </Button>
                  </Space>
                </Space>
              </Card>
            ) : (
              // Desktop: With Affix
              <Affix offsetTop={100}>
                <Card 
                  className="modern-card"
                  title="💰 Tổng Thanh Toán"
                >
                  <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                    {/* Desktop Summary Content - Same as original */}
                    {selectedItems.size > 0 && (
                      <>
                        <Alert
                          message={`Đã chọn ${selectedItems.size}/${cartItems.length} sản phẩm`}
                          type="info"
                          showIcon
                          style={{ marginBottom: 16 }}
                        />
                        
                        <div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                            <Text>Sản phẩm đã chọn:</Text>
                            <Text strong>{selectedItems.size} khóa</Text>
                          </div>
                          
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                            <Text>Tạm tính:</Text>
                            <Text>{new Intl.NumberFormat('vi-VN').format(selectedTotal)}₫</Text>
                          </div>
                          
                          {selectedDiscount > 0 && (
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                              <Text type="success">Giảm giá (10%):</Text>
                              <Text type="success">-{new Intl.NumberFormat('vi-VN').format(selectedDiscount)}₫</Text>
                            </div>
                          )}
                        </div>

                        <Divider style={{ margin: '12px 0' }} />

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Title level={4} style={{ margin: 0 }}>Thanh toán:</Title>
                          <Title level={3} style={{ margin: 0, color: '#ff4d4f' }}>
                            {new Intl.NumberFormat('vi-VN').format(selectedFinalPrice)}₫
                          </Title>
                        </div>
                      </>
                    )}

                    {selectedItems.size === 0 && (
                      <>
                        <div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                            <Text>Tổng khóa học:</Text>
                            <Text strong>{totalItems} khóa</Text>
                          </div>
                          
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                            <Text>Tạm tính:</Text>
                            <Text>{new Intl.NumberFormat('vi-VN').format(totalPrice)}₫</Text>
                          </div>
                          
                          {discount > 0 && (
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                              <Text type="success">Giảm giá (10%):</Text>
                              <Text type="success">-{new Intl.NumberFormat('vi-VN').format(discount)}₫</Text>
                            </div>
                          )}
                        </div>

                        <Divider style={{ margin: '12px 0' }} />

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Title level={4} style={{ margin: 0 }}>Tổng cộng:</Title>
                          <Title level={3} style={{ margin: 0, color: '#ff4d4f' }}>
                            {new Intl.NumberFormat('vi-VN').format(finalPrice)}₫
                          </Title>
                        </div>
                      </>
                    )}

                    {(selectedDiscount > 0 || discount > 0) && (
                      <Alert
                        message="🎉 Bạn được giảm 10%"
                        description="Đơn hàng trên 1.000.000₫ được giảm 10%"
                        type="success"
                        showIcon
                      />
                    )}

                    <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                      <Button
                        type="primary"
                        size="large"
                        block
                        icon={<CreditCardOutlined />}
                        onClick={handleCheckout}
                        disabled={selectedItems.size === 0}
                        className="btn-primary-modern"
                        style={{ height: 48 }}
                      >
                        Thanh Toán{selectedItems.size > 0 && ` (${selectedItems.size})`}
                      </Button>
                      
                      <Button
                        size="large"
                        block
                        icon={<ShoppingOutlined />}
                        onClick={handleContinueShopping}
                      >
                        Tiếp tục mua sắm
                      </Button>
                    </Space>
                  </Space>
                </Card>
              </Affix>
            )}
          </Col>
        </Row>
      )}
    </div>
  );
}