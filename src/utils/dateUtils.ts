/**
 * Date and Time formatting utilities for Vietnamese locale
 */

export interface DateFormatOptions {
  includeTime?: boolean;
  includeSeconds?: boolean;
  format?: "short" | "medium" | "long" | "full";
  timeFormat?: "12h" | "24h";
}

/**
 * Format date to Vietnamese format (dd/MM/yyyy)
 */
export const formatDate = (
  date: Date | string,
  options: DateFormatOptions = {}
): string => {
  const dateObj = typeof date === "string" ? new Date(date) : date;

  if (isNaN(dateObj.getTime())) {
    return "N/A";
  }

  const {
    includeTime = false,
    includeSeconds = false,
    timeFormat = "24h",
  } = options;

  // Vietnamese date format: dd/MM/yyyy
  const day = dateObj.getDate().toString().padStart(2, "0");
  const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
  const year = dateObj.getFullYear();

  let formattedDate = `${day}/${month}/${year}`;

  if (includeTime) {
    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes().toString().padStart(2, "0");

    let timeStr = "";
    if (timeFormat === "12h") {
      const ampm = hours >= 12 ? "PM" : "AM";
      const displayHours = hours % 12 || 12;
      timeStr = `${displayHours}:${minutes} ${ampm}`;
    } else {
      timeStr = `${hours.toString().padStart(2, "0")}:${minutes}`;
    }

    if (includeSeconds) {
      const seconds = dateObj.getSeconds().toString().padStart(2, "0");
      timeStr += `:${seconds}`;
    }

    formattedDate += ` ${timeStr}`;
  }

  return formattedDate;
};

/**
 * Format time only (HH:mm or HH:mm:ss)
 */
export const formatTime = (
  date: Date | string,
  options: { includeSeconds?: boolean; format?: "12h" | "24h" } = {}
): string => {
  const dateObj = typeof date === "string" ? new Date(date) : date;

  if (isNaN(dateObj.getTime())) {
    return "N/A";
  }

  const { includeSeconds = false, format = "24h" } = options;

  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes().toString().padStart(2, "0");

  let timeStr = "";
  if (format === "12h") {
    const ampm = hours >= 12 ? "PM" : "AM";
    const displayHours = hours % 12 || 12;
    timeStr = `${displayHours}:${minutes} ${ampm}`;
  } else {
    timeStr = `${hours.toString().padStart(2, "0")}:${minutes}`;
  }

  if (includeSeconds) {
    const seconds = dateObj.getSeconds().toString().padStart(2, "0");
    timeStr += `:${seconds}`;
  }

  return timeStr;
};

/**
 * Get relative time (e.g., "2 giờ trước", "Hôm qua")
 */
export const getRelativeTime = (date: Date | string): string => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  const now = new Date();
  const diffInMs = now.getTime() - dateObj.getTime();
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInMinutes < 1) {
    return "Vừa xong";
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} phút trước`;
  } else if (diffInHours < 24) {
    return `${diffInHours} giờ trước`;
  } else if (diffInDays === 1) {
    return "Hôm qua";
  } else if (diffInDays < 7) {
    return `${diffInDays} ngày trước`;
  } else {
    return formatDate(dateObj);
  }
};

/**
 * Check if date is today
 */
export const isToday = (date: Date | string): boolean => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  const today = new Date();

  return (
    dateObj.getDate() === today.getDate() &&
    dateObj.getMonth() === today.getMonth() &&
    dateObj.getFullYear() === today.getFullYear()
  );
};

/**
 * Check if date is yesterday
 */
export const isYesterday = (date: Date | string): boolean => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  return (
    dateObj.getDate() === yesterday.getDate() &&
    dateObj.getMonth() === yesterday.getMonth() &&
    dateObj.getFullYear() === yesterday.getFullYear()
  );
};

/**
 * Format date with smart display (Today, Yesterday, or date)
 */
export const formatSmartDate = (
  date: Date | string,
  options: DateFormatOptions = {}
): string => {
  const dateObj = typeof date === "string" ? new Date(date) : date;

  if (isToday(dateObj)) {
    const timeStr = formatTime(dateObj, {
      includeSeconds: options.includeSeconds,
      format: options.timeFormat,
    });
    return `Hôm nay ${timeStr}`;
  } else if (isYesterday(dateObj)) {
    const timeStr = formatTime(dateObj, {
      includeSeconds: options.includeSeconds,
      format: options.timeFormat,
    });
    return `Hôm qua ${timeStr}`;
  } else {
    return formatDate(dateObj, options);
  }
};

/**
 * Parse date string to Date object with Vietnamese format support
 */
export const parseVietnameseDate = (dateStr: string): Date | null => {
  // Support formats: dd/MM/yyyy, dd/MM/yyyy HH:mm, dd-MM-yyyy, etc.
  const formats = [
    /^(\d{1,2})\/(\d{1,2})\/(\d{4})(?:\s+(\d{1,2}):(\d{1,2})(?::(\d{1,2}))?)?$/,
    /^(\d{1,2})-(\d{1,2})-(\d{4})(?:\s+(\d{1,2}):(\d{1,2})(?::(\d{1,2}))?)?$/,
  ];

  for (const format of formats) {
    const match = dateStr.match(format);
    if (match) {
      const [, day, month, year, hours = "0", minutes = "0", seconds = "0"] =
        match;
      return new Date(
        parseInt(year),
        parseInt(month) - 1,
        parseInt(day),
        parseInt(hours),
        parseInt(minutes),
        parseInt(seconds)
      );
    }
  }

  return null;
};
