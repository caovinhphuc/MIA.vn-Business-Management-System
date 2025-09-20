// src/components/templates/AuthLayout/AuthLayout.tsx
import React from "react";
import { Outlet } from "react-router-dom";
import { Icon } from "../../atoms/Icon";
import styles from "./AuthLayout.module.scss";

export const AuthLayout: React.FC = () => {
  return (
    <div className={styles.authLayout}>
      <div className={styles.container}>
        <div className={styles.leftSection}>
          <div className={styles.logo}>
            <div className={styles.logoIcon}>
              <div className={styles.gridIcon}>
                <div className={styles.gridRow}>
                  <div className={styles.gridCell}></div>
                  <div className={styles.gridCell}></div>
                  <div className={styles.gridCell}></div>
                </div>
                <div className={styles.gridRow}>
                  <div className={styles.gridCell}></div>
                  <div className={styles.gridCell}></div>
                  <div className={styles.gridCell}></div>
                </div>
                <div className={styles.gridRow}>
                  <div className={styles.gridCell}></div>
                  <div className={styles.gridCell}></div>
                  <div className={styles.gridCell}></div>
                </div>
              </div>
              <div className={styles.logoText}>
                <span className={styles.mainText}>MIA.vn</span>
                <span className={styles.subText}>Hệ thống quản lý</span>
              </div>
            </div>
          </div>

          <div className={styles.features}>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <Icon name="dashboard" size={24} />
              </div>
              <div className={styles.featureContent}>
                <h3>Dashboard Thông Minh</h3>
                <p>Theo dõi hiệu suất kinh doanh real-time</p>
              </div>
            </div>

            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <Icon name="settings" size={24} />
              </div>
              <div className={styles.featureContent}>
                <h3>Tự Động Hóa</h3>
                <p>Giảm thiểu công việc thủ công</p>
              </div>
            </div>

            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <Icon name="analytics" size={24} />
              </div>
              <div className={styles.featureContent}>
                <h3>Báo Cáo Chi Tiết</h3>
                <p>Phân tích sâu dữ liệu kinh doanh</p>
              </div>
            </div>
          </div>

          <div className={styles.quote}>
            <p>"Đơn giản hóa quản lý, tối ưu hóa lợi nhuận"</p>
          </div>

          <div className={styles.trustBadges}>
            <div className={styles.badge}>
              <Icon name="settings" size={16} />
              <span>Bảo mật ISO 27001</span>
            </div>
            <div className={styles.badge}>
              <Icon name="settings" size={16} />
              <span>SSL 256-bit</span>
            </div>
            <div className={styles.badge}>
              <Icon name="settings" size={16} />
              <span>GDPR Compliant</span>
            </div>
          </div>
        </div>

        <div className={styles.rightSection}>
          <div className={styles.formContainer}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};
