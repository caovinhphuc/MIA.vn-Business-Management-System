import React, { useState, useEffect } from "react";
import { Icon } from "../Icon";
import styles from "./DateRangePickerDialog.module.scss";

interface DateRangePickerDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (startDate: Date, endDate: Date) => void;
  initialStartDate?: Date;
  initialEndDate?: Date;
}

export const DateRangePickerDialog: React.FC<DateRangePickerDialogProps> = ({
  isOpen,
  onClose,
  onApply,
  initialStartDate,
  initialEndDate,
}) => {
  const [startDate, setStartDate] = useState<Date>(
    initialStartDate || new Date()
  );
  const [endDate, setEndDate] = useState<Date>(initialEndDate || new Date());
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedRange, setSelectedRange] = useState<"start" | "end">("start");
  const [selectedQuickOption, setSelectedQuickOption] =
    useState<string>("thismonth");

  useEffect(() => {
    if (initialStartDate) setStartDate(initialStartDate);
    if (initialEndDate) setEndDate(initialEndDate);
  }, [initialStartDate, initialEndDate]);

  const formatDate = (date: Date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const isDateInRange = (date: Date) => {
    if (!startDate || !endDate) return false;
    return date >= startDate && date <= endDate;
  };

  const isStartDate = (date: Date) => {
    return startDate && date.toDateString() === startDate.toDateString();
  };

  const isEndDate = (date: Date) => {
    return endDate && date.toDateString() === endDate.toDateString();
  };

  const handleDateClick = (date: Date) => {
    if (selectedRange === "start") {
      setStartDate(date);
      setSelectedRange("end");
    } else {
      if (date < startDate) {
        setEndDate(startDate);
        setStartDate(date);
      } else {
        setEndDate(date);
      }
      setSelectedRange("start");
    }
  };

  const handleQuickSelect = (type: string) => {
    setSelectedQuickOption(type);
    const today = new Date();
    let start: Date, end: Date;

    switch (type) {
      case "all":
        // Tất cả - không giới hạn thời gian
        start = new Date(2020, 0, 1); // Từ năm 2020
        end = new Date(2030, 11, 31); // Đến năm 2030
        break;
      case "today":
        start = end = new Date(today);
        break;
      case "yesterday":
        start = end = new Date(today);
        start.setDate(today.getDate() - 1);
        end.setDate(today.getDate() - 1);
        break;
      case "last7days":
        start = new Date(today);
        end = new Date(today);
        start.setDate(today.getDate() - 6);
        break;
      case "thismonth":
        start = new Date(today.getFullYear(), today.getMonth(), 1);
        end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        break;
      case "lastmonth":
        start = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        end = new Date(today.getFullYear(), today.getMonth(), 0);
        break;
      case "custom":
        return; // Không thay đổi ngày khi chọn tùy chỉnh
      default:
        return;
    }

    setStartDate(start);
    setEndDate(end);
  };

  const handleMonthNavigation = (direction: "prev" | "next") => {
    const newMonth = new Date(currentMonth);
    if (direction === "prev") {
      newMonth.setMonth(currentMonth.getMonth() - 1);
    } else {
      newMonth.setMonth(currentMonth.getMonth() + 1);
    }
    setCurrentMonth(newMonth);
  };

  const handleApply = () => {
    onApply(startDate, endDate);
    onClose();
  };

  const monthNames = [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ];

  const dayNames = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

  if (!isOpen) return null;

  const currentDays = getDaysInMonth(currentMonth);
  const nextMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1
  );
  const nextMonthDays = getDaysInMonth(nextMonth);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.dialog} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h3>Chọn khoảng thời gian</h3>
          <button className={styles.closeButton} onClick={onClose}>
            <Icon name="close" size={16} />
          </button>
        </div>

        <div className={styles.content}>
          {/* Date inputs */}
          <div className={styles.dateInputs}>
            <div className={styles.dateInputGroup}>
              <label>Từ ngày</label>
              <div className={styles.dateInput}>
                <Icon name="clock" size={14} />
                <span>{formatDate(startDate)}</span>
              </div>
            </div>
            <div className={styles.dateInputGroup}>
              <label>Đến ngày</label>
              <div className={styles.dateInput}>
                <Icon name="clock" size={14} />
                <span>{formatDate(endDate)}</span>
              </div>
            </div>
          </div>

          <div className={styles.mainContent}>
            {/* Quick select sidebar */}
            <div className={styles.sidebar}>
              <div className={styles.quickSelect}>
                <div
                  className={`${styles.quickOption} ${selectedQuickOption === "all" ? styles.active : ""}`}
                  onClick={() => handleQuickSelect("all")}
                >
                  Tất cả
                </div>
                <div
                  className={`${styles.quickOption} ${selectedQuickOption === "today" ? styles.active : ""}`}
                  onClick={() => handleQuickSelect("today")}
                >
                  Hôm nay
                </div>
                <div
                  className={`${styles.quickOption} ${selectedQuickOption === "yesterday" ? styles.active : ""}`}
                  onClick={() => handleQuickSelect("yesterday")}
                >
                  Hôm qua
                </div>
                <div
                  className={`${styles.quickOption} ${selectedQuickOption === "last7days" ? styles.active : ""}`}
                  onClick={() => handleQuickSelect("last7days")}
                >
                  7 ngày trước
                </div>
                <div
                  className={`${styles.quickOption} ${selectedQuickOption === "thismonth" ? styles.active : ""}`}
                  onClick={() => handleQuickSelect("thismonth")}
                >
                  Tháng này
                </div>
                <div
                  className={`${styles.quickOption} ${selectedQuickOption === "lastmonth" ? styles.active : ""}`}
                  onClick={() => handleQuickSelect("lastmonth")}
                >
                  Tháng trước
                </div>
                <div
                  className={`${styles.quickOption} ${selectedQuickOption === "custom" ? styles.active : ""}`}
                  onClick={() => handleQuickSelect("custom")}
                >
                  Tùy chỉnh
                </div>
              </div>
            </div>

            {/* Calendar */}
            <div className={styles.calendar}>
              <div className={styles.calendarGrid}>
                {/* Current month */}
                <div className={styles.monthCalendar}>
                  <div className={styles.monthHeader}>
                    <button
                      className={styles.monthNavButton}
                      onClick={() => handleMonthNavigation("prev")}
                    >
                      <Icon name="arrow_left" size={14} />
                    </button>
                    <span className={styles.monthTitle}>
                      {monthNames[currentMonth.getMonth()]}{" "}
                      {currentMonth.getFullYear()}
                    </span>
                    <button
                      className={styles.monthNavButton}
                      onClick={() => handleMonthNavigation("next")}
                    >
                      <Icon name="arrow_right" size={14} />
                    </button>
                  </div>
                  <div className={styles.dayHeaders}>
                    {dayNames.map((day) => (
                      <div key={day} className={styles.dayHeader}>
                        {day}
                      </div>
                    ))}
                  </div>
                  <div className={styles.daysGrid}>
                    {currentDays.map((date, index) => {
                      if (!date) {
                        return (
                          <div key={index} className={styles.emptyDay}></div>
                        );
                      }

                      const isInRange = isDateInRange(date);
                      const isStart = isStartDate(date);
                      const isEnd = isEndDate(date);

                      return (
                        <div
                          key={index}
                          className={`${styles.day} ${
                            isInRange ? styles.inRange : ""
                          } ${isStart ? styles.startDate : ""} ${
                            isEnd ? styles.endDate : ""
                          }`}
                          onClick={() => handleDateClick(date)}
                        >
                          {date.getDate()}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Next month */}
                <div className={styles.monthCalendar}>
                  <div className={styles.monthHeader}>
                    <button
                      className={styles.monthNavButton}
                      onClick={() => handleMonthNavigation("prev")}
                    >
                      <Icon name="arrow_left" size={14} />
                    </button>
                    <span className={styles.monthTitle}>
                      {monthNames[nextMonth.getMonth()]}{" "}
                      {nextMonth.getFullYear()}
                    </span>
                    <button
                      className={styles.monthNavButton}
                      onClick={() => handleMonthNavigation("next")}
                    >
                      <Icon name="arrow_right" size={14} />
                    </button>
                  </div>
                  <div className={styles.dayHeaders}>
                    {dayNames.map((day) => (
                      <div key={day} className={styles.dayHeader}>
                        {day}
                      </div>
                    ))}
                  </div>
                  <div className={styles.daysGrid}>
                    {nextMonthDays.map((date, index) => {
                      if (!date) {
                        return (
                          <div key={index} className={styles.emptyDay}></div>
                        );
                      }

                      const isInRange = isDateInRange(date);
                      const isStart = isStartDate(date);
                      const isEnd = isEndDate(date);

                      return (
                        <div
                          key={index}
                          className={`${styles.day} ${
                            isInRange ? styles.inRange : ""
                          } ${isStart ? styles.startDate : ""} ${
                            isEnd ? styles.endDate : ""
                          }`}
                          onClick={() => handleDateClick(date)}
                        >
                          {date.getDate()}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.footer}>
            <button className={styles.cancelButton} onClick={onClose}>
              Hủy
            </button>
            <button className={styles.applyButton} onClick={handleApply}>
              Áp dụng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
