import React from 'react';
import styles from './DashboardCard.module.scss';

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: 'primary' | 'success' | 'warning' | 'error';
}

export const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  icon,
  trend,
  color = 'primary',
}) => {
  return (
    <div className={`${styles.card} ${styles[`card--${color}`]}`}>
      <div className={styles.header}>
        <div className={styles.icon}>{icon}</div>
        <div className={styles.title}>{title}</div>
      </div>

      <div className={styles.value}>{value}</div>

      {trend && (
        <div className={`${styles.trend} ${trend.isPositive ? styles.positive : styles.negative}`}>
          <span className={styles.trendIcon}>{trend.isPositive ? '↗' : '↘'}</span>
          <span>{Math.abs(trend.value)}%</span>
        </div>
      )}
    </div>
  );
};
