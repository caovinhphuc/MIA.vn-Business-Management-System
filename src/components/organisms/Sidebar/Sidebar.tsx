// src/components/organisms/Sidebar/Sidebar.tsx
import React, { useCallback, useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { Icon } from "../../atoms/Icon";
import styles from "./Sidebar.module.scss";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const menuItems = [
  { path: "/dashboard", label: "Tổng quan", icon: "dashboard" },
  {
    label: "Đơn hàng",
    icon: "shopping_cart",
    submenu: [
      { path: "/orders", label: "Danh sách đơn hàng" },
      { path: "/orders/import", label: "Đơn nhập" },
      { path: "/orders/return", label: "Trả hàng" },
      { path: "/orders/shipping", label: "Vận đơn" },
    ],
  },
  {
    label: "Sản phẩm",
    icon: "inventory",
    submenu: [
      { path: "/products", label: "Danh sách sản phẩm" },
      { path: "/products/inventory", label: "Tồn kho" },
      { path: "/products/import", label: "Nhập hàng" },
      { path: "/products/transfer", label: "Chuyển kho" },
      { path: "/products/suppliers", label: "Nhà cung cấp" },
    ],
  },
  { path: "/customers", label: "Khách hàng", icon: "people" },
  {
    label: "Phiếu hệ thống",
    icon: "file_text",
    submenu: [
      { path: "/vouchers/po", label: "Phiếu PO" },
      { path: "/vouchers/ck", label: "Phiếu chuyển kho" },
      { path: "/vouchers/so", label: "Phiếu SO" },
      { path: "/vouchers/bh", label: "Phiếu BH" },
    ],
  },
  { path: "/reports", label: "Báo cáo", icon: "analytics" },
  { path: "/finance", label: "Số quỹ", icon: "account_balance" },
  { path: "/settings", label: "Cấu hình", icon: "settings" },
  { path: "/sidebar-demo", label: "Demo Sidebar", icon: "view_sidebar" },
];

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
  // Only one submenu open at a time (accordion). Store as array for backward compat in localStorage.
  const [openSubmenus, setOpenSubmenus] = useState<string[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Load persisted submenu state
  useEffect(() => {
    try {
      const raw = localStorage.getItem("sidebar_open_submenus");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Keep only the first (accordion behavior)
          setOpenSubmenus([parsed[0]]);
        }
      }
    } catch (_) {
      /* ignore */
    }
  }, []);

  // Persist submenu state
  useEffect(() => {
    try {
      localStorage.setItem(
        "sidebar_open_submenus",
        JSON.stringify(openSubmenus)
      );
    } catch (_) {
      /* ignore */
    }
  }, [openSubmenus]);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const toggleSubmenu = (label: string) => {
    setOpenSubmenus((prev) => (prev[0] === label ? [] : [label]));
  };

  // Format time for Vietnam timezone
  const formatTime = (date: Date, isCollapsed: boolean) => {
    const vietnamTime = new Date(
      date.toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" })
    );

    if (isCollapsed) {
      // Show only time when collapsed
      return vietnamTime.toLocaleTimeString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
    } else {
      // Show full date and time when expanded
      const dayOfWeek = vietnamTime.toLocaleDateString("vi-VN", {
        weekday: "long",
      });
      const dateStr = vietnamTime.toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      const timeStr = vietnamTime.toLocaleTimeString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });

      return {
        dayOfWeek,
        date: dateStr,
        time: timeStr,
      };
    }
  };

  // Keyboard navigation between interactive items (nav links + groups)
  const focusablesSelector = 'button, [role="button"], a[href]';
  const handleKeyNav = useCallback((e: React.KeyboardEvent) => {
    if (!containerRef.current) return;
    const keys = ["ArrowDown", "ArrowUp"];
    if (!keys.includes(e.key)) return;
    const focusables = Array.from(
      containerRef.current.querySelectorAll<HTMLElement>(focusablesSelector)
    ).filter((el) => !el.getAttribute("disabled"));
    const idx = focusables.indexOf(document.activeElement as HTMLElement);
    if (idx === -1) return;
    e.preventDefault();
    const nextIdx =
      e.key === "ArrowDown"
        ? (idx + 1) % focusables.length
        : (idx - 1 + focusables.length) % focusables.length;
    focusables[nextIdx].focus();
  }, []);

  const handleGroupKey = (label: string) => (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleSubmenu(label);
    }
    handleKeyNav(e);
  };

  const handleLinkKey = (e: React.KeyboardEvent) => {
    handleKeyNav(e);
  };
  return (
    <>
      <div
        ref={containerRef}
        className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}
        aria-label="Main sidebar navigation"
      >
        <div className={styles.header}>
          <div className={styles.logoIconWrapper} onClick={onToggle}>
            <div className={styles.logoIcon}>
              <div className={styles.gridLogo}>
                <div className={styles.gridSquare}></div>
                <div className={styles.gridSquare}></div>
                <div className={styles.gridSquare}></div>
                <div className={styles.gridSquare}></div>
              </div>
            </div>
          </div>
          {isOpen && (
            <div className={styles.logoTextWrapper}>
              <div className={styles.logoText}>
                <span className={styles.logoTitle}>MIA.vn</span>
                <span className={styles.logoSubtitle}>Hệ thống quản lý</span>
              </div>
            </div>
          )}
        </div>

        <nav className={styles.nav}>
          {menuItems.map((item, index) => {
            const isGroupOpen = openSubmenus.includes(item.label);
            return (
              <div key={index} className={styles.navItem}>
                {item.path ? (
                  <NavLink
                    to={item.path}
                    end
                    aria-label={item.label}
                    onKeyDown={handleLinkKey}
                    className={({ isActive }) =>
                      `${styles.navLink} ${isActive ? styles.active : ""}`
                    }
                    data-tooltip={item.label}
                  >
                    <Icon name={item.icon as any} className={styles.navIcon} />
                    <span className={styles.navText}>{item.label}</span>
                  </NavLink>
                ) : (
                  <>
                    <div
                      role="button"
                      tabIndex={0}
                      aria-expanded={isGroupOpen}
                      aria-controls={`submenu-${index}`}
                      className={`${styles.navGroup} ${isGroupOpen ? styles.expanded : ""}`}
                      onClick={() => toggleSubmenu(item.label)}
                      onKeyDown={handleGroupKey(item.label)}
                      data-tooltip={item.label}
                    >
                      <div className={styles.navGroupContent}>
                        <Icon
                          name={item.icon as any}
                          className={styles.navIcon}
                        />
                        <span className={styles.navText}>{item.label}</span>
                      </div>
                      <Icon
                        name="arrow_down"
                        className={`${styles.arrowIcon} ${isGroupOpen ? styles.rotated : ""}`}
                      />
                    </div>
                    {item.submenu && (
                      <div
                        id={`submenu-${index}`}
                        className={`${styles.submenu} ${isGroupOpen ? styles.open : ""}`}
                        role="region"
                        aria-hidden={!isGroupOpen}
                      >
                        {item.submenu.map((subItem, subIndex) => (
                          <NavLink
                            key={subIndex}
                            to={subItem.path}
                            end
                            aria-label={subItem.label}
                            onKeyDown={handleLinkKey}
                            className={({ isActive }) =>
                              `${styles.subnavLink} ${isActive ? styles.active : ""}`
                            }
                            data-tooltip={subItem.label}
                          >
                            <span className={styles.subnavText}>
                              {subItem.label}
                            </span>
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </nav>

        {/* DateTime Section - Inside sidebar */}
        <div className={styles.datetimeSection}>
          {isOpen ? (
            <div className={styles.expandedDateTime}>
              {(() => {
                const expandedTime = formatTime(currentTime, false);
                if (typeof expandedTime === "object") {
                  return (
                    <>
                      <div className={styles.dayOfWeek}>
                        {expandedTime.dayOfWeek}
                      </div>
                      <div className={styles.date}>{expandedTime.date}</div>
                      <div className={styles.time}>{expandedTime.time}</div>
                    </>
                  );
                }
                return null;
              })()}
            </div>
          ) : (
            <div className={styles.collapsedDateTime}>
              {(() => {
                const collapsedTime = formatTime(currentTime, true);
                return typeof collapsedTime === "string" ? collapsedTime : "";
              })()}
            </div>
          )}
        </div>
      </div>

      {isOpen && <div className={styles.overlay} onClick={onToggle} />}
    </>
  );
};
