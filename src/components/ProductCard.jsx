// File: src/components/ProductCard.jsx
import React from "react";
import { Card, Tooltip, Tag, Space } from "antd";
import {
  HeartOutlined,
  HeartFilled,
  ShoppingCartOutlined,
  EyeOutlined,
  PlayCircleOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Meta } = Card;

export default function ProductCard({
  product,
  onDetail,
  onFavorite,
  isFavorited,
  onAddToCart,
  onTrial,
  showAddToCart = true,
}) {
  const navigate = useNavigate();

  // ✅ SAFE: Check product exists
  if (!product) {
    console.warn("⚠️ ProductCard: product is null/undefined");
    return null;
  }

  // ✅ SAFE: Default values
  const safeProduct = {
    id: product.id || "unknown",
    name: product.name || "Khóa học",
    price: product.price || 0,
    originalPrice: product.originalPrice || product.price || 0,
    image: product.image || "/api/placeholder/300/200",
    instructor: product.instructor || "Giảng viên",
    rating: product.rating || 4.5,
    students: product.students || 0,
    duration: product.duration || "10 giờ",
    lessons: product.lessons || 20,
    level: product.level || "Cơ bản",
    category: product.category || "Khóa học",
    description: product.description || "Mô tả khóa học",
    ...product,
  };

  const handleAddToCart = () => {
    onAddToCart(product);
    navigate("/cart");
  };

  // Handle card click để xem detail
  const handleCardClick = (e) => {
    // Ngăn event bubbling khi click vào actions
    if (e.target.closest(".ant-card-actions")) {
      return;
    }
    onDetail(product);
  };

  const freeChapters =
    product.trialChapters?.filter((ch) => !ch.isLocked).length || 0;

  return (
    <Card
      hoverable
      style={{
        cursor: "pointer",
        transition: "all 0.3s ease",
        border: "1px solid #d6eaf8",
      }}
      onClick={handleCardClick} // Thêm click handler này
      cover={
        <div style={{ position: "relative" }}>
          <img
            alt={product.name}
            src={product.image}
            style={{ height: 200, objectFit: "cover", width: "100%" }}
          />
          {/* Trial Badge */}
          {product.hasTrialContent && (
            <div
              style={{
                position: "absolute",
                top: 8,
                left: 8,
                background:
                  "linear-gradient(135deg, #52c41a 0%, #389e0d 100%)",
                color: "white",
                padding: "4px 8px",
                borderRadius: 12,
                fontSize: 12,
                fontWeight: 600,
                boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
              }}
            >
              🎬 {freeChapters} chương miễn phí
            </div>
          )}

          {/* Rating Badge */}
          <div
            style={{
              position: "absolute",
              top: 8,
              right: 8,
              background: "rgba(0,0,0,0.7)",
              color: "white",
              padding: "4px 8px",
              borderRadius: 12,
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            ⭐ {product.rating}
          </div>

          {/* Overlay khi hover */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background:
                "linear-gradient(135deg, rgba(52, 152, 219, 0.8) 0%, rgba(41, 128, 185, 0.8) 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: 0,
              transition: "opacity 0.3s ease",
              color: "white",
              fontSize: 16,
              fontWeight: 600,
            }}
            className="card-overlay"
          >
            👁️ Xem chi tiết
          </div>
        </div>
      }
      actions={[
        <Tooltip title="Xem chi tiết">
          <EyeOutlined
            onClick={(e) => {
              e.stopPropagation();
              onDetail(product);
            }}
          />
        </Tooltip>,

        <Tooltip title="Thêm vào yêu thích">
          <span
            onClick={(e) => {
              e.stopPropagation();
              onFavorite(product.id);
            }}
          >
            {isFavorited ? (
              <HeartFilled style={{ color: "red" }} />
            ) : (
              <HeartOutlined />
            )}
          </span>
        </Tooltip>,

        ...(product.hasTrialContent
          ? [
              <Tooltip title={`Dùng thử ${freeChapters} chương miễn phí`}>
                <PlayCircleOutlined
                  onClick={(e) => {
                    e.stopPropagation();
                    onTrial && onTrial(product);
                  }}
                  style={{ color: "#52c41a" }}
                />
              </Tooltip>,
            ]
          : []),

        <Tooltip title="Thêm vào giỏ hàng và chuyển tới giỏ hàng">
          <ShoppingCartOutlined
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart();
            }}
          />
        </Tooltip>,
      ]}
    >
      <Meta
        title={
          <div>
            <div style={{ marginBottom: 8 }}>{product.name}</div>
            <Space size={4} wrap>
              <Tag color="blue" size="small">
                {product.category}
              </Tag>
              <Tag color="green" size="small">
                👨‍🏫 {product.instructor}
              </Tag>
              <Tag color="orange" size="small">
                ⏱️ {product.duration}
              </Tag>
            </Space>
          </div>
        }
        description={
          <div>
            <div style={{ marginBottom: 8 }}>{product.shortDesc}</div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span style={{ fontSize: 12, color: "#666" }}>
                👥 {product.students} học viên
              </span>
              {product.hasTrialContent && (
                <span
                  style={{
                    fontSize: 12,
                    color: "#52c41a",
                    fontWeight: 600,
                  }}
                >
                  🎥 Có dùng thử
                </span>
              )}
            </div>
          </div>
        }
      />
      <div
        style={{
          marginTop: 12,
          fontWeight: "bold",
          fontSize: 16,
          color: "#1890ff",
        }}
      >
        {product.price.toLocaleString("vi-VN")}₫
      </div>
    </Card>
  );
}
