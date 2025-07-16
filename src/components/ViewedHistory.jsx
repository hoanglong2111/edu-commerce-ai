import { Card, Row, Col } from 'antd';
import { useEffect, useState } from 'react';

export default function ViewedHistory() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('viewHistory') || '[]');
    setHistory(stored);
  }, []);

  if (history.length === 0) return null;

  return (
    <div style={{ marginTop: 32 }}>
      <h3>Sản phẩm đã xem gần đây</h3>
      <Row gutter={[16, 16]}>
        {history.map((p) => (
          <Col xs={24} sm={12} md={8} lg={6} key={p.id}>
            <Card cover={<img alt={p.name} src={p.image} />}>
              <Card.Meta title={p.name} description={p.shortDesc} />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}