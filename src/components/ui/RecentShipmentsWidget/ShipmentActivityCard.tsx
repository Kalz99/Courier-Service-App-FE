import React from 'react';
import { User, Phone, MapPin, Calendar, Layers } from 'lucide-react';
import type { ShipmentActivityCardProps } from '../../../types/customershipment.types';
import { HorizontalTimeline } from './HorizontalTimeline';

export const ShipmentActivityCard: React.FC<ShipmentActivityCardProps> = ({ shipment }) => {
    return (
        <div className="h-full flex flex-col gap-5 p-5 bg-[var(--sidebar-bg)] border border-[var(--sidebar-border)] rounded-[20px] shadow-[var(--sidebar-shadow)] hover:shadow-lg transition-all duration-300 group">
            {/* Header info */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--sidebar-border)]/50 pb-3">
                <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-wider">Tracking Number</span>
                    <span className="font-mono font-bold text-sm text-[var(--color-text-primary)] select-all tracking-tight">
                        {shipment.trackingNumber}
                    </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[var(--color-text-muted)] font-medium">
                    <Calendar className="w-3.5 h-3.5 text-[var(--color-text-muted)]/70" />
                    {shipment.date}
                </div>
            </div>

            {/* Content Details Split */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Recipient Side */}
                <div className="flex flex-col gap-2">
                    <span className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-wider">Recipient Details</span>
                    <div className="flex flex-col gap-1.5">
                        <span className="font-bold text-xs text-[var(--color-text-primary)] flex items-center gap-1.5">
                            <User className="w-3.5 h-3.5 text-primary shrink-0 opacity-80" />
                            {shipment.recipient.name}
                        </span>
                        <span className="text-xs text-[var(--color-text-muted)] font-medium flex items-center gap-1.5 leading-none">
                            <Phone className="w-3 h-3 text-[var(--color-text-muted)]/70 shrink-0" />
                            {shipment.recipient.mobile}
                        </span>
                        <span className="text-xs text-[var(--color-text-muted)]/90 font-medium flex items-start gap-1.5 leading-snug">
                            <MapPin className="w-3.5 h-3.5 text-[var(--color-text-muted)]/70 shrink-0 mt-0.5" />
                            {shipment.recipient.address}
                        </span>
                    </div>
                </div>

                {/* Package Side */}
                <div className="flex flex-col gap-2">
                    <span className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-wider">Package Details</span>
                    <div className="flex flex-col gap-1.5">
                        <span className="font-semibold text-xs text-[var(--color-text-primary)] flex items-center gap-1.5">
                            <Layers className="w-3.5 h-3.5 text-primary shrink-0 opacity-80" />
                            {shipment.packageName}
                        </span>
                        <span className="text-xs text-[var(--color-text-muted)] font-medium">
                            <span className="font-semibold text-[var(--color-text-muted)]/80">Weight:</span> {shipment.weight}
                        </span>
                        <span className="text-xs text-[var(--color-text-muted)] font-medium">
                            <span className="font-semibold text-[var(--color-text-muted)]/80">Type:</span> {shipment.shipmentType}
                        </span>
                    </div>
                </div>
            </div>

            {/* Nested Progress Timeline */}
            <div className="mt-auto border-t border-[var(--sidebar-border)]/50 pt-4">
                <HorizontalTimeline status={shipment.status} />
            </div>
        </div>
    );
};
