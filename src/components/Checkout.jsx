import React, { useState, useContext, useEffect } from 'react';
import {
  Card, Steps, Form, Input, Button, Radio, Divider, Space, Row, Col,
  Typography, List, Avatar, Tag, message, Modal, Spin, Alert,
  Select, DatePicker, InputNumber, Checkbox, Progress, Timeline
} from 'antd';
import {
  CreditCardOutlined, BankOutlined, PhoneOutlined, ShoppingCartOutlined,
  SafetyOutlined, CheckCircleOutlined, LoadingOutlined, WalletOutlined,
  GiftOutlined, PercentageOutlined, EnvironmentOutlined, UserOutlined,
  CalendarOutlined, LockOutlined, ShieldCheckOutlined
} from '@ant-design/icons';
import { CartContext } from '../context/CartContext';

const { Title, Text, Paragraph } = Typography;
const { Step } = Steps;
const { Option } = Select;

export default function Checkout() {
  const { cartItems, getTotalPrice, clearCart } = useContext(CartContext);
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm();
  const [paymentForm] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState('credit_card');
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [processingPayment, setProcessingPayment] = useState(false);

  const [orderInfo, setOrderInfo] = useState({
    orderId: null,
    paymentId: null,
    estimatedDelivery: null
  });

  // Mock coupons data
  const availableCoupons = [
    { code: 'STUDENT50', discount: 50, type: 'percent', description: 'Giảm 50% cho học sinh sinh viên' },
    { code: 'WELCOME100', discount: 100000, type: 'fixed', description: 'Giảm 100k cho thành viên mới' },
    { code: 'SUMMER2024', discount: 30, type: 'percent', description: 'Khuyến mãi hè 2024' },
    { code: 'FIRST ORDER', discount: 200000, type: 'fixed', description: 'Giảm 200k đơn hàng đầu tiên' }
  ];

  const totalPrice = getTotalPrice();
  const discountAmount = appliedCoupon ? 
    (appliedCoupon.type === 'percent' ? totalPrice * appliedCoupon.discount / 100 : appliedCoupon.discount) : 0;
  const finalPrice = Math.max(0, totalPrice - discountAmount);

  useEffect(() => {
    if (cartItems.length === 0) {
      message.warning('Giỏ hàng trống! Redirecting...');
      // Redirect to cart or home
    }
  }, [cartItems]);

  const applyCoupon = () => {
    const coupon = availableCoupons.find(c => c.code.toLowerCase() === couponCode.toLowerCase());
    if (coupon) {
      setAppliedCoupon(coupon);
      message.success(`🎉 Áp dụng mã giảm giá "${coupon.code}" thành công!`);
    } else {
      message.error('❌ Mã giảm giá không hợp lệ!');
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    message.info('Đã hủy mã giảm giá');
  };

  const handleNext = async () => {
    try {
      setLoading(true);
      
      if (current === 0) {
        // Validate shipping info
        await form.validateFields();
        setCurrent(current + 1);
      } else if (current === 1) {
        // Validate payment info
        await paymentForm.validateFields();
        setCurrent(current + 1);
      } else if (current === 2) {
        // Process payment
        await processPayment();
      }
    } catch (error) {
      console.error('Validation failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const processPayment = async () => {
    setProcessingPayment(true);
    
    try {
      // Mock payment processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Generate order info
      const orderId = 'EDU' + Date.now();
      const paymentId = 'PAY' + Date.now();
      
      setOrderInfo({
        orderId,
        paymentId,
        estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
      });
      
      setOrderSuccess(true);
      clearCart();
      message.success('🎉 Thanh toán thành công!');
      
    } catch (error) {
      message.error('❌ Thanh toán thất bại! Vui lòng thử lại.');
    } finally {
      setProcessingPayment(false);
    }
  };

  const paymentMethods = [
    {
      key: 'credit_card',
      title: '💳 Thẻ tín dụng/ghi nợ',
      description: 'Visa, Mastercard, JCB',
      icon: <CreditCardOutlined style={{ fontSize: '24px', color: '#1d4ed8' }} />
    },
    {
      key: 'bank_transfer',
      title: '🏦 Chuyển khoản ngân hàng',
      description: 'Vietcombank, Techcombank, BIDV',
      icon: <BankOutlined style={{ fontSize: '24px', color: '#059669' }} />
    },
    {
      key: 'e_wallet',
      title: '📱 Ví điện tử',
      description: 'MoMo, ZaloPay, ViettelPay',
      icon: <WalletOutlined style={{ fontSize: '24px', color: '#dc2626' }} />
    },
    {
      key: 'installment',
      title: '📅 Trả góp 0%',
      description: 'Chia đôi không lãi suất',
      icon: <CalendarOutlined style={{ fontSize: '24px', color: '#7c3aed' }} />
    }
  ];

  const steps = [
    {
      title: 'Thông tin',
      description: 'Địa chỉ & liên hệ',
      icon: <UserOutlined />
    },
    {
      title: 'Thanh toán',
      description: 'Phương thức thanh toán',
      icon: <CreditCardOutlined />
    },
    {
      title: 'Xác nhận',
      description: 'Kiểm tra đơn hàng',
      icon: <CheckCircleOutlined />
    }
  ];

  if (orderSuccess) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(135deg, #1d4ed8 0%, #2563eb 50%, #3b82f6 100%)',
        padding: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Card style={{
          maxWidth: 600,
          width: '100%',
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          borderRadius: '20px',
          textAlign: 'center'
        }}>
          <div style={{ padding: '40px 20px' }}>
            <div style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px',
              animation: 'bounce 1s ease-in-out'
            }}>
              <CheckCircleOutlined style={{ fontSize: '60px', color: 'white' }} />
            </div>

            <Title level={2} style={{ color: '#1e293b', marginBottom: '16px' }}>
              🎉 Thanh toán thành công!
            </Title>
            
            <Paragraph style={{ fontSize: '16px', color: '#64748b', marginBottom: '32px' }}>
              Cảm ơn bạn đã mua hàng. Đơn hàng của bạn đã được xử lý thành công.
            </Paragraph>

            <div style={{
              background: 'rgba(29, 78, 216, 0.1)',
              borderRadius: '12px',
              padding: '20px',
              marginBottom: '32px'
            }}>
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={12}>
                  <Text strong style={{ color: '#1d4ed8' }}>📦 Mã đơn hàng:</Text>
                  <br />
                  <Text copyable style={{ fontSize: '16px', color: '#1e293b' }}>
                    {orderInfo.orderId}
                  </Text>
                </Col>
                <Col xs={24} sm={12}>
                  <Text strong style={{ color: '#1d4ed8' }}>💳 Mã thanh toán:</Text>
                  <br />
                  <Text copyable style={{ fontSize: '16px', color: '#1e293b' }}>
                    {orderInfo.paymentId}
                  </Text>
                </Col>
                <Col xs={24}>
                  <Text strong style={{ color: '#1d4ed8' }}>💰 Tổng thanh toán:</Text>
                  <br />
                  <Text style={{ fontSize: '24px', color: '#059669', fontWeight: 'bold' }}>
                    {finalPrice.toLocaleString('vi-VN')}₫
                  </Text>
                </Col>
              </Row>
            </div>

            <Alert
              message="Thông tin quan trọng"
              description="Bạn sẽ nhận được email xác nhận và hướng dẫn truy cập khóa học trong vòng 5 phút. Vui lòng kiểm tra cả hộp thư rác."
              type="info"
              showIcon
              style={{ 
                marginBottom: '24px',
                background: 'rgba(59, 130, 246, 0.1)',
                border: '1px solid rgba(59, 130, 246, 0.2)'
              }}
            />

            <Space direction="vertical" style={{ width: '100%' }}>
              <Button 
                type="primary" 
                size="large" 
                style={{
                  background: 'linear-gradient(135deg, #1d4ed8 0%, #3b82f6 100%)',
                  border: 'none',
                  borderRadius: '10px',
                  height: '50px',
                  fontSize: '16px',
                  fontWeight: '600'
                }}
                onClick={() => window.location.href = '/courses'}
              >
                📚 Vào học ngay
              </Button>
              
              <Button 
                size="large"
                style={{
                  borderRadius: '10px',
                  height: '44px',
                  fontSize: '15px'
                }}
                onClick={() => window.location.href = '/'}
              >
                🏠 Về trang chủ
              </Button>
            </Space>
          </div>
        </Card>
      </div>
    );
  }

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
          marginBottom: '24px'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <Title level={1} style={{ margin: 0, color: '#1e293b' }}>
              🛒 Thanh toán đơn hàng
            </Title>
            <Text style={{ fontSize: '16px', color: '#64748b' }}>
              Hoàn tất thanh toán để bắt đầu hành trình học tập
            </Text>
          </div>

          <Steps current={current} items={steps} style={{ maxWidth: '600px', margin: '0 auto' }} />
        </Card>

        <Row gutter={[24, 24]}>
          {/* ✅ Main Content */}
          <Col xs={24} lg={16}>
            <Card style={{
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '16px'
            }}>
              {/* Step 1: Shipping Information */}
              {current === 0 && (
                <div>
                  <Title level={3} style={{ color: '#1e293b', marginBottom: '24px' }}>
                    📝 Thông tin liên hệ
                  </Title>
                  
                  <Form
                    form={form}
                    layout="vertical"
                    initialValues={{
                      country: 'VN',
                      saveInfo: true
                    }}
                  >
                    <Row gutter={[16, 16]}>
                      <Col xs={24} sm={12}>
                        <Form.Item
                          label="Họ và tên"
                          name="fullName"
                          rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
                        >
                          <Input 
                            placeholder="Nhập họ và tên đầy đủ" 
                            style={{ borderRadius: '8px', height: '44px' }}
                          />
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
                          <Input 
                            placeholder="example@email.com" 
                            style={{ borderRadius: '8px', height: '44px' }}
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={12}>
                        <Form.Item
                          label="Số điện thoại"
                          name="phone"
                          rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
                        >
                          <Input 
                            placeholder="0123456789" 
                            style={{ borderRadius: '8px', height: '44px' }}
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={12}>
                        <Form.Item
                          label="Quốc gia/Vùng"
                          name="country"
                        >
                          <Select style={{ borderRadius: '8px', height: '44px' }}>
                            <Option value="VN">🇻🇳 Việt Nam</Option>
                            <Option value="US">🇺🇸 United States</Option>
                            <Option value="JP">🇯🇵 Japan</Option>
                            <Option value="KR">🇰🇷 South Korea</Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col xs={24}>
                        <Form.Item
                          label="Địa chỉ"
                          name="address"
                          rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
                        >
                          <Input 
                            placeholder="Số nhà, tên đường, phường/xã" 
                            style={{ borderRadius: '8px', height: '44px' }}
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={8}>
                        <Form.Item
                          label="Thành phố"
                          name="city"
                          rules={[{ required: true, message: 'Vui lòng nhập thành phố!' }]}
                        >
                          <Input 
                            placeholder="Hồ Chí Minh" 
                            style={{ borderRadius: '8px', height: '44px' }}
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={8}>
                        <Form.Item
                          label="Quận/Huyện"
                          name="district"
                          rules={[{ required: true, message: 'Vui lòng nhập quận/huyện!' }]}
                        >
                          <Input 
                            placeholder="Quận 1" 
                            style={{ borderRadius: '8px', height: '44px' }}
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={8}>
                        <Form.Item
                          label="Mã bưu chính"
                          name="zipCode"
                        >
                          <Input 
                            placeholder="700000" 
                            style={{ borderRadius: '8px', height: '44px' }}
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24}>
                        <Form.Item name="saveInfo" valuePropName="checked">
                          <Checkbox>
                            💾 Lưu thông tin này cho lần mua hàng tiếp theo
                          </Checkbox>
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form>
                </div>
              )}

              {/* Step 2: Payment Method */}
              {current === 1 && (
                <div>
                  <Title level={3} style={{ color: '#1e293b', marginBottom: '24px' }}>
                    💳 Phương thức thanh toán
                  </Title>

                  <Radio.Group 
                    value={selectedPayment} 
                    onChange={(e) => setSelectedPayment(e.target.value)}
                    style={{ width: '100%' }}
                  >
                    <Space direction="vertical" size={16} style={{ width: '100%' }}>
                      {paymentMethods.map((method) => (
                        <Card
                          key={method.key}
                          style={{
                            border: selectedPayment === method.key ? '2px solid #1d4ed8' : '1px solid #e2e8f0',
                            borderRadius: '12px',
                            cursor: 'pointer',
                            background: selectedPayment === method.key ? 'rgba(29, 78, 216, 0.05)' : 'white'
                          }}
                          bodyStyle={{ padding: '16px' }}
                          onClick={() => setSelectedPayment(method.key)}
                        >
                          <Radio value={method.key} style={{ width: '100%' }}>
                            <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                              <div style={{ marginRight: '16px' }}>
                                {method.icon}
                              </div>
                              <div style={{ flex: 1 }}>
                                <Text strong style={{ fontSize: '16px', color: '#1e293b' }}>
                                  {method.title}
                                </Text>
                                <br />
                                <Text style={{ color: '#64748b' }}>
                                  {method.description}
                                </Text>
                              </div>
                            </div>
                          </Radio>
                        </Card>
                      ))}
                    </Space>
                  </Radio.Group>

                  <Divider />

                  {/* Payment Form */}
                  <Form
                    form={paymentForm}
                    layout="vertical"
                  >
                    {selectedPayment === 'credit_card' && (
                      <Row gutter={[16, 16]}>
                        <Col xs={24}>
                          <Form.Item
                            label="Số thẻ"
                            name="cardNumber"
                            rules={[{ required: true, message: 'Vui lòng nhập số thẻ!' }]}
                          >
                            <Input 
                              placeholder="1234 5678 9012 3456" 
                              style={{ borderRadius: '8px', height: '44px' }}
                              maxLength={19}
                            />
                          </Form.Item>
                        </Col>
                        <Col xs={24} sm={12}>
                          <Form.Item
                            label="Tên chủ thẻ"
                            name="cardName"
                            rules={[{ required: true, message: 'Vui lòng nhập tên chủ thẻ!' }]}
                          >
                            <Input 
                              placeholder="NGUYEN VAN A" 
                              style={{ borderRadius: '8px', height: '44px' }}
                            />
                          </Form.Item>
                        </Col>
                        <Col xs={12} sm={6}>
                          <Form.Item
                            label="MM/YY"
                            name="expiry"
                            rules={[{ required: true, message: 'Vui lòng nhập ngày hết hạn!' }]}
                          >
                            <Input 
                              placeholder="12/28" 
                              style={{ borderRadius: '8px', height: '44px' }}
                              maxLength={5}
                            />
                          </Form.Item>
                        </Col>
                        <Col xs={12} sm={6}>
                          <Form.Item
                            label="CVV"
                            name="cvv"
                            rules={[{ required: true, message: 'Vui lòng nhập CVV!' }]}
                          >
                            <Input 
                              placeholder="123" 
                              style={{ borderRadius: '8px', height: '44px' }}
                              maxLength={4}
                              type="password"
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                    )}

                    {selectedPayment === 'bank_transfer' && (
                      <Alert
                        message="Chuyển khoản ngân hàng"
                        description={
                          <div>
                            <p><strong>Số tài khoản:</strong> 1234567890</p>
                            <p><strong>Chủ tài khoản:</strong> CONG TY TNHH EDU COMMERCE</p>
                            <p><strong>Ngân hàng:</strong> Vietcombank - Chi nhánh TP.HCM</p>
                            <p><strong>Nội dung:</strong> EDU {Date.now()}</p>
                          </div>
                        }
                        type="info"
                        showIcon
                        style={{ background: 'rgba(59, 130, 246, 0.1)' }}
                      />
                    )}

                    {selectedPayment === 'e_wallet' && (
                      <div style={{ textAlign: 'center', padding: '40px' }}>
                        <div style={{
                          width: '200px',
                          height: '200px',
                          background: 'linear-gradient(135deg, #1d4ed8 0%, #3b82f6 100%)',
                          borderRadius: '12px',
                          margin: '0 auto 16px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontSize: '48px'
                        }}>
                          📱
                        </div>
                        <Title level={4} style={{ color: '#1e293b' }}>
                          Quét mã QR để thanh toán
                        </Title>
                        <Text style={{ color: '#64748b' }}>
                          Sử dụng ứng dụng MoMo, ZaloPay hoặc ví điện tử khác để quét mã
                        </Text>
                      </div>
                    )}

                    {selectedPayment === 'installment' && (
                      <Alert
                        message="Trả góp 0% lãi suất"
                        description="Chia đôi giá trị đơn hàng thành 2 kỳ thanh toán không lãi suất. Kỳ đầu thanh toán ngay, kỳ 2 thanh toán sau 30 ngày."
                        type="success"
                        showIcon
                        style={{ background: 'rgba(34, 197, 94, 0.1)' }}
                      />
                    )}
                  </Form>
                </div>
              )}

              {/* Step 3: Review & Confirm */}
              {current === 2 && (
                <div>
                  <Title level={3} style={{ color: '#1e293b', marginBottom: '24px' }}>
                    ✅ Xác nhận đơn hàng
                  </Title>

                  {processingPayment ? (
                    <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                      <Spin 
                        size="large" 
                        indicator={<LoadingOutlined style={{ fontSize: 48, color: '#1d4ed8' }} spin />}
                      />
                      <Title level={3} style={{ marginTop: '24px', color: '#1e293b' }}>
                        Đang xử lý thanh toán...
                      </Title>
                      <Text style={{ color: '#64748b' }}>
                        Vui lòng không tắt trình duyệt trong quá trình xử lý
                      </Text>
                      
                      <Progress 
                        percent={66} 
                        strokeColor="#1d4ed8" 
                        style={{ marginTop: '24px', maxWidth: '300px' }}
                      />
                    </div>
                  ) : (
                    <div>
                      {/* Order Summary */}
                      <Card 
                        title="📦 Thông tin đơn hàng" 
                        style={{ marginBottom: '24px', borderRadius: '12px' }}
                      >
                        <List
                          dataSource={cartItems}
                          renderItem={(item) => (
                            <List.Item>
                              <List.Item.Meta
                                avatar={
                                  <Avatar
                                    src={item.image}
                                    size={64}
                                    style={{
                                      background: 'linear-gradient(135deg, #1d4ed8 0%, #3b82f6 100%)',
                                      borderRadius: '8px'
                                    }}
                                  >
                                    📚
                                  </Avatar>
                                }
                                title={<Text strong style={{ color: '#1e293b' }}>{item.name}</Text>}
                                description={
                                  <Space>
                                    <Tag color="blue">📚 {item.category}</Tag>
                                    <Tag color="green">⏱️ {item.duration}</Tag>
                                  </Space>
                                }
                              />
                              <div style={{ textAlign: 'right' }}>
                                <Text strong style={{ fontSize: '16px', color: '#1d4ed8' }}>
                                  {item.price.toLocaleString('vi-VN')}₫
                                </Text>
                              </div>
                            </List.Item>
                          )}
                        />
                      </Card>

                      {/* Payment & Security Info */}
                      <Row gutter={[16, 16]}>
                        <Col xs={24} sm={12}>
                          <Card title="💳 Phương thức thanh toán" style={{ borderRadius: '12px' }}>
                            <Space>
                              {paymentMethods.find(m => m.key === selectedPayment)?.icon}
                              <div>
                                <Text strong>
                                  {paymentMethods.find(m => m.key === selectedPayment)?.title}
                                </Text>
                                <br />
                                <Text type="secondary">
                                  {paymentMethods.find(m => m.key === selectedPayment)?.description}
                                </Text>
                              </div>
                            </Space>
                          </Card>
                        </Col>
                        <Col xs={24} sm={12}>
                          <Card title="🛡️ Bảo mật" style={{ borderRadius: '12px' }}>
                            <Space direction="vertical">
                              <Space>
                                <ShieldCheckOutlined style={{ color: '#22c55e' }} />
                                <Text>SSL 256-bit encryption</Text>
                              </Space>
                              <Space>
                                <LockOutlined style={{ color: '#22c55e' }} />
                                <Text>Thanh toán bảo mật 100%</Text>
                              </Space>
                              <Space>
                                <SafetyOutlined style={{ color: '#22c55e' }} />
                                <Text>Hoàn tiền trong 7 ngày</Text>
                              </Space>
                            </Space>
                          </Card>
                        </Col>
                      </Row>

                      <Alert
                        message="Điều khoản sử dụng"
                        description={
                          <div>
                            Bằng việc nhấn "Hoàn tất thanh toán", bạn đồng ý với{' '}
                            <a href="#" style={{ color: '#1d4ed8' }}>Điều khoản dịch vụ</a> và{' '}
                            <a href="#" style={{ color: '#1d4ed8' }}>Chính sách bảo mật</a> của chúng tôi.
                          </div>
                        }
                        type="info"
                        showIcon
                        style={{ 
                          marginTop: '24px',
                          background: 'rgba(59, 130, 246, 0.1)',
                          border: '1px solid rgba(59, 130, 246, 0.2)'
                        }}
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Navigation Buttons */}
              {!processingPayment && (
                <div style={{ marginTop: '32px', textAlign: 'right' }}>
                  <Space>
                    {current > 0 && (
                      <Button 
                        size="large"
                        onClick={() => setCurrent(current - 1)}
                        style={{ borderRadius: '8px' }}
                      >
                        ← Quay lại
                      </Button>
                    )}
                    <Button
                      type="primary"
                      size="large"
                      loading={loading}
                      onClick={handleNext}
                      style={{
                        background: 'linear-gradient(135deg, #1d4ed8 0%, #3b82f6 100%)',
                        border: 'none',
                        borderRadius: '8px',
                        minWidth: '120px'
                      }}
                    >
                      {current === steps.length - 1 ? '💳 Hoàn tất thanh toán' : 'Tiếp tục →'}
                    </Button>
                  </Space>
                </div>
              )}
            </Card>
          </Col>

          {/* ✅ Order Summary Sidebar */}
          <Col xs={24} lg={8}>
            <Card style={{
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '16px',
              position: 'sticky',
              top: '24px'
            }}>
              <Title level={4} style={{ color: '#1e293b', marginBottom: '16px' }}>
                📋 Tóm tắt đơn hàng
              </Title>

              {/* Coupon Section */}
              <div style={{ marginBottom: '20px' }}>
                <Space.Compact style={{ width: '100%' }}>
                  <Input
                    placeholder="Nhập mã giảm giá"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    style={{ borderRadius: '8px 0 0 8px' }}
                  />
                  <Button 
                    onClick={applyCoupon}
                    style={{
                      background: 'linear-gradient(135deg, #1d4ed8 0%, #3b82f6 100%)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '0 8px 8px 0'
                    }}
                  >
                    Áp dụng
                  </Button>
                </Space.Compact>

                {appliedCoupon && (
                  <div style={{
                    marginTop: '12px',
                    padding: '12px',
                    background: 'rgba(34, 197, 94, 0.1)',
                    borderRadius: '8px',
                    border: '1px solid rgba(34, 197, 94, 0.2)'
                  }}>
                    <Space style={{ width: '100%', justifyContent: 'space-between' }}>
                      <div>
                        <Text strong style={{ color: '#22c55e' }}>
                          🎉 {appliedCoupon.code}
                        </Text>
                        <br />
                        <Text style={{ fontSize: '12px', color: '#64748b' }}>
                          {appliedCoupon.description}
                        </Text>
                      </div>
                      <Button 
                        type="text" 
                        size="small" 
                        onClick={removeCoupon}
                        style={{ color: '#ef4444' }}
                      >
                        ✕
                      </Button>
                    </Space>
                  </div>
                )}
              </div>

              <Divider />

              {/* Price Breakdown */}
              <Space direction="vertical" style={{ width: '100%' }} size={12}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Text>Tạm tính ({cartItems.length} khóa học):</Text>
                  <Text>{totalPrice.toLocaleString('vi-VN')}₫</Text>
                </div>
                
                {appliedCoupon && (
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Text style={{ color: '#22c55e' }}>
                      Giảm giá ({appliedCoupon.code}):
                    </Text>
                    <Text style={{ color: '#22c55e' }}>
                      -{discountAmount.toLocaleString('vi-VN')}₫
                    </Text>
                  </div>
                )}
                
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Text>Phí xử lý:</Text>
                  <Text>Miễn phí</Text>
                </div>
              </Space>

              <Divider />

              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                padding: '16px',
                background: 'rgba(29, 78, 216, 0.1)',
                borderRadius: '8px'
              }}>
                <Text strong style={{ fontSize: '18px', color: '#1e293b' }}>
                  Tổng cộng:
                </Text>
                <Text strong style={{ fontSize: '24px', color: '#1d4ed8' }}>
                  {finalPrice.toLocaleString('vi-VN')}₫
                </Text>
              </div>

              {/* Available Coupons */}
              <div style={{ marginTop: '20px' }}>
                <Text strong style={{ color: '#1e293b' }}>🎁 Mã giảm giá khả dụng:</Text>
                <div style={{ marginTop: '12px' }}>
                  {availableCoupons.slice(0, 3).map((coupon) => (
                    <div
                      key={coupon.code}
                      style={{
                        padding: '8px 12px',
                        margin: '4px 0',
                        background: 'rgba(29, 78, 216, 0.05)',
                        borderRadius: '6px',
                        border: '1px solid rgba(29, 78, 216, 0.1)',
                        cursor: 'pointer'
                      }}
                      onClick={() => {
                        setCouponCode(coupon.code);
                        applyCoupon();
                      }}
                    >
                      <Text strong style={{ color: '#1d4ed8' }}>{coupon.code}</Text>
                      <br />
                      <Text style={{ fontSize: '12px', color: '#64748b' }}>
                        {coupon.description}
                      </Text>
                    </div>
                  ))}
                </div>
              </div>

              {/* Security Badges */}
              <div style={{ marginTop: '24px', textAlign: 'center' }}>
                <Space direction="vertical">
                  <Space>
                    <ShieldCheckOutlined style={{ color: '#22c55e' }} />
                    <Text style={{ fontSize: '12px', color: '#64748b' }}>
                      Thanh toán bảo mật SSL
                    </Text>
                  </Space>
                  <Space>
                    <SafetyOutlined style={{ color: '#22c55e' }} />
                    <Text style={{ fontSize: '12px', color: '#64748b' }}>
                      Hoàn tiền 100% trong 7 ngày
                    </Text>
                  </Space>
                </Space>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}