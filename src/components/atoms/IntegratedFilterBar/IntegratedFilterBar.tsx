import React from "react";
import { Icon } from "../Icon";
import { ShippingStatusDropdown } from "../ShippingStatusDropdown";
import styles from "./IntegratedFilterBar.module.scss";

export interface IntegratedFilterBarProps {
  onSearch?: () => void;
  onFilterChange?: (filters: any) => void;
  className?: string;
}

export const IntegratedFilterBar: React.FC<IntegratedFilterBarProps> = ({
  onSearch,
  onFilterChange,
  className = "",
}) => {
  const handleShippingStatusChange = (selectedStatuses: string[]) => {
    if (onFilterChange) {
      onFilterChange({ shippingStatus: selectedStatuses });
    }
  };
  return (
    <div className={`${styles.filterBar} ${className}`}>
      {/* Kho nguồn */}
      <div className={styles.filterField}>
        <div className={styles.filterControl}>
          <span className={styles.filterLabel}>Kho nguồn</span>
          <Icon name="filter" size={12} className={styles.filterIcon} />
        </div>
      </div>

      {/* Kho đích */}
      <div className={styles.filterField}>
        <div className={styles.filterControl}>
          <span className={styles.filterLabel}>Kho đích</span>
          <Icon name="filter" size={12} className={styles.filterIcon} />
        </div>
      </div>

      {/* Có vali */}
      <div className={styles.filterField}>
        <div className={styles.filterControl}>
          <span className={styles.filterLabel}>Có vali</span>
          <Icon name="filter" size={12} className={styles.filterIcon} />
        </div>
      </div>

      {/* Trạng thái */}
      <div className={styles.filterField}>
        <div className={styles.filterControl}>
          <span className={styles.filterLabel}>Trạng thái</span>
          <Icon name="filter" size={12} className={styles.filterIcon} />
        </div>
      </div>

      {/* TT Vận chuyển */}
      <ShippingStatusDropdown
        onStatusChange={handleShippingStatusChange}
        className={styles.shippingStatusField}
      />
    </div>
  );
};
