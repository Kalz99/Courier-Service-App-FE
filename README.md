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
* [Dependencies & Packages](#-dependencies--packages)
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

# 📦 Dependencies & Packages

Here is a breakdown of all frontend dependencies configured in [`package.json`](file:///d:/Github/Courier-Service-App/frontend/package.json):

### Core Dependencies

* **`react`** (`^19.2.6`) & **`react-dom`** (`^19.2.6`): Core libraries for rendering the reactive component hierarchy to the DOM.
* **`react-router-dom`** (`^7.15.1`): Declarative client-side routing library supporting nested routes and layout structures.
* **`@tanstack/react-query`** (`^5.100.13`): Client state management library for managing server queries, mutation states, background caching, and automatic invalidation.
* **`axios`** (`^1.16.1`): Promise-based HTTP client for executing asynchronous requests to the backend REST API.
* **`tailwindcss`** (`^4.3.0`) & **`@tailwindcss/vite`** (`^4.3.0`): Utility-first CSS styling system with direct Vite integration.
* **`lucide-react`** (`^1.16.0`): Icon library containing high-quality SVG icons for dashboards and navigations.

### Development Dependencies

* **`vite`** (`^8.0.12`): High-performance build tool and dev server featuring fast Hot Module Replacement (HMR).
* **`@vitejs/plugin-react`** (`^6.0.1`): Official Vite plugin supporting React features and Fast Refresh.
* **`typescript`** (`~6.0.2`): Static typing and compilation for TypeScript source code.
* **`eslint`** (`^10.3.0`), **`@eslint/js`** (`^10.0.1`), **`eslint-plugin-react-hooks`** (`^7.1.1`), & **`eslint-plugin-react-refresh`** (`^0.5.2`): Coding standard rules, custom hooks patterns validation, and Hot Reload enforcement.
* **`typescript-eslint`** (`^8.59.2`): Integrates TypeScript compiler type-checking with the ESLint code analysis pipeline.
* **`globals`** (`^17.6.0`): Configures environment globals (like `window`, `document`) for ESLint.
* **Type definitions** (`@types/*`): Provides TypeScript support for third-party libraries (`@types/react`, `@types/react-dom`, `@types/node`).

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
cd Courier-Service-App-FE
```

---

## 2. Install Dependencies

The frontend project utilizes several key modules for UI rendering, routing, state management, and styling. You can install all dependencies automatically or step-by-step.

### Option A: Standard Installation (Recommended)

Run the following command from the `frontend` root directory to install all dependencies specified in `package.json`:

```bash
npm install
```

### Option B: Individual Installations

If you prefer to install the packages manually or need to set up the environment from scratch:

#### 1. Core Production Dependencies
```bash
npm install react react-dom react-router-dom @tanstack/react-query axios tailwindcss @tailwindcss/vite lucide-react
```

#### 2. Development & Type Definitions
```bash
npm install -D vite @vitejs/plugin-react typescript eslint @eslint/js eslint-plugin-react-hooks eslint-plugin-react-refresh typescript-eslint globals @types/react @types/react-dom @types/node
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