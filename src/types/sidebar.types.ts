import React from 'react';

export interface NavItemConfig {
  id: string;
  label: string;
  badge?: string | number;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

export interface UserProfile {
  name: string;
  role: string;
  avatarUrl?: string;
}

export interface SideBarProps {
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
  onAddShipment?: () => void;
  onLogout?: () => void;
  user?: UserProfile;
}
