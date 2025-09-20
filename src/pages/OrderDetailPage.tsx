// src/pages/OrderDetailPage.tsx
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../components/atoms/Button';
import { PlaceholderPage } from '../components/atoms/PlaceholderPage';
import styles from './OrderDetailPage.module.scss';

const OrderDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  return (
    <div className={styles.orderDetailPage}>
      <div className={styles.header}>
        <Button variant="outline" size="sm" onClick={() => navigate('/orders')}>
          ← Quay lại
        </Button>
        <h1>Chi tiết đơn hàng #{id}</h1>
      </div>

      <PlaceholderPage
        title={`Chi tiết đơn hàng #${id}`}
        description="Thông tin chi tiết về đơn hàng, trạng thái, sản phẩm và lịch sử giao dịch sẽ được hiển thị tại đây."
      />
    </div>
  );
};

export default OrderDetailPage;
