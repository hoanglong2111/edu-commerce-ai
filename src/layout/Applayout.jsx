// src/layout/AppLayout.jsx
import  { useState, useEffect } from 'react';
import { Layout, Menu, Badge, Button, Space, Typography, Drawer, Avatar, Dropdown } from 'antd';
import { 
  HomeOutlined, 
  ShoppingCartOutlined, 
  HeartOutlined,
  MenuOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  SearchOutlined
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const { Header, Content, Footer } = Layout;
const { Title, Text } = Typography;

export default function AppLayout({ children }) {
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const navigate = useNavigate();
  const location = useLocation();
  
  const cart = useCart();
  const itemCount = cart?.getTotalItems ? cart.getTotalItems() : 0;
  const totalPrice = cart?.getTotalPrice ? cart.getTotalPrice() : 0;

  // ✅ RESPONSIVE WINDOW RESIZE HANDLER
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      // Auto close mobile menu if window becomes desktop size
      if (window.innerWidth > 768 && mobileMenuVisible) {
        setMobileMenuVisible(false);
      }
    };

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [mobileMenuVisible]);

  // ✅ DETERMINE IF MOBILE OR DESKTOP
  const isMobile = windowWidth <= 768;
  const isTablet = windowWidth <= 1024;

  const menuItems = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: 'Trang chủ',
    },
    {
      key: '/favorites',
      icon: <HeartOutlined />,
      label: 'Yêu thích',
    },
    {
      key: '/courses',
      icon: <SearchOutlined />,
      label: 'Khóa học',
    },
    // 🆕 THÊM SEPARATOR
    {
      type: 'divider',
    },
    // 🆕 THÊM PROFILE VÀO MOBILE MENU
    {
      key: '/profile',
      icon: <UserOutlined />,
      label: 'Hồ sơ cá nhân',
    },
    // 🆕 THÊM SETTINGS VÀO MOBILE MENU  
    {
      key: '/settings',
      icon: <SettingOutlined />,
      label: 'Cài đặt',
    }
  ];

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Hồ sơ của tôi',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Cài đặt',
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Đăng xuất',
      danger: true,
    },
  ];

  const handleMenuClick = ({ key }) => {
    navigate(key);
    setMobileMenuVisible(false);
  };

  const handleCartClick = () => {
    navigate('/cart');
  };

  const handleUserMenuClick = ({ key }) => {
    switch (key) {
      case 'profile':
        navigate('/profile');
        break;
      case 'settings':
        navigate('/settings');
        break;
      case 'logout':
        console.log('Logout clicked');
        break;
      default:
        break;
    }
  };

  return (
    <Layout style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)' }}>
      {/* ✨ BLUE GRADIENT HEADER */}
      <Header 
        style={{ 
          background: scrolled 
            ? 'linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #60a5fa 100%)' 
            : 'linear-gradient(135deg, #1d4ed8 0%, #2563eb 50%, #3b82f6 100%)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: scrolled ? '1px solid rgba(59, 130, 246, 0.3)' : '1px solid rgba(37, 99, 235, 0.3)',
          boxShadow: scrolled 
            ? '0 4px 20px rgba(29, 78, 216, 0.25)' 
            : '0 2px 10px rgba(37, 99, 235, 0.15)',
          padding: `0 ${isMobile ? '16px' : '32px'}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          height: '72px',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {/* ✨ LOGO WITH WHITE TEXT */}
        <div 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            cursor: 'pointer',
            transition: 'transform 0.2s ease',
            minWidth: isMobile ? 'auto' : '280px'
          }}
          onClick={() => navigate('/')}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <div style={{
            width: isMobile ? 40 : 48,
            height: isMobile ? 40 : 48,
            borderRadius: '14px',
            background: 'linear-gradient(135deg, #ffffff 0%, #f1f5f9 50%, #e2e8f0 100%)', // ✅ White logo
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: isMobile ? 12 : 16,
            color: '#1d4ed8', // ✅ Blue text on white
            fontWeight: '800',
            fontSize: isMobile ? '18px' : '22px',
            fontFamily: '"Inter", sans-serif',
            boxShadow: '0 8px 25px rgba(255, 255, 255, 0.3)',
            border: '2px solid rgba(255, 255, 255, 0.4)'
          }}>
            E
          </div>
          
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column',
            justifyContent: 'center'
          }}>
            <Title 
              level={isMobile ? 4 : 3} 
              style={{ 
                margin: 0, 
                color: 'white', // ✅ White title text
                fontFamily: '"Inter", sans-serif',
                fontWeight: '800',
                fontSize: isMobile ? '20px' : '26px',
                lineHeight: '1.1',
                letterSpacing: '-0.5px',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' // ✅ Text shadow for contrast
              }}
            >
              EduCommerce
            </Title>
            {!isMobile && (
              <Text style={{ 
                fontSize: '11px', 
                color: 'rgba(255, 255, 255, 0.8)', // ✅ Semi-transparent white
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
                marginTop: '-2px',
                fontFamily: '"Inter", sans-serif'
              }}>
                AI Learning Platform
              </Text>
            )}
          </div>
        </div>

        {/* ✨ CENTER - WHITE GLASS MENU */}
        {!isMobile && (
          <div style={{ 
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            maxWidth: '400px',
            margin: '0 40px'
          }}>
            <Menu
              mode="horizontal"
              selectedKeys={[location.pathname]}
              items={menuItems}
              onClick={handleMenuClick}
              style={{ 
                border: 'none',
                background: 'rgba(255, 255, 255, 0.15)', // ✅ Glass background
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderRadius: '16px',
                padding: '4px 8px',
                fontSize: '15px',
                fontWeight: '600',
                height: '52px',
                lineHeight: '44px',
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
              }}
            />
          </div>
        )}

        {/* ✨ RIGHT SIDE - ENHANCED CART & USER */}
        {!isMobile ? (
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 16,
            minWidth: '280px',
            justifyContent: 'flex-end'
          }}>
            {/* 🛒 GLOWING CART BUTTON */}
            <Badge count={itemCount} showZero={false} offset={[8, -8]}>
              <Button
                icon={<ShoppingCartOutlined />}
                onClick={handleCartClick}
                style={{
                  height: 48,
                  paddingLeft: 20,
                  paddingRight: 20,
                  borderRadius: '14px',
                  fontSize: '15px',
                  fontWeight: '700',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  background: 'rgba(255, 255, 255, 0.2)', // ✅ Glass effect
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  color: 'white',
                  boxShadow: '0 8px 25px rgba(255, 255, 255, 0.15)',
                  textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 12px 35px rgba(255, 255, 255, 0.25)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(255, 255, 255, 0.15)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                }}
              >
                {!isTablet && <span>Giỏ hàng</span>}
                {totalPrice > 0 && !isTablet && windowWidth > 1200 && (
                  <Text style={{ 
                    color: 'rgba(255,255,255,0.95)', 
                    fontSize: '13px',
                    fontWeight: '600',
                    textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
                  }}>
                    {new Intl.NumberFormat('vi-VN').format(totalPrice)}₫
                  </Text>
                )}
              </Button>
            </Badge>

            {/* 👤 GLASS USER MENU */}
            <Dropdown
              menu={{ 
                items: userMenuItems, 
                onClick: handleUserMenuClick 
              }}
              placement="bottomRight"
              trigger={['click']}
            >
              <Button
                type="text"
                style={{
                  padding: 4,
                  borderRadius: '12px',
                  height: 48,
                  width: 48,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.25)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.4)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(255, 255, 255, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <Avatar 
                  size={36}
                  style={{
                    background: 'linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%)',
                    color: '#1d4ed8',
                    fontWeight: '700',
                    fontSize: '16px',
                    border: '2px solid rgba(255, 255, 255, 0.3)'
                  }}
                >
                  U
                </Avatar>
              </Button>
            </Dropdown>
          </div>
        ) : (
          // ✅ MOBILE - WHITE GLASS MENU BUTTON
          <Button
            type="text"
            icon={<MenuOutlined style={{ fontSize: '20px', color: 'white' }} />}
            onClick={() => setMobileMenuVisible(true)}
            style={{ 
              width: 44,
              height: 44,
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}
          />
        )}
      </Header>

      {/* ✅ MOBILE DRAWER - UNCHANGED */}
      <Drawer
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 32,
              height: 32,
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold'
            }}>
              E
            </div>
            <span style={{ 
              fontFamily: '"Inter", sans-serif', 
              fontWeight: '700',
              color: '#1e293b'
            }}>
              EduCommerce AI
            </span>
          </div>
        }
        placement="right"
        open={mobileMenuVisible}
        onClose={() => setMobileMenuVisible(false)}
        width={320}
        styles={{
          body: { padding: 0 },
          header: { 
            borderBottom: '1px solid #e2e8f0',
            background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)'
          }
        }}
      >
        <div style={{ padding: 24 }}>
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <Menu
              mode="vertical"
              selectedKeys={[location.pathname]}
              items={menuItems}
              onClick={handleMenuClick}
              style={{ 
                border: 'none',
                background: 'transparent',
                fontSize: '16px'
              }}
            />
            
            <Button
              icon={<ShoppingCartOutlined />}
              onClick={handleCartClick}
              size="large"
              block
              style={{
                height: 56,
                borderRadius: '14px',
                fontSize: '16px',
                fontWeight: '700',
                background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                border: 'none',
                color: 'white'
              }}
            >
              <Space>
                <Badge count={itemCount} showZero={false}>
                  <span>Giỏ hàng</span>
                </Badge>
                {totalPrice > 0 && (
                  <Text style={{ color: 'rgba(255,255,255,0.9)' }}>
                    ({new Intl.NumberFormat('vi-VN').format(totalPrice)}₫)
                  </Text>
                )}
              </Space>
            </Button>
          </Space>
        </div>
      </Drawer>

      {/* CONTENT & FOOTER - UNCHANGED */}
      <Content style={{ 
        marginTop: '72px',
        padding: isMobile ? '20px' : '32px',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        minHeight: 'calc(100vh - 72px)'
      }}>
        <div 
          style={{ 
            maxWidth: 1400, 
            margin: '0 auto',
            background: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(20px)',
            borderRadius: '20px',
            padding: isMobile ? '20px' : '32px',
            minHeight: 'calc(100vh - 200px)',
            border: '1px solid rgba(226, 232, 240, 0.3)',
            boxShadow: '0 20px 40px rgba(100, 116, 139, 0.08)'
          }}
        >
          {children}
        </div>
      </Content>

      {/* ✨ BLUE GRADIENT FOOTER */}
      <Footer style={{ 
        background: 'linear-gradient(135deg, #1d4ed8 0%, #2563eb 50%, #3b82f6 100%)', // ✅ Same as header
        color: 'white', // ✅ White text
        padding: `${isMobile ? '32px 20px 20px' : '48px 32px 24px'}`,
        textAlign: 'center',
        borderTop: '1px solid rgba(59, 130, 246, 0.3)',
        boxShadow: '0 -4px 20px rgba(29, 78, 216, 0.15)'
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Space direction="vertical" size="large">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
              <div style={{
                width: 40,
                height: 40,
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%)', // ✅ White logo
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#1d4ed8', // ✅ Blue text
                fontWeight: 'bold',
                fontSize: '18px',
                boxShadow: '0 8px 25px rgba(255, 255, 255, 0.2)',
                border: '2px solid rgba(255, 255, 255, 0.3)'
              }}>
                E
              </div>
              <Title level={4} style={{ 
                color: 'white', // ✅ White title
                margin: 0,
                fontFamily: '"Inter", sans-serif',
                fontWeight: '800',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
              }}>
                🎓 EduCommerce AI
              </Title>
            </div>
            
            <Text style={{ 
              color: 'rgba(255, 255, 255, 0.85)', // ✅ Semi-transparent white
              fontSize: '16px',
              maxWidth: '500px',
              lineHeight: 1.6,
              fontWeight: '500'
            }}>
              Nền tảng học trực tuyến thông minh hàng đầu Việt Nam
            </Text>
            
            <Text style={{ 
              color: 'rgba(255, 255, 255, 0.7)', // ✅ More transparent white
              fontSize: '14px',
              fontWeight: '500'
            }}>
              © 2024 EduCommerce AI. All rights reserved.
            </Text>
          </Space>
        </div>
      </Footer>
    </Layout>
  );
}
