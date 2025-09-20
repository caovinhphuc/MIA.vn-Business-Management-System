// src/pages/ProductDetailPage.tsx
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../components/atoms/Button';
import { PlaceholderPage } from '../components/atoms/PlaceholderPage';
import styles from './ProductDetailPage.module.scss';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  return (
    <div className={styles.productDetailPage}>
      <div className={styles.header}>
        <Button variant="outline" size="sm" onClick={() => navigate('/products')}>
          ← Quay lại
        </Button>
        <h1>Chi tiết sản phẩm #{id}</h1>
      </div>

      <PlaceholderPage
        title={`Chi tiết sản phẩm #${id}`}
        description="Thông tin chi tiết về sản phẩm, giá cả, tồn kho, hình ảnh và mô tả sẽ được hiển thị tại đây."
      />
    </div>
  );
};

export default ProductDetailPage;
