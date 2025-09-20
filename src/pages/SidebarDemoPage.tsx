import React, { useState } from "react";
import { Sidebar } from "../components/organisms/Sidebar";
import { PlaceholderPage } from "../components/atoms/PlaceholderPage";
import styles from "./SidebarDemoPage.module.scss";

export const SidebarDemoPage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className={styles.demoContainer}>
      <div className={styles.controls}>
        <h2>Sidebar Demo - So sánh trạng thái mở rộng và thu hẹp</h2>
        <div className={styles.buttonGroup}>
          <button
            className={`${styles.demoButton} ${sidebarOpen ? styles.active : ""}`}
            onClick={() => setSidebarOpen(true)}
          >
            📖 Mở rộng Sidebar
          </button>
          <button
            className={`${styles.demoButton} ${!sidebarOpen ? styles.active : ""}`}
            onClick={() => setSidebarOpen(false)}
          >
            📱 Thu hẹp Sidebar
          </button>
        </div>
        <div className={styles.info}>
          <p>
            <strong>Trạng thái hiện tại:</strong>{" "}
            {sidebarOpen ? "Mở rộng (240px)" : "Thu hẹp (70px)"}
          </p>
          <p>
            <strong>Chức năng:</strong> Click vào logo hoặc nút toggle để chuyển
            đổi
          </p>
        </div>
      </div>

      <div className={styles.layoutDemo}>
        <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />
        <div
          className={`${styles.mainContent} ${sidebarOpen ? styles.expanded : styles.collapsed}`}
        >
          <div className={styles.contentHeader}>
            <h1>Demo Layout</h1>
            <p>
              Sidebar {sidebarOpen ? "mở rộng" : "thu hẹp"} - Content area tự
              động điều chỉnh
            </p>
          </div>
          <PlaceholderPage
            title="Nội dung chính"
            description="Đây là khu vực nội dung chính. Khi sidebar thu hẹp, khu vực này sẽ mở rộng để tận dụng không gian."
          />
        </div>
      </div>
    </div>
  );
};
