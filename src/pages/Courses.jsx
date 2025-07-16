import React, { useState, useEffect } from 'react';
import { Typography, Card, Row, Col, Tabs, Empty, Spin, message } from 'antd';
import { BookOutlined, PlayCircleOutlined, TrophyOutlined } from '@ant-design/icons';
import ProductCard from '../components/ProductCard';
import { productService } from '../services/productService';
import { useCart } from '../context/CartContext';

const { Title, Text } = Typography;

function Courses() {
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]); // ✅ Default empty array
  const { addToCart } = useCart();

  console.log('📚 Courses render:', {
    loading,
    courses: courses?.length || 0,
    coursesType: typeof courses,
    coursesIsArray: Array.isArray(courses)
  });

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      setLoading(true);
      console.log('🔄 Loading courses...');
      
      const data = await productService.getProducts();
      console.log('📦 Raw data from service:', data);
      
      // ✅ SAFE: Ensure data is array
      if (Array.isArray(data)) {
        setCourses(data);
        console.log('✅ Courses set successfully:', data.length);
      } else if (data && Array.isArray(data.data)) {
        setCourses(data.data);
        console.log('✅ Courses set from data.data:', data.data.length);
      } else {
        console.log('⚠️ Data is not array, using empty array');
        setCourses([]);
      }
      
    } catch (error) {
      console.error('❌ Error loading courses:', error);
      setCourses([]); // ✅ Set empty array on error
      message.error('Không thể tải danh sách khóa học');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (course) => {
    try {
      if (addToCart && course) {
        addToCart(course);
        message.success(`🛒 Đã thêm "${course.name}" vào giỏ hàng`);
      }
    } catch (error) {
      console.error('❌ Error adding to cart:', error);
      message.error('Không thể thêm vào giỏ hàng');
    }
  };

  // ✅ SAFE: Ensure courses is always array
  const safeCourses = Array.isArray(courses) ? courses : [];

  const tabItems = [
    {
      key: 'all',
      label: (
        <span>
          <BookOutlined style={{ marginRight: 8 }} />
          Tất cả khóa học ({safeCourses.length})
        </span>
      ),
      children: loading ? (
        <div style={{ textAlign: 'center', padding: '60px' }}>
          <Spin size="large" />
          <div style={{ marginTop: 16 }}>
            <Text>Đang tải danh sách khóa học...</Text>
          </div>
        </div>
      ) : safeCourses.length === 0 ? (
        <Card>
          <Empty 
            description="Không có khóa học nào"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        </Card>
      ) : (
        <Row gutter={[24, 24]}>
          {safeCourses.map(course => {
            // ✅ SAFE: Check course object
            if (!course || !course.id) {
              console.warn('⚠️ Invalid course object:', course);
              return null;
            }
            
            return (
              <Col xs={24} sm={12} lg={8} xl={6} key={course.id}>
                <ProductCard 
                  product={course}
                  onAddToCart={() => handleAddToCart(course)}
                  showAddToCart={true}
                />
              </Col>
            );
          })}
        </Row>
      )
    },
    {
      key: 'purchased',
      label: (
        <span>
          <PlayCircleOutlined style={{ marginRight: 8 }} />
          Đã mua (0)
        </span>
      ),
      children: (
        <Card>
          <Empty 
            description="Bạn chưa mua khóa học nào"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        </Card>
      )
    },
    {
      key: 'completed',
      label: (
        <span>
          <TrophyOutlined style={{ marginRight: 8 }} />
          Hoàn thành (0)
        </span>
      ),
      children: (
        <Card>
          <Empty 
            description="Bạn chưa hoàn thành khóa học nào"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        </Card>
      )
    }
  ];

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <Title level={2}>📚 Khóa Học</Title>
        <Text type="secondary">
          Quản lý và truy cập tất cả khóa học của bạn
        </Text>
      </div>

      {/* Debug Info (remove in production) */}
      {process.env.NODE_ENV === 'development' && (
        <Card 
          size="small" 
          style={{ 
            marginBottom: 16, 
            backgroundColor: '#f6f8fa',
            fontSize: '12px'
          }}
        >
          <Text type="secondary">
            🔍 Debug: Loading={loading.toString()}, 
            Courses={safeCourses.length}, 
            Type={typeof courses}, 
            IsArray={Array.isArray(courses).toString()}
          </Text>
        </Card>
      )}

      {/* Tabs */}
      <Tabs
        defaultActiveKey="all"
        size="large"
        items={tabItems}
        style={{
          background: 'white',
          borderRadius: '12px',
          padding: '16px'
        }}
      />
    </div>
  );
}

export default Courses;