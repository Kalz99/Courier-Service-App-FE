import React, { useState } from 'react';
import { CustomerShipmentsTable, TrackingModal } from '../components/ui';
import type { ShipmentItem } from '../components/ui';
import { useCustomerShipments } from '../hooks/useCustomerShipments';
import { AlertCircle, RefreshCw } from 'lucide-react';

export const CustomerShipments: React.FC = () => {
    const { shipments, loading, error, refreshShipments } = useCustomerShipments();

    const [trackedNumber, setTrackedNumber] = useState<string | null>(null);

    const handleTrackShipment = (trackingNumber: string) => {
        setTrackedNumber(trackingNumber);
    };

    const handleCloseModal = () => {
        setTrackedNumber(null);
    };

    return (
        <div className="flex flex-col gap-6 w-full animate-fade-in p-1 md:p-2 box-border">

            {error && (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4.5 bg-red-500/10 dark:bg-red-500/15 border border-red-500/20 rounded-2xl animate-fade-in shadow-[0_4px_12px_rgba(239,68,68,0.05)]">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-red-500/10 border border-red-500/15 text-red-600 dark:text-red-400 rounded-lg shrink-0">
                            <AlertCircle className="w-5 h-5" />
                        </div>
                        <div className="flex flex-col gap-0.5">
                            <span className="text-sm font-bold text-[var(--color-text-primary)]">
                                Failed to Load Shipment Data
                            </span>
                            <span className="text-xs text-[var(--color-text-muted)] font-medium leading-relaxed">
                                {error}
                            </span>
                        </div>
                    </div>
                    <button
                        onClick={refreshShipments}
                        className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-red-600 dark:text-red-400 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 rounded-xl transition-all duration-200 hover:scale-105 active:scale-98 cursor-pointer shrink-0"
                    >
                        <RefreshCw className="w-3.5 h-3.5 animate-spin-slow" />
                        Retry Connection
                    </button>
                </div>
            )}

            <CustomerShipmentsTable
                shipments={shipments}
                isLoading={loading}
                onTrackShipment={handleTrackShipment}
            />

            <TrackingModal
                isOpen={trackedNumber !== null}
                onClose={handleCloseModal}
                trackingNumber={trackedNumber}
            />
        </div>
    );
};

export default CustomerShipments;
