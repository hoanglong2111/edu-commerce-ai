import React, { useState } from 'react';
import {
  Card, Avatar, Typography, Form, Input, Button, Row, Col, Upload, 
  Progress, List, Tag, Space, Statistic, Rate, Timeline,
  Badge, Tabs, message, Modal
} from 'antd';
import {
  EditOutlined, CameraOutlined,
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

export default function UserProfile() {
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: 'Vũ Lê Hoàng Long',
    email: 'vulehoanglong123@gmail.com',
    phone: '0981867305',
    avatar: null,
    joinDate: '2024-01-15',
    lastActive: '2024-07-16',
    bio: 'Đam mê học hỏi và phát triển bản thân trong lĩnh vực công nghệ.',
    location: 'Hồ Chí Minh, Việt Nam'
  });

  // Mock data
  const courseProgress = [
    {
      id: 1,
      name: 'JavaScript Từ Cơ Bản Đến Nâng Cao',
      progress: 75,
      totalLessons: 25,
      completedLessons: 18,
      lastAccessed: '2024-07-16',
      certificate: false,
      rating: 0
    },
    {
      id: 2,
      name: 'React Native Development',
      progress: 100,
      totalLessons: 30,
      completedLessons: 30,
      lastAccessed: '2024-07-10',
      certificate: true,
      rating: 5
    },
    {
      id: 3,
      name: 'Python for Beginners',
      progress: 45,
      totalLessons: 20,
      completedLessons: 9,
      lastAccessed: '2024-07-14',
      certificate: false,
      rating: 0
    }
  ];

  const achievements = [
    { title: 'First Course Completed', description: 'Hoàn thành khóa học đầu tiên', date: '2024-03-15', icon: '🏆' },
    { title: 'Quick Learner', description: 'Hoàn thành 3 khóa học trong tháng', date: '2024-05-20', icon: '⚡' },
    { title: 'Perfect Score', description: 'Đạt điểm tuyệt đối trong bài kiểm tra', date: '2024-06-10', icon: '💯' },
    { title: 'Active Learner', description: 'Học liên tục 30 ngày', date: '2024-07-01', icon: '🔥' }
  ];

  const learningStats = {
    totalCourses: 12,
    completedCourses: 8,
    totalHours: 156,
    certificates: 6,
    currentStreak: 15,
    longestStreak: 42
  };

  const handleSaveProfile = (values) => {
    setUserInfo({ ...userInfo, ...values });
    setIsEditing(false);
    message.success('Cập nhật hồ sơ thành công!');
  };

  const handleAvatarChange = (info) => {
    if (info.file.status === 'done') {
      setUserInfo({ ...userInfo, avatar: info.file.response?.url });
      message.success('Cập nhật ảnh đại diện thành công!');
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #1d4ed8 0%, #2563eb 50%, #3b82f6 100%)',
      padding: '24px'
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* ✅ Header Profile - Blue Gradient */}
        <Card style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          borderRadius: '16px',
          marginBottom: '24px',
          overflow: 'hidden'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, rgba(29, 78, 216, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)',
            margin: '-24px -24px 24px -24px',
            padding: '32px 24px',
            position: 'relative'
          }}>
            <Row gutter={[24, 24]} align="middle">
              <Col xs={24} sm={8} md={6}>
                <div style={{ textAlign: 'center' }}>
                  <Badge
                    count={
                      <Button
                        icon={<CameraOutlined />}
                        shape="circle"
                        size="small"
                        style={{
                          background: 'linear-gradient(135deg, #1d4ed8 0%, #3b82f6 100%)',
                          border: 'none',
                          color: 'white'
                        }}
                      />
                    }
                    offset={[-10, 10]}
                  >
                    <Upload
                      showUploadList={false}
                      onChange={handleAvatarChange}
                      accept="image/*"
                    >
                      <Avatar
                        size={120}
                        src={userInfo.avatar}
                        style={{
                          background: 'linear-gradient(135deg, #1d4ed8 0%, #3b82f6 100%)',
                          fontSize: '48px',
                          cursor: 'pointer',
                          border: '4px solid white',
                          boxShadow: '0 8px 25px rgba(29, 78, 216, 0.3)'
                        }}
                      >
                        {userInfo.name.charAt(0)}
                      </Avatar>
                    </Upload>
                  </Badge>
                </div>
              </Col>
              
              <Col xs={24} sm={16} md={18}>
                <div>
                  <Title level={2} style={{ margin: 0, color: '#1e293b' }}>
                    {userInfo.name}
                  </Title>
                  <Text style={{ fontSize: '16px', color: '#64748b' }}>
                    {userInfo.email}
                  </Text>
                  <br />
                  <Text style={{ color: '#64748b' }}>
                    📍 {userInfo.location} • 📅 Tham gia từ {new Date(userInfo.joinDate).toLocaleDateString('vi-VN')}
                  </Text>
                  
                  <div style={{ marginTop: '16px' }}>
                    <Paragraph style={{ color: '#475569', marginBottom: '16px' }}>
                      {userInfo.bio}
                    </Paragraph>
                    
                    <Space wrap>
                      <Tag color="blue" style={{ padding: '4px 12px', borderRadius: '20px' }}>
                        🏆 {learningStats.certificates} Chứng chỉ
                      </Tag>
                      <Tag color="green" style={{ padding: '4px 12px', borderRadius: '20px' }}>
                        📚 {learningStats.completedCourses} Khóa học hoàn thành
                      </Tag>
                      <Tag color="orange" style={{ padding: '4px 12px', borderRadius: '20px' }}>
                        🔥 {learningStats.currentStreak} ngày streak
                      </Tag>
                    </Space>
                  </div>
                </div>
              </Col>
            </Row>

            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={() => setIsEditing(true)}
              style={{
                position: 'absolute',
                top: '24px',
                right: '24px',
                background: 'linear-gradient(135deg, #1d4ed8 0%, #3b82f6 100%)',
                border: 'none',
                borderRadius: '8px'
              }}
            >
              Chỉnh sửa
            </Button>
          </div>

          {/* ✅ Learning Stats - Glass Cards */}
          <Row gutter={[16, 16]}>
            <Col xs={12} sm={6}>
              <Statistic
                title="Tổng khóa học"
                value={learningStats.totalCourses}
                prefix="📚"
                valueStyle={{ color: '#1d4ed8', fontWeight: 'bold' }}
              />
            </Col>
            <Col xs={12} sm={6}>
              <Statistic
                title="Giờ học"
                value={learningStats.totalHours}
                prefix="⏰"
                suffix="h"
                valueStyle={{ color: '#059669', fontWeight: 'bold' }}
              />
            </Col>
            <Col xs={12} sm={6}>
              <Statistic
                title="Chứng chỉ"
                value={learningStats.certificates}
                prefix="🏆"
                valueStyle={{ color: '#d97706', fontWeight: 'bold' }}
              />
            </Col>
            <Col xs={12} sm={6}>
              <Statistic
                title="Streak hiện tại"
                value={learningStats.currentStreak}
                prefix="🔥"
                suffix="ngày"
                valueStyle={{ color: '#dc2626', fontWeight: 'bold' }}
              />
            </Col>
          </Row>
        </Card>

        {/* ✅ Tabs Content - White Glass */}
        <Card style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          borderRadius: '16px'
        }}>
          <Tabs defaultActiveKey="1" size="large">
            {/* Learning Progress Tab */}
            <Tabs.TabPane tab="📊 Tiến độ học tập" key="1">
              <Card title="📚 Tiến độ học tập" style={{ marginBottom: '16px' }}>
                <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                  {courseProgress.map((course, index) => (
                    <div key={index} style={{ 
                      width: '100%',
                      minWidth: 0 // ✅ Quan trọng: cho phép shrink
                    }}>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '8px',
                        flexWrap: 'wrap', // ✅ Cho phép wrap trên mobile
                        gap: '8px'
                      }}>
                        <Text 
                          strong 
                          style={{ 
                            fontSize: '14px',
                            wordBreak: 'break-word', // ✅ Ngăn text overflow
                            whiteSpace: 'normal',    // ✅ Cho phép xuống dòng
                            flex: '1 1 auto',        // ✅ Flexible width
                            minWidth: 0              // ✅ Cho phép shrink
                          }}
                        >
                          {course.name}
                        </Text>
                        <Text 
                          type="secondary" 
                          style={{ 
                            fontSize: '12px',
                            whiteSpace: 'nowrap',    // ✅ Giữ % không bị wrap
                            flexShrink: 0            // ✅ Không co lại
                          }}
                        >
                          {course.progress}%
                        </Text>
                      </div>
                      
                      <Progress 
                        percent={course.progress} 
                        size="small"
                        strokeColor={{
                          '0%': '#108ee9',
                          '100%': '#87d068',
                        }}
                        style={{ 
                          width: '100%',
                          margin: 0
                        }}
                      />
                      
                      {/* Course details */}
                      <div style={{ 
                        marginTop: '8px',
                        display: 'flex',
                        flexDirection: 'column', // ✅ Stack trên mobile
                        gap: '4px'
                      }}>
                        <Text 
                          type="secondary" 
                          style={{ 
                            fontSize: '12px',
                            wordBreak: 'break-word',
                            whiteSpace: 'normal',
                            lineHeight: '1.4'
                          }}
                        >
                          {course.completedLessons}/{course.totalLessons} bài học • {course.duration} phút
                        </Text>
                        <Text 
                          type="secondary" 
                          style={{ 
                            fontSize: '12px',
                            wordBreak: 'break-word',
                            whiteSpace: 'normal',
                            lineHeight: '1.4'
                          }}
                        >
                          Cập nhật: {course.lastAccessed}
                        </Text>
                      </div>
                    </div>
                  ))}
                </Space>
              </Card>
            </Tabs.TabPane>

            {/* Achievements Tab */}
            <Tabs.TabPane tab="🏆 Thành tích" key="2">
              <Row gutter={[16, 16]}>
                {achievements.map((achievement, index) => (
                  <Col xs={24} sm={12} md={8} key={index}>
                    <Card
                      style={{
                        background: 'rgba(255, 255, 255, 0.8)',
                        border: '1px solid rgba(29, 78, 216, 0.1)',
                        borderRadius: '12px',
                        textAlign: 'center'
                      }}
                    >
                      <div style={{ fontSize: '48px', marginBottom: '16px' }}>
                        {achievement.icon}
                      </div>
                      <Title level={4} style={{ color: '#1e293b' }}>
                        {achievement.title}
                      </Title>
                      <Text style={{ color: '#64748b' }}>
                        {achievement.description}
                      </Text>
                      <br />
                      <Text style={{ color: '#94a3b8', fontSize: '12px' }}>
                        {new Date(achievement.date).toLocaleDateString('vi-VN')}
                      </Text>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Tabs.TabPane>

            {/* Learning History Tab */}
            <Tabs.TabPane tab="📈 Lịch sử học tập" key="3">
              <Timeline mode="left">
                <Timeline.Item color="blue" label="Hôm nay">
                  <p><strong>JavaScript Từ Cơ Bản Đến Nâng Cao</strong></p>
                  <p>Hoàn thành bài 18: "Async/Await Pattern"</p>
                </Timeline.Item>
                <Timeline.Item color="green" label="Hôm qua">
                  <p><strong>React Native Development</strong></p>
                  <p>Đạt chứng chỉ hoàn thành khóa học</p>
                </Timeline.Item>
                <Timeline.Item color="gray" label="3 ngày trước">
                  <p><strong>Python for Beginners</strong></p>
                  <p>Bắt đầu học chương 3: "Functions & Modules"</p>
                </Timeline.Item>
                <Timeline.Item color="blue" label="1 tuần trước">
                  <p><strong>JavaScript Từ Cơ Bản Đến Nâng Cao</strong></p>
                  <p>Hoàn thành project cuối khóa</p>
                </Timeline.Item>
              </Timeline>
            </Tabs.TabPane>
          </Tabs>
        </Card>

        {/* ✅ Edit Profile Modal */}
        <Modal
          title="✏️ Chỉnh sửa hồ sơ"
          open={isEditing}
          onCancel={() => setIsEditing(false)}
          footer={null}
          width={600}
        >
          <Form
            form={form}
            layout="vertical"
            initialValues={userInfo}
            onFinish={handleSaveProfile}
            style={{ marginTop: '24px' }}
          >
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12}>
                <Form.Item
                  label="Họ và tên"
                  name="name"
                  rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
                >
                  <Input placeholder="Nhập họ và tên" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: 'Vui lòng nhập email!' },
                    { type: 'email', message: 'Email không hợp lệ!' }
                  ]}
                >
                  <Input placeholder="Nhập email" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  label="Số điện thoại"
                  name="phone"
                  rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
                >
                  <Input placeholder="Nhập số điện thoại" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  label="Địa chỉ"
                  name="location"
                >
                  <Input placeholder="Nhập địa chỉ" />
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item
                  label="Giới thiệu bản thân"
                  name="bio"
                >
                  <Input.TextArea 
                    rows={4} 
                    placeholder="Viết vài dòng giới thiệu về bản thân..."
                  />
                </Form.Item>
              </Col>
            </Row>

            <div style={{ textAlign: 'right', marginTop: '24px' }}>
              <Space>
                <Button onClick={() => setIsEditing(false)}>
                  Hủy
                </Button>
                <Button 
                  type="primary" 
                  htmlType="submit"
                  style={{
                    background: 'linear-gradient(135deg, #1d4ed8 0%, #3b82f6 100%)',
                    border: 'none'
                  }}
                >
                  Lưu thay đổi
                </Button>
              </Space>
            </div>
          </Form>
        </Modal>
      </div>
    </div>
  );
}