import React from 'react';
import type { HorizontalTimelineProps } from '../../../types/customershipment.types';

const STATUS_MILESTONES = [
    'Shipment Created',
    'In Transit',
    'Out for Delivery',
    'Delivered'
];

const statusToIndex = (status: string): number => {
    switch (status.toLowerCase()) {
        case 'pending':
            return 0;
        case 'in_transit':
            return 1;
        case 'out_for_delivery':
            return 2;
        case 'delivered':
            return 3;
        default:
            return 0;
    }
};

export const HorizontalTimeline: React.FC<HorizontalTimelineProps> = ({ status }) => {
    const activeIndex = statusToIndex(status);

    return (
        <div className="relative w-full select-none pt-1">
            {/* Background & Progress Connector Lines */}
            {/* Circle height is 20px, so center of circle is 10px from top of column. With pt-1 (4px padding), center is exactly 14px from top. */}
            <div className="absolute top-[14px] left-0 w-full h-1 bg-[var(--sidebar-border)] rounded-full" />
            <div 
                className="absolute top-[14px] left-0 h-1 bg-primary rounded-full transition-all duration-500 ease-out" 
                style={{ width: `${(activeIndex / (STATUS_MILESTONES.length - 1)) * 100}%` }}
            />

            {/* Timeline Nodes & Column Layout */}
            <div className="relative flex justify-between items-start w-full">
                {STATUS_MILESTONES.map((label, idx) => {
                    const isCompleted = idx <= activeIndex;
                    return (
                        <div key={label} className="flex flex-col items-center gap-2">
                            {/* Circle Node */}
                            <div 
                                className={`w-5 h-5 rounded-full flex items-center justify-center border-2 z-10 transition-all duration-300 ${
                                    isCompleted 
                                        ? 'bg-primary border-primary text-white shadow-[0_0_8px_var(--color-primary-glow)] scale-105' 
                                        : 'bg-[var(--sidebar-bg)] border-[var(--sidebar-border)] text-[var(--color-text-muted)]'
                                }`}
                            >
                                <div className={`w-1.5 h-1.5 rounded-full ${isCompleted ? 'bg-white' : 'bg-transparent'}`} />
                            </div>
                            
                            {/* Milestone Label */}
                            <span 
                                className={`text-[9px] font-bold text-center uppercase tracking-wider transition-colors duration-300 max-w-[75px] leading-tight ${
                                    isCompleted 
                                        ? 'text-[var(--color-text-primary)] font-extrabold' 
                                        : 'text-[var(--color-text-muted)]/70 font-medium'
                                }`}
                            >
                                {label}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
