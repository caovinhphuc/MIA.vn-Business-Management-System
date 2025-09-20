import React, { useState, useRef, useEffect } from "react";
import { Icon } from "../Icon";
import styles from "./Dropdown.module.scss";

export interface DropdownItem {
  key: string;
  label: string;
  icon?:
    | "view"
    | "edit"
    | "delete"
    | "more_vertical"
    | "printer"
    | "sound"
    | "file_text"
    | "download"
    | "import"
    | "add";
  onClick: () => void;
  danger?: boolean;
  disabled?: boolean;
  active?: boolean;
}

export interface DropdownProps {
  items: DropdownItem[];
  trigger?: React.ReactNode;
  placement?: "bottom-left" | "bottom-right" | "top-left" | "top-right";
  className?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  items,
  trigger,
  placement = "bottom-right",
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
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

  const handleItemClick = (item: DropdownItem) => {
    if (!item.disabled) {
      item.onClick();
      setIsOpen(false);
    }
  };

  const defaultTrigger = (
    <button
      className={styles.trigger}
      onClick={() => setIsOpen(!isOpen)}
      aria-label="Mở menu"
    >
      <Icon name="more_vertical" size={16} />
    </button>
  );

  return (
    <div className={`${styles.dropdown} ${className || ""}`} ref={dropdownRef}>
      {trigger || defaultTrigger}

      {isOpen && (
        <div className={`${styles.menu} ${styles[`menu--${placement}`]}`}>
          {items.map((item) => (
            <button
              key={item.key}
              className={`${styles.menuItem} ${
                item.danger ? styles.menuItemDanger : ""
              } ${item.disabled ? styles.menuItemDisabled : ""} ${
                item.active ? styles.menuItemActive : ""
              }`}
              data-action={item.key}
              onClick={() => handleItemClick(item)}
              disabled={item.disabled}
            >
              {item.icon && <Icon name={item.icon} size={14} />}
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
