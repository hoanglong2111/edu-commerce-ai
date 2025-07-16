import React from 'react';
import { 
  Card, 
  Row, 
  Col, 
  Typography, 
  Button, 
  Space, 
  InputNumber,
  Image,
  Tag,
  Divider,
  Tooltip
} from 'antd';
import { 
  DeleteOutlined, 
  HeartOutlined, 
  StarFilled,
  ClockCircleOutlined,
  UserOutlined,
  PlayCircleOutlined
} from '@ant-design/icons';
import { useCart } from '../context/CartContext';

const { Title, Text } = Typography;

export default function CartItem({ item, showActions = true }) {
  const { removeFromCart, updateQuantity } = useCart();

  const handleRemove = () => {
    if (removeFromCart) {
      removeFromCart(item.id);
    }
  };

  const handleQuantityChange = (newQuantity) => {
    if (updateQuantity && newQuantity > 0) {
      updateQuantity(item.id, newQuantity);
    } else if (newQuantity === 0) {
      handleRemove();
    }
  };

  // ✅ SAFE: Default values for missing properties
  const safeItem = {
    id: item?.id || 'unknown',
    name: item?.name || 'Khóa học',
    price: item?.price || 0,
    originalPrice: item?.originalPrice || item?.price || 0,
    image: item?.image || '/api/placeholder/300/200',
    instructor: item?.instructor || 'Giảng viên',
    rating: item?.rating || 4.5,
    duration: item?.duration || '10 giờ',
    lessons: item?.lessons || 20,
    level: item?.level || 'Cơ bản',
    category: item?.category || 'Lập trình',
    quantity: item?.quantity || 1,
    discount: item?.discount || 0,
    ...item
  };

  const discountPercent = safeItem.originalPrice > safeItem.price 
    ? Math.round(((safeItem.originalPrice - safeItem.price) / safeItem.originalPrice) * 100)
    : 0;

  console.log('🛒 CartItem render:', {
    id: safeItem.id,
    name: safeItem.name,
    price: safeItem.price,
    quantity: safeItem.quantity
  });

  return (
    <Card 
      className="modern-card"
      styles={{
        body: { padding: 0 }
      }}
      style={{
        marginBottom: 16,
        overflow: 'hidden',
        transition: 'all 0.3s ease'
      }}
    >
      <Row>
        {/* Course Image */}
        <Col xs={24} sm={8} md={6}>
          <div style={{ 
            position: 'relative',
            height: '160px',
            overflow: 'hidden'
          }}>
            <Image
              src={safeItem.image}
              alt={safeItem.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
              preview={false}
              fallback="/api/placeholder/300/200"
            />
            
            {/* Discount Badge */}
            {discountPercent > 0 && (
              <div style={{
                position: 'absolute',
                top: 12,
                left: 12,
                background: 'linear-gradient(135deg, #ff4757 0%, #ff3838 100%)',
                color: 'white',
                padding: '4px 8px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: 'bold'
              }}>
                -{discountPercent}%
              </div>
            )}

            {/* Play Button Overlay */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              background: 'rgba(0, 0, 0, 0.6)',
              borderRadius: '50%',
              width: 48,
              height: 48,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '20px'
            }}>
              <PlayCircleOutlined />
            </div>
          </div>
        </Col>

        {/* Course Info */}
        <Col xs={24} sm={16} md={18}>
          <div style={{ padding: '20px 24px' }}>
            <Row gutter={[16, 16]}>
              {/* Main Content */}
              <Col xs={24} lg={16}>
                <Space direction="vertical" size="small" style={{ width: '100%' }}>
                  {/* Category & Level */}
                  <Space>
                    <Tag color="blue" style={{ borderRadius: '6px' }}>
                      {safeItem.category}
                    </Tag>
                    <Tag color="green" style={{ borderRadius: '6px' }}>
                      {safeItem.level}
                    </Tag>
                  </Space>

                  {/* Course Title */}
                  <Title 
                    level={4} 
                    style={{ 
                      margin: 0,
                      lineHeight: 1.3,
                      color: '#1e293b'
                    }}
                    ellipsis={{ rows: 2 }}
                  >
                    {safeItem.name}
                  </Title>

                  {/* Instructor */}
                  <Space>
                    <UserOutlined style={{ color: '#64748b' }} />
                    <Text type="secondary">{safeItem.instructor}</Text>
                  </Space>

                  {/* Course Stats */}
                  <Space split={<Divider type="vertical" />}>
                    <Space>
                      <StarFilled style={{ color: '#fbbf24' }} />
                      <Text strong>{safeItem.rating}</Text>
                    </Space>
                    <Space>
                      <ClockCircleOutlined style={{ color: '#64748b' }} />
                      <Text type="secondary">{safeItem.duration}</Text>
                    </Space>
                    <Space>
                      <PlayCircleOutlined style={{ color: '#64748b' }} />
                      <Text type="secondary">{safeItem.lessons} bài học</Text>
                    </Space>
                  </Space>
                </Space>
              </Col>

              {/* Price & Actions */}
              <Col xs={24} lg={8}>
                <div style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'flex-end',
                  height: '100%',
                  justifyContent: 'space-between'
                }}>
                  {/* Price Section */}
                  <div style={{ textAlign: 'right', marginBottom: 16 }}>
                    <div>
                      <Title 
                        level={4} 
                        style={{ 
                          margin: 0,
                          color: '#dc2626',
                          fontWeight: 700
                        }}
                      >
                        {new Intl.NumberFormat('vi-VN').format(safeItem.price)}₫
                      </Title>
                      {safeItem.originalPrice > safeItem.price && (
                        <Text 
                          delete 
                          type="secondary" 
                          style={{ fontSize: '14px' }}
                        >
                          {new Intl.NumberFormat('vi-VN').format(safeItem.originalPrice)}₫
                        </Text>
                      )}
                    </div>
                    
                    {/* Quantity for physical products (if needed) */}
                    {safeItem.quantity > 1 && (
                      <div style={{ marginTop: 8 }}>
                        <Text type="secondary" style={{ fontSize: '12px' }}>
                          Số lượng: {safeItem.quantity}
                        </Text>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  {showActions && (
                    <Space direction="vertical" style={{ width: '100%' }}>
                      {/* Quantity Control (if applicable) */}
                      {safeItem.type !== 'course' && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <Text style={{ fontSize: '14px' }}>Số lượng:</Text>
                          <InputNumber
                            size="small"
                            min={1}
                            max={10}
                            value={safeItem.quantity}
                            onChange={handleQuantityChange}
                            style={{ width: 70 }}
                          />
                        </div>
                      )}

                      {/* Action Buttons */}
                      <Space>
                        <Tooltip title="Thêm vào yêu thích">
                          <Button
                            type="text"
                            icon={<HeartOutlined />}
                            style={{
                              borderRadius: '8px',
                              color: '#64748b'
                            }}
                          />
                        </Tooltip>
                        
                        <Tooltip title="Xóa khỏi giỏ hàng">
                          <Button
                            type="text"
                            danger
                            icon={<DeleteOutlined />}
                            onClick={handleRemove}
                            style={{
                              borderRadius: '8px'
                            }}
                          />
                        </Tooltip>
                      </Space>
                    </Space>
                  )}
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </Card>
  );
}