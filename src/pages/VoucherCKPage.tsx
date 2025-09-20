import React, { useState } from "react";
import { Table, TableColumn } from "../components/molecules/Table";
import { Dropdown, DropdownItem } from "../components/atoms/Dropdown";
import { Badge } from "../components/atoms/Badge";
import { StatCard } from "../components/atoms/StatCard";
import { FilterBar } from "../components/molecules/FilterBar";
import { Icon } from "../components/atoms/Icon";
import { DateRangeField } from "../components/atoms/DateRangeField";
import { IntegratedFilterBar } from "../components/atoms/IntegratedFilterBar";
import {
  formatDate,
  formatTime,
  isToday,
  isYesterday,
} from "../utils/dateUtils";
import styles from "./VoucherCKPage.module.scss";

interface TransferVoucher {
  id: string;
  voucherCode: string;
  hasSuitcase: boolean;
  time: string;
  sourceWarehouse: string;
  sourceWarehouseName: string;
  destinationWarehouse: string;
  destinationWarehouseName: string;
  destinationLocation: string;
  products: number;
  packages: number;
  volume: number;
  status: "export_transfer" | "request_transfer";
  shippingStatus:
    | "in_transfer"
    | "waiting_transfer"
    | "waiting_package_notification";
}

const mockTransferVouchers: TransferVoucher[] = [
  {
    id: "1938882",
    voucherCode: "CK11092025:0193584",
    hasSuitcase: true,
    time: "2025-09-10T08:30:00",
    sourceWarehouse: "KTT/1",
    sourceWarehouseName: "Kho Trung Tâm",
    destinationWarehouse: "MIA33",
    destinationWarehouseName: "MIA Đồng Nai",
    destinationLocation: "Vòng xoay Tam Hiệp",
    products: 21,
    packages: 7,
    volume: 0.57,
    status: "export_transfer",
    shippingStatus: "in_transfer",
  },
  {
    id: "1938376",
    voucherCode: "CK10092025:0193558",
    hasSuitcase: true,
    time: "2025-09-06T09:10:00",
    sourceWarehouse: "KTT/1",
    sourceWarehouseName: "Kho Trung Tâm",
    destinationWarehouse: "MIA16",
    destinationWarehouseName: "MIA HCM",
    destinationLocation: "Lũy Bán Bích",
    products: 49,
    packages: 5,
    volume: 0.41,
    status: "export_transfer",
    shippingStatus: "in_transfer",
  },
  {
    id: "1938375",
    voucherCode: "CK10092025:0193557",
    hasSuitcase: true,
    time: "2025-09-06T09:10:00",
    sourceWarehouse: "KTT/1",
    sourceWarehouseName: "Kho Trung Tâm",
    destinationWarehouse: "MIA1",
    destinationWarehouseName: "MIA HCM",
    destinationLocation: "Cống Quỳnh",
    products: 20,
    packages: 3,
    volume: 0.47,
    status: "export_transfer",
    shippingStatus: "in_transfer",
  },
  {
    id: "1938374",
    voucherCode: "CK10092025:0193556",
    hasSuitcase: true,
    time: "10/09/2025",
    sourceWarehouse: "KTT/1",
    sourceWarehouseName: "Kho Trung Tâm",
    destinationWarehouse: "MIA11",
    destinationWarehouseName: "MIA HCM",
    destinationLocation: "Quang Trung",
    products: 10,
    packages: 4,
    volume: 0.14,
    status: "export_transfer",
    shippingStatus: "in_transfer",
  },
  {
    id: "1938373",
    voucherCode: "CK10092025:0193555",
    hasSuitcase: true,
    time: "10/09/2025",
    sourceWarehouse: "KTT/1",
    sourceWarehouseName: "Kho Trung Tâm",
    destinationWarehouse: "MIA12",
    destinationWarehouseName: "MIA HCM",
    destinationLocation: "Nguyễn Văn Cừ",
    products: 12,
    packages: 2,
    volume: 0.31,
    status: "export_transfer",
    shippingStatus: "waiting_transfer",
  },
  {
    id: "1938372",
    voucherCode: "CK10092025:0193554",
    hasSuitcase: true,
    time: "10/09/2025",
    sourceWarehouse: "KTT/1",
    sourceWarehouseName: "Kho Trung Tâm",
    destinationWarehouse: "MIA13",
    destinationWarehouseName: "MIA HCM",
    destinationLocation: "Lê Văn Việt",
    products: 16,
    packages: 1,
    volume: 0.25,
    status: "export_transfer",
    shippingStatus: "in_transfer",
  },
  {
    id: "1938371",
    voucherCode: "CK09092025:0193553",
    hasSuitcase: true,
    time: "03/09/2025",
    sourceWarehouse: "KTT/1",
    sourceWarehouseName: "Kho Trung Tâm",
    destinationWarehouse: "MIA14",
    destinationWarehouseName: "MIA HCM",
    destinationLocation: "Tân Bình",
    products: 8,
    packages: 0,
    volume: 0.0,
    status: "request_transfer",
    shippingStatus: "waiting_package_notification",
  },
  {
    id: "1938370",
    voucherCode: "CK09092025:0193552",
    hasSuitcase: true,
    time: "02/09/2025",
    sourceWarehouse: "KTT/1",
    sourceWarehouseName: "Kho Trung Tâm",
    destinationWarehouse: "MIA15",
    destinationWarehouseName: "MIA HCM",
    destinationLocation: "Gò Vấp",
    products: 15,
    packages: 0,
    volume: 0.0,
    status: "request_transfer",
    shippingStatus: "waiting_package_notification",
  },
  {
    id: "1938369",
    voucherCode: "CK09092025:0193551",
    hasSuitcase: true,
    time: "19/08/2025",
    sourceWarehouse: "KTT/1",
    sourceWarehouseName: "Kho Trung Tâm",
    destinationWarehouse: "MIA17",
    destinationWarehouseName: "MIA HCM",
    destinationLocation: "Bình Thạnh",
    products: 2,
    packages: 0,
    volume: 0.0,
    status: "request_transfer",
    shippingStatus: "waiting_package_notification",
  },
  {
    id: "1938368",
    voucherCode: "CK09092025:0193550",
    hasSuitcase: true,
    time: "19/08/2025",
    sourceWarehouse: "KTT/1",
    sourceWarehouseName: "Kho Trung Tâm",
    destinationWarehouse: "MIA18",
    destinationWarehouseName: "MIA HCM",
    destinationLocation: "Thủ Đức",
    products: 118,
    packages: 0,
    volume: 0.0,
    status: "request_transfer",
    shippingStatus: "waiting_package_notification",
  },
];

const VoucherCKPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [, setFilters] = useState({
    shippingStatus: [] as string[],
  });

  // Function to get current month date range in Vietnamese format
  const getCurrentMonthDateRange = () => {
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const formatDate = (date: Date) => {
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    };

    return `${formatDate(firstDay)} - ${formatDate(lastDay)}`;
  };
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  // Select all functionality
  const currentData = mockTransferVouchers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  const allCurrentPageIds = currentData.map((item) => item.id);
  const isAllSelected =
    allCurrentPageIds.length > 0 &&
    allCurrentPageIds.every((id) => selectedRows.includes(id));
  const isIndeterminate =
    selectedRows.some((id) => allCurrentPageIds.includes(id)) && !isAllSelected;

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      // Add all current page items to selection
      const newSelectedRows = [
        ...Array.from(new Set([...selectedRows, ...allCurrentPageIds])),
      ];
      setSelectedRows(newSelectedRows);
    } else {
      // Remove all current page items from selection
      setSelectedRows(
        selectedRows.filter((id) => !allCurrentPageIds.includes(id))
      );
    }
  };

  const columns: TableColumn<TransferVoucher>[] = [
    {
      key: "checkbox",
      title: (
        <input
          type="checkbox"
          className={styles.checkbox}
          checked={isAllSelected}
          ref={(input) => {
            if (input) input.indeterminate = isIndeterminate;
          }}
          onChange={(e) => handleSelectAll(e.target.checked)}
        />
      ),
      align: "center",
      render: (_, record) => (
        <input
          type="checkbox"
          className={styles.checkbox}
          checked={selectedRows.includes(record.id)}
          onChange={(e) => {
            if (e.target.checked) {
              setSelectedRows([...selectedRows, record.id]);
            } else {
              setSelectedRows(selectedRows.filter((id) => id !== record.id));
            }
          }}
        />
      ),
    },
    {
      key: "voucherCode",
      title: "MÃ PHIẾU",
      dataIndex: "voucherCode",
      render: (_, record) => (
        <div className={styles.voucherInfo}>
          <div className={styles.voucherIcon}>
            <span className={styles.iconText}>C</span>
          </div>
          <div className={styles.voucherDetails}>
            <div className={styles.voucherCode}>{record.voucherCode}</div>
            <div className={styles.voucherId}>ID: {record.id}</div>
          </div>
        </div>
      ),
    },
    {
      key: "hasSuitcase",
      title: "CÓ VALI",
      dataIndex: "hasSuitcase",
      align: "center",
      render: (value) => (
        <Badge variant="success" size="sm">
          Có vali
        </Badge>
      ),
    },
    {
      key: "time",
      title: "THỜI GIAN",
      dataIndex: "time",
      align: "center",
      sortable: true,
      sorter: (a, b) => a.time.localeCompare(b.time),
      render: (value) => {
        const dateObj = new Date(value);
        const isTodayDate = isToday(dateObj);
        const isYesterdayDate = isYesterday(dateObj);

        return (
          <div className={styles.timeDisplay}>
            <div className={styles.dateText}>
              {isTodayDate
                ? "Hôm nay"
                : isYesterdayDate
                  ? "Hôm qua"
                  : formatDate(dateObj)}
            </div>
            <div className={styles.timeText}>
              {formatTime(dateObj, { format: "24h" })}
            </div>
          </div>
        );
      },
    },
    {
      key: "sourceWarehouse",
      title: "KHO NGUỒN",
      dataIndex: "sourceWarehouse",
      render: (_, record) => (
        <div className={styles.warehouseInfo}>
          <div className={styles.warehouseCode}>{record.sourceWarehouse}</div>
          <div className={styles.warehouseName}>
            {record.sourceWarehouseName}
          </div>
        </div>
      ),
    },
    {
      key: "destinationWarehouse",
      title: "KHO ĐÍCH",
      dataIndex: "destinationWarehouse",
      render: (_, record) => (
        <div className={styles.warehouseInfo}>
          <div className={styles.warehouseCode}>
            {record.destinationWarehouse}/{record.destinationWarehouseName}
          </div>
          <div className={styles.warehouseLocation}>
            ({record.destinationLocation})
          </div>
        </div>
      ),
    },
    {
      key: "products",
      title: "SẢN PHẨM",
      dataIndex: "products",
      align: "center",
      sortable: true,
      sorter: (a, b) => a.products - b.products,
      render: (value) => (
        <Badge variant="info" size="sm" className={styles.productBadge}>
          {value}
        </Badge>
      ),
    },
    {
      key: "packages",
      title: "KIỆN",
      dataIndex: "packages",
      align: "center",
      sortable: true,
      sorter: (a, b) => a.packages - b.packages,
      render: (value) => (
        <Badge variant="info" size="sm" className={styles.packageBadge}>
          {value}
        </Badge>
      ),
    },
    {
      key: "volume",
      title: "KHỐI (M³)",
      dataIndex: "volume",
      align: "center",
      sortable: true,
      sorter: (a, b) => a.volume - b.volume,
      render: (value) => (
        <Badge variant="info" size="sm" className={styles.volumeBadge}>
          {value.toFixed(2).replace(".", ",")}
        </Badge>
      ),
    },
    {
      key: "status",
      title: "TRẠNG THÁI",
      dataIndex: "status",
      align: "center",
      render: (value) => {
        const statusConfig = {
          export_transfer: {
            label: "Xuất chuyển kho",
            variant: "warning" as const,
            className: styles.statusExport,
          },
          request_transfer: {
            label: "Đề nghị chuyển kho",
            variant: "info" as const,
            className: styles.statusRequest,
          },
        };
        const config = statusConfig[value as keyof typeof statusConfig];
        return (
          <Badge
            variant={config.variant}
            size="sm"
            className={config.className}
          >
            {config.label}
          </Badge>
        );
      },
    },
    {
      key: "shippingStatus",
      title: "TT VẬN CHUYỂN",
      dataIndex: "shippingStatus",
      align: "center",
      render: (value) => {
        const statusConfig = {
          in_transfer: {
            label: "Đang chuyển giao",
            variant: "success" as const,
            className: styles.shippingInTransfer,
          },
          waiting_transfer: {
            label: "Chờ chuyển giao",
            variant: "warning" as const,
            className: styles.shippingWaiting,
          },
          waiting_package_notification: {
            label: "Chờ báo kiện",
            variant: "error" as const,
            className: styles.shippingWaitingNotification,
          },
        };
        const config = statusConfig[value as keyof typeof statusConfig];
        return (
          <Badge
            variant={config.variant}
            size="sm"
            className={config.className}
          >
            {config.label}
          </Badge>
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
    setPageSize(size);
  };

  const handleRowClick = (record: TransferVoucher) => {
    console.log("Row clicked:", record);
  };

  // Calculate statistics
  const stats = {
    waitingPackageNotification: mockTransferVouchers.filter(
      (v) => v.shippingStatus === "waiting_package_notification"
    ).length,
    waitingTransfer: mockTransferVouchers.filter(
      (v) => v.shippingStatus === "waiting_transfer"
    ).length,
    inTransfer: mockTransferVouchers.filter(
      (v) => v.shippingStatus === "in_transfer"
    ).length,
    transferred: 0, // No data for this status
  };

  const suitcaseStats = {
    withSuitcase: mockTransferVouchers.filter((v) => v.hasSuitcase).length,
    withoutSuitcase: mockTransferVouchers.filter((v) => !v.hasSuitcase).length,
    productsWithSuitcase: mockTransferVouchers
      .filter((v) => v.hasSuitcase)
      .reduce((sum, v) => sum + v.products, 0),
    productsWithoutSuitcase: mockTransferVouchers
      .filter((v) => !v.hasSuitcase)
      .reduce((sum, v) => sum + v.products, 0),
  };

  const transferStats = {
    deliveryPoints: stats.waitingTransfer,
    packages: mockTransferVouchers
      .filter((v) => v.shippingStatus === "waiting_transfer")
      .reduce((sum, v) => sum + v.packages, 0),
    volume: mockTransferVouchers
      .filter((v) => v.shippingStatus === "waiting_transfer")
      .reduce((sum, v) => sum + v.volume, 0),
  };

  return (
    <div className={styles.voucherCKPage}>
      {/* StatCards Section - Moved to top */}
      <div className={styles.statCardsSection}>
        <StatCard
          title="Chờ báo kiện"
          count={stats.waitingPackageNotification}
          icon="more"
          color="orange"
          details={[
            `Có vali: ${suitcaseStats.withSuitcase} | Không vali: ${suitcaseStats.withoutSuitcase}`,
            `SP có vali: ${suitcaseStats.productsWithSuitcase} | SP không vali: ${suitcaseStats.productsWithoutSuitcase.toLocaleString()}`,
          ]}
        />

        <StatCard
          title="Chờ chuyển giao"
          count={stats.waitingTransfer}
          icon="clock"
          color="green"
          details={[
            `Điểm giao: ${transferStats.deliveryPoints} | Kiện: ${transferStats.packages}`,
            `Khối: ${transferStats.volume.toFixed(2).replace(".", ",")} m³`,
          ]}
        />

        <StatCard
          title="Đang chuyển giao"
          count={stats.inTransfer}
          icon="truck"
          color="blue"
        />

        <StatCard
          title="Đã chuyển giao"
          count={stats.transferred}
          icon="check"
          color="purple"
        />
      </div>

      {/* Actions Section with integrated FilterBar */}
      <div className={styles.header}>
        <div className={styles.filterSection}>
          <FilterBar
            onFiltersChange={(filters) =>
              console.log("Filters changed:", filters)
            }
          />
        </div>
        <div className={styles.actions}>
          <IntegratedFilterBar
            onFilterChange={(newFilters) => {
              setFilters((prev) => ({ ...prev, ...newFilters }));
              console.log("Filters changed:", newFilters);
            }}
          />
          <DateRangeField
            value={getCurrentMonthDateRange()}
            placeholder="Chọn khoảng thời gian"
            onDateChange={(startDate, endDate) => {
              console.log("Date range changed:", { startDate, endDate });
            }}
          />
          <button
            className={styles.searchButton}
            onClick={() => console.log("Search clicked")}
            aria-label="Tìm kiếm"
          >
            <Icon name="search" size={14} />
            <span>Tìm kiếm</span>
          </button>
          <Dropdown
            items={[
              {
                key: "export",
                label: "Export",
                icon: "import",
                onClick: () => console.log("Export clicked"),
              },
              {
                key: "print_packing",
                label: "In soạn hàng",
                icon: "printer",
                onClick: () => console.log("Print packing clicked"),
              },
              {
                key: "print_voucher",
                label: "In phiếu",
                icon: "printer",
                onClick: () => console.log("Print voucher clicked"),
              },
              {
                key: "import",
                label: "Import",
                icon: "download",
                onClick: () => console.log("Import clicked"),
              },
              {
                key: "create_voucher",
                label: "Thêm phiếu CK",
                icon: "add",
                onClick: () => console.log("Create voucher clicked"),
              },
              {
                key: "delete",
                label: "Xóa",
                icon: "delete",
                onClick: () => console.log("Delete clicked"),
                danger: true,
              },
            ]}
            placement="bottom-right"
          />
        </div>
      </div>

      <div className={styles.tableSection}>
        <Table
          columns={columns}
          dataSource={currentData}
          rowKey="id"
          size="small"
          bordered
          hoverable
          striped
          onRow={(record) => ({
            onClick: () => handleRowClick(record),
          })}
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: mockTransferVouchers.length,
            onChange: handlePageChange,
            showSizeChanger: true,
            pageSizeOptions: [10, 20, 50, 100],
          }}
        />
      </div>
    </div>
  );
};

export default VoucherCKPage;
