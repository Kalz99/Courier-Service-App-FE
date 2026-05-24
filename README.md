# 🎨 ShipSync - Frontend

<p align="center">
  <img src="https://img.shields.io/badge/React-19.x-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React version" />
  <img src="https://img.shields.io/badge/TypeScript-6.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript version" />
  <img src="https://img.shields.io/badge/Vite-8.x-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite version" />
  <img src="https://img.shields.io/badge/TailwindCSS-4.x-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind version" />
  <img src="https://img.shields.io/badge/TanStack_Query-5.x-FF4154?style=for-the-badge&logo=reactquery&logoColor=white" alt="React Query version" />
  <img src="https://img.shields.io/badge/Axios-1.x-5A29E4?style=for-the-badge&logo=axios&logoColor=white" alt="Axios version" />
</p>

<p align="center">
  <strong>A modern and responsive frontend dashboard for the ShipSync courier management platform.</strong><br />
  Built with React, TypeScript, Vite and Tailwind CSS using a scalable component architecture, reusable hooks, secure route protection and real-time shipment tracking interfaces.
</p>

---

# 📖 Table of Contents

* [Core Features](#-core-features)
* [Technology Stack](#-technology-stack)
* [Project Structure](#-project-structure)
* [Pages & Routing](#-pages--routing)
* [Component Architecture](#-component-architecture)
* [State Management](#-state-management)
* [Theme & Styling System](#-theme--styling-system)
* [Setup Guide](#-setup-guide)
* [Environment Variables](#-environment-variables)
* [Architecture Notes](#-architecture-notes)

---

# 🚀 Core Features

* 🔐 Protected authentication routes with role-based access
* 👥 Separate dashboards for `admin` and `customer`
* 📦 Shipment management and shipment tracking UI
* 📈 Interactive analytics dashboard with charts and status cards
* 🔎 Public shipment tracking page
* 🔔 Global toast notification system using React Context
* 🌓 Dark / Light mode theme synchronization
* ⚡ Optimized client-side filtering, searching, and pagination
* 📱 Fully responsive modern dashboard layout
* 🎨 Reusable component-driven UI architecture

---

# 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| Frontend Framework | React 19 |
| Build Tool | Vite 8 |
| Language | TypeScript |
| Styling | Tailwind CSS 4 |
| Routing | React Router DOM 7 |
| Server State | TanStack React Query 5 |
| HTTP Client | Axios |
| Icons | Lucide React |
| Charts | Recharts |

---

# 📁 Project Structure

```txt
frontend/
├── public/
│
├── src/
│   ├── assets/
│   │   ├── logo.png
│   │   └── image.webp
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Layout.tsx
│   │   │   ├── SideBar.tsx
│   │   │   └── ProtectedRoute.tsx
│   │   │
│   │   └── ui/
│   │       ├── ShipmentsTable/
│   │       │   └── ShipmentsTable.tsx
│   │       │
│   │       ├── CustomersTable/
│   │       │   ├── CustomersTable.tsx
│   │       │   ├── CustomerRow.tsx
│   │       │   ├── CustomerSkeleton.tsx
│   │       │   ├── CustomerEmptyState.tsx
│   │       │   └── index.ts
│   │       │
│   │       ├── CustomerShipmentsTable/
│   │       │   ├── CustomerShipmentsTable.tsx
│   │       │   ├── EmptyState.tsx
│   │       │   ├── ShipmentRow.tsx
│   │       │   ├── TablePagination.tsx
│   │       │   ├── TableSkeleton.tsx
│   │       │   ├── TableToolbar.tsx
│   │       │   ├── helpers.tsx
│   │       │   └── index.ts
│   │       │
│   │       ├── RecentShipmentsWidget/
│   │       │   ├── HorizontalTimeline.tsx
│   │       │   ├── RecentShipmentsWidget.tsx
│   │       │   ├── ShipmentActivityCard.tsx
│   │       │   └── index.ts
│   │       │
│   │       ├── AdminShipmentsTable.tsx
│   │       ├── ParcelChart.tsx
│   │       ├── TopCustomersWidget.tsx
│   │       ├── TrackingDetailsModal.tsx
│   │       ├── DropDown.tsx
│   │       ├── StatCard.tsx
│   │       ├── Button.tsx
│   │       ├── InputField.tsx
│   │       ├── RadioButton.tsx
│   │       └── index.ts
│   │
│   ├── context/
│   │   ├── AuthContext.tsx
│   │   └── ToastContext.tsx
│   │
│   ├── hooks/
│   │   ├── useAddShipmentForm.ts
│   │   ├── useAdminCustomers.ts
│   │   ├── useAdminShipments.ts
│   │   ├── useCustomerShipments.ts
│   │   ├── useLoginForm.ts
│   │   ├── useParcelChart.ts
│   │   ├── useRecentShipments.ts
│   │   ├── useRegisterForm.ts
│   │   ├── useStatusCounts.ts
│   │   ├── useTheme.ts
│   │   ├── useTopCustomers.ts
│   │   └── useTrackingDetails.ts
│   │
│   ├── pages/
│   │   ├── Dashboard.tsx
│   │   ├── AdminDashboard.tsx
│   │   ├── CustomerDashboard.tsx
│   │   ├── AdminShipment.tsx
│   │   ├── CustomerShipments.tsx
│   │   ├── AddShipment.tsx
│   │   ├── CustomersPage.tsx
│   │   ├── TrackingPage.tsx
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   └── Settings.tsx
│   │
│   ├── services/
│   │   ├── apiClient.ts
│   │   ├── shipment.service.ts
│   │   ├── adminService.ts
│   │   ├── login.service.ts
│   │   ├── register.service.ts
│   │   └── newshipment.service.ts
│   │
│   ├── types/
│   │   ├── customershipment.types.ts
│   │   ├── layout.types.ts
│   │   ├── login.types.ts
│   │   ├── register.types.ts
│   │   ├── shipment.types.ts
│   │   ├── sidebar.types.ts
│   │   └── tracking.types.ts
│   │
│   ├── App.tsx
│   ├── routes.tsx
│   ├── main.tsx
│   └── index.css
│
├── vite.config.ts
├── tsconfig.json
└── package.json
```

---

# 🚦 Pages & Routing

| Route | Access | Description |
| :--- | :--- | :--- |
| `/login` | Public | User login page |
| `/register` | Public | User registration page |
| `/tracking` | Public | Public shipment tracking page |
| `/dashboard` | Authenticated | Role-based dashboard switch |
| `/shipments` | Admin | Shipment management page |
| `/customershipments` | Customer | Customer shipment history page |
| `/add-shipment` | Customer | Shipment creation page |
| `/customers` | Admin | Customer management page |
| `/settings` | Authenticated | Settings page |

---

# 🧩 Component Architecture

The frontend follows a reusable and scalable component architecture:

```txt
Pages
   │
   ▼
Custom Hooks
   │
   ▼
Reusable UI Components
```

### Architecture Layers

| Layer | Responsibility |
| :--- | :--- |
| Pages | Main route screens and layouts |
| Hooks | Business logic and API handling |
| Components | Reusable UI rendering |
| Services | Axios API requests |
| Context | Global authentication and toast state |

---

# 💾 State Management

| State Type | Solution |
| :--- | :--- |
| Authentication | React Context |
| Notifications | Toast Context |
| API Data | React Query |
| Form Inputs | useState |
| Theme Mode | localStorage + CSS Classes |
| Tables & Filters | Custom React Hooks |

---

# 🎨 Theme & Styling System

The application uses Tailwind CSS 4 with custom CSS variables for theme management.

## Theme Features

* Dark / Light mode switching
* CSS variable based theme tokens
* Responsive glassmorphism design
* Custom reusable utility components
* Full height responsive layout system

---

## Example Theme Tokens

```css
:root {
  --sidebar-bg: #ffffff;
  --sidebar-border: #f0edf9;
  --color-text-primary: #1e1b29;
  --app-bg: #f8f7fd;
}

:root.dark {
  --sidebar-bg: #0f0d16;
  --sidebar-border: #201b33;
  --color-text-primary: #e6e5ec;
  --app-bg: #07060a;
}
```

---

# ⚙️ Setup Guide

## Prerequisites

* Node.js v18+
* npm
* Running backend API server

---

## 1. Clone Repository

```bash
git clone https://github.com/Kalz99/Courier-Service-App-FE.git
```

---

## 2. Install Dependencies

```bash
npm install
```

---

## 3. Configure Environment Variables

Create `.env` file:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

---

## 4. Start Development Server

```bash
npm run dev
```

Frontend runs on:

```txt
http://localhost:5173
```

---

## 5. Build Production Version

```bash
npm run build
```

Production build files will be generated inside:

```txt
/dist
```

---

# 📊 Environment Variables

| Variable | Description |
| :--- | :--- |
| VITE_API_BASE_URL | Backend REST API base URL |

---

# 🏛️ Architecture Notes

## Route Protection

Protected routes use role-based guards through `ProtectedRoute.tsx`.

Roles supported:

* `admin`
* `customer`

---

## API Layer

Axios services are separated into dedicated modules:

* Authentication services
* Shipment services
* Admin services
* Registration services

This keeps API logic isolated from UI components.

---

## React Query Strategy

TanStack React Query is used for:

* API caching
* Background synchronization
* Automatic refetching
* Request deduplication
* Loading and error states

---

## Theme Persistence

Theme selection is stored inside `localStorage` and synchronized globally using CSS class toggling.

---

## UI Architecture

The project heavily follows:

* Reusable components
* Separation of concerns
* Hook-based logic separation
* Barrel exports
* Modular folder structure

---

# 👨‍💻 Development Notes

This frontend project was developed with focus on:

* Scalable frontend architecture
* Reusable UI systems
* Clean TypeScript practices
* Responsive dashboard design
* Modern React patterns
* Maintainable folder structure
* Performance optimization
* Better user experience