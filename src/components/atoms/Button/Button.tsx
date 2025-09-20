// src/components/atoms/Button/Button.tsx
import classNames from "classnames";
import React from "react";
import styles from "./Button.module.scss";

interface ButtonProps {
  variant?: "primary" | "secondary" | "outline" | "danger";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  type?: "button" | "submit" | "reset";
  icon?: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  children,
  onClick,
  disabled = false,
  loading = false,
  type = "button",
  icon,
  className,
  ...props
}) => {
  const buttonClass = classNames(
    styles.button,
    styles[`button--${variant}`],
    styles[`button--${size}`],
    {
      [styles["button--loading"]]: loading,
      [styles["button--disabled"]]: disabled,
    },
    className
  );

  return (
    <button
      type={type}
      className={buttonClass}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <span className={styles.spinner} />}
      {icon && <span className={styles.icon}>{icon}</span>}
      <span className={styles.text}>{children}</span>
    </button>
  );
};
