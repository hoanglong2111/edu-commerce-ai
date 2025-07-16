import { Rate } from 'antd';

export default function ProductRating({ value, onChange }) {
  return (
    <div style={{ marginTop: 8 }}>
      <span>Đánh giá: </span>
      <Rate value={value} onChange={onChange} />
    </div>
  );
}
