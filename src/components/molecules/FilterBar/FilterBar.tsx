import React, { useState } from "react";
import { Icon } from "../../atoms/Icon";
import styles from "./FilterBar.module.scss";

interface FilterBarProps {
  onFiltersChange?: (filters: FilterState) => void;
}

interface FilterState {
  search: string;
  sourceWarehouse: string;
  destinationWarehouse: string;
  hasSuitcase: string;
  status: string;
  shippingStatus: string;
  quickFilter: string;
  timeRange: string;
}

export const FilterBar: React.FC<FilterBarProps> = ({ onFiltersChange }) => {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    sourceWarehouse: "",
    destinationWarehouse: "",
    hasSuitcase: "",
    status: "",
    shippingStatus: "",
    quickFilter: "all",
    timeRange: "all",
  });

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange?.(newFilters);
  };

  return (
    <div className={styles.filterBar}>
      <div className={styles.searchInput}>
        <Icon name="search" size={16} />
        <input
          type="text"
          placeholder="Tìm kiếm..."
          value={filters.search}
          onChange={(e) => handleFilterChange("search", e.target.value)}
        />
      </div>
    </div>
  );
};
