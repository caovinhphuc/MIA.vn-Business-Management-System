import {
  AppstoreOutlined,
  BarChartOutlined,
  BellOutlined,
  CheckCircleOutlined,
  CloseOutlined,
  ClockCircleOutlined,
  DashboardOutlined,
  DeleteOutlined,
  DownloadOutlined,
  DownOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  EyeOutlined,
  FilterOutlined,
  LeftOutlined,
  LockOutlined,
  LogoutOutlined,
  MailOutlined,
  MenuOutlined,
  MoreOutlined,
  PlusOutlined,
  PrinterOutlined,
  RightOutlined,
  SearchOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
  SoundOutlined,
  SyncOutlined,
  TeamOutlined,
  UpOutlined,
  UserOutlined,
  WalletOutlined,
  FileTextOutlined,
  CarOutlined,
  CheckOutlined,
  ImportOutlined,
} from "@ant-design/icons";
import React from "react";

const iconMap = {
  dashboard: DashboardOutlined,
  shopping_cart: ShoppingCartOutlined,
  inventory: AppstoreOutlined,
  people: UserOutlined,
  analytics: BarChartOutlined,
  account_balance: WalletOutlined,
  settings: SettingOutlined,
  search: SearchOutlined,
  menu: MenuOutlined,
  notifications: BellOutlined,
  logout: LogoutOutlined,
  add: PlusOutlined,
  edit: EditOutlined,
  delete: DeleteOutlined,
  view: EyeOutlined,
  download: DownloadOutlined,
  filter: FilterOutlined,
  sync: SyncOutlined,
  success: CheckCircleOutlined,
  warning: ExclamationCircleOutlined,
  close: CloseOutlined,
  arrow_down: DownOutlined,
  arrow_up: UpOutlined,
  arrow_left: LeftOutlined,
  arrow_right: RightOutlined,
  more_vertical: MoreOutlined,
  lock: LockOutlined,
  mail: MailOutlined,
  team: TeamOutlined,
  printer: PrinterOutlined,
  sound: SoundOutlined,
  file_text: FileTextOutlined,
  clock: ClockCircleOutlined,
  truck: CarOutlined,
  check: CheckOutlined,
  more: MoreOutlined,
  import: ImportOutlined,
};

interface IconProps {
  name: keyof typeof iconMap;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const Icon: React.FC<IconProps> = ({
  name,
  size = 16,
  className,
  style,
  ...props
}) => {
  const IconComponent = iconMap[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return (
    <IconComponent
      style={{ fontSize: size, ...style }}
      className={className}
      {...props}
    />
  );
};
