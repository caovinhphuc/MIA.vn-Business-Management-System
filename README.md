# MIA.vn - Hệ thống Quản lý Kinh doanh Thông minh

<div align="center">
  <img src="public/logo192.png" alt="Logo MIA.vn" width="120" height="120">

  <h3>🚀 Ứng dụng quản lý kinh doanh hiện đại với React & TypeScript</h3>

[![React](https://img.shields.io/badge/React-19.1.1-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9.5-blue.svg)](https://www.typescriptlang.org/)
[![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-2.9.0-purple.svg)](https://redux-toolkit.js.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.17-cyan.svg)](https://tailwindcss.com/)
[![SCSS](https://img.shields.io/badge/SCSS-Sass-orange.svg)](https://sass-lang.com/)
[![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen.svg)](https://github.com/your-username/mia-vn)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

</div>

---

## 📋 Tổng quan

**MIA.vn** là một hệ thống quản lý kinh doanh toàn diện được xây dựng với công nghệ hiện đại, cung cấp các tính năng quản lý sản phẩm, đơn hàng, khách hàng và dashboard thông minh.

### 🎯 Tính năng chính

- **🔐 Hệ thống xác thực**: Đăng nhập, đăng ký, quên mật khẩu với bảo mật cao
  - **Modern Auth UI**: Giao diện đăng nhập 2 cột với theme cam chuyên nghiệp
  - **Server Status**: Hiển thị trạng thái kết nối server real-time
  - **Form Validation**: Validation form với thông báo lỗi trực quan
  - **Account Lockout**: Bảo vệ chống brute force attack
- **📊 Dashboard thông minh**: Theo dõi hiệu suất kinh doanh real-time
  - **Enhanced Cards**: Cards với gradient backgrounds và interactive effects
  - **Visual Hierarchy**: Typography và spacing tối ưu cho readability
  - **Color-coded Status**: Màu sắc phân biệt cho từng trạng thái
  - **Smooth Animations**: Hover effects và transitions mượt mà
- **🛍️ Quản lý sản phẩm**: CRUD sản phẩm với phân loại và tìm kiếm
- **📦 Quản lý đơn hàng**: Xử lý đơn hàng từ tạo đến giao hàng
- **👥 Quản lý khách hàng**: Thông tin khách hàng và lịch sử mua hàng
- **🎨 Giao diện hiện đại**: UI/UX trực quan với theme màu cam chuyên nghiệp
  - **Consistent Layout**: Layout nhất quán trên tất cả trang auth
  - **Enhanced Sidebar**: Sidebar với visual states và smooth animations
  - **Interactive Navigation**: Hover effects và active states trực quan
  - **Responsive Design**: Tối ưu cho mọi thiết bị
  - **Professional Typography**: Hệ thống typography chuẩn với Inter font
- **📱 Responsive**: Tối ưu cho mọi thiết bị (desktop, tablet, mobile)
- **⌨️ Keyboard shortcuts**: Hỗ trợ phím tắt (Ctrl+B để toggle sidebar)
- **💾 Persistent state**: Lưu trạng thái sidebar vào localStorage
- **🎭 Smooth animations**: Hiệu ứng chuyển động mượt mà và chuyên nghiệp

---

## 🛠️ Công nghệ sử dụng

### Frontend Core

- **React 19.1.1** - Thư viện UI hiện đại
- **TypeScript 4.9.5** - Type safety và developer experience
- **React Router DOM 7.8.2** - Client-side routing
- **Redux Toolkit 2.9.0** - State management
- **React Redux 9.2.0** - React-Redux integration

### Styling & UI

- **SCSS/Sass 1.92.1** - CSS preprocessor với design system
- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **PostCSS & Autoprefixer** - CSS processing và browser compatibility
- **Ant Design Icons 6.0.2** - Icon library
- **Google Fonts (Inter)** - Professional typography system
- **CSS Variables** - Dynamic theming và responsive design

### Development Tools

- **ESLint** - Code linting và quality
- **Prettier** - Code formatting
- **Stylelint** - CSS/SCSS linting
- **Webpack CLI 6.0.1** - Module bundling
- **PostCSS CLI 11.0.1** - CSS processing

### Testing & Quality

- **Jest** - Unit testing framework
- **React Testing Library** - Component testing
- **Cypress** - End-to-end testing
- **Storybook** - Component documentation

### Build & Deployment

- **React Scripts 5.0.1** - Build tooling
- **Semantic Release** - Automated versioning
- **Renovate** - Dependency updates

---

## 🚀 Cài đặt và Chạy

### Yêu cầu hệ thống

- **Node.js**: >= 16.0.0
- **npm**: >= 8.0.0
- **Git**: >= 2.0.0

### Cài đặt dependencies

```bash
# Clone repository
git clone <repository-url>
cd mia-vn

# Cài đặt dependencies
npm install

# Hoặc sử dụng yarn
yarn install
```

### Chạy ứng dụng

```bash
# Development mode
npm start
# Mở http://localhost:3000

# Production build
npm run build

# Chạy tests
npm test

# Lint code
npm run lint

# Format code
npm run format
```

---

## 📁 Cấu trúc dự án

```
mia-vn/
├── public/                 # Static files
│   ├── index.html         # HTML template (lang="vi")
│   ├── manifest.json      # PWA manifest
│   └── favicon.ico        # App icon
├── src/
│   ├── components/         # React components
│   │   ├── atoms/         # Basic UI components
│   │   │   ├── Button/    # Button component
│   │   │   ├── Icon/      # Icon component
│   │   │   ├── Dropdown/  # Dropdown menu component
│   │   │   ├── Badge/     # Badge/Pill component
│   │   │   └── LoadingSpinner/ # Loading component
│   │   ├── molecules/     # Composite components
│   │   │   └── Table/     # Data table with sorting & pagination
│   │   ├── organisms/     # Complex components
│   │   │   ├── Header/    # Header với user info
│   │   │   └── Sidebar/   # Sidebar với navigation
│   │   ├── templates/     # Layout templates
│   │   │   ├── MainLayout/    # Main app layout
│   │   │   └── AuthLayout/    # Auth pages layout
│   │   └── features/      # Feature-specific components
│   │       ├── auth/      # Authentication
│   │       ├── dashboard/ # Dashboard
│   │       ├── products/  # Products management
│   │       ├── orders/    # Orders management
│   │       └── customers/ # Customers management
│   ├── pages/             # Page components
│   │   ├── LoginPage.tsx      # Đăng nhập
│   │   ├── RegisterPage.tsx   # Đăng ký
│   │   ├── DashboardPage.tsx  # Dashboard
│   │   ├── ProductsPage.tsx   # Sản phẩm
│   │   ├── VoucherPOPage.tsx  # Phiếu PO
│   │   ├── VoucherCKPage.tsx  # Phiếu CK (Chuyển kho)
│   │   ├── VoucherSOPage.tsx  # Phiếu SO
│   │   └── VoucherBHPage.tsx  # Phiếu BH
│   ├── services/          # API services
│   │   └── authService.ts # Authentication service
│   ├── store/             # Redux store
│   │   └── index.ts       # Store configuration
│   ├── styles/            # Global styles & design system
│   │   ├── variables.scss # CSS variables
│   │   ├── mixins.scss    # SCSS mixins
│   │   ├── theme.ts       # Theme configuration
│   │   └── globals.scss   # Global styles
│   ├── types/             # TypeScript type definitions
│   │   └── authTypes.ts   # Auth types
│   ├── utils/             # Utility functions
│   │   └── dateUtils.ts   # Vietnamese date formatting
│   ├── routes.ts          # Route configuration
│   ├── App.tsx            # Main app component
│   └── index.tsx          # App entry point
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

### 🎨 Design System

Dự án sử dụng design system nhất quán với:

- **Color Palette**: Theme màu cam chuyên nghiệp (#ff7043 - Material Orange 400)
  - Primary: #ff7043 (Material Orange 400)
  - Primary Hover: #ff5722 (Material Orange 500)
  - Primary Light: #ffab91 (Material Orange 200)
  - Primary Dark: #d84315 (Material Orange 700)
- **Typography**: Inter font family với hệ thống typography chuẩn
  - Font Family: Inter, Roboto, -apple-system, BlinkMacSystemFont
  - Font Sizes: 8 size variants từ xs (12px) đến 5xl (48px)
  - Font Weights: Normal (400), Medium (500), Semibold (600), Bold (700), Extrabold (800)
  - Line Heights: Tight (1.25), Normal (1.5), Relaxed (1.75)
- **Spacing**: 8-point grid system với 16 spacing values
- **Components**: Atomic design methodology (atoms, molecules, organisms, templates)
- **Responsive**: Mobile-first approach với breakpoints
- **Animations**: Smooth transitions với cubic-bezier easing
- **Icons**: Ant Design Icons library với 30+ icons
- **Auth Layout**: 2-column layout với left info section và right form section

---

## 🔧 Cấu hình

### Environment Variables

Tạo file `.env.local`:

```env
REACT_APP_API_URL=http://localhost:3001
REACT_APP_APP_NAME=MIA.vn
REACT_APP_VERSION=1.0.0
```

### Tailwind CSS

Cấu hình trong `tailwind.config.js`:

```javascript
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#ff7800",
        // ... custom colors
      },
    },
  },
  plugins: [],
};
```

### PostCSS

Cấu hình trong `postcss.config.js`:

```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

---

## 🔐 Authentication System

### Modern Auth UI Design

Hệ thống xác thực được thiết kế với giao diện hiện đại và chuyên nghiệp:

#### **2-Column Layout**

- **Left Section**: Thông tin về MIA.vn với background gradient cam
  - Logo với grid icon và text "MIA.vn - Hệ thống quản lý"
  - 3 feature cards: Dashboard Thông minh, Tự Động Hóa, Báo Cáo Chi Tiết
  - Quote: "Đơn giản hóa quản lý, tối ưu hóa lợi nhuận"
  - Trust badges: ISO 27001, SSL 256-bit, GDPR Compliant
- **Right Section**: Form đăng nhập/đăng ký với background trắng

#### **Consistent Form Structure**

- **Header**: Logo + title + subtitle
- **Form Fields**: Email, Password với validation
- **Form Options**: Remember me, Forgot password
- **Action Buttons**: Submit button với loading state
- **Footer**: Sign up/login link + security note

#### **Enhanced Features**

- **Server Status Indicator**: Hiển thị trạng thái kết nối server real-time
- **Form Validation**: Validation với thông báo lỗi trực quan
- **Account Lockout**: Bảo vệ chống brute force attack (5 lần thất bại)
- **Password Toggle**: Hiện/ẩn mật khẩu
- **Loading States**: Loading animation khi submit
- **Responsive Design**: Tối ưu cho mobile/tablet

#### **Security Features**

- **SSL 256-bit Encryption**: Bảo mật với mã hóa SSL
- **Session Management**: Quản lý session và token
- **Health Check**: Kiểm tra trạng thái server
- **Error Handling**: Xử lý lỗi và thông báo user-friendly

#### **Pages**

- **Login Page** (`/login`): Đăng nhập với email/password
- **Register Page** (`/register`): Đăng ký tài khoản mới
- **Forgot Password Page** (`/forgot-password`): Khôi phục mật khẩu

#### **Technical Implementation**

- **AuthService**: Service xử lý authentication
- **Protected Routes**: Bảo vệ routes cần đăng nhập
- **State Management**: Redux store cho auth state
- **Form Handling**: React hooks cho form state
- **Validation**: Client-side validation với error messages

---

## 📊 Dashboard Cards System

### Enhanced Card Design

Hệ thống dashboard cards được thiết kế với giao diện hiện đại và tương tác:

#### **Card Container Features**

- **Gradient Backgrounds**: Background gradient với độ trong suốt
- **Enhanced Shadows**: Multiple box-shadows tạo depth
- **Inset Highlights**: Inset shadow cho hiệu ứng 3D
- **Smooth Transitions**: Cubic-bezier easing cho animations
- **Hover Effects**: Transform scale + translateY khi hover
- **Overlay Effects**: Pseudo-element overlay khi hover

#### **Color Variants**

- **Primary Cards**: Gradient cam với border-left 4px
- **Success Cards**: Gradient xanh lá với shadow xanh
- **Warning Cards**: Gradient vàng với shadow vàng
- **Error Cards**: Gradient đỏ với shadow đỏ
- **Hover Shadows**: Màu shadow tương ứng với từng variant

#### **Icon Design**

- **Larger Size**: 40px với gradient background
- **Enhanced Shadows**: Multiple shadows với màu theme
- **Hover Animation**: Scale + rotate khi hover
- **Color Variants**: Màu sắc khác nhau cho từng loại card
- **Inset Highlights**: Inset shadow cho hiệu ứng 3D

#### **Typography System**

- **Title**: Uppercase, letter-spacing, semibold weight
- **Value**: Font-size 3xl, extrabold, numeric font family
- **Text Shadow**: Subtle shadow cho value
- **Better Hierarchy**: Phân cấp typography rõ ràng

#### **Trend Indicators**

- **Pill Design**: Border-radius full với background
- **Backdrop Filter**: Blur effect cho modern look
- **Color Variants**: Background gradient cho positive/negative
- **Hover Effects**: Icon scale khi hover
- **Better Spacing**: Gap và padding tối ưu

#### **Interactive Effects**

- **Card Hover**: Transform + scale + enhanced shadows
- **Icon Hover**: Scale + rotate với color-specific shadows
- **Trend Hover**: Icon scale animation
- **Smooth Transitions**: Tất cả animations đều mượt mà

---

## 🧪 Testing

```bash
# Chạy tất cả tests
npm test

# Chạy tests với coverage
npm run test:coverage

# Chạy E2E tests
npm run test:e2e

# Chạy Storybook
npm run storybook
```

---

## 📦 Build & Deploy

### Production Build

```bash
# Tạo production build
npm run build

# Serve build locally
npx serve -s build
```

### Deployment

Dự án có thể deploy lên:

- **Vercel** (recommended)
- **Netlify**
- **AWS S3 + CloudFront**
- **Heroku**

### PWA Support

Dự án đã được cấu hình PWA với:

- **Manifest**: `public/manifest.json`
- **Service Worker**: Tự động generate bởi Create React App
- **Offline support**: Có thể hoạt động offline
- **Install prompt**: Có thể cài đặt như app

---

## 🎮 Tính năng nâng cao

### Table Component

- **Responsive design**: Tự động adapt trên mobile/tablet
- **Sorting**: Sắp xếp dữ liệu theo cột
- **Pagination**: Phân trang với navigation
- **Custom rendering**: Render cell tùy chỉnh
- **Row actions**: Click, double-click events
- **Loading states**: Loading và empty states
- **Vietnamese localization**: Định dạng ngày giờ Việt Nam
- **Scroll functionality**: Cuộn dọc/ngang với custom scrollbar
- **Scroll indicators**: Visual cues cho khả năng cuộn
- **Scroll buttons**: Nút cuộn trái/phải cho UX tốt hơn
- **Compact design**: Kích thước nội dung nhỏ gọn, cân đối
- **Dropdown actions**: Menu 3 chấm tiết kiệm không gian
- **Currency format**: Định dạng tiền tệ sau số (29.990.000 ₫)

### Dropdown Component

- **Menu actions**: Dropdown 3 chấm cho các thao tác
- **Icon support**: Hiển thị icon cho mỗi action
- **Danger actions**: Highlight actions nguy hiểm (xóa)
- **Active state**: Highlight action đang được chọn
- **Placement options**: 4 vị trí dropdown (top/bottom, left/right)
- **Click outside**: Tự động đóng khi click bên ngoài
- **Keyboard navigation**: Hỗ trợ phím tắt
- **Responsive**: Hoạt động tốt trên mobile
- **Rich actions**: Báo kiện, In soạn hàng, In phiếu, Xuất phiếu, Sửa, Xóa

### Badge Component

- **Pill design**: Badge dạng viên thuốc cho trạng thái
- **Color variants**: Success, warning, error, info, primary
- **Size options**: Small, medium, large
- **Status display**: Hiển thị trạng thái và số liệu

### Transfer Voucher Page

- **Complete data table**: Bảng dữ liệu đầy đủ với 10+ cột
- **Voucher codes**: Mã phiếu CK với hiển thị ID
- **Warehouse info**: Thông tin kho nguồn và kho đích
- **Status tracking**: Trạng thái chuyển kho và vận chuyển
- **Action menu**: 6 thao tác mỗi hàng (báo kiện, in, xuất, sửa, xóa)
- **Pagination**: 10 items mỗi trang, tổng 34 items
- **Page size selector**: Tùy chỉnh số dòng hiển thị (10, 20, 50, 100)
- **Scroll functionality**: Cuộn trái/phải với nút điều khiển
- **Enhanced typography**: Font family, weight, size, line-height chuẩn
- **Extended font sizes**: 12 font sizes từ xxxxs (8px) đến 4xl (30px)
- **Ultra compact design**: Font size rất nhỏ cho table và components
- **Single line layout**: Thời gian và warehouse info chỉ 1-2 dòng
- **Text overflow**: Ellipsis cho text dài
- **Checkbox selection**: Tick checkbox cho tất cả các hàng
- **Select all functionality**: Chọn/bỏ chọn tất cả với checkbox header
- **Status colors**: Màu sắc đa dạng cho trạng thái và TT vận chuyển
- **Date & time formatting**: Định dạng ngày tháng và thời gian kiểu Việt Nam
- **StatCard component**: 4 loại card thống kê với màu sắc khác nhau
- **Button sizes**: 5 kích thước từ xs (24px) đến xl (56px)
- **Action buttons**: Export, In soạn hàng, In phiếu, Import, Tạo phiếu
- **Responsive design**: Giao diện thân thiện mobile
- **Consistent styling**: Đồng nhất với design system

### Date & Time Formatting

- **Vietnamese locale**: Định dạng dd/MM/yyyy và 24h
- **Relative time**: "2 ngày trước", "Vừa xong"
- **Timezone support**: Asia/Ho_Chi_Minh
- **Multiple formats**: Short, medium, long, full
- **Today/Yesterday detection**: Highlight ngày hôm nay/hôm qua
- **Date utilities**: `formatDate()`, `formatTime()`, `getRelativeTime()`
- **Smart detection**: `isToday()`, `isYesterday()` functions
- **Table display**: Smart date/time display với "Hôm nay", "Hôm qua"

### StatCard Component (Enhanced)

Component hiển thị thống kê với 4 loại card khác nhau được cải thiện:

- **Chờ báo kiện**: Card cam với icon "more"
  - Hiển thị số lượng phiếu chờ báo kiện
  - Chi tiết: Có vali/Không vali, SP có vali/SP không vali
  - **Enhanced**: Gradient background, interactive hover effects
- **Chờ chuyển giao**: Card xanh lá với icon "clock"
  - Hiển thị số lượng phiếu chờ chuyển giao
  - Chi tiết: Điểm giao, Kiện, Khối (m³)
  - **Enhanced**: Color-coded shadows, smooth animations
- **Đang chuyển giao**: Card xanh dương với icon "truck"
  - Hiển thị số lượng phiếu đang chuyển giao
  - **Enhanced**: 3D effects, backdrop filters
- **Đã chuyển giao**: Card tím với icon "check"
  - Hiển thị số lượng phiếu đã chuyển giao
  - **Enhanced**: Professional typography, visual hierarchy

**Enhanced Features:**

- **Gradient Backgrounds**: Background gradient với độ trong suốt
- **Enhanced Shadows**: Multiple box-shadows tạo depth
- **Interactive Icons**: Scale + rotate animations khi hover
- **Color-coded Variants**: Màu sắc và shadows tương ứng
- **Professional Typography**: Numeric font family cho values
- **Smooth Transitions**: Cubic-bezier easing cho animations
- **3D Effects**: Inset highlights và overlay effects
- **Responsive Grid**: Auto-fit layout với minmax(250px, 1fr)
- **Statistics Calculation**: Tự động tính toán từ mock data

### Button Component Sizes

Button component hỗ trợ 5 kích thước khác nhau:

- **XS (Extra Small)**: 24px height, font-size-xxs (10px)
  - Padding: 4px 8px, gap: 4px
  - Icon: 12x12px, Spinner: 12x12px
  - Phù hợp cho: Icon buttons, compact UI

- **SM (Small)**: 32px height, font-size-sm (12px)
  - Padding: 8px 12px, gap: 4px
  - Icon: 14x14px, Spinner: 14x14px
  - Phù hợp cho: Action buttons, form controls

- **MD (Medium)**: 40px height, font-size-base (13px)
  - Padding: 12px 16px, gap: 8px
  - Icon: 16x16px, Spinner: 16x16px
  - Phù hợp cho: Standard buttons (default)

- **LG (Large)**: 48px height, font-size-lg (16px)
  - Padding: 16px 24px, gap: 8px
  - Icon: 18x18px, Spinner: 18x18px
  - Phù hợp cho: Primary actions, CTA buttons

- **XL (Extra Large)**: 56px height, font-size-xl (18px)
  - Padding: 20px 32px, gap: 12px
  - Icon: 20x20px, Spinner: 20x20px
  - Phù hợp cho: Hero buttons, prominent actions

**Auth Form Buttons (Optimized):**

- **Submit Button**: 42px height, font-size-sm (14px)
  - Border radius: 6px, Box shadow: 0 2px 8px
  - Mobile: 38px height, font-size-xs (12px)
  - Tối ưu cho form đăng nhập/đăng ký

**Features:**

- **Responsive icons**: Icon size tự động theo button size
- **Consistent spacing**: Gap và padding theo 8-point grid
- **Loading states**: Spinner size tương ứng với button size
- **All variants**: Primary, secondary, outline, danger
- **Demo page**: `/button-demo` để xem tất cả sizes
- **Optimized for forms**: Kích thước tối ưu cho auth forms

### Action Buttons

VoucherCKPage có 5 action buttons trong header:

- **Export**: Export data ra file Excel
  - Icon: download, Variant: outline, Size: sm
  - Chức năng: Xuất dữ liệu bảng ra file Excel

- **In soạn hàng**: In danh sách soạn hàng
  - Icon: printer, Variant: outline, Size: sm
  - Chức năng: In danh sách sản phẩm cần soạn hàng

- **In phiếu**: In phiếu chuyển kho
  - Icon: printer, Variant: outline, Size: sm
  - Chức năng: In phiếu chuyển kho chi tiết

- **Import**: Import dữ liệu từ file
  - Icon: import, Variant: outline, Size: sm
  - Chức năng: Import dữ liệu từ file Excel/CSV

- **Tạo phiếu chuyển kho**: Tạo phiếu mới
  - Icon: add, Variant: primary, Size: sm
  - Chức năng: Tạo phiếu chuyển kho mới

**Features:**

- **Responsive layout**: Flex-wrap cho mobile
- **Consistent styling**: Tất cả buttons size sm
- **Icon support**: Mỗi button có icon phù hợp
- **Primary action**: "Tạo phiếu" là primary button
- **Mobile friendly**: Responsive design cho mobile

### Navigation Structure

- **Tổng quan**: Dashboard chính
- **Đơn hàng**: Quản lý đơn hàng, nhập, trả hàng, vận đơn
- **Sản phẩm**: Danh sách, tồn kho, nhập hàng, chuyển kho, nhà cung cấp
- **Khách hàng**: Quản lý thông tin khách hàng
- **Phiếu hệ thống**:
  - **Phiếu PO**: Purchase Order (Đơn đặt hàng)
  - **Phiếu CK**: Chuyển kho (với bảng dữ liệu đầy đủ)
  - **Phiếu SO**: Sales Order (Đơn bán hàng)
  - **Phiếu BH**: Bảo hành
- **Báo cáo**: Thống kê và báo cáo
- **Số quỹ**: Quản lý tài chính
- **Cấu hình**: Cài đặt hệ thống

### Keyboard Shortcuts

- **Ctrl + B**: Toggle sidebar
- **Esc**: Đóng modal/dropdown
- **Enter**: Submit form

### Persistent State

- **Sidebar state**: Lưu trạng thái mở/đóng
- **User preferences**: Lưu cài đặt người dùng
- **Theme settings**: Lưu theme preferences

### Enhanced Sidebar System

Hệ thống sidebar được cải thiện với giao diện trực quan và tương tác:

#### **Visual States Enhancement**

- **Active State**: Gradient background, enhanced border, glow effects
- **Hover State**: Smooth animations, transform effects, color transitions
- **Expanded State**: Visual feedback với arrow animations
- **Submenu Active**: Refined design với left border và glow effects

#### **Interactive Features**

- **Smooth Transitions**: Cubic-bezier easing cho tất cả animations
- **Transform Effects**: translateX, scale, rotate animations
- **Color-coded Borders**: Left border với gradient và glow effects
- **Icon Animations**: Scale và rotate effects khi hover/active
- **Enhanced Shadows**: Multiple shadows với màu theme

#### **Layout System**

- **Dynamic CSS Variables**: `--sidebar-current-width` cho responsive layout
- **Persistent State**: Lưu trạng thái qua localStorage
- **Collapsed Mode**: 80px width với tooltip support
- **Responsive Design**: Tối ưu cho desktop, tablet, mobile

#### **Technical Implementation**

- `MainLayout.tsx` thiết lập inline style: `--sidebar-current-width: var(--sidebar-width)` khi mở hoặc `80px` khi thu gọn
- `Header` và phần `.main` dùng biến này thay vì class modifier để tính `left` và `margin-left`
- Giảm layout shift, transition mượt và dễ bảo trì
- Trạng thái vẫn lưu qua `localStorage` key: `sidebar-open`
- Collapsed width mặc định: `80px` (cập nhật tại hằng `COLLAPSED_WIDTH`)

#### **Enhanced Styling**

- **Gradient Backgrounds**: Background gradient cho active/hover states
- **Enhanced Borders**: 4px left border với gradient và glow
- **Box Shadows**: Multiple shadows với màu theme
- **Typography**: Font weights và colors tối ưu
- **Spacing**: Consistent spacing với design system

### Animations & Transitions

- **Smooth sidebar**: Animation mượt mà
- **Page transitions**: Chuyển trang mượt
- **Loading states**: Loading animations
- **Hover effects**: Interactive feedback

---

## 🤝 Đóng góp

1. Fork repository
2. Tạo feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Tạo Pull Request

### Code Style

- Sử dụng TypeScript strict mode
- Follow ESLint rules
- Format code với Prettier
- Viết tests cho components mới
- Update documentation
- Sử dụng conventional commits

### Commit Convention

```bash
feat: Thêm tính năng mới
fix: Sửa lỗi
docs: Cập nhật documentation
style: Format code
refactor: Refactor code
test: Thêm tests
chore: Cập nhật dependencies
```

---

## 📄 License

Dự án này được phát hành dưới [MIT License](LICENSE).

---

## 👥 Team

- **Frontend Developer**: [Tên developer]
- **UI/UX Designer**: [Tên designer]
- **Backend Developer**: [Tên developer]

---

## 📞 Liên hệ

- **Email**: <contact@mia.vn>
- **Website**: <https://mia.vn>
- **GitHub**: [Repository URL]

---

## 🚀 Roadmap

### Version 1.0.0 (Completed) ✅

- [x] **Modern Authentication UI**: 2-column layout với theme cam chuyên nghiệp
- [x] **Consistent Form Design**: Layout nhất quán trên tất cả trang auth
- [x] **Professional Typography**: Hệ thống typography với Inter font
- [x] **Responsive Design**: Tối ưu cho mọi thiết bị
- [x] **Server Status Indicator**: Hiển thị trạng thái kết nối real-time
- [x] **Form Validation**: Validation với thông báo lỗi trực quan
- [x] **Account Security**: Bảo vệ chống brute force attack
- [x] **Optimized Button Sizes**: Kích thước button tối ưu cho forms
- [x] **Enhanced UX**: Footer positioning và spacing tối ưu
- [x] **Enhanced Sidebar**: Visual states và interactive effects
- [x] **Dashboard Cards**: Gradient backgrounds và smooth animations
- [x] **Extended Theme**: Table-specific tokens và typography system
- [x] **Interactive Navigation**: Hover effects và active states

### Version 1.1.0 (Coming Soon)

- [ ] Real-time notifications
- [ ] Advanced reporting
- [ ] Multi-language support
- [ ] Dark mode theme
- [ ] Enhanced dashboard analytics

### Version 1.2.0 (Future)

- [ ] Mobile app (React Native)
- [ ] API integration
- [ ] Advanced analytics
- [ ] Third-party integrations
- [ ] Advanced security features

---

---

**Được xây dựng với ❤️ bởi team MIA.vn**
© 2024 MIA.vn. All rights reserved.
