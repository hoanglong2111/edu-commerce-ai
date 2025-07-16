import { useState, useEffect } from 'react';
import { Row, Col, message, Pagination, Typography } from 'antd';
import ProductCard from '../components/ProductCard';
import TrialModal from '../components/TrialModal';
import { useCart } from '../context/CartContext';
import data from '../Data/mockData';

const { Text, Title } = Typography;

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [trialProduct, setTrialProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(6); // 6 sản phẩm mỗi trang
  const { addToCart } = useCart();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(saved);
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    message.success(`Đã thêm "${product.name}" vào giỏ hàng`);
  };

  const handleTrial = (product) => {
    setTrialProduct(product);
    message.success(`Bắt đầu dùng thử "${product.name}"`);
  };

  const handleRemoveFavorite = (productId) => {
    const updated = favorites.filter((id) => id !== productId);
    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
    message.success('Đã xóa khỏi danh sách yêu thích');
    
    // Reset về trang 1 nếu trang hiện tại trống
    const totalPages = Math.ceil(updated.length / pageSize);
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filtered = data.filter((p) => favorites.includes(p.id));
  
  // Pagination logic
  const totalProducts = filtered.length;
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentProducts = filtered.slice(startIndex, endIndex);

  return (
    <div>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)',
        padding: '30px 20px',
        borderRadius: 12,
        color: 'white',
        textAlign: 'center',
        marginBottom: 24
      }}>
        <Title level={2} style={{ color: 'white', margin: 0 }}>
          ❤️ Sản phẩm yêu thích
        </Title>
        <Text style={{ color: 'white', fontSize: 16 }}>
          {totalProducts} khóa học trong danh sách yêu thích của bạn
        </Text>
      </div>

      {/* Results Summary */}
      {totalProducts > 0 && (
        <div style={{ marginBottom: 16 }}>
          <Text type="secondary">
            Hiển thị {startIndex + 1}-{Math.min(endIndex, totalProducts)} trong số {totalProducts} khóa học yêu thích
          </Text>
        </div>
      )}

      {currentProducts.length === 0 ? (
        <div style={{
          textAlign: 'center', 
          padding: '60px 20px',
          background: 'linear-gradient(135deg, #f8fafe 0%, #eef7ff 100%)',
          borderRadius: 12,
          border: '1px solid #d6eaf8'
        }}>
          <div style={{ fontSize: 64, marginBottom: 16 }}>💔</div>
          <Title level={3} style={{ color: '#5dade2' }}>
            Chưa có sản phẩm yêu thích nào
          </Title>
          <Text type="secondary" style={{ fontSize: 16 }}>
            Hãy khám phá và thêm những khóa học yêu thích vào danh sách của bạn
          </Text>
        </div>
      ) : (
        <>
          {/* Products Grid */}
          <Row gutter={[16, 16]} style={{ minHeight: 600 }}>
            {currentProducts.map((p) => (
              <Col xs={24} sm={12} md={8} lg={8} xl={8} key={p.id}>
                <ProductCard
                  product={p}
                  onDetail={() => {}}
                  onFavorite={() => handleRemoveFavorite(p.id)}
                  isFavorited={true}
                  onAddToCart={() => handleAddToCart(p)}
                  onTrial={handleTrial}
                />
              </Col>
            ))}
          </Row>

          {/* Pagination */}
          {totalProducts > pageSize && (
            <div style={{ 
              marginTop: 32,
              marginBottom: 24,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <div style={{
                background: 'linear-gradient(135deg, #fff5f5 0%, #ffe6e6 100%)',
                padding: '20px',
                borderRadius: 12,
                border: '1px solid #ffc9c9',
                boxShadow: '0 2px 8px rgba(255, 107, 107, 0.1)'
              }}>
                <Pagination
                  current={currentPage}
                  total={totalProducts}
                  pageSize={pageSize}
                  onChange={handlePageChange}
                  showSizeChanger={false}
                  showQuickJumper
                  showTotal={(total, range) => (
                    <Text style={{ marginRight: 16, color: '#ee5a52', fontWeight: 500 }}>
                      💖 Trang {currentPage} / {Math.ceil(total / pageSize)} 
                      <span style={{ marginLeft: 8, color: '#666' }}>
                        ({range[0]}-{range[1]} trong {total} yêu thích)
                      </span>
                    </Text>
                  )}
                  itemRender={(page, type, originalElement) => {
                    if (type === 'prev') {
                      return (
                        <span style={{
                          background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)',
                          color: 'white',
                          padding: '6px 12px',
                          borderRadius: 6,
                          cursor: 'pointer',
                          border: 'none'
                        }}>
                          ← Trước
                        </span>
                      );
                    }
                    if (type === 'next') {
                      return (
                        <span style={{
                          background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)',
                          color: 'white',
                          padding: '6px 12px',
                          borderRadius: 6,
                          cursor: 'pointer',
                          border: 'none'
                        }}>
                          Sau →
                        </span>
                      );
                    }
                    if (type === 'page') {
                      return (
                        <span style={{
                          background: page === currentPage 
                            ? 'linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)' 
                            : 'white',
                          color: page === currentPage ? 'white' : '#ff6b6b',
                          padding: '6px 12px',
                          borderRadius: 6,
                          cursor: 'pointer',
                          border: `1px solid ${page === currentPage ? '#ff6b6b' : '#ffc9c9'}`,
                          fontWeight: page === currentPage ? 600 : 400
                        }}>
                          {page}
                        </span>
                      );
                    }
                    return originalElement;
                  }}
                />
              </div>
            </div>
          )}
        </>
      )}

      {/* Trial Modal */}
      <TrialModal
        visible={!!trialProduct}
        product={trialProduct}
        onClose={() => setTrialProduct(null)}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
}
