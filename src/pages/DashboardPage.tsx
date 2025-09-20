import React from "react";
import { Button } from "../components/atoms/Button";
import { Icon } from "../components/atoms/Icon";
import { DashboardCard } from "../components/features/dashboard/components/DashboardCard";
import styles from "./DashboardPage.module.scss";

const DashboardPage: React.FC = () => {
  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <h1>Dashboard</h1>
        <p>Chào mừng đến với hệ thống quản lý MIA.vn !</p>
      </div>

      <div className={styles.statsGrid}>
        <DashboardCard
          title="Tổng đơn hàng"
          value="1,234"
          icon={<Icon name="shopping_cart" />}
          trend={{ value: 12.5, isPositive: true }}
          color="primary"
        />

        <DashboardCard
          title="Doanh thu"
          value="₫15,678,000"
          icon={<Icon name="analytics" />}
          trend={{ value: 8.2, isPositive: true }}
          color="success"
        />

        <DashboardCard
          title="Sản phẩm"
          value="892"
          icon={<Icon name="inventory" />}
          trend={{ value: 3.1, isPositive: false }}
          color="warning"
        />

        <DashboardCard
          title="Khách hàng"
          value="456"
          icon={<Icon name="people" />}
          trend={{ value: 15.7, isPositive: true }}
          color="primary"
        />
      </div>

      <div className={styles.actions}>
        <Button variant="primary" icon={<Icon name="add" />}>
          Thêm đơn hàng mới
        </Button>
        <Button
          variant="outline"
          icon={<Icon name="analytics" />}
          className={styles.actionButton}
        >
          Xem báo cáo
        </Button>
      </div>
    </div>
  );
};

export default DashboardPage;
