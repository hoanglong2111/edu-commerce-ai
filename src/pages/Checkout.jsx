import React, { useState } from 'react';
import {
  Typography,
  Card,
  Form,
  Input,
  Button,
  Row,
  Col,
  Radio,
  Space,
  message,
  Result,
  Timeline,
  Steps,
  Progress,
  Divider,
  Alert
} from 'antd';
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  HomeOutlined,
  CreditCardOutlined,
  CheckCircleOutlined,
  ArrowLeftOutlined,
  ShoppingCartOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { orderService } from '../services/orderService';

const { Title, Text } = Typography;

export default function Checkout() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { cartItems, getTotalPrice, getTotalItems, clearCart } = useCart();
  
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderInfo, setOrderInfo] = useState(null);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [paymentMessage, setPaymentMessage] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('banking');

  // ✅ SAFE: Calculate values with fallbacks
  const totalPrice = getTotalPrice ? getTotalPrice() : 0;
  const totalItems = getTotalItems ? getTotalItems() : 0;
  const discount = totalPrice > 1000000 ? totalPrice * 0.1 : 0;
  const finalPrice = totalPrice - discount;

  console.log('💳 Checkout page render:', {
    cartItems: cartItems?.length || 0,
    totalPrice,
    totalItems,
    currentStep,
    orderComplete
  });

  // Check if cart is empty
  if (!cartItems || cartItems.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px' }}>
        <Result
          icon={<ShoppingCartOutlined style={{ color: '#faad14' }} />}
          title="Giỏ hàng trống"
          subTitle="Bạn cần thêm sản phẩm vào giỏ hàng trước khi thanh toán"
          extra={
            <Button type="primary" onClick={() => navigate('/')}>
              Về trang chủ
            </Button>
          }
        />
      </div>
    );
  }

  // 🆕 THÊM PAYMENT METHODS DATA
  const paymentMethods = [
    {
      key: 'momo',
      title: '📱 Ví MoMo',
      description: 'Thanh toán nhanh chóng qua ví MoMo',
      icon: '📱',
      popular: true,
      color: '#d82c8b'
    },
    {
      key: 'zalopay', 
      title: '💳 ZaloPay',
      description: 'Thanh toán an toàn với ZaloPay',
      icon: '💳',
      popular: false,
      color: '#0068ff'
    },
    {
      key: 'banking',
      title: '🏦 Chuyển khoản',
      description: 'Chuyển khoản qua ngân hàng',
      icon: '🏦',
      popular: false,
      color: '#52c41a'
    },
    {
      key: 'vnpay',
      title: '🏧 VNPay',
      description: 'Cổng thanh toán VNPay',
      icon: '🏧',
      popular: false,
      color: '#1890ff'
    }
  ];

  const steps = [
    {
      title: 'Thông tin',
      icon: <UserOutlined />
    },
    {
      title: 'Thanh toán',
      icon: <CreditCardOutlined />
    },
    {
      title: 'Hoàn thành',
      icon: <CheckCircleOutlined />
    }
  ];

  // 🆕 PAYMENT PROCESSING STEPS
  const paymentSteps = [
    { title: 'Xác thực thông tin', description: 'Kiểm tra dữ liệu đơn hàng' },
    { title: 'Kết nối thanh toán', description: 'Liên kết với cổng thanh toán' },
    { title: 'Xử lý giao dịch', description: 'Thực hiện thanh toán' },
    { title: 'Hoàn tất', description: 'Thanh toán thành công' }
  ];

  // 🆕 ENHANCED PAYMENT PROCESSING FUNCTION
  const processPayment = async () => {
    setProcessingPayment(true);
    setCurrentStep(0);
    
    try {
      const messages = [
        'Đang xác thực thông tin khách hàng...',
        'Kết nối với cổng thanh toán...',
        'Đang xử lý giao dịch...',
        'Hoàn tất thanh toán...'
      ];
      
      for (let i = 0; i < messages.length; i++) {
        setPaymentMessage(messages[i]);
        setCurrentStep(i);
        await new Promise(resolve => setTimeout(resolve, 1200));
      }
      
      // Success simulation
      const orderId = 'EDU' + Date.now();
      const paymentId = 'PAY' + Date.now();
      
      setOrderInfo({
        orderId,
        paymentId,
        method: paymentMethod,
        amount: finalPrice,
        transactionTime: new Date().toLocaleString('vi-VN'),
        items: cartItems.length
      });
      
      setOrderComplete(true);
      clearCart();
      message.success('🎉 Thanh toán thành công!');
      
    } catch (error) {
      message.error('❌ Thanh toán thất bại! Vui lòng thử lại.');
    } finally {
      setProcessingPayment(false);
      setCurrentStep(0);
    }
  };

  // 🆕 GET PAYMENT METHOD INFO
  const getPaymentMethodInfo = (key) => {
    return paymentMethods.find(method => method.key === key);
  };

  const handleFormSubmit = async (values) => {
    try {
      setLoading(true);
      console.log('📝 Form submitted:', values);

      // Create order
      const orderData = {
        customerInfo: values,
        items: cartItems,
        totalPrice: finalPrice,
        discount,
        paymentMethod: values.paymentMethod
      };

      console.log('🛒 Creating order:', orderData);
      
      // Simulate API call
      const response = await orderService.createOrder(orderData);
      
      if (response.success) {
        setOrderInfo(response.data);
        setOrderComplete(true);
        
        // Clear cart after successful order
        if (clearCart) {
          clearCart();
        }
        
        message.success('🎉 Đặt hàng thành công!');
        setCurrentStep(2);
      } else {
        throw new Error(response.message || 'Đặt hàng thất bại');
      }
    } catch (error) {
      console.error('❌ Checkout Error:', error);
      message.error('❌ Có lỗi xảy ra: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    if (currentStep === 0) {
      form.validateFields().then(() => {
        setCurrentStep(1);
      }).catch(() => {
        message.error('Vui lòng điền đầy đủ thông tin');
      });
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  if (orderComplete) {
    return (
      <div>
        <Steps current={currentStep} items={steps} style={{ marginBottom: 32 }} />
        
        <Result
          status="success"
          title="🎉 Đặt hàng thành công!"
          subTitle={
            <Space direction="vertical" size="middle">
              <Text>Mã đơn hàng: <Text strong>{orderInfo?.orderId}</Text></Text>
              <Text>Mã giao dịch: <Text strong>{orderInfo?.paymentId}</Text></Text>
              <Text>Phương thức: <Text strong style={{ color: getPaymentMethodInfo(orderInfo?.method)?.color }}>
                {getPaymentMethodInfo(orderInfo?.method)?.title}
              </Text></Text>
              <Text>Thời gian: <Text strong>{orderInfo?.transactionTime}</Text></Text>
            </Space>
          }
          extra={[
            <Button type="primary" size="large" onClick={() => navigate('/courses')}>
              🎓 Bắt đầu học ngay
            </Button>,
            <Button size="large" onClick={() => navigate('/')}>
              🏠 Về trang chủ  
            </Button>
          ]}
        >
          <Card style={{ marginTop: 24, textAlign: 'left' }}>
            <Timeline>
              <Timeline.Item color="green">
                <Text strong>✅ Thanh toán hoàn tất</Text>
                <br />
                <Text type="secondary">{orderInfo?.transactionTime}</Text>
              </Timeline.Item>
              <Timeline.Item color="blue">
                <Text strong>📧 Email xác nhận đã gửi</Text>
                <br />
                <Text type="secondary">Kiểm tra hộp thư của bạn</Text>
              </Timeline.Item>
              <Timeline.Item color="orange">
                <Text strong>🎓 Truy cập khóa học</Text>
                <br />
                <Text type="secondary">Có thể học ngay lập tức</Text>
              </Timeline.Item>
              <Timeline.Item>
                <Text strong>📱 Tải ứng dụng mobile</Text>
                <br />
                <Text type="secondary">Học mọi lúc mọi nơi</Text>
              </Timeline.Item>
            </Timeline>
          </Card>
        </Result>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 24, display: 'flex', alignItems: 'center', gap: 16 }}>
        <Button 
          icon={<ArrowLeftOutlined />} 
          onClick={() => navigate('/cart')}
        >
          Quay lại
        </Button>
        <div>
          <Title level={2} style={{ margin: 0 }}>
            💳 Thanh Toán
          </Title>
          <Text type="secondary">
            Hoàn tất thông tin để thanh toán {totalItems} khóa học
          </Text>
        </div>
      </div>

      {/* Steps */}
      <Steps current={currentStep} items={steps} style={{ marginBottom: 32 }} />

      <Row gutter={[24, 24]}>
        {/* Form */}
        <Col xs={24} lg={16}>
          <Card>
            <Form
              form={form}
              layout="vertical"
              onFinish={handleFormSubmit}
              initialValues={{
                paymentMethod: 'banking'
              }}
            >
              {currentStep === 0 && (
                <>
                  <Title level={4}>👤 Thông tin khách hàng</Title>
                  
                  <Row gutter={16}>
                    <Col xs={24} sm={12}>
                      <Form.Item
                        name="fullName"
                        label="Họ và tên"
                        rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}
                      >
                        <Input 
                          prefix={<UserOutlined />} 
                          placeholder="Nguyễn Văn A"
                          size="large"
                        />
                      </Form.Item>
                    </Col>
                    
                    <Col xs={24} sm={12}>
                      <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                          { required: true, message: 'Vui lòng nhập email' },
                          { type: 'email', message: 'Email không hợp lệ' }
                        ]}
                      >
                        <Input 
                          prefix={<MailOutlined />} 
                          placeholder="example@email.com"
                          size="large"
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={16}>
                    <Col xs={24} sm={12}>
                      <Form.Item
                        name="phone"
                        label="Số điện thoại"
                        rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
                      >
                        <Input 
                          prefix={<PhoneOutlined />} 
                          placeholder="0901234567"
                          size="large"
                        />
                      </Form.Item>
                    </Col>
                    
                    <Col xs={24} sm={12}>
                      <Form.Item
                        name="address"
                        label="Địa chỉ"
                      >
                        <Input 
                          prefix={<HomeOutlined />} 
                          placeholder="Địa chỉ của bạn"
                          size="large"
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  <div style={{ textAlign: 'right', marginTop: 24 }}>
                    <Button type="primary" size="large" onClick={nextStep}>
                      Tiếp tục
                    </Button>
                  </div>
                </>
              )}

              {currentStep === 1 && (
                <>
                  {/* 🆕 ENHANCED PAYMENT METHODS SECTION */}
                  <Card title="💳 Phương thức thanh toán" style={{ marginBottom: '24px' }}>
                    <Radio.Group 
                      value={paymentMethod} 
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      style={{ width: '100%' }}
                    >
                      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                        {paymentMethods.map(method => (
                          <Card
                            key={method.key}
                            size="small"
                            style={{
                              border: paymentMethod === method.key ? `2px solid ${method.color}` : '1px solid #d9d9d9',
                              borderRadius: '8px',
                              cursor: 'pointer',
                              transition: 'all 0.3s ease',
                              background: paymentMethod === method.key ? `${method.color}10` : 'white'
                            }}
                            onClick={() => setPaymentMethod(method.key)}
                            hoverable
                          >
                            <Radio value={method.key} style={{ width: '100%' }}>
                              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Space>
                                  <span style={{ fontSize: '24px' }}>{method.icon}</span>
                                  <div>
                                    <Text strong style={{ color: method.color }}>{method.title}</Text>
                                    {method.popular && (
                                      <span style={{
                                        marginLeft: '8px',
                                        background: '#ff4d4f',
                                        color: 'white',
                                        padding: '2px 6px',
                                        borderRadius: '10px',
                                        fontSize: '10px'
                                      }}>
                                        PHỔ BIẾN
                                      </span>
                                    )}
                                    <br />
                                    <Text type="secondary" style={{ fontSize: '12px' }}>
                                      {method.description}
                                    </Text>
                                  </div>
                                </Space>
                              </div>
                            </Radio>
                          </Card>
                        ))}
                      </Space>
                    </Radio.Group>
                  </Card>

                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 24 }}>
                    <Button size="large" onClick={prevStep}>
                      Quay lại
                    </Button>
                    <Button 
                      type="primary" 
                      size="large" 
                      onClick={processPayment}
                      loading={processingPayment}
                      style={{
                        width: '100%',
                        height: '50px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        background: getPaymentMethodInfo(paymentMethod)?.color || '#1890ff',
                        borderColor: getPaymentMethodInfo(paymentMethod)?.color || '#1890ff',
                        borderRadius: '8px'
                      }}
                      disabled={!paymentMethod || cartItems.length === 0}
                    >
                      {processingPayment ? (
                        <Space>
                          <span>⏳</span>
                          {paymentMessage || 'Đang xử lý thanh toán...'}
                        </Space>
                      ) : (
                        <Space>
                          <span>{getPaymentMethodInfo(paymentMethod)?.icon || '💳'}</span>
                          Thanh toán {finalPrice?.toLocaleString()}₫
                        </Space>
                      )}
                    </Button>
                  </div>
                </>
              )}
            </Form>
          </Card>
        </Col>

        {/* Order Summary */}
        <Col xs={24} lg={8}>
          <Card title="📋 Tóm tắt đơn hàng" style={{ position: 'sticky', top: 100 }}>
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              {/* Items */}
              <div>
                <Text strong style={{ marginBottom: 12, display: 'block' }}>
                  Khóa học ({cartItems.length})
                </Text>
                {cartItems.slice(0, 3).map(item => (
                  <div key={item.id} style={{ marginBottom: 8 }}>
                    <Text ellipsis style={{ fontSize: 12 }}>
                      • {item.name}
                    </Text>
                    <div style={{ textAlign: 'right' }}>
                      <Text style={{ fontSize: 12 }}>
                        {new Intl.NumberFormat('vi-VN').format(item.price)}₫
                      </Text>
                    </div>
                  </div>
                ))}
                {cartItems.length > 3 && (
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    ... và {cartItems.length - 3} khóa học khác
                  </Text>
                )}
              </div>

              <Divider style={{ margin: '12px 0' }} />

              {/* Price calculation */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <Text>Tạm tính:</Text>
                  <Text>{new Intl.NumberFormat('vi-VN').format(totalPrice)}₫</Text>
                </div>
                
                {discount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <Text type="success">Giảm giá:</Text>
                    <Text type="success">-{new Intl.NumberFormat('vi-VN').format(discount)}₫</Text>
                  </div>
                )}
              </div>

              <Divider style={{ margin: '12px 0' }} />

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Title level={4} style={{ margin: 0 }}>Tổng cộng:</Title>
                <Title level={4} style={{ margin: 0, color: '#ff4d4f' }}>
                  {new Intl.NumberFormat('vi-VN').format(finalPrice)}₫
                </Title>
              </div>

              {discount > 0 && (
                <Alert
                  message="🎉 Giảm giá 10%"
                  type="success"
                  showIcon
                  style={{ marginTop: 16 }}
                />
              )}
            </Space>
          </Card>
        </Col>
      </Row>

      {/* 🆕 THÊM PROCESSING MODAL (thêm sau nút thanh toán) */}
      {processingPayment && (
        <Card
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1000,
            width: '400px',
            textAlign: 'center',
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
          }}
        >
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <div style={{ fontSize: '48px' }}>
              {getPaymentMethodInfo(paymentMethod)?.icon}
            </div>
            
            <Title level={4}>Đang xử lý thanh toán</Title>
            
            <Steps
              current={currentStep}
              direction="vertical"
              size="small"
              items={paymentSteps}
            />
            
            <Progress 
              percent={(currentStep + 1) * 25} 
              strokeColor={getPaymentMethodInfo(paymentMethod)?.color}
              showInfo={false}
            />
            
            <Text type="secondary">{paymentMessage}</Text>
          </Space>
        </Card>
      )}
    </div>
  );
}