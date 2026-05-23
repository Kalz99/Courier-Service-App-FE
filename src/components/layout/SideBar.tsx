import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import type { UserProfile, SideBarProps } from '../../types/sidebar.types';
import { Button } from '../ui';
import { sidebarRoutes } from '../../routes';
import { LogOut } from 'lucide-react';
import logoImg from '../../assets/logo.png';

const DEFAULT_USER: UserProfile = {
  name: 'Darrell Steward',
  role: 'Manager',
};

// ==========================================
// SideBar React Component (Logic decoupled)
// ==========================================

export const SideBar: React.FC<SideBarProps> = ({
  onAddShipment,
  onLogout,
  user = DEFAULT_USER,
}) => {
  const location = useLocation();

  const isCustomer = user.role.toLowerCase() === 'customer';

  const filteredRoutes = sidebarRoutes.filter((route) => {
    if (isCustomer) {
      // Customers should only see Dashboard, My Shipments (/customershipments), and Settings
      return route.path !== '/shipments' && route.path !== '/customers';
    } else {
      // Admins should only see Dashboard, Shipments (/shipments), Customers, and Settings
      return route.path !== '/customershipments';
    }
  });

  return (
    <aside className="flex flex-col w-[80px] md:w-[230px] p-3 md:py-6 md:px-4 h-[calc(100vh-2rem)] my-4 ml-4 bg-[var(--sidebar-bg)] border border-[var(--sidebar-border)] rounded-[24px] select-none shadow-[var(--sidebar-shadow)] z-50 transition-all duration-250 shrink-0">

      {/* Top Logo Brand Section */}
      <div className="flex items-center gap-3 mb-8 pl-1.5 max-md:pl-0 max-md:justify-center max-md:mb-6 group">
        <div className="relative flex items-center justify-center">
          <img src={logoImg} alt="Wayels Logo" className="w-10 h-10 object-contain transition-transform duration-500 group-hover:scale-110" />
        </div>
        <div className="flex flex-col max-md:hidden">
          <span className="text-xl font-bold text-[var(--color-text-primary)] leading-none tracking-tight">ShipSync</span>
          <span className="text-[11px] font-semibold text-[var(--color-text-muted)] uppercase tracking-widest mt-0.5">Workspace</span>
        </div>
      </div>

      {/* Nav List Wrapper */}
      <nav className="grow mb-6">
        <ul className="flex flex-col gap-2 list-none p-0 m-0">
          {filteredRoutes.map((route) => {
            const Icon = route.icon;
            const isActive = location.pathname === route.path ||
              (route.path === '/dashboard' && (location.pathname === '/' || location.pathname === '/dashboard'));

            return (
              <li key={route.path} className="w-full">
                <Link
                  to={route.path}
                  className={`w-full flex items-center p-2.5 md:px-3 md:py-2.5 rounded-xl cursor-pointer select-none transition-all duration-200 relative group max-md:justify-center ${isActive
                    ? 'bg-[var(--sidebar-active-bg)] text-primary font-semibold'
                    : 'text-[var(--color-text-muted)] hover:bg-[var(--sidebar-active-bg)] hover:text-[var(--color-text-primary)]'
                    }`}
                  style={{ textDecoration: 'none' }}
                >
                  <span className={`flex items-center justify-center mr-3 max-md:mr-0 group-hover:translate-x-0.5 max-md:group-hover:translate-x-0 transition-transform duration-200`}>
                    <Icon
                      className={`w-5 h-5 transition-colors duration-200 stroke-2 ${isActive ? 'stroke-primary' : 'stroke-[var(--color-text-muted)] group-hover:stroke-[var(--color-text-primary)]'
                        }`}
                    />
                  </span>
                  <span className="text-[15px] font-medium text-left grow max-md:hidden">{route.label}</span>
                  {route.badge !== undefined && (
                    <span className="inline-flex items-center justify-center min-w-[18px] h-[18px] px-1.5 text-[11px] font-bold text-white bg-badge-bg rounded-full shadow-[0_2px_8px_var(--color-primary-glow)] ml-2 max-md:hidden animate-pulse">
                      {route.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute left-0 top-1/4 h-1/2 w-1 bg-primary rounded-r max-md:hidden" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Call to Action: Add a Shipment (Only for Customers!) */}
      {isCustomer && (
        <div className="p-1 mb-6">
          <Button onClick={onAddShipment}>Add a shipment</Button>
        </div>
      )}

      {/* Footer Profile Section */}
      <div className="border-t border-[var(--sidebar-border)] pt-6">
        <div className="flex items-center gap-2.5 p-1 rounded-2xl max-md:p-0 max-md:justify-center">
          <div className="relative shrink-0">
            {user.avatarUrl ? (
              <img src={user.avatarUrl} alt={user.name} className="w-11 h-11 rounded-xl object-cover border-2 border-[var(--sidebar-bg)] shadow-[0_2px_10px_rgba(0,0,0,0.05)]" />
            ) : (
              <div className="w-11 h-11 rounded-xl bg-[var(--color-avatar-bg)] text-primary flex items-center justify-center font-bold text-sm border-2 border-[var(--sidebar-bg)] shadow-[0_2px_10px_rgba(0,0,0,0.05)]">
                {user.name.split(' ').map(n => n[0]).join('')}
              </div>
            )}
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-status-online border-2 border-[var(--sidebar-bg)] rounded-full shadow-[0_0_0_2px_var(--color-primary-glow)]"></span>
          </div>
          <div className="flex flex-col grow min-w-0 max-md:hidden">
            <div className="text-sm font-semibold text-[var(--color-text-primary)] truncate" title={user.name}>{user.name}</div>
            <div className="text-[12px] font-normal text-[var(--color-text-muted)] truncate mt-0.5">{user.role}</div>
          </div>
          <button
            type="button"
            className="inline-flex items-center justify-center w-9 h-9 bg-transparent hover:bg-badge-bg/8 text-[var(--color-text-muted)] hover:text-badge-bg rounded-lg transition-all duration-200 hover:translate-x-0.5 shrink-0 max-md:hidden"
            onClick={onLogout}
            title="Log out"
            aria-label="Log out"
          >
            <LogOut className="w-[18px] h-[18px]" />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
