import React from "react";
import { Icon } from "../Icon";
import styles from "./StatCard.module.scss";

export interface StatCardProps {
  title: string;
  count: number;
  icon: "clock" | "truck" | "check" | "more";
  color: "orange" | "green" | "blue" | "purple";
  details?: string[];
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  count,
  icon,
  color,
  details = [],
  className = "",
}) => {
  return (
    <div
      className={`${styles.statCard} ${styles[`statCard--${color}`]} ${className}`}
    >
      <div className={styles.statCardHeader}>
        <div className={styles.statCardIcon}>
          <Icon name={icon} />
        </div>
        <h3 className={styles.statCardTitle}>{title}</h3>
      </div>

      <div className={styles.statCardContent}>
        <div className={styles.statCardCount}>{count}</div>

        {details.length > 0 && (
          <div className={styles.statCardDetails}>
            {details.map((detail, index) => (
              <div key={index} className={styles.statCardDetail}>
                {detail}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
