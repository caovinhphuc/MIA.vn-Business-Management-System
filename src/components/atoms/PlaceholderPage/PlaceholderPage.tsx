import React from 'react';
import styles from './PlaceholderPage.module.scss';

interface PlaceholderPageProps {
  title: string;
  description: string;
}

export const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ title, description }) => {
  return (
    <div className={styles.placeholder}>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
};
