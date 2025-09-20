// src/pages/RegisterPage.tsx
import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/atoms/Button";
import { Icon } from "../components/atoms/Icon";
import AuthService, { RegisterData } from "../services/authService";
import styles from "./LoginPage.module.scss"; // Sử dụng cùng style với LoginPage

const initialForm: RegisterData = {
  email: "",
  password: "",
  confirmPassword: "",
  name: "",
  fullName: "",
  role: "user",
  department: "",
};

const RegisterPage: React.FC = () => {
  const [form, setForm] = useState<RegisterData>(initialForm);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const [serverStatus, setServerStatus] = useState<
    "checking" | "online" | "offline"
  >("checking");
  const navigate = useNavigate();

  // Check server status on mount
  useEffect(() => {
    const checkServerStatus = async () => {
      try {
        const healthCheck = await AuthService.healthCheck();
        setServerStatus(
          healthCheck.status === "healthy" ? "online" : "offline"
        );
      } catch {
        setServerStatus("offline");
      }
    };
    checkServerStatus();
  }, []);

  const validate = useCallback(() => {
    const e: Record<string, string> = {};
    if (!form.fullName.trim()) e.fullName = "Họ tên là bắt buộc";
    if (!form.email.trim()) e.email = "Email là bắt buộc";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Email không hợp lệ";
    if (!form.password) e.password = "Mật khẩu là bắt buộc";
    else if (form.password.length < 6) e.password = "Ít nhất 6 ký tự";
    return e;
  }, [form]);

  const handleChange =
    (field: keyof RegisterData) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm({ ...form, [field]: e.target.value });
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerMessage(null);
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length) return;

    setLoading(true);
    try {
      const res = await AuthService.register(form);
      if (res.success) {
        setServerMessage("Đăng ký thành công! Chuyển tới đăng nhập...");
        setTimeout(() => navigate("/auth/login"), 1200);
      } else {
        setServerMessage(res.error || "Đăng ký thất bại");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.header}>
        <div
          className={styles.logo}
          onClick={async () => {
            console.log("🧪 Testing API from Logo click...");
            try {
              const healthCheck = await AuthService.healthCheck();
              console.log("Health check result:", healthCheck);
              alert(`Health Check: ${JSON.stringify(healthCheck)}`);
            } catch (error: any) {
              console.error("Test error:", error);
              alert(`Error: ${error?.message || "Unknown error"}`);
            }
          }}
          style={{ cursor: "pointer" }}
        >
          <div className={styles.gridIcon}>
            <div className={styles.gridRow}>
              <div className={styles.gridCell}></div>
              <div className={styles.gridCell}></div>
              <div className={styles.gridCell}></div>
            </div>
            <div className={styles.gridRow}>
              <div className={styles.gridCell}></div>
              <div className={styles.gridCell}></div>
              <div className={styles.gridCell}></div>
            </div>
            <div className={styles.gridRow}>
              <div className={styles.gridCell}></div>
              <div className={styles.gridCell}></div>
              <div className={styles.gridCell}></div>
            </div>
          </div>
          <div className={styles.logoText}>
            <span className={styles.mainText}>MIA.vn</span>
            <span className={styles.subText}>
              Hệ thống quản lý
              <span
                className={`${styles.statusDot} ${styles[serverStatus]}`}
              ></span>
            </span>
          </div>
        </div>
        <h1>Đăng ký tài khoản</h1>
        <p>Tạo tài khoản mới để truy cập hệ thống</p>
      </div>

      {serverMessage && (
        <div
          className={`${styles.generalError} ${serverMessage.includes("thành công") ? styles.success : styles.error}`}
          style={
            serverMessage.includes("thành công")
              ? {
                  background: "rgba(76, 175, 80, 0.1)",
                  borderColor: "#4caf50",
                  color: "#2e7d32",
                }
              : {
                  background: "rgba(244, 67, 54, 0.1)",
                  borderColor: "#f44336",
                  color: "#c62828",
                }
          }
        >
          <Icon
            name={serverMessage.includes("thành công") ? "success" : "warning"}
            size={16}
          />
          {serverMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="fullName">
            <Icon name="people" size={16} />
            Họ tên đầy đủ
          </label>
          <input
            id="fullName"
            type="text"
            value={form.fullName}
            onChange={handleChange("fullName")}
            placeholder="Nhập họ tên đầy đủ của bạn"
            className={errors.fullName ? styles.error : ""}
            required
            autoComplete="name"
            disabled={loading}
          />
          {errors.fullName && (
            <span className={styles.errorText} role="alert">
              {errors.fullName}
            </span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email">
            <Icon name="mail" size={16} />
            Địa chỉ Email
          </label>
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={handleChange("email")}
            placeholder="Nhập địa chỉ email của bạn"
            className={errors.email ? styles.error : ""}
            required
            autoComplete="email"
            disabled={loading}
          />
          {errors.email && (
            <span className={styles.errorText} role="alert">
              {errors.email}
            </span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password">
            <Icon name="settings" size={16} />
            Mật khẩu
          </label>
          <div className={styles.passwordContainer}>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={handleChange("password")}
              placeholder="Nhập mật khẩu của bạn"
              className={errors.password ? styles.error : ""}
              required
              autoComplete="new-password"
              disabled={loading}
            />
            <button
              type="button"
              className={styles.passwordToggle}
              onClick={() => setShowPassword(!showPassword)}
              title={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
              aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
              disabled={loading}
            >
              <Icon name={showPassword ? "close" : "view"} size={16} />
            </button>
          </div>
          {errors.password && (
            <span className={styles.errorText} role="alert">
              {errors.password}
            </span>
          )}
        </div>

        <div className={styles.formOptions}>
          <label className={styles.checkbox}>
            <input type="checkbox" required disabled={loading} />
            <span>
              Tôi đồng ý với <Link to="/terms">Điều khoản sử dụng</Link> và{" "}
              <Link to="/privacy">Chính sách bảo mật</Link>
            </span>
          </label>
        </div>

        <div className={styles.actionButtons}>
          <Button
            type="submit"
            variant="primary"
            size="sm"
            loading={loading}
            disabled={loading}
            className={styles.submitButton}
          >
            {loading ? "Đang tạo tài khoản..." : "TẠO TÀI KHOẢN"}
          </Button>
        </div>
      </form>

      <div className={styles.footer}>
        <p>
          Đã có tài khoản?{" "}
          <button
            type="button"
            className={styles.signupLink}
            onClick={() => navigate("/auth/login")}
            disabled={loading}
          >
            Đăng nhập ngay
          </button>
        </p>
        <p className={styles.securityNote}>🔒 Bảo mật với mã hóa SSL 256-bit</p>
      </div>
    </div>
  );
};

export default RegisterPage;
