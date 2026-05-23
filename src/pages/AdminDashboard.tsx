import React from 'react';
import { StatCard, RecentShipmentsWidget } from '../components/ui';
import { LayoutDashboard, Truck, Package, Rocket } from 'lucide-react';

const ADMIN_STATS = [
  {
    id: 'total-revenue',
    label: 'Total Revenue',
    value: '$1.2M',
    icon: <LayoutDashboard className="w-5.5 h-5.5 text-primary stroke-[2.2]" />, // placeholder icon
    bg: 'bg-primary/5 dark:bg-primary/10',
  },
  {
    id: 'active-shippers',
    label: 'Active Shippers',
    value: '42',
    icon: <Truck className="w-5.5 h-5.5 text-primary stroke-[2.2]" />, 
    bg: 'bg-primary/10 dark:bg-primary/20',
  },
  {
    id: 'in-transit',
    label: 'In Transit',
    value: '2,500',
    icon: <Package className="w-5.5 h-5.5 text-primary stroke-[2.2]" />, 
    bg: 'bg-primary/15 dark:bg-primary/30',
  },
  {
    id: 'delivered',
    label: 'Delivered',
    value: '4,800',
    icon: <Rocket className="w-5.5 h-5.5 text-primary stroke-[2.2]" />, 
    bg: 'bg-primary/20 dark:bg-primary/40',
  },
];

export const AdminDashboard: React.FC = () => {
  return (
    <div className="flex flex-col gap-8 w-full animate-fade-in">
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full">
        {ADMIN_STATS.map((stat) => (
          <StatCard
            key={stat.id}
            label={stat.label}
            value={stat.value}
            icon={stat.icon}
            iconBgClass={stat.bg}
          />
        ))}
      </section>
      <RecentShipmentsWidget />
    </div>
  );
};

export default AdminDashboard;
