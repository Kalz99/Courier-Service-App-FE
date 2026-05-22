import React from 'react';

export interface LayoutProps {
  children?: React.ReactNode;
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
  name?: string;
}
