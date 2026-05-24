import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import SideBar from './SideBar';
import type { LayoutProps } from '../../types/layout.types';
import useTheme from '../../hooks/useTheme';
import { useAuth } from '../../context/AuthContext';
import { LogoutConfirmationModal } from '../ui/LogoutConfirmationModal';

const SunIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
    <path d="m4.93 4.93 1.41 1.41" />
    <path d="m17.66 17.66 1.41 1.41" />
    <path d="M2 12h2" />
    <path d="M20 12h2" />
    <path d="m6.34 17.66-1.41 1.41" />
    <path d="m19.07 4.93-1.41 1.41" />
  </svg>
);

const MoonIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
  </svg>
);

export const Layout: React.FC<LayoutProps> = ({ 
  children,
  name,
}) => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const sidebarUser = user
    ? {
        name: user.name,
        role: user.role === 'admin' ? 'Administrator' : 'Customer',
      }
    : undefined;

  const handleAddShipment = () => {
    navigate('/add-shipment');
  };

  const handleLogout = () => {
    setIsLogoutModalOpen(true);
  };

  const handleConfirmLogout = () => {
    setIsLogoutModalOpen(false);
    logout();
  };

  return (
    <div className="flex flex-row min-h-screen w-full bg-[var(--app-bg)] text-[#1e1b29] dark:text-[#e6e5ec] overflow-hidden transition-colors duration-250">
      {/* Sidebar Component */}
      <SideBar
        onAddShipment={handleAddShipment}
        onLogout={handleLogout}
        user={sidebarUser}
      />

      {/* Main Page Area */}
      <main className="grow h-screen py-4 pr-4 pl-4 overflow-y-auto flex flex-col">
        {/* Top Floating Action Card Bar */}
        <header className="flex flex-row items-center justify-between w-full py-4 px-6 md:px-8 mb-6 bg-[var(--sidebar-bg)] border border-[var(--sidebar-border)] rounded-[24px] shadow-[var(--sidebar-shadow)] transition-all duration-250 shrink-0">
          <span className="text-[17px] md:text-[19px] font-bold text-[var(--color-text-primary)] select-none">
            {name || 'Workspace'}
          </span>
          <button
            type="button"
            onClick={toggleTheme}
            className="w-8 h-8 flex items-center justify-center bg-[var(--sidebar-active-bg)] text-primary hover:bg-primary hover:text-white border-none rounded-full cursor-pointer shadow-[0_2px_10px_var(--color-primary-glow)] hover:scale-105 active:scale-95 transition-all duration-200 shrink-0"
            aria-label="Toggle light and dark theme"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? (
              <SunIcon className="w-4 h-4 text-primary fill-primary/10 stroke-[2.5]" />
            ) : (
              <MoonIcon className="w-4 h-4 text-primary fill-primary/10 hover:rotate-12 transition-transform duration-300" />
            )}
          </button>
        </header>

        <div className="flex-1 min-h-0 flex flex-col px-0">
          {children ? children : <Outlet />}
        </div>
      </main>

      {/* Premium Logout Confirmation Modal */}
      <LogoutConfirmationModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleConfirmLogout}
      />
    </div>
  );
};

export default Layout;
