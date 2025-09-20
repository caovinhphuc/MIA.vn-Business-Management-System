import React, { useState, useRef, useEffect, useCallback } from "react";
import { Icon } from "../Icon";
import styles from "./ShippingStatusDropdown.module.scss";

export interface ShippingStatusOption {
  id: string;
  label: string;
  value: string;
  checked: boolean;
}

export interface ShippingStatusDropdownProps {
  onStatusChange?: (selectedStatuses: string[]) => void;
  className?: string;
}

const defaultOptions: ShippingStatusOption[] = [
  { id: "all", label: "Tất cả", value: "all", checked: true },
  {
    id: "waiting_package_notification",
    label: "Chờ báo kiện",
    value: "waiting_package_notification",
    checked: false,
  },
  {
    id: "waiting_transfer",
    label: "Chờ chuyển giao",
    value: "waiting_transfer",
    checked: false,
  },
  {
    id: "in_transfer",
    label: "Đang chuyển giao",
    value: "in_transfer",
    checked: false,
  },
];

export const ShippingStatusDropdown: React.FC<ShippingStatusDropdownProps> = ({
  onStatusChange,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] =
    useState<ShippingStatusOption[]>(defaultOptions);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const getStatusClass = (optionId: string) => {
    switch (optionId) {
      case "all":
        return styles.statusAll;
      case "waiting_package_notification":
        return styles.statusWaitingPackage;
      case "waiting_transfer":
        return styles.statusWaitingTransfer;
      case "in_transfer":
        return styles.statusInTransfer;
      default:
        return "";
    }
  };

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isOpen, handleClickOutside]);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleOptionChange = (optionId: string, checked: boolean) => {
    const newOptions = options.map((option) => {
      if (option.id === optionId) {
        return { ...option, checked };
      }
      if (optionId === "all" && checked) {
        // If "Tất cả" is checked, uncheck others
        return { ...option, checked: option.id === "all" };
      }
      if (option.id === "all" && !checked) {
        // If "Tất cả" is unchecked, keep it unchecked
        return { ...option, checked: false };
      }
      if (optionId !== "all" && checked) {
        // If any other option is checked, uncheck "Tất cả"
        return option.id === "all" ? { ...option, checked: false } : option;
      }
      return option;
    });

    setOptions(newOptions);

    // Get selected values (excluding "all")
    const selectedValues = newOptions
      .filter((option) => option.checked && option.id !== "all")
      .map((option) => option.value);

    if (onStatusChange) {
      onStatusChange(selectedValues);
    }
  };

  const getDisplayText = () => {
    const checkedOptions = options.filter(
      (option) => option.checked && option.id !== "all"
    );
    const allOption = options.find((opt) => opt.id === "all");

    // If "Tất cả" is checked, show "TT Vận chuyển" as placeholder
    if (allOption?.checked) {
      return "TT Vận chuyển";
    }

    // If no specific options are checked, show placeholder
    if (checkedOptions.length === 0) {
      return "TT Vận chuyển";
    }

    // If only one specific option is checked, show its label
    if (checkedOptions.length === 1) {
      return checkedOptions[0].label;
    }

    // If multiple options are checked, show count
    return `${checkedOptions.length} mục đã chọn`;
  };

  return (
    <div
      className={`${styles.shippingStatusDropdown} ${className}`}
      ref={dropdownRef}
    >
      <button
        type="button"
        className={styles.triggerButton}
        onClick={handleToggle}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className={styles.buttonText}>{getDisplayText()}</span>
        <Icon name="truck" size={12} className={styles.truckIcon} />
      </button>

      {isOpen && (
        <div
          className={styles.dropdownMenu}
          onMouseDown={(e) => e.stopPropagation()}
        >
          <ul className={styles.optionList} role="listbox">
            {options.map((option) => (
              <li key={option.id} className={styles.optionItem}>
                <label className={styles.optionLabel}>
                  <input
                    type="checkbox"
                    checked={option.checked}
                    onChange={(e) =>
                      handleOptionChange(option.id, e.target.checked)
                    }
                    className={styles.checkbox}
                  />
                  <span
                    className={`${styles.optionText} ${getStatusClass(option.id)}`}
                  >
                    {option.label}
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
