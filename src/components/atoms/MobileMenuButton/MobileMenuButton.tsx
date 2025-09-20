import React from "react";
import { Icon } from "../Icon";
import styles from "./MobileMenuButton.module.scss";

interface MobileMenuButtonProps {
  onClick: () => void;
  isOpen: boolean;
}

export const MobileMenuButton: React.FC<MobileMenuButtonProps> = ({
  onClick,
  isOpen,
}) => {
  return (
    <button
      className={styles.mobileMenuButton}
      onClick={onClick}
      aria-label={isOpen ? "Đóng menu" : "Mở menu"}
      aria-expanded={isOpen}
    >
      <Icon name="menu" size={24} />
    </button>
  );
};
