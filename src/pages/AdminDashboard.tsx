import React from 'react';
import { Inbox, Truck, Package, Rocket } from 'lucide-react';
import { StatCard, ParcelChart, TopCustomersWidget } from '../components/ui';
import { useAdminStatusCounts } from '../hooks/useStatusCounts';

const AdminDashboard: React.FC = () => {
  const { counts, isLoading } = useAdminStatusCounts();

  const stats = [
    {
      id: 'pending',
      label: 'Pending',
      value: isLoading ? '—' : counts.Pending,
      icon: <Inbox className="w-5.5 h-5.5 text-primary stroke-[2.2]" />,
      bg: 'bg-primary/5 dark:bg-primary/10',
    },
    {
      id: 'in-transit',
      label: 'In Transit',
      value: isLoading ? '—' : counts['In Transit'],
      icon: <Package className="w-5.5 h-5.5 text-primary stroke-[2.2]" />,
      bg: 'bg-primary/10 dark:bg-primary/20',
    },
    {
      id: 'out-for-delivery',
      label: 'Out for Delivery',
      value: isLoading ? '—' : counts['Out for Delivery'],
      icon: <Truck className="w-5.5 h-5.5 text-primary stroke-[2.2]" />,
      bg: 'bg-primary/15 dark:bg-primary/30',
    },
    {
      id: 'delivered',
      label: 'Delivered',
      value: isLoading ? '—' : counts.Delivered,
      icon: <Rocket className="w-5.5 h-5.5 text-primary stroke-[2.2]" />,
      bg: 'bg-primary/20 dark:bg-primary/40',
    },
  ];

  return (
    <div className="flex flex-col gap-6 w-full h-full">
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full">
        {stats.map((stat) => (
          <StatCard
            key={stat.id}
            label={stat.label}
            value={stat.value}
            icon={stat.icon}
            iconBgClass={stat.bg}
          />
        ))}
      </section>

      <section className="flex-1 min-h-0 grid grid-cols-1 xl:grid-cols-3 gap-6 w-full items-stretch">
        <div className="xl:col-span-2 flex flex-col min-h-0">
          <ParcelChart className="flex-1 min-h-0" />
        </div>
        <div className="xl:col-span-1 flex flex-col min-h-0">
          <TopCustomersWidget className="flex-1 min-h-0" />
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
