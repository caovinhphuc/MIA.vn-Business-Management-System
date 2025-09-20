// src/components/organisms/Header/Header.tsx
import React, { useState, useRef, useEffect } from "react";
import { Icon } from "../../atoms/Icon";
import { UserDropdown } from "../../atoms/UserDropdown";
import styles from "./Header.module.scss";

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

export const Header: React.FC<HeaderProps> = ({
  title = "Dashboard",
  subtitle = "Chào mừng đến với hệ thống quản lý MIA.vn",
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationsRef = useRef<HTMLDivElement>(null);

  // Mock user data
  const user = {
    name: "Nguyễn Văn A",
    role: "Quản trị viên",
    avatar: "👤",
  };

  const handleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const handleLogout = () => {
    // Handle logout logic
    console.log("Logout clicked");
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.leftSection}>
        <div className={styles.pageTitle}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>
      </div>

      <div className={styles.rightSection}>
        <div className={styles.quickActions}>
          <button
            onClick={handleNotifications}
            className={styles.notificationButton}
            aria-label="Thông báo"
          >
            <Icon name="notifications" size={18} />
            <span className={styles.badge}>3</span>
          </button>
        </div>

        <UserDropdown
          user={user}
          onLogout={handleLogout}
          onNotifications={handleNotifications}
        />
      </div>
    </header>
  );
};
