import { useState } from 'react';
import {
  Card, Typography, Form, Input, Button, Row, Col, Switch, 
  Select, Slider, Divider, Space, message, Modal, 
  List, Radio,   Alert
} from 'antd';
import {
  SettingOutlined, SecurityScanOutlined, BellOutlined, EyeOutlined,
   UserOutlined, 
  
  DeleteOutlined, 
} from '@ant-design/icons';

const { Title, Text} = Typography;
const { Option } = Select;
const { Password } = Input;

export default function Settings() {
  const [form] = Form.useForm();
  const [passwordForm] = Form.useForm();
  const [activeTab, setActiveTab] = useState('general');
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  
  const [settings, setSettings] = useState({
    // General Settings
    language: 'vi',
    timezone: 'Asia/Ho_Chi_Minh',
    theme: 'light',
    autoSave: true,
    
    // Privacy Settings
    profileVisibility: 'public',
    showEmail: false,
    showPhone: false,
    allowSearchEngine: true,
    
    // Notification Settings
    emailNotifications: true,
    pushNotifications: true,
    courseUpdates: true,
    marketing: false,
    reminders: true,
    
    // Learning Settings
    autoplay: true,
    subtitles: true,
    playbackSpeed: 1.0,
    qualityPreference: 'auto',
    downloadQuality: 'medium',
    
    // Security Settings
    twoFactor: false,
    loginAlerts: true,
    sessionTimeout: 30
  });

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    message.success('Cài đặt đã được cập nhật!');
  };

  const handlePasswordChange = (values) => {
    // Mock password change
    message.success('Mật khẩu đã được thay đổi thành công!');
    passwordForm.resetFields();
  };

  const handleDeleteAccount = () => {
    message.error('Tính năng này đang được phát triển!');
    setDeleteModalVisible(false);
  };

  const settingsSections = [
    {
      key: 'general',
      title: '⚙️ Cài đặt chung',
      icon: <SettingOutlined />
    },
    {
      key: 'privacy',
      title: '🔒 Quyền riêng tư',
      icon: <EyeOutlined />
    },
    {
      key: 'notifications',
      title: '🔔 Thông báo',
      icon: <BellOutlined />
    },
    {
      key: 'learning',
      title: '📚 Học tập',
      icon: <UserOutlined />
    },
    {
      key: 'security',
      title: '🛡️ Bảo mật',
      icon: <SecurityScanOutlined />
    }
  ];

  const renderGeneralSettings = () => (
    <Space direction="vertical" size={24} style={{ width: '100%' }}>
      <Card title="🌐 Ngôn ngữ & Vùng" style={{ borderRadius: '12px' }}>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Form.Item label="Ngôn ngữ giao diện">
              <Select
                value={settings.language}
                onChange={(value) => handleSettingChange('language', value)}
                style={{ width: '100%' }}
              >
                <Option value="vi">🇻🇳 Tiếng Việt</Option>
                <Option value="en">🇺🇸 English</Option>
                <Option value="ja">🇯🇵 日本語</Option>
                <Option value="ko">🇰🇷 한국어</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label="Múi giờ">
              <Select
                value={settings.timezone}
                onChange={(value) => handleSettingChange('timezone', value)}
                style={{ width: '100%' }}
              >
                <Option value="Asia/Ho_Chi_Minh">🇻🇳 Việt Nam (GMT+7)</Option>
                <Option value="Asia/Tokyo">🇯🇵 Tokyo (GMT+9)</Option>
                <Option value="America/New_York">🇺🇸 New York (GMT-5)</Option>
                <Option value="Europe/London">🇬🇧 London (GMT+0)</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Card>

      <Card title="🎨 Giao diện" style={{ borderRadius: '12px' }}>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Form.Item label="Chế độ hiển thị">
              <Radio.Group
                value={settings.theme}
                onChange={(e) => handleSettingChange('theme', e.target.value)}
              >
                <Radio.Button value="light">☀️ Sáng</Radio.Button>
                <Radio.Button value="dark">🌙 Tối</Radio.Button>
                <Radio.Button value="auto">🔄 Tự động</Radio.Button>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label="Tự động lưu tiến độ">
              <Switch
                checked={settings.autoSave}
                onChange={(checked) => handleSettingChange('autoSave', checked)}
                checkedChildren="BẬT"
                unCheckedChildren="TẮT"
              />
            </Form.Item>
          </Col>
        </Row>
      </Card>
    </Space>
  );

  const renderPrivacySettings = () => (
    <Space direction="vertical" size={24} style={{ width: '100%' }}>
      <Card title="👁️ Hiển thị hồ sơ" style={{ borderRadius: '12px' }}>
        <Form.Item label="Quyền xem hồ sơ">
          <Radio.Group
            value={settings.profileVisibility}
            onChange={(e) => handleSettingChange('profileVisibility', e.target.value)}
          >
            <Radio value="public">🌍 Công khai</Radio>
            <Radio value="students">👥 Chỉ học viên</Radio>
            <Radio value="private">🔒 Riêng tư</Radio>
          </Radio.Group>
        </Form.Item>

        <Divider />

        <Space direction="vertical" style={{ width: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text>📧 Hiển thị email</Text>
            <Switch
              checked={settings.showEmail}
              onChange={(checked) => handleSettingChange('showEmail', checked)}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text>📱 Hiển thị số điện thoại</Text>
            <Switch
              checked={settings.showPhone}
              onChange={(checked) => handleSettingChange('showPhone', checked)}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text>🔍 Cho phép tìm kiếm từ Google</Text>
            <Switch
              checked={settings.allowSearchEngine}
              onChange={(checked) => handleSettingChange('allowSearchEngine', checked)}
            />
          </div>
        </Space>
      </Card>
    </Space>
  );

  const renderNotificationSettings = () => (
    <Space direction="vertical" size={24} style={{ width: '100%' }}>
      <Card title="📧 Thông báo Email" style={{ borderRadius: '12px' }}>
        <Space direction="vertical" style={{ width: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <Text strong>Thông báo email</Text>
              <br />
              <Text type="secondary">Nhận thông báo qua email</Text>
            </div>
            <Switch
              checked={settings.emailNotifications}
              onChange={(checked) => handleSettingChange('emailNotifications', checked)}
            />
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <Text strong>Cập nhật khóa học</Text>
              <br />
              <Text type="secondary">Thông báo khi có bài học mới</Text>
            </div>
            <Switch
              checked={settings.courseUpdates}
              onChange={(checked) => handleSettingChange('courseUpdates', checked)}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <Text strong>Email marketing</Text>
              <br />
              <Text type="secondary">Nhận thông tin khuyến mãi và sự kiện</Text>
            </div>
            <Switch
              checked={settings.marketing}
              onChange={(checked) => handleSettingChange('marketing', checked)}
            />
          </div>
        </Space>
      </Card>

      <Card title="📱 Thông báo đẩy" style={{ borderRadius: '12px' }}>
        <Space direction="vertical" style={{ width: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <Text strong>Push notifications</Text>
              <br />
              <Text type="secondary">Thông báo trên thiết bị</Text>
            </div>
            <Switch
              checked={settings.pushNotifications}
              onChange={(checked) => handleSettingChange('pushNotifications', checked)}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <Text strong>Nhắc nhở học tập</Text>
              <br />
              <Text type="secondary">Nhắc nhở khi chưa học trong ngày</Text>
            </div>
            <Switch
              checked={settings.reminders}
              onChange={(checked) => handleSettingChange('reminders', checked)}
            />
          </div>
        </Space>
      </Card>
    </Space>
  );

  const renderLearningSettings = () => (
    <Space direction="vertical" size={24} style={{ width: '100%' }}>
      <Card title="🎥 Trình phát video" style={{ borderRadius: '12px' }}>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Form.Item label="Tốc độ phát mặc định">
              <Select
                value={settings.playbackSpeed}
                onChange={(value) => handleSettingChange('playbackSpeed', value)}
                style={{ width: '100%' }}
              >
                <Option value={0.5}>0.5x</Option>
                <Option value={0.75}>0.75x</Option>
                <Option value={1.0}>1.0x (Bình thường)</Option>
                <Option value={1.25}>1.25x</Option>
                <Option value={1.5}>1.5x</Option>
                <Option value={2.0}>2.0x</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label="Chất lượng video">
              <Select
                value={settings.qualityPreference}
                onChange={(value) => handleSettingChange('qualityPreference', value)}
                style={{ width: '100%' }}
              >
                <Option value="auto">🔄 Tự động</Option>
                <Option value="1080p">📺 1080p (HD)</Option>
                <Option value="720p">📱 720p</Option>
                <Option value="480p">💾 480p (Tiết kiệm data)</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Divider />

        <Space direction="vertical" style={{ width: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text>▶️ Tự động phát video tiếp theo</Text>
            <Switch
              checked={settings.autoplay}
              onChange={(checked) => handleSettingChange('autoplay', checked)}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text>📝 Hiển thị phụ đề mặc định</Text>
            <Switch
              checked={settings.subtitles}
              onChange={(checked) => handleSettingChange('subtitles', checked)}
            />
          </div>
        </Space>
      </Card>

      <Card title="📥 Tải về" style={{ borderRadius: '12px' }}>
        <Form.Item label="Chất lượng tải về">
          <Radio.Group
            value={settings.downloadQuality}
            onChange={(e) => handleSettingChange('downloadQuality', e.target.value)}
          >
            <Radio value="high">🔥 Cao (1080p)</Radio>
            <Radio value="medium">⚡ Trung bình (720p)</Radio>
            <Radio value="low">💾 Thấp (480p)</Radio>
          </Radio.Group>
        </Form.Item>
      </Card>
    </Space>
  );

  const renderSecuritySettings = () => (
    <Space direction="vertical" size={24} style={{ width: '100%' }}>
      <Card title="🔑 Mật khẩu" style={{ borderRadius: '12px' }}>
        <Form
          form={passwordForm}
          layout="vertical"
          onFinish={handlePasswordChange}
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} md={8}>
              <Form.Item
                label="Mật khẩu hiện tại"
                name="currentPassword"
                rules={[{ required: true, message: 'Vui lòng nhập mật khẩu hiện tại!' }]}
              >
                <Password placeholder="Nhập mật khẩu hiện tại" />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item
                label="Mật khẩu mới"
                name="newPassword"
                rules={[
                  { required: true, message: 'Vui lòng nhập mật khẩu mới!' },
                  { min: 8, message: 'Mật khẩu phải có ít nhất 8 ký tự!' }
                ]}
              >
                <Password placeholder="Nhập mật khẩu mới" />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item
                label="Xác nhận mật khẩu"
                name="confirmPassword"
                dependencies={['newPassword']}
                rules={[
                  { required: true, message: 'Vui lòng xác nhận mật khẩu!' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('newPassword') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('Mật khẩu xác nhận không khớp!'));
                    },
                  }),
                ]}
              >
                <Password placeholder="Xác nhận mật khẩu mới" />
              </Form.Item>
            </Col>
          </Row>
          <Button 
            type="primary" 
            htmlType="submit"
            style={{
              background: 'linear-gradient(135deg, #1d4ed8 0%, #3b82f6 100%)',
              border: 'none'
            }}
          >
            🔑 Đổi mật khẩu
          </Button>
        </Form>
      </Card>

      <Card title="🛡️ Bảo mật nâng cao" style={{ borderRadius: '12px' }}>
        <Space direction="vertical" style={{ width: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <Text strong>Xác thực hai bước</Text>
              <br />
              <Text type="secondary">Tăng cường bảo mật với OTP</Text>
            </div>
            <Switch
              checked={settings.twoFactor}
              onChange={(checked) => handleSettingChange('twoFactor', checked)}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <Text strong>Cảnh báo đăng nhập</Text>
              <br />
              <Text type="secondary">Thông báo khi có đăng nhập mới</Text>
            </div>
            <Switch
              checked={settings.loginAlerts}
              onChange={(checked) => handleSettingChange('loginAlerts', checked)}
            />
          </div>

          <Divider />

          <Form.Item label="Thời gian hết phiên (phút)">
            <Slider
              min={15}
              max={240}
              value={settings.sessionTimeout}
              onChange={(value) => handleSettingChange('sessionTimeout', value)}
              marks={{ 15: '15p', 60: '1h', 120: '2h', 240: '4h' }}
            />
          </Form.Item>
        </Space>
      </Card>

      <Card title="⚠️ Vùng nguy hiểm" style={{ borderRadius: '12px', borderColor: '#ef4444' }}>
        <Alert
          message="Cảnh báo"
          description="Hành động này không thể hoàn tác. Tất cả dữ liệu sẽ bị xóa vĩnh viễn."
          type="error"
          style={{ marginBottom: '16px' }}
        />
        <Button
          danger
          icon={<DeleteOutlined />}
          onClick={() => setDeleteModalVisible(true)}
        >
          🗑️ Xóa tài khoản
        </Button>
      </Card>
    </Space>
  );

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #1d4ed8 0%, #2563eb 50%, #3b82f6 100%)',
      padding: '24px'
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* ✅ Header */}
        <Card style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          borderRadius: '16px',
          marginBottom: '24px',
          textAlign: 'center'
        }}>
          <Title level={1} style={{ margin: 0, color: '#1e293b' }}>
            ⚙️ Cài đặt tài khoản
          </Title>
          <Text style={{ fontSize: '16px', color: '#64748b' }}>
            Quản lý thông tin cá nhân và tùy chỉnh trải nghiệm học tập
          </Text>
        </Card>

        <Row gutter={[24, 24]}>
          {/* ✅ Settings Menu */}
          <Col xs={24} lg={6}>
            <Card style={{
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '16px'
            }}>
              <List
                dataSource={settingsSections}
                renderItem={(section) => (
                  <List.Item
                    style={{
                      cursor: 'pointer',
                      padding: '12px 0',
                      background: activeTab === section.key ? 'rgba(29, 78, 216, 0.1)' : 'transparent',
                      borderRadius: '8px',
                      border: 'none'
                    }}
                    onClick={() => setActiveTab(section.key)}
                  >
                    <Space>
                      {section.icon}
                      <Text strong={activeTab === section.key} style={{ 
                        color: activeTab === section.key ? '#1d4ed8' : '#64748b' 
                      }}>
                        {section.title}
                      </Text>
                    </Space>
                  </List.Item>
                )}
              />
            </Card>
          </Col>

          {/* ✅ Settings Content */}
          <Col xs={24} lg={18}>
            <Card style={{
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '16px',
              minHeight: '600px'
            }}>
              {activeTab === 'general' && renderGeneralSettings()}
              {activeTab === 'privacy' && renderPrivacySettings()}
              {activeTab === 'notifications' && renderNotificationSettings()}
              {activeTab === 'learning' && renderLearningSettings()}
              {activeTab === 'security' && renderSecuritySettings()}
            </Card>
          </Col>
        </Row>

        {/* ✅ Delete Account Modal */}
        <Modal
          title="⚠️ Xác nhận xóa tài khoản"
          open={deleteModalVisible}
          onCancel={() => setDeleteModalVisible(false)}
          footer={[
            <Button key="cancel" onClick={() => setDeleteModalVisible(false)}>
              Hủy
            </Button>,
            <Button key="delete" danger onClick={handleDeleteAccount}>
              Xác nhận xóa
            </Button>
          ]}
        >
          <Alert
            message="Cảnh báo nghiêm trọng!"
            description="Việc xóa tài khoản sẽ không thể hoàn tác. Tất cả dữ liệu học tập, chứng chỉ và tiến độ sẽ bị mất vĩnh viễn."
            type="error"
            style={{ marginBottom: '16px' }}
          />
          <Text>Để xác nhận, vui lòng nhập <Text code>XÓA TÀI KHOẢN</Text> vào ô bên dưới:</Text>
          <Input placeholder="Nhập 'XÓA TÀI KHOẢN' để xác nhận" style={{ marginTop: '8px' }} />
        </Modal>
      </div>
    </div>
  );
}