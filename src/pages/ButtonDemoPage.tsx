import React from "react";
import { Button } from "../components/atoms/Button";
import { Icon } from "../components/atoms/Icon";
import styles from "./ButtonDemoPage.module.scss";

const ButtonDemoPage: React.FC = () => {
  const buttonSizes = ["xs", "sm", "md", "lg", "xl"] as const;
  const buttonVariants = ["primary", "secondary", "outline", "danger"] as const;

  return (
    <div className={styles.buttonDemoPage}>
      <div className={styles.header}>
        <h1>Button Component Demo</h1>
        <p>Hiển thị tất cả các kích thước và variants của Button component</p>
      </div>

      <div className={styles.sections}>
        {/* Size Variants */}
        <div className={styles.section}>
          <h2>Size Variants</h2>
          <div className={styles.buttonGroup}>
            {buttonSizes.map((size) => (
              <div key={size} className={styles.buttonItem}>
                <Button
                  variant="primary"
                  size={size}
                  icon={<Icon name="add" />}
                >
                  {size.toUpperCase()} Button
                </Button>
                <span className={styles.label}>Size: {size}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Variant Examples */}
        <div className={styles.section}>
          <h2>Variant Examples</h2>
          <div className={styles.buttonGroup}>
            {buttonVariants.map((variant) => (
              <div key={variant} className={styles.buttonItem}>
                <Button
                  variant={variant}
                  size="md"
                  icon={<Icon name="download" />}
                >
                  {variant.charAt(0).toUpperCase() + variant.slice(1)} Button
                </Button>
                <span className={styles.label}>Variant: {variant}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Icon Only Buttons */}
        <div className={styles.section}>
          <h2>Icon Only Buttons</h2>
          <div className={styles.buttonGroup}>
            {buttonSizes.map((size) => (
              <div key={size} className={styles.buttonItem}>
                <Button
                  variant="outline"
                  size={size}
                  icon={<Icon name="add" />}
                >
                  {""}
                </Button>
                <span className={styles.label}>Icon only: {size}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Loading States */}
        <div className={styles.section}>
          <h2>Loading States</h2>
          <div className={styles.buttonGroup}>
            {buttonSizes.map((size) => (
              <div key={size} className={styles.buttonItem}>
                <Button variant="primary" size={size} loading>
                  Loading {size.toUpperCase()}
                </Button>
                <span className={styles.label}>Loading: {size}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Disabled States */}
        <div className={styles.section}>
          <h2>Disabled States</h2>
          <div className={styles.buttonGroup}>
            {buttonVariants.map((variant) => (
              <div key={variant} className={styles.buttonItem}>
                <Button
                  variant={variant}
                  size="md"
                  disabled
                  icon={<Icon name="add" />}
                >
                  Disabled {variant}
                </Button>
                <span className={styles.label}>Disabled: {variant}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Real Examples */}
        <div className={styles.section}>
          <h2>Real Examples (VoucherCKPage Style)</h2>
          <div className={styles.buttonGroup}>
            <div className={styles.buttonItem}>
              <Button
                variant="outline"
                size="xs"
                icon={<Icon name="download" />}
              >
                Xuất Excel
              </Button>
              <span className={styles.label}>Extra Small</span>
            </div>
            <div className={styles.buttonItem}>
              <Button
                variant="outline"
                size="sm"
                icon={<Icon name="download" />}
              >
                Xuất Excel
              </Button>
              <span className={styles.label}>Small (Current)</span>
            </div>
            <div className={styles.buttonItem}>
              <Button variant="primary" size="xs" icon={<Icon name="add" />}>
                Tạo phiếu
              </Button>
              <span className={styles.label}>Primary XS</span>
            </div>
            <div className={styles.buttonItem}>
              <Button variant="primary" size="sm" icon={<Icon name="add" />}>
                Tạo phiếu chuyển kho
              </Button>
              <span className={styles.label}>Primary SM (Current)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ButtonDemoPage;
