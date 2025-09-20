// src/pages/ForgotPasswordPage.tsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/atoms/Button";
import { Icon } from "../components/atoms/Icon";
import AuthService from "../services/authService";
import styles from "./LoginPage.module.scss"; // Sử dụng cùng style với LoginPage

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email.trim()) {
      setError("Email là bắt buộc");
      return;
    }
    setLoading(true);
    try {
      const res = await AuthService.forgotPassword(email);
      if (res.success) {
        setSent(true);
      } else {
        setError(res.message || "Không thể gửi yêu cầu");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.header}>
        <div className={styles.logo}>
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
            <span className={styles.subText}>Hệ thống quản lý</span>
          </div>
        </div>
        <h1>Quên mật khẩu</h1>
        <p>Nhập email để nhận hướng dẫn đặt lại mật khẩu</p>
      </div>

      {sent ? (
        <div
          className={styles.generalError}
          style={{
            background: "rgba(76, 175, 80, 0.1)",
            borderColor: "#4caf50",
            color: "#2e7d32",
          }}
        >
          <Icon name="success" size={16} />
          <div>
            <p>Nếu email tồn tại trong hệ thống, hướng dẫn đã được gửi.</p>
            <p
              style={{ fontSize: "0.8rem", opacity: 0.8, marginTop: "0.5rem" }}
            >
              * Backend chưa triển khai gửi mail thực – đây là mô phỏng.
            </p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className={styles.form} noValidate>
          <div className={styles.formGroup}>
            <label>
              <Icon name="mail" size={16} />
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Nhập email của bạn"
              className={error ? styles.error : ""}
            />
            {error && (
              <span className={styles.errorText} role="alert">
                {error}
              </span>
            )}
          </div>

          <div className={styles.actionButtons}>
            <Button
              type="submit"
              variant="primary"
              size="sm"
              loading={loading}
              className={styles.submitButton}
              disabled={loading}
            >
              {loading ? "Đang gửi..." : "GỬI YÊU CẦU"}
            </Button>
          </div>
        </form>
      )}

      <div className={styles.footer}>
        <p>
          <button
            type="button"
            className={styles.signupLink}
            onClick={() => navigate("/auth/login")}
          >
            Quay lại đăng nhập
          </button>
        </p>
        <div className={styles.securityNote}>
          <Icon name="settings" size={16} />
          <span>Bảo mật với mã hóa SSL 256-bit</span>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
