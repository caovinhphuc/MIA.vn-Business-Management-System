import React, { useState } from "react";
import { Table, TableColumn } from "../components/molecules/Table";
import { Button } from "../components/atoms/Button";
import { Icon } from "../components/atoms/Icon";
import { Dropdown, DropdownItem } from "../components/atoms/Dropdown";
import { Badge } from "../components/atoms/Badge";
import {
  formatDate,
  formatTime,
  getRelativeTime,
  isToday,
  isYesterday,
} from "../utils/dateUtils";
import styles from "./ProductsPage.module.scss";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: "active" | "inactive" | "out_of_stock";
  createdAt: string;
}

const mockProducts: Product[] = [
  {
    id: "1",
    name: "iPhone 15 Pro",
    category: "Điện thoại",
    price: 29990000,
    stock: 50,
    status: "active",
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    name: "Samsung Galaxy S24",
    category: "Điện thoại",
    price: 24990000,
    stock: 0,
    status: "out_of_stock",
    createdAt: "2024-01-14",
  },
  {
    id: "3",
    name: "MacBook Pro M3",
    category: "Laptop",
    price: 45990000,
    stock: 25,
    status: "active",
    createdAt: "2024-01-13",
  },
  {
    id: "4",
    name: "Dell XPS 13",
    category: "Laptop",
    price: 32990000,
    stock: 15,
    status: "inactive",
    createdAt: "2024-01-12",
  },
  {
    id: "5",
    name: "iPad Air",
    category: "Tablet",
    price: 18990000,
    stock: 30,
    status: "active",
    createdAt: "2024-01-11",
  },
  {
    id: "6",
    name: "Sony WH-1000XM5",
    category: "Phụ kiện",
    price: 8990000,
    stock: 20,
    status: "active",
    createdAt: "2024-01-10",
  },
  {
    id: "7",
    name: "Apple Watch Series 9",
    category: "Đồng hồ thông minh",
    price: 12990000,
    stock: 35,
    status: "active",
    createdAt: "2024-01-09",
  },
  {
    id: "8",
    name: "Samsung Galaxy Tab S9",
    category: "Tablet",
    price: 21990000,
    stock: 12,
    status: "active",
    createdAt: "2024-01-08",
  },
  {
    id: "9",
    name: "ASUS ROG Strix G15",
    category: "Laptop",
    price: 38990000,
    stock: 8,
    status: "inactive",
    createdAt: "2024-01-07",
  },
  {
    id: "10",
    name: "AirPods Pro 2",
    category: "Phụ kiện",
    price: 6990000,
    stock: 0,
    status: "out_of_stock",
    createdAt: "2024-01-06",
  },
  {
    id: "11",
    name: "Xiaomi 13 Pro",
    category: "Điện thoại",
    price: 19990000,
    stock: 18,
    status: "active",
    createdAt: "2024-01-05",
  },
  {
    id: "12",
    name: "Surface Pro 9",
    category: "Tablet",
    price: 35990000,
    stock: 5,
    status: "active",
    createdAt: "2024-01-04",
  },
  {
    id: "13",
    name: "Gaming Chair Pro",
    category: "Phụ kiện",
    price: 4990000,
    stock: 25,
    status: "active",
    createdAt: "2024-01-03",
  },
  {
    id: "14",
    name: "Mechanical Keyboard RGB",
    category: "Phụ kiện",
    price: 2990000,
    stock: 40,
    status: "active",
    createdAt: "2024-01-02",
  },
  {
    id: "15",
    name: "4K Monitor 27 inch",
    category: "Màn hình",
    price: 8990000,
    stock: 15,
    status: "active",
    createdAt: "2024-01-01",
  },
];

const ProductsPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  const columns: TableColumn<Product>[] = [
    {
      key: "name",
      title: "Tên sản phẩm",
      dataIndex: "name",
      sortable: true,
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (value, record) => (
        <div className={styles.productInfo}>
          <div className={styles.productName}>{value}</div>
          <div className={styles.productId}>ID: {record.id}</div>
        </div>
      ),
    },
    {
      key: "category",
      title: "Danh mục",
      dataIndex: "category",
      sortable: true,
      sorter: (a, b) => a.category.localeCompare(b.category),
    },
    {
      key: "price",
      title: "Giá",
      dataIndex: "price",
      align: "right",
      sortable: true,
      sorter: (a, b) => a.price - b.price,
      render: (value) => (
        <span className={styles.price}>{value.toLocaleString("vi-VN")} ₫</span>
      ),
    },
    {
      key: "stock",
      title: "Tồn kho",
      dataIndex: "stock",
      align: "center",
      sortable: true,
      sorter: (a, b) => a.stock - b.stock,
      render: (value) => (
        <Badge variant={value === 0 ? "error" : "success"} size="sm">
          {value}
        </Badge>
      ),
    },
    {
      key: "status",
      title: "Trạng thái",
      dataIndex: "status",
      align: "center",
      render: (value) => {
        const statusConfig = {
          active: { label: "Hoạt động", variant: "success" as const },
          inactive: { label: "Tạm dừng", variant: "warning" as const },
          out_of_stock: { label: "Hết hàng", variant: "error" as const },
        };

        const config = statusConfig[value as keyof typeof statusConfig];
        return (
          <Badge variant={config.variant} size="sm">
            {config.label}
          </Badge>
        );
      },
    },
    {
      key: "createdAt",
      title: "Ngày tạo",
      dataIndex: "createdAt",
      align: "center",
      sortable: true,
      sorter: (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      render: (value) => {
        const dateObj = new Date(value);
        const date = formatDate(dateObj);
        const time = formatTime(dateObj, { format: "24h" });
        const relativeTime = getRelativeTime(value);

        return (
          <div className={styles.dateInfo}>
            <div className={styles.date}>{date}</div>
            <div className={styles.time}>{time}</div>
            <div
              className={`${styles.relativeTime} ${
                isToday(value)
                  ? styles.today
                  : isYesterday(value)
                    ? styles.yesterday
                    : ""
              }`}
            >
              {relativeTime}
            </div>
          </div>
        );
      },
    },
    {
      key: "actions",
      title: "THAO TÁC",
      align: "center",
      render: (_, record) => {
        const actionItems: DropdownItem[] = [
          {
            key: "notify",
            label: "Báo kiện",
            icon: "sound",
            onClick: () => console.log("Notify", record.id),
          },
          {
            key: "print_packing",
            label: "In soạn hàng",
            icon: "printer",
            onClick: () => console.log("Print Packing", record.id),
          },
          {
            key: "print_voucher",
            label: "In phiếu",
            icon: "printer",
            onClick: () => console.log("Print Voucher", record.id),
            active: true,
          },
          {
            key: "export_voucher",
            label: "Xuất phiếu",
            icon: "file_text",
            onClick: () => console.log("Export Voucher", record.id),
          },
          {
            key: "edit",
            label: "Sửa",
            icon: "edit",
            onClick: () => console.log("Edit", record.id),
          },
          {
            key: "delete",
            label: "Xóa",
            icon: "delete",
            onClick: () => console.log("Delete", record.id),
            danger: true,
          },
        ];

        return (
          <div className={styles.actions}>
            <Dropdown items={actionItems} placement="bottom-right" />
          </div>
        );
      },
    },
  ];

  const handlePageChange = (page: number, size: number) => {
    setCurrentPage(page);
  };

  const handleRowClick = (record: Product) => {
    console.log("Row clicked:", record);
  };

  return (
    <div className={styles.productsPage}>
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <h1>Quản lý Sản phẩm</h1>
          <p>Danh sách tất cả sản phẩm trong hệ thống</p>
        </div>

        <div className={styles.actions}>
          <Button variant="outline" icon={<Icon name="download" />}>
            Xuất Excel
          </Button>
          <Button variant="primary" icon={<Icon name="add" />}>
            Thêm sản phẩm
          </Button>
        </div>
      </div>

      <div className={styles.tableSection}>
        <Table
          columns={columns}
          dataSource={mockProducts}
          rowKey="id"
          size="small"
          bordered
          hoverable
          striped
          onRow={(record) => ({
            onClick: () => handleRowClick(record),
            className: styles.tableRow,
          })}
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: mockProducts.length,
            onChange: handlePageChange,
          }}
        />
      </div>
    </div>
  );
};

export default ProductsPage;
