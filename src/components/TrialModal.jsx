import { useState } from 'react';
import { Modal, List, Button, Typography, Tag, Space, Progress} from 'antd';
import { 
  PlayCircleOutlined, 
  LockOutlined, 
  ClockCircleOutlined,
  BookOutlined,
  UserOutlined,
  StarFilled,
  ShoppingCartOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;

export default function TrialModal({ 
  visible, 
  product, 
  onClose, 
  onAddToCart 
}) {
  const [selectedChapter, setSelectedChapter] = useState(null);

  if (!product) return null;

  const { trialChapters = [], totalChapters = 0 } = product;
  const unlockedChapters = trialChapters.filter(chapter => !chapter.isLocked);
  const progressPercent = totalChapters > 0 ? (unlockedChapters.length / totalChapters) * 100 : 0;

  const handleChapterClick = (chapter) => {
    if (!chapter.isLocked) {
      setSelectedChapter(chapter);
    }
  };

  const renderChapterContent = () => {
    if (!selectedChapter) {
      return (
        <div style={{ 
          textAlign: 'center', 
          padding: '40px 20px',
          background: '#f8f9fa',
          borderRadius: 8,
          border: '2px dashed #d9d9d9'
        }}>
          <BookOutlined style={{ fontSize: 48, color: '#bfbfbf', marginBottom: 16 }} />
          <Text type="secondary">Chọn một chương để xem nội dung dùng thử</Text>
        </div>
      );
    }

    if (selectedChapter.type === 'video' && selectedChapter.videoUrl) {
      return (
        <div style={{ marginBottom: 16 }}>
          <Title level={4} style={{ marginBottom: 8 }}>
            {selectedChapter.title}
          </Title>
          <Text type="secondary" style={{ display: 'block', marginBottom: 16 }}>
            {selectedChapter.description}
          </Text>
          <div style={{ 
            position: 'relative',
            paddingBottom: '56.25%', // 16:9 aspect ratio
            height: 0,
            overflow: 'hidden',
            borderRadius: 8
          }}>
            <iframe
              src={selectedChapter.videoUrl}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                border: 'none'
              }}
              allowFullScreen
              title={selectedChapter.title}
            />
          </div>
        </div>
      );
    }

    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '40px 20px',
        background: '#fff2e8',
        borderRadius: 8,
        border: '1px solid #ffd591'
      }}>
        <PlayCircleOutlined style={{ fontSize: 48, color: '#fa8c16', marginBottom: 16 }} />
        <Title level={4} style={{ color: '#fa8c16' }}>
          {selectedChapter.title}
        </Title>
        <Text>{selectedChapter.description}</Text>
      </div>
    );
  };

  return (
    <Modal
      title={
        <Space direction="vertical" size={0}>
          <Title level={3} style={{ margin: 0, color: '#1890ff' }}>
            🎬 Dùng thử khóa học
          </Title>
          <Text strong style={{ fontSize: 16 }}>
            {product.name}
          </Text>
        </Space>
      }
      open={visible}
      onCancel={onClose}
      width={1000}
      footer={null}
      style={{ top: 20 }}
    >
      <div style={{ marginBottom: 24 }}>
        {/* Course Info */}
        <div style={{ 
          background: 'linear-gradient(135deg, #f0f8ff 0%, #e6f3ff 100%)',
          padding: 16,
          borderRadius: 8,
          marginBottom: 16
        }}>
          <Space direction="vertical" size={8} style={{ width: '100%' }}>
            <Space wrap>
              <Tag color="blue" icon={<UserOutlined />}>
                {product.instructor}
              </Tag>
              <Tag color="green" icon={<ClockCircleOutlined />}>
                {product.duration}
              </Tag>
              <Tag color="orange" icon={<UserOutlined />}>
                {product.students} học viên
              </Tag>
              <Tag color="gold" icon={<StarFilled />}>
                {product.rating}/5
              </Tag>
            </Space>
            
            <div>
              <Text strong>Tiến độ dùng thử: </Text>
              <Progress 
                percent={Math.round(progressPercent)} 
                size="small" 
                style={{ marginLeft: 8, flex: 1 }}
                format={(percent) => `${unlockedChapters.length}/${totalChapters} chương`}
              />
            </div>
          </Space>
        </div>

        <div style={{ display: 'flex', gap: 16, height: 600 }}>
          {/* Chapter List */}
          <div style={{ 
            width: 350, 
            borderRight: '1px solid #f0f0f0',
            paddingRight: 16
          }}>
            <Title level={4} style={{ marginBottom: 16 }}>
              📚 Danh sách chương ({unlockedChapters.length} miễn phí)
            </Title>
            
            <List
              dataSource={trialChapters}
              renderItem={(chapter) => (
                <List.Item 
                  style={{ 
                    padding: '12px 0',
                    cursor: chapter.isLocked ? 'not-allowed' : 'pointer',
                    opacity: chapter.isLocked ? 0.6 : 1,
                    borderLeft: selectedChapter?.id === chapter.id ? '3px solid #1890ff' : 'none',
                    paddingLeft: selectedChapter?.id === chapter.id ? 13 : 16,
                    background: selectedChapter?.id === chapter.id ? '#f0f8ff' : 'transparent',
                    borderRadius: 4,
                    transition: 'all 0.3s ease'
                  }}
                  onClick={() => handleChapterClick(chapter)}
                >
                  <Space direction="vertical" size={4} style={{ width: '100%' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      {chapter.isLocked ? (
                        <LockOutlined style={{ color: '#bfbfbf' }} />
                      ) : (
                        <PlayCircleOutlined style={{ color: '#52c41a' }} />
                      )}
                      <Text 
                        strong={!chapter.isLocked}
                        style={{ 
                          flex: 1,
                          color: chapter.isLocked ? '#bfbfbf' : '#333'
                        }}
                      >
                        {chapter.title}
                      </Text>
                    </div>
                    <div style={{ display: 'flex', justify: 'space-between', alignItems: 'center' }}>
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        {chapter.description}
                      </Text>
                      <Tag size="small" color={chapter.isLocked ? 'default' : 'blue'}>
                        {chapter.duration}
                      </Tag>
                    </div>
                  </Space>
                </List.Item>
              )}
            />
            
            {trialChapters.some(ch => ch.isLocked) && (
              <div style={{ 
                marginTop: 16,
                padding: 16,
                background: '#fff7e6',
                borderRadius: 8,
                border: '1px solid #ffd591'
              }}>
                <Text type="warning" style={{ display: 'block', marginBottom: 8 }}>
                  🔒 Còn {totalChapters - unlockedChapters.length} chương bị khóa
                </Text>
                <Button 
                  type="primary" 
                  size="small"
                  icon={<ShoppingCartOutlined />}
                  onClick={() => onAddToCart(product)}
                  block
                >
                  Mua khóa học để mở khóa
                </Button>
              </div>
            )}
          </div>

          {/* Content Area */}
          <div style={{ flex: 1, paddingLeft: 16 }}>
            <Title level={4} style={{ marginBottom: 16 }}>
              🎥 Nội dung chương
            </Title>
            {renderChapterContent()}
          </div>
        </div>
      </div>
    </Modal>
  );
}