import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import AdminShipments from './pages/AdminShipment';
import Dashboard from './pages/Dashboard';
import AddShipment from './pages/AddShipment';
import CustomerShipments from './pages/CustomerShipments';
import Login from './pages/Login';
import { LayoutDashboard, Truck, Settings as SettingsIcon, Compass } from 'lucide-react';

export interface SidebarRouteConfig {
    path: string;
    label: string;
    icon: React.ComponentType<any>;
    badge?: number;
}

export const sidebarRoutes: SidebarRouteConfig[] = [
    {
        path: '/dashboard',
        label: 'Dashboard',
        icon: LayoutDashboard,
    },
    {
        path: '/shipments',
        label: 'Shipments',
        icon: Truck,
        badge: 2,
    },
    {
        path: '/customershipments',
        label: 'My Shipments',
        icon: Compass,
    },
    {
        path: '/settings',
        label: 'Settings',
        icon: SettingsIcon,
    },
];


// Settings Page (Modular subview)
const SettingsPage: React.FC = () => {
    return (
        <div className="flex flex-col gap-8 w-full animate-fade-in">
            <div className="flex flex-col items-center justify-center text-center bg-[var(--sidebar-bg)] border border-[var(--sidebar-border)] rounded-3xl p-10 md:p-14 shadow-[var(--sidebar-shadow)] max-w-[600px] m-auto mt-6 box-border transition-colors duration-250">
                <span className="mb-5 inline-flex items-center justify-center w-24 h-24 bg-[var(--sidebar-active-bg)] rounded-full">
                    <SettingsIcon className="w-10 h-10 text-primary stroke-[2.2]" />
                </span>
                <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-2.5">System Configuration</h3>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed max-w-[400px] mb-7">
                    Manage your account settings, dark mode preferences, logistics API keys, and notification thresholds.
                </p>
                <button
                    type="button"
                    className="inline-flex items-center justify-center px-6 py-3 bg-primary hover:bg-primary-hover text-white border-none rounded-xl text-sm font-semibold cursor-pointer shadow-[0_4px_12px_var(--color-primary-glow)] hover:-translate-y-0.5 hover:shadow-[0_6px_16px_rgba(123,87,223,0.35)] active:translate-y-0 active:shadow-md transition-all duration-200"
                    onClick={() => alert('Settings Saved!')}
                >
                    Save Changes
                </button>
            </div>
        </div>
    );
};

// NotFound Page
const NotFoundPage: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center text-center grow bg-[var(--sidebar-bg)] border border-[var(--sidebar-border)] rounded-3xl p-8 md:p-12 shadow-[var(--sidebar-shadow)] max-w-[600px] m-auto transition-colors duration-250 animate-fade-in">
            <h2 className="text-2xl font-bold mb-3 text-[var(--color-text-primary)]">Page Not Found</h2>
            <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-6">
                The requested path does not exist in our workspace logs.
            </p>
            <button
                onClick={() => window.location.href = '/'}
                className="inline-flex items-center justify-center px-5 py-2.5 bg-primary text-white font-semibold rounded-xl transition-all cursor-pointer shadow-[0_2px_10px_var(--color-primary-glow)]"
            >
                Go back to Dashboard
            </button>
        </div>
    );
};

const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />

            <Route element={<Layout name="Dashboard" />}>
                <Route index element={<Dashboard />} />
                <Route path="dashboard" element={<Dashboard />} />
            </Route>

            <Route element={<Layout name="Shipments" />}>
                <Route path="shipments" element={<AdminShipments />} />
            </Route>

            <Route element={<Layout name="Settings" />}>
                <Route path="settings" element={<SettingsPage />} />
            </Route>

            <Route element={<Layout name="Create Shipment" />}>
                <Route path="add-shipment" element={<AddShipment />} />
            </Route>

            <Route element={<Layout name="Customer Shipments" />}>
                <Route path="customershipments" element={<CustomerShipments />} />
            </Route>

            <Route path="/404" element={<NotFoundPage />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
    );
};

export default AppRoutes;
