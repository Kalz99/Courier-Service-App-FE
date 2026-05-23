import {
    CheckCircle2,
    Truck,
    Compass,
    Clock,
    Inbox,
    Package,
    Layers,
    ShieldAlert,
    HeartPulse
} from 'lucide-react';

export const ShipmentStatusEnum = {
    PENDING: "pending",
    IN_TRANSIT: "in_transit",
    OUT_FOR_DELIVERY: "out_for_delivery",
    DELIVERED: "delivered",
} as const;

export type ShipmentStatusType = typeof ShipmentStatusEnum[keyof typeof ShipmentStatusEnum];


export const PACKAGE_TYPE_LABELS: Record<string, string> = {
    document: 'Document / Letter',
    package_box: 'Standard Package / Box',
    pallet: 'Pallet / Bulk Crate',
    perishable: 'Perishable Goods / Food',
    medical: 'Pharmaceutical / Medical',
};

export const getStatusStyles = (status: string) => {
    switch (status) {
        case ShipmentStatusEnum.DELIVERED:
            return {
                bg: 'bg-emerald-500/10 dark:bg-emerald-500/15',
                text: 'text-emerald-600 dark:text-emerald-400 border border-emerald-500/20',
                dot: 'bg-emerald-500',
                icon: <CheckCircle2 className="w-3.5 h-3.5 mr-1.5 shrink-0" />,
                label: 'Delivered',
            };
        case ShipmentStatusEnum.IN_TRANSIT:
            return {
                bg: 'bg-[var(--color-primary-glow)]',
                text: 'text-primary dark:text-[var(--color-primary)] border border-primary/20',
                dot: 'bg-primary',
                icon: <Truck className="w-3.5 h-3.5 mr-1.5 shrink-0" />,
                label: 'In Transit',
            };
        case ShipmentStatusEnum.OUT_FOR_DELIVERY:
            return {
                bg: 'bg-blue-500/10 dark:bg-blue-500/15',
                text: 'text-blue-600 dark:text-blue-400 border border-blue-500/20',
                dot: 'bg-blue-500',
                icon: <Compass className="w-3.5 h-3.5 mr-1.5 shrink-0" />,
                label: 'Out for Delivery',
            };
        default:
            return {
                bg: 'bg-amber-500/10 dark:bg-amber-500/15',
                text: 'text-amber-600 dark:text-amber-400 border border-amber-500/20',
                dot: 'bg-amber-500',
                icon: <Clock className="w-3.5 h-3.5 mr-1.5 shrink-0" />,
                label: 'Pending',
            };
    }
};

export const getPackageIcon = (type: string) => {
    switch (type) {
        case 'document':
            return <Inbox className="w-3.5 h-3.5 text-primary shrink-0" />;
        case 'package_box':
            return <Package className="w-3.5 h-3.5 text-primary shrink-0" />;
        case 'pallet':
            return <Layers className="w-3.5 h-3.5 text-primary shrink-0" />;
        case 'perishable':
            return <ShieldAlert className="w-3.5 h-3.5 text-primary shrink-0" />;
        case 'medical':
            return <HeartPulse className="w-3.5 h-3.5 text-primary shrink-0" />;
        default:
            return <Package className="w-3.5 h-3.5 text-primary shrink-0" />;
    }
};
