# 🎨 ShipSync — Frontend Client

<p align="center">
  <img src="https://img.shields.io/badge/React-19.x-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React version" />
  <img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript version" />
  <img src="https://img.shields.io/badge/Vite-5.x-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite version" />
  <img src="https://img.shields.io/badge/TailwindCSS-4.x-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind version" />
  <img src="https://img.shields.io/badge/React_Query-5.x-FF4154?style=for-the-badge&logo=reactquery&logoColor=white" alt="React Query version" />
  <img src="https://img.shields.io/badge/Axios-1.x-5A29E4?style=for-the-badge&logo=axios&logoColor=white" alt="Axios version" />
</p>

<p align="center">
  <strong>A modern courier management frontend application for customers and administrators.</strong><br />
  Built using React, TypeScript, Vite, Tailwind CSS, and React Query with a scalable frontend architecture and responsive user experience.
</p>

---

# 📖 Table of Contents

* [Core Features](#-core-features)
* [Technology Stack](#-technology-stack)
* [Project Structure](#-project-structure)
* [Frontend Architecture](#-frontend-architecture)
* [Pages & Features](#-pages--features)
* [State Management](#-state-management)
* [API Communication](#-api-communication)
* [Setup Guide](#-setup-guide)
* [Environment Variables](#-environment-variables)
* [Performance Optimizations](#-performance-optimizations)
* [Design Notes](#-design-notes)

---

# 🚀 Core Features

* 🔐 JWT Authentication with protected routes
* 👥 Role-based dashboards for `customer` and `admin`
* 📦 Shipment creation and shipment management
* 🔍 Shipment tracking modal with live tracking history
* 📈 Dashboard analytics and shipment statistics
* 🌙 Light and dark theme support
* 🔔 Global toast notification system
* ⚡ React Query caching and optimized API requests
* 📱 Fully responsive modern UI

---

# 🛠️ Technology Stack

| Layer             | Technology          |
| :---------------- | :------------------ |
| Frontend Library  | React 19            |
| Language          | TypeScript          |
| Build Tool        | Vite                |
| Styling           | Tailwind CSS        |
| Routing           | React Router DOM    |
| API Client        | Axios               |
| State Management  | Context API         |
| Server State      | TanStack React Query|
| Icons             | Lucide React        |

---

# 📁 Project Structure

```txt
frontend/
├── src/
│   ├── assets/
│   │
│   ├── components/
│   │   ├── charts/
│   │   ├── layout/
│   │   ├── modals/
│   │   ├── tables/
│   │   └── ui/
│   │
│   ├── context/
│   │   ├── AuthContext.tsx
│   │   └── ToastContext.tsx
│   │
│   ├── hooks/
│   │   ├── useAdminShipments.ts
│   │   ├── useCustomerShipments.ts
│   │   ├── useTrackingDetails.ts
│   │   ├── useStatusCounts.ts
│   │   ├── useTopCustomers.ts
│   │   └── useTheme.ts
│   │
│   ├── pages/
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   ├── Dashboard.tsx
│   │   ├── CustomerDashboard.tsx
│   │   ├── AdminDashboard.tsx
│   │   ├── CustomerShipments.tsx
│   │   ├── AdminShipments.tsx
│   │   ├── AddShipment.tsx
│   │   ├── Customers.tsx
│   │   └── Settings.tsx
│   │
│   ├── routes/
│   │   └── routes.tsx
│   │
│   ├── services/
│   │   ├── apiClient.ts
│   │   ├── auth.service.ts
│   │   ├── shipment.service.ts
│   │   └── admin.service.ts
│   │
│   ├── types/
│   ├── utils/
│   │
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
│
├── package.json
├── vite.config.ts
└── tsconfig.json
```

---

# 🏛️ Frontend Architecture

The frontend follows a modular and reusable architecture structure:

* Pages → Main route-level screens
* Components → Reusable UI components
* Hooks → API logic and state handling
* Services → Axios API communication layer
* Context → Global application state
* Routes → Protected route management

---

# 📄 Pages & Features

## 🔑 Authentication Pages

| Page | Description |
| :--- | :--- |
| `/login` | User login page |
| `/register` | New user registration |

---

## 👤 Customer Pages

| Page | Description |
| :--- | :--- |
| `/dashboard` | Customer dashboard overview |
| `/my-shipments` | View personal shipments |
| `/add-shipment` | Create a new shipment |

---

## 🛡️ Admin Pages

| Page | Description |
| :--- | :--- |
| `/shipments` | View all shipments |
| `/customers` | View customer analytics |
| `/dashboard` | Admin analytics dashboard |

---

## ⚙️ Shared Pages

| Page | Description |
| :--- | :--- |
| `/settings` | Application settings page |

---

# 🧠 State Management

## Context API

The application uses Context API for:

* Authentication state
* Theme management
* Toast notifications
* User session handling

---

## React Query

React Query is used for:

* Shipment data fetching
* API response caching
* Background data refetching
* Optimized API requests
* Loading and error state management

---

# 🔌 API Communication

Axios is used as the centralized API client.

## Features

* Automatic JWT authorization headers
* Refresh token support
* API interceptors
* Centralized error handling
* Typed API responses

---

## Example API Request

```ts
const response = await apiClient.get("/shipments");
```

---

# ⚙️ Setup Guide

## Prerequisites

* Node.js v18+
* npm
* Running backend server

---

## 1. Clone Repository

```bash
git clone https://github.com/your-username/courier-service-app.git
cd courier-service-app/frontend
```

---

## 2. Install Dependencies

```bash
npm install
```

---

## 3. Configure Environment Variables

Create `.env` file inside frontend folder:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

---

## 4. Start Development Server

```bash
npm run dev
```

Frontend application runs on:

```txt
http://localhost:5173
```

---

# 📊 Environment Variables

| Variable              | Description              |
| :-------------------- | :----------------------- |
| VITE_API_BASE_URL     | Backend API base URL     |

---

# ⚡ Performance Optimizations

## React Query Caching

Shipment tracking requests are cached for 5 minutes to:

* Reduce duplicate API requests
* Improve modal loading speed
* Improve frontend performance

---

## Memoization

The application uses:

* `React.memo`
* `useMemo`
* `useCallback`

To reduce unnecessary component re-renders.

---

## Lazy Loading

Pages are lazy loaded to:

* Reduce bundle size
* Improve initial page load performance

---

# 🎨 Design Notes

## Responsive Design

The application is fully responsive and optimized for:

* Desktop devices
* Tablets
* Mobile devices

---

## Theme System

The UI supports:

* Light mode
* Dark mode
* Theme persistence using LocalStorage

---

## Reusable UI Components

Reusable components include:

* Tables
* Buttons
* Inputs
* Cards
* Modals
* Toasts
* Dropdowns
* Skeleton loaders

---

# 👨‍💻 Development Notes

This frontend application was built focusing on:

* Clean frontend architecture
* Type safety with TypeScript
* Reusable component patterns
* Optimized API handling
* Responsive UI design
* Scalable project structure
* Modern React best practices