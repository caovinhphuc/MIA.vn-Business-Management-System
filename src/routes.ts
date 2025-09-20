import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "./components/templates/AppLayout";
import { AuthLayout } from "./components/templates/AuthLayout";
import { ProtectedRoute } from "./components/features/auth/components/ProtectedRoute";
import { PlaceholderPage } from "./components/atoms/PlaceholderPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import DashboardPage from "./pages/DashboardPage";
import ProductsPage from "./pages/ProductsPage";
import VoucherPOPage from "./pages/VoucherPOPage";
import VoucherCKPage from "./pages/VoucherCKPage";
import VoucherSOPage from "./pages/VoucherSOPage";
import VoucherBHPage from "./pages/VoucherBHPage";
import ButtonDemoPage from "./pages/ButtonDemoPage";
import { SidebarDemoPage } from "./pages/SidebarDemoPage";
import { HomePage } from "./pages/HomePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: React.createElement(
      ProtectedRoute,
      null,
      React.createElement(AppLayout)
    ),
    children: [
      {
        path: "home",
        element: React.createElement(HomePage),
      },
      {
        path: "dashboard",
        element: React.createElement(DashboardPage),
      },
      {
        index: true,
        element: React.createElement(HomePage),
      },
      {
        path: "products",
        element: React.createElement(ProductsPage),
      },
      {
        path: "orders",
        element: React.createElement(PlaceholderPage, {
          title: "Đơn hàng",
          description: "Quản lý đơn hàng",
        }),
      },
      {
        path: "customers",
        element: React.createElement(PlaceholderPage, {
          title: "Khách hàng",
          description: "Quản lý khách hàng",
        }),
      },
      {
        path: "vouchers/po",
        element: React.createElement(VoucherPOPage),
      },
      {
        path: "vouchers/ck",
        element: React.createElement(VoucherCKPage),
      },
      {
        path: "vouchers/so",
        element: React.createElement(VoucherSOPage),
      },
      {
        path: "vouchers/bh",
        element: React.createElement(VoucherBHPage),
      },
      {
        path: "button-demo",
        element: React.createElement(ButtonDemoPage),
      },
      {
        path: "sidebar-demo",
        element: React.createElement(SidebarDemoPage),
      },
    ],
  },
  // Direct auth routes
  {
    path: "/login",
    element: React.createElement(
      AuthLayout,
      null,
      React.createElement(LoginPage)
    ),
  },
  {
    path: "/register",
    element: React.createElement(
      AuthLayout,
      null,
      React.createElement(RegisterPage)
    ),
  },
  {
    path: "/auth",
    element: React.createElement(AuthLayout),
    children: [
      {
        index: true,
        element: React.createElement(LoginPage),
      },
      {
        path: "login",
        element: React.createElement(LoginPage),
      },
      {
        path: "register",
        element: React.createElement(RegisterPage),
      },
      {
        path: "forgot-password",
        element: React.createElement(ForgotPasswordPage),
      },
    ],
  },
]);
