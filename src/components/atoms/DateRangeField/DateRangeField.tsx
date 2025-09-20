import React, { useState, useEffect } from "react";
import { Icon } from "../Icon";
import { DateRangePickerDialog } from "../DateRangePickerDialog";
import styles from "./DateRangeField.module.scss";

export interface DateRangeFieldProps {
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  onDateChange?: (startDate: Date, endDate: Date) => void;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  id?: string;
}

export const DateRangeField: React.FC<DateRangeFieldProps> = ({
  value = "",
  placeholder = "Chọn khoảng thời gian",
  onChange,
  onDateChange,
  onClick,
  className = "",
  disabled = false,
  id = "daterange-btn",
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [internalValue, setInternalValue] = useState(value);
  const [selectedStartDate, setSelectedStartDate] = useState<
    Date | undefined
  >();
  const [selectedEndDate, setSelectedEndDate] = useState<Date | undefined>();

  // Update internal value when external value changes
  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  const formatDate = (date: Date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatDateRange = (startDate: Date, endDate: Date) => {
    return `${formatDate(startDate)} - ${formatDate(endDate)}`;
  };

  const handleClick = () => {
    if (onClick && !disabled) {
      onClick();
    } else if (!disabled) {
      setIsDialogOpen(true);
    }
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleDateApply = (startDate: Date, endDate: Date) => {
    setSelectedStartDate(startDate);
    setSelectedEndDate(endDate);

    const dateRangeString = formatDateRange(startDate, endDate);

    // Update internal value immediately
    setInternalValue(dateRangeString);

    if (onChange) {
      onChange(dateRangeString);
    }

    if (onDateChange) {
      onDateChange(startDate, endDate);
    }
  };

  // Parse value to get start and end dates
  const parseValue = (value: string) => {
    if (!value || !value.includes(" - "))
      return { start: undefined, end: undefined };

    const [startStr, endStr] = value.split(" - ");
    const [day1, month1, year1] = startStr.split("/").map(Number);
    const [day2, month2, year2] = endStr.split("/").map(Number);

    return {
      start: new Date(year1, month1 - 1, day1),
      end: new Date(year2, month2 - 1, day2),
    };
  };

  const { start: parsedStart, end: parsedEnd } = parseValue(internalValue);
  const displayValue = internalValue || placeholder;

  return (
    <>
      <div className={`${styles.dateRangeControl} ${className}`}>
        <div className={styles.inputGroup}>
          <button
            type="button"
            className={styles.formControl}
            onClick={handleClick}
            disabled={disabled}
            id={id}
          >
            <span className={styles.dateRangeText}>{displayValue}</span>
            <Icon name="clock" size={14} className={styles.clockIcon} />
          </button>
        </div>
      </div>

      <DateRangePickerDialog
        isOpen={isDialogOpen}
        onClose={handleDialogClose}
        onApply={handleDateApply}
        initialStartDate={selectedStartDate || parsedStart}
        initialEndDate={selectedEndDate || parsedEnd}
      />
    </>
  );
};
