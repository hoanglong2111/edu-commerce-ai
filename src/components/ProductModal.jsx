import { Modal, Button, Row, Col, Typography, Tag, Space, Rate, Card, List, Avatar } from 'antd';
import { 
  ShoppingCartOutlined, 
  HeartOutlined, 
  HeartFilled,
  UserOutlined, 
  ClockCircleOutlined, 
  BookOutlined,
  PlayCircleOutlined,
  CheckOutlined,
  StarFilled,
  TrophyOutlined,
  TeamOutlined,
  CalendarOutlined
} from '@ant-design/icons';
import { useState } from 'react';

const { Title, Text, Paragraph } = Typography;

export default function ProductModal({ visible, product, onClose, onAddToCart, onTrial }) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) return null;

  // Mock additional data for detailed view
  const courseDetails = {
    syllabus: [
      { title: "Giới thiệu khóa học", duration: "15 phút", lessons: 3 },
      { title: "Kiến thức cơ bản", duration: "2 giờ 30 phút", lessons: 8 },
      { title: "Thực hành nâng cao", duration: "3 giờ 45 phút", lessons: 12 },
      { title: "Dự án thực tế", duration: "4 giờ", lessons: 15 },
      { title: "Tổng kết và chứng chỉ", duration: "30 phút", lessons: 2 }
    ],
    skills: [
      "Nắm vững kiến thức cơ bản",
      "Thực hành với dự án thật", 
      "Kỹ năng giải quyết vấn đề",
      "Chuẩn bị cho công việc thực tế"
    ],
    requirements: [
      "Không cần kinh nghiệm trước đó",
      "Máy tính có kết nối internet",
      "Tinh thần học hỏi và kiên trì"
    ],
    reviews: [
      {
        name: "Nguyễn Văn A",
        rating: 5,
        comment: "Khóa học rất hay, giảng viên dễ hiểu, tài liệu phong phú!",
        date: "2 ngày trước"
      },
      {
        name: "Trần Thị B", 
        rating: 4,
        comment: "Nội dung chất lượng, phù hợp cho người mới bắt đầu.",
        date: "1 tuần trước"
      },
      {
        name: "Lê Văn C",
        rating: 5,
        comment: "Đáng đồng tiền bát gạo, học xong có thể apply ngay vào công việc.",
        date: "2 tuần trước"
      }
    ],
    images: [
      product.image,
      "https://via.placeholder.com/600x400?text=Course+Preview+2",
      "https://via.placeholder.com/600x400?text=Course+Preview+3",
      "https://via.placeholder.com/600x400?text=Course+Preview+4"
    ]
  };

  const handleFavoriteToggle = () => {
    setIsFavorited(!isFavorited);
    // Logic save to localStorage here
  };

  const freeChapters = product.trialChapters?.filter(ch => !ch.isLocked).length || 0;

  return (
    <Modal
      title={null}
      open={visible}
      onCancel={onClose}
      footer={null}
      width={1200}
      style={{ top: 20 }}
      className="product-detail-modal"
      styles={{
        content: {
          background: 'linear-gradient(135deg, #1d4ed8 0%, #2563eb 50%, #3b82f6 100%)',
          borderRadius: '12px',
          overflow: 'hidden',
          border: '1px solid rgba(59, 130, 246, 0.3)',
          boxShadow: '0 20px 50px rgba(29, 78, 216, 0.3)',
          padding: 0
        },
        header: {
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          color: 'white',
          borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '12px 12px 0 0',
          padding: '20px 24px'
        },
        body: {
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          color: '#1e293b',
          padding: 0,
          margin: 0
        }
      }}
    >
      <div>
        {/* Header với gradient */}
        <div style={{
          background: 'linear-gradient(135deg, #1d4ed8 0%, #2563eb 50%, #3b82f6 100%)', // ✅ Same as header/footer
          color: 'white',
          padding: '24px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '200px',
            height: '200px',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '50%',
            transform: 'translate(50px, -50px)'
          }} />
          
          <Row gutter={[24, 24]} align="middle">
            <Col xs={24} md={16}>
              <Space direction="vertical" size={8}>
                <Tag 
                  style={{ 
                    fontSize: 12, 
                    fontWeight: 600,
                    background: 'rgba(255, 255, 255, 0.9)', // ✅ White glass tag
                    color: '#1d4ed8',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)'
                  }}
                >
                  🏆 KHÓA HỌC CHẤT LƯỢNG CAO
                </Tag>
                <Title level={2} style={{ 
                  color: 'white', 
                  margin: 0,
                  textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' // ✅ Text shadow for contrast
                }}>
                  {product.name}
                </Title>
                <Text style={{ 
                  color: 'rgba(255,255,255,0.9)', 
                  fontSize: 16,
                  textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)' // ✅ Text shadow
                }}>
                  {product.shortDesc}
                </Text>
                <Space wrap>
                  <Tag icon={<UserOutlined />} style={{
                    background: 'rgba(255, 255, 255, 0.15)',
                    color: 'white',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)'
                  }}>
                    👨‍🏫 {product.instructor}
                  </Tag>
                  <Tag icon={<StarFilled />} style={{
                    background: 'rgba(251, 191, 36, 0.2)',
                    color: '#fbbf24',
                    border: '1px solid rgba(251, 191, 36, 0.3)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)'
                  }}>
                    ⭐ {product.rating}/5 ({Math.floor(Math.random() * 1000 + 500)} đánh giá)
                  </Tag>
                  <Tag icon={<TeamOutlined />} style={{
                    background: 'rgba(34, 197, 94, 0.2)',
                    color: '#22c55e',
                    border: '1px solid rgba(34, 197, 94, 0.3)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)'
                  }}>
                    👥 {product.students} học viên
                  </Tag>
                  <Tag icon={<ClockCircleOutlined />} style={{
                    background: 'rgba(249, 115, 22, 0.2)',
                    color: '#f97316',
                    border: '1px solid rgba(249, 115, 22, 0.3)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)'
                  }}>
                    ⏱️ {product.duration}
                  </Tag>
                </Space>
              </Space>
            </Col>
            <Col xs={24} md={8} style={{ textAlign: 'right' }}>
              <div style={{
                background: 'rgba(255,255,255,0.2)', // ✅ Glass white
                padding: '20px',
                borderRadius: 12,
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.3)'
              }}>
                <Title level={1} style={{ 
                  color: 'white', 
                  margin: 0, 
                  fontSize: 36,
                  textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' // ✅ Text shadow
                }}>
                  {product.price.toLocaleString('vi-VN')}₫
                </Title>
                <Text style={{ 
                  color: 'rgba(255,255,255,0.8)',
                  textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)' // ✅ Text shadow
                }}>
                  💳 Một lần thanh toán, học mãi mãi
                </Text>
              </div>
            </Col>
          </Row>
        </div>

        {/* Content với White Glass Background */}
        <div style={{ 
          padding: '24px',
          background: 'rgba(255, 255, 255, 0.95)', // ✅ White glass
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)'
        }}>
          <Row gutter={[24, 24]}>
            {/* Left Column - Images & Videos */}
            <Col xs={24} lg={14}>
              {/* Main Image */}
              <div style={{ marginBottom: 24 }}>
                <div style={{
                  width: '100%',
                  height: 400,
                  borderRadius: 12,
                  overflow: 'hidden',
                  border: '1px solid rgba(29, 78, 216, 0.2)', // ✅ Blue border
                  boxShadow: '0 4px 20px rgba(29, 78, 216, 0.1)', // ✅ Blue shadow
                  position: 'relative'
                }}>
                  <img
                    src={courseDetails.images[selectedImage]}
                    alt={product.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                  
                  {/* Play overlay for trial */}
                  {product.hasTrialContent && (
                    <div style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      background: 'rgba(29, 78, 216, 0.9)', // ✅ Blue overlay
                      borderRadius: '50%',
                      width: 80,
                      height: 80,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      backdropFilter: 'blur(10px)',
                      WebkitBackdropFilter: 'blur(10px)'
                    }}
                    onClick={() => onTrial && onTrial(product)}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translate(-50%, -50%) scale(1.1)';
                      e.target.style.background = 'rgba(37, 99, 235, 0.9)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translate(-50%, -50%) scale(1)';
                      e.target.style.background = 'rgba(29, 78, 216, 0.9)';
                    }}
                    >
                      <PlayCircleOutlined style={{ fontSize: 40, color: 'white' }} />
                    </div>
                  )}
                  
                  {/* Trial badge */}
                  {product.hasTrialContent && (
                    <div style={{
                      position: 'absolute',
                      top: 16,
                      left: 16,
                      background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)', // ✅ Green gradient
                      color: 'white',
                      padding: '8px 12px',
                      borderRadius: 20,
                      fontSize: 14,
                      fontWeight: 600,
                      boxShadow: '0 2px 8px rgba(34, 197, 94, 0.3)',
                      backdropFilter: 'blur(10px)',
                      WebkitBackdropFilter: 'blur(10px)'
                    }}>
                      🎬 {freeChapters} chương miễn phí
                    </div>
                  )}
                </div>

                {/* Thumbnail gallery */}
                <div style={{ marginTop: 16, display: 'flex', gap: 8, overflowX: 'auto' }}>
                  {courseDetails.images.map((img, index) => (
                    <div
                      key={index}
                      style={{
                        width: 80,
                        height: 60,
                        borderRadius: 6,
                        overflow: 'hidden',
                        cursor: 'pointer',
                        border: selectedImage === index ? '3px solid #1d4ed8' : '1px solid #e2e8f0', // ✅ Blue selection
                        flexShrink: 0,
                        transition: 'all 0.2s ease'
                      }}
                      onClick={() => setSelectedImage(index)}
                    >
                      <img
                        src={img}
                        alt={`Preview ${index + 1}`}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Course Description */}
              <Card 
                title="📖 Mô tả khóa học" 
                style={{ 
                  marginBottom: 24,
                  background: 'rgba(255, 255, 255, 0.8)',
                  backdropFilter: 'blur(15px)',
                  WebkitBackdropFilter: 'blur(15px)',
                  border: '1px solid rgba(29, 78, 216, 0.1)',
                  borderRadius: '12px'
                }}
                headStyle={{
                  background: 'rgba(29, 78, 216, 0.05)',
                  color: '#1d4ed8',
                  fontWeight: '700'
                }}
              >
                <Paragraph style={{ fontSize: 16, lineHeight: 1.6, color: '#475569' }}>
                  {product.fullDesc}
                </Paragraph>
                
                <Title level={4} style={{ color: '#1d4ed8' }}>🎯 Bạn sẽ học được gì:</Title>
                <List
                  dataSource={courseDetails.skills}
                  renderItem={(skill) => (
                    <List.Item style={{ padding: '8px 0', border: 'none' }}>
                      <Space>
                        <CheckOutlined style={{ color: '#22c55e', fontSize: 16 }} />
                        <Text style={{ fontSize: 15, color: '#475569' }}>{skill}</Text>
                      </Space>
                    </List.Item>
                  )}
                />

                <Title level={4} style={{ marginTop: 24, color: '#1d4ed8' }}>📋 Yêu cầu khóa học:</Title>
                <List
                  dataSource={courseDetails.requirements}
                  renderItem={(req) => (
                    <List.Item style={{ padding: '8px 0', border: 'none' }}>
                      <Space>
                        <BookOutlined style={{ color: '#1d4ed8', fontSize: 16 }} />
                        <Text style={{ fontSize: 15, color: '#475569' }}>{req}</Text>
                      </Space>
                    </List.Item>
                  )}
                />
              </Card>

              {/* Reviews */}
              <Card 
                title="⭐ Đánh giá học viên" 
                style={{ 
                  marginBottom: 24,
                  background: 'rgba(255, 255, 255, 0.8)',
                  backdropFilter: 'blur(15px)',
                  WebkitBackdropFilter: 'blur(15px)',
                  border: '1px solid rgba(29, 78, 216, 0.1)',
                  borderRadius: '12px'
                }}
                headStyle={{
                  background: 'rgba(29, 78, 216, 0.05)',
                  color: '#1d4ed8',
                  fontWeight: '700'
                }}
              >
                <div style={{ marginBottom: 16 }}>
                  <Row gutter={16} align="middle">
                    <Col>
                      <Title level={2} style={{ margin: 0, color: '#1d4ed8' }}>
                        {product.rating}
                      </Title>
                    </Col>
                    <Col>
                      <Rate disabled defaultValue={product.rating} style={{ fontSize: 20, color: '#fbbf24' }} />
                      <div>
                        <Text type="secondary" style={{ color: '#64748b' }}>
                          {Math.floor(Math.random() * 1000 + 500)} đánh giá
                        </Text>
                      </div>
                    </Col>
                  </Row>
                </div>

                <List
                  dataSource={courseDetails.reviews}
                  renderItem={(review) => (
                    <List.Item style={{ alignItems: 'flex-start' }}>
                      <List.Item.Meta
                        avatar={
                          <Avatar 
                            style={{ 
                              background: 'linear-gradient(135deg, #1d4ed8 0%, #3b82f6 100%)' // ✅ Blue gradient
                            }}
                          >
                            {review.name.charAt(0)}
                          </Avatar>
                        }
                        title={
                          <div>
                            <Text strong style={{ color: '#1e293b' }}>{review.name}</Text>
                            <Rate 
                              disabled 
                              defaultValue={review.rating} 
                              style={{ marginLeft: 8, fontSize: 14, color: '#fbbf24' }} 
                            />
                          </div>
                        }
                        description={
                          <div>
                            <Paragraph style={{ margin: '8px 0', color: '#475569' }}>
                              {review.comment}
                            </Paragraph>
                            <Text style={{ fontSize: 12, color: '#64748b' }}>
                              <CalendarOutlined /> {review.date}
                            </Text>
                          </div>
                        }
                      />
                    </List.Item>
                  )}
                />
              </Card>
            </Col>

            {/* Right Column - Course Info & Actions */}
            <Col xs={24} lg={10}>
              {/* Action Buttons */}
              <Card style={{ 
                marginBottom: 24, 
                border: '2px solid #1d4ed8',
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(15px)',
                WebkitBackdropFilter: 'blur(15px)',
                borderRadius: '12px'
              }}>
                <Space direction="vertical" size={16} style={{ width: '100%' }}>
                  <Button
                    type="primary"
                    size="large"
                    icon={<ShoppingCartOutlined />}
                    onClick={() => onAddToCart(product)}
                    block
                    style={{
                      height: 50,
                      fontSize: 16,
                      fontWeight: 600,
                      background: 'linear-gradient(135deg, #1d4ed8 0%, #3b82f6 100%)', // ✅ Blue gradient
                      border: 'none',
                      borderRadius: '10px',
                      boxShadow: '0 4px 15px rgba(29, 78, 216, 0.3)'
                    }}
                  >
                    🛒 Thêm vào giỏ hàng
                  </Button>

                  {product.hasTrialContent && (
                    <Button
                      size="large"
                      icon={<PlayCircleOutlined />}
                      onClick={() => onTrial && onTrial(product)}
                      block
                      style={{
                        height: 50,
                        fontSize: 16,
                        fontWeight: 600,
                        background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)', // ✅ Green gradient
                        color: 'white',
                        border: 'none',
                        borderRadius: '10px',
                        boxShadow: '0 4px 15px rgba(34, 197, 94, 0.3)'
                      }}
                    >
                      🎬 Dùng thử miễn phí ({freeChapters} chương)
                    </Button>
                  )}

                  <Button
                    size="large"
                    icon={isFavorited ? <HeartFilled /> : <HeartOutlined />}
                    onClick={handleFavoriteToggle}
                    block
                    style={{
                      height: 44,
                      fontSize: 15,
                      color: isFavorited ? '#ef4444' : '#64748b',
                      borderColor: isFavorited ? '#ef4444' : '#e2e8f0',
                      background: 'rgba(255, 255, 255, 0.8)',
                      borderRadius: '8px'
                    }}
                  >
                    {isFavorited ? '💖 Đã yêu thích' : '🤍 Thêm vào yêu thích'}
                  </Button>
                </Space>
              </Card>

              {/* Course Stats */}
              <Card 
                title="📊 Thông tin khóa học" 
                style={{ 
                  marginBottom: 24,
                  background: 'rgba(255, 255, 255, 0.8)',
                  backdropFilter: 'blur(15px)',
                  WebkitBackdropFilter: 'blur(15px)',
                  border: '1px solid rgba(29, 78, 216, 0.1)',
                  borderRadius: '12px'
                }}
                headStyle={{
                  background: 'rgba(29, 78, 216, 0.05)',
                  color: '#1d4ed8',
                  fontWeight: '700'
                }}
              >
                <Space direction="vertical" size={12} style={{ width: '100%' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Text style={{ color: '#64748b' }}>📚 Số chương:</Text>
                    <Text strong style={{ color: '#1e293b' }}>{product.totalChapters || 25} chương</Text>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Text style={{ color: '#64748b' }}>⏰ Thời lượng:</Text>
                    <Text strong style={{ color: '#1e293b' }}>{product.duration}</Text>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Text style={{ color: '#64748b' }}>🎓 Cấp độ:</Text>
                    <Text strong style={{ color: '#1e293b' }}>Cơ bản đến nâng cao</Text>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Text style={{ color: '#64748b' }}>🌐 Ngôn ngữ:</Text>
                    <Text strong style={{ color: '#1e293b' }}>Tiếng Việt</Text>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Text style={{ color: '#64748b' }}>📱 Truy cập:</Text>
                    <Text strong style={{ color: '#1e293b' }}>Mọi thiết bị</Text>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Text style={{ color: '#64748b' }}>🏆 Chứng chỉ:</Text>
                    <Text strong style={{ color: '#1e293b' }}>Có</Text>
                  </div>
                </Space>
              </Card>

              {/* Course Syllabus */}
              <Card 
                title="📋 Nội dung khóa học" 
                style={{ 
                  marginBottom: 24,
                  background: 'rgba(255, 255, 255, 0.8)',
                  backdropFilter: 'blur(15px)',
                  WebkitBackdropFilter: 'blur(15px)',
                  border: '1px solid rgba(29, 78, 216, 0.1)',
                  borderRadius: '12px'
                }}
                headStyle={{
                  background: 'rgba(29, 78, 216, 0.05)',
                  color: '#1d4ed8',
                  fontWeight: '700'
                }}
              >
                <List
                  dataSource={courseDetails.syllabus}
                  renderItem={(chapter, index) => (
                    <List.Item style={{ padding: '12px 0', alignItems: 'flex-start' }}>
                      <List.Item.Meta
                        avatar={
                          <div style={{
                            width: 32,
                            height: 32,
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #1d4ed8 0%, #3b82f6 100%)', // ✅ Blue gradient
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: 14,
                            fontWeight: 600
                          }}>
                            {index + 1}
                          </div>
                        }
                        title={<Text strong style={{ fontSize: 15, color: '#1e293b' }}>{chapter.title}</Text>}
                        description={
                          <Space>
                            <Text style={{ fontSize: 13, color: '#64748b' }}>
                              ⏱️ {chapter.duration}
                            </Text>
                            <Text style={{ fontSize: 13, color: '#64748b' }}>
                              📹 {chapter.lessons} bài học
                            </Text>
                          </Space>
                        }
                      />
                    </List.Item>
                  )}
                />
              </Card>

              {/* Instructor Info */}
              <Card 
                title="👨‍🏫 Giảng viên" 
                style={{ 
                  marginBottom: 24,
                  background: 'rgba(255, 255, 255, 0.8)',
                  backdropFilter: 'blur(15px)',
                  WebkitBackdropFilter: 'blur(15px)',
                  border: '1px solid rgba(29, 78, 216, 0.1)',
                  borderRadius: '12px'
                }}
                headStyle={{
                  background: 'rgba(29, 78, 216, 0.05)',
                  color: '#1d4ed8',
                  fontWeight: '700'
                }}
              >
                <List.Item.Meta
                  avatar={
                    <Avatar 
                      size={64}
                      style={{ 
                        background: 'linear-gradient(135deg, #1d4ed8 0%, #3b82f6 100%)' // ✅ Blue gradient
                      }}
                    >
                      {product.instructor.charAt(0)}
                    </Avatar>
                  }
                  title={<Title level={4} style={{ margin: 0, color: '#1e293b' }}>{product.instructor}</Title>}
                  description={
                    <div>
                      <Paragraph style={{ color: '#475569' }}>
                        Chuyên gia hàng đầu trong lĩnh vực {product.category.toLowerCase()} 
                        với hơn 10 năm kinh nghiệm thực tế.
                      </Paragraph>
                      <Space wrap>
                        <Tag 
                          icon={<TrophyOutlined />} 
                          style={{
                            background: 'rgba(251, 191, 36, 0.2)',
                            color: '#f59e0b',
                            border: '1px solid rgba(251, 191, 36, 0.3)'
                          }}
                        >
                          🏆 Top Instructor
                        </Tag>
                        <Tag 
                          icon={<TeamOutlined />} 
                          style={{
                            background: 'rgba(29, 78, 216, 0.1)',
                            color: '#1d4ed8',
                            border: '1px solid rgba(29, 78, 216, 0.2)'
                          }}
                        >
                          👥 {Math.floor(Math.random() * 10000 + 5000)} học viên
                        </Tag>
                      </Space>
                    </div>
                  }
                />
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </Modal>
  );
}
