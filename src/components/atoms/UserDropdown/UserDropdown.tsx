// src/components/atoms/UserDropdown/UserDropdown.tsx
import React, { useState, useRef, useEffect } from "react";
import { Icon } from "../Icon";
import styles from "./UserDropdown.module.scss";

interface User {
  name: string;
  role: string;
  avatar: string;
}

interface UserDropdownProps {
  user: User;
  onLogout: () => void;
  onNotifications: () => void;
}

export const UserDropdown: React.FC<UserDropdownProps> = ({
  user,
  onLogout,
  onNotifications,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (action: () => void) => {
    action();
    setIsOpen(false);
  };

  return (
    <div className={styles.userDropdown} ref={dropdownRef}>
      <div className={styles.userButton}>
        <div className={styles.userInfo}>
          <div className={styles.avatar} onClick={handleToggle}>
            {user.avatar}
          </div>
          <div className={styles.userDetails}>
            <span className={styles.userName}>{user.name}</span>
            <span className={styles.userRole}>{user.role}</span>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className={styles.dropdownMenu}>
          <button
            className={styles.dropdownItem}
            onClick={() => handleItemClick(() => {})}
          >
            <Icon name="people" size={16} />
            <span>Hồ sơ cá nhân</span>
          </button>

          <div className={styles.divider} />

          <button
            className={`${styles.dropdownItem} ${styles.logoutItem}`}
            onClick={() => handleItemClick(onLogout)}
          >
            <Icon name="logout" size={16} />
            <span>Đăng xuất</span>
          </button>
        </div>
      )}
    </div>
  );
};
