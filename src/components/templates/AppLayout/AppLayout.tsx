// src/components/templates/AppLayout/AppLayout.tsx
import React, { CSSProperties, useMemo } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Sidebar } from "../../organisms/Sidebar";
import { Header } from "../../organisms/Header";
import { MobileMenuButton } from "../../atoms/MobileMenuButton";
import { getCollapsedSidebarWidth, useLayout } from "./LayoutContext";
import styles from "./AppLayout.module.scss";

export const AppLayout: React.FC = () => {
  const { sidebarOpen, toggleSidebar } = useLayout();
  const location = useLocation();
  const COLLAPSED_WIDTH = getCollapsedSidebarWidth();

  // Get page title and subtitle based on current route
  const getPageInfo = () => {
    switch (location.pathname) {
      case "/voucher-ck":
        return {
          title: "Phiếu Chuyển kho",
          subtitle: "Quản lý phiếu chuyển kho giữa các kho",
        };
      case "/products":
        return {
          title: "Sản phẩm",
          subtitle: "Quản lý danh sách sản phẩm và tồn kho",
        };
      case "/dashboard":
        return {
          title: "Tổng quan",
          subtitle: "Dashboard tổng quan hệ thống",
        };
      default:
        return {
          title: "Dashboard",
          subtitle: "Chào mừng đến với hệ thống quản lý MIA.vn",
        };
    }
  };

  const pageInfo = getPageInfo();

  // Memoize layout style to prevent unnecessary re-renders
  const layoutStyle: CSSProperties = useMemo(
    () => ({
      // Provide a dynamic CSS variable consumed by Header & Main areas
      // Fallback to --sidebar-width when open
      ["--sidebar-current-width" as any]: sidebarOpen
        ? "var(--sidebar-width)"
        : `${COLLAPSED_WIDTH}px`,
    }),
    [sidebarOpen, COLLAPSED_WIDTH]
  );

  return (
    <div
      className={styles.appLayout}
      style={layoutStyle}
      data-sidebar-open={sidebarOpen}
      data-has-sidebar="true"
    >
      <MobileMenuButton onClick={toggleSidebar} isOpen={sidebarOpen} />
      <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />
      <div className={styles.main}>
        <Header title={pageInfo.title} subtitle={pageInfo.subtitle} />
        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};
