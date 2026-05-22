import React from 'react';
import { Inbox, Package, Truck, Rocket } from 'lucide-react';
import { StatCard } from '../components/ui';

const STATS = [
    {
        id: 'new-packages',
        label: 'New packages',
        value: '222',
        icon: <Inbox className="w-5.5 h-5.5 text-primary stroke-[2.2]" />,
        bg: 'bg-primary/5 dark:bg-primary/10'
    },
    {
        id: 'in-transit',
        label: 'In transit',
        value: '2,000',
        icon: <Truck className="w-5.5 h-5.5 text-primary stroke-[2.2]" />,
        bg: 'bg-primary/10 dark:bg-primary/20'
    },
    {
        id: 'out-for-delivery',
        label: 'Out for delivery',
        value: '60',
        icon: <Package className="w-5.5 h-5.5 text-primary stroke-[2.2]" />,
        bg: 'bg-primary/15 dark:bg-primary/30'
    },
    {
        id: 'delivered',
        label: 'Delivered',
        value: '3,600',
        icon: <Rocket className="w-5.5 h-5.5 text-primary stroke-[2.2]" />,
        bg: 'bg-primary/20 dark:bg-primary/40'
    },
];

export const Dashboard: React.FC = () => {
    return (
        <div className="flex flex-col gap-8 w-full animate-fade-in">
            {/* Overview Stats Cards Grid */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full">
                {STATS.map((stat) => (
                    <StatCard
                        key={stat.id}
                        label={stat.label}
                        value={stat.value}
                        icon={stat.icon}
                        iconBgClass={stat.bg}
                    />
                ))}
            </section>
        </div>
    );
};

export default Dashboard;
