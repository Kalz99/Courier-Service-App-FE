import React from 'react';
import { Loader2, AlertCircle, Inbox } from 'lucide-react';
import { useRecentShipments } from '../../../hooks/useRecentShipments';
import { ShipmentActivityCard } from './ShipmentActivityCard';

interface RecentShipmentsWidgetProps {
    className?: string;
}

export const RecentShipmentsWidget: React.FC<RecentShipmentsWidgetProps> = ({ className = '' }) => {
    const { recentShipments, isLoading, error } = useRecentShipments();

    return (
        <div className={`w-full flex flex-col gap-5 ${className}`}>
            <div className="flex items-center justify-between px-6 md:px-8">
                <h2 className="text-[17px] md:text-[19px] font-bold text-[var(--color-text-primary)] select-none">
                    Recent Shipment Activities
                </h2>
                <span className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-wider bg-[var(--sidebar-active-bg)] px-2.5 py-1 rounded-full">
                    Last 6 Updates
                </span>
            </div>

            {isLoading ? (
                <div className="w-full min-h-[220px] bg-[var(--sidebar-bg)] border border-[var(--sidebar-border)] rounded-[24px] shadow-[var(--sidebar-shadow)] flex flex-col items-center justify-center gap-3 text-[var(--color-text-muted)] p-8">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    <span className="text-xs font-semibold">Retrieving shipment activities...</span>
                </div>
            ) : error ? (
                <div className="w-full min-h-[220px] bg-[var(--sidebar-bg)] border border-[var(--sidebar-border)] rounded-[24px] shadow-[var(--sidebar-shadow)] flex flex-col items-center justify-center text-center p-8 gap-3">
                    <div className="w-12 h-12 rounded-full bg-rose-500/10 border border-rose-500/25 flex items-center justify-center text-rose-500">
                        <AlertCircle className="w-6 h-6 stroke-[2.2]" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-xs font-bold text-[var(--color-text-primary)]">Activities Loading Failed</span>
                        <span className="text-[11px] text-[var(--color-text-muted)] max-w-[280px] leading-relaxed">
                            {error}
                        </span>
                    </div>
                </div>
            ) : recentShipments.length === 0 ? (
                <div className="w-full min-h-[220px] bg-[var(--sidebar-bg)] border border-[var(--sidebar-border)] rounded-[24px] shadow-[var(--sidebar-shadow)] flex flex-col items-center justify-center text-center p-8 gap-3 text-[var(--color-text-muted)]">
                    <div className="w-12 h-12 rounded-full bg-[var(--app-bg)] border border-[var(--sidebar-border)] flex items-center justify-center">
                        <Inbox className="w-5 h-5 opacity-70" />
                    </div>
                    <div className="flex flex-col gap-0.5">
                        <span className="text-xs font-bold text-[var(--color-text-primary)]">No Shipment Activities Found</span>
                        <span className="text-[11px] text-[var(--color-text-muted)]">Create a new shipment to start tracking updates here.</span>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full">
                    {recentShipments.map((shipment) => (
                        <ShipmentActivityCard key={shipment.id} shipment={shipment} />
                    ))}
                </div>
            )}
        </div>
    );
};
