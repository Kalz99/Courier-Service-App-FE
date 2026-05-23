import React from 'react';
import { X, Check, Loader2 } from 'lucide-react';
import { useTrackingDetails } from '../../hooks/useTrackingDetails';

interface TrackingModalProps {
    isOpen: boolean;
    onClose: () => void;
    trackingNumber: string | null;
}

export const TrackingModal: React.FC<TrackingModalProps> = ({ isOpen, onClose, trackingNumber }) => {
    const { history, isLoading, error } = useTrackingDetails(trackingNumber, isOpen);

    if (!isOpen || !trackingNumber) return null;

    const formatDate = (isoString: string) => {
        const date = new Date(isoString);
        if (isNaN(date.getTime())) return isoString;
        
        const options: Intl.DateTimeFormatOptions = {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        };
        const datePart = date.toLocaleDateString('en-US', options);
        
        let hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        const hoursStr = hours.toString().padStart(2, '0');
        
        return `${datePart} — ${hoursStr}:${minutes} ${ampm}`;
    };

    const getMilestoneStep = (label: string, statusKeys: string[]) => {
        const item = history.find(h => statusKeys.includes(h.status.toLowerCase()));
        if (item) {
            return {
                label,
                time: formatDate(item.created_at),
                done: true
            };
        }
        return {
            label,
            time: 'Pending',
            done: false
        };
    };

    const steps = [
        getMilestoneStep('Shipment Created', ['pending']),
        getMilestoneStep('In Transit', ['in transit', 'in_transit']),
        getMilestoneStep('Out for Delivery', ['out for delivery', 'out_for_delivery']),
        getMilestoneStep('Delivered', ['delivered']),
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />

            {/* Refined Modal Container */}
            <div className="relative w-full max-w-[360px] bg-[var(--sidebar-bg)] border border-[var(--sidebar-border)] rounded-[24px] shadow-2xl p-7 overflow-hidden">

                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <span className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-widest">Tracking Status</span>
                        <h3 className="text-base font-mono font-bold text-[var(--color-text-primary)] mt-1">{trackingNumber}</h3>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1.5 rounded-xl bg-[var(--app-bg)] border border-[var(--sidebar-border)] text-[var(--color-text-muted)] hover:text-primary cursor-pointer transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-12 gap-3 text-[var(--color-text-muted)]">
                        <Loader2 className="w-8 h-8 animate-spin text-primary" />
                        <span className="text-xs font-semibold">Retrieving tracking history...</span>
                    </div>
                ) : error ? (
                    <div className="flex flex-col items-center text-center justify-center py-8 gap-3">
                        <div className="w-12 h-12 rounded-full bg-rose-500/10 border border-rose-500/25 flex items-center justify-center text-rose-500">
                            <X className="w-6 h-6 stroke-[2.5]" />
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-xs font-bold text-[var(--color-text-primary)]">Tracking Failed</span>
                            <span className="text-[11px] text-[var(--color-text-muted)] max-w-[240px] leading-relaxed">
                                {error}
                            </span>
                        </div>
                    </div>
                ) : (
                    /* Timeline with expanded spacing */
                    <div className="flex flex-col relative pl-1">
                        {steps.map((step, idx) => (
                            <div key={idx} className="flex gap-5 pb-10 last:pb-2 relative items-start">

                                {/* Vertical Track Line */}
                                {idx !== steps.length - 1 && (
                                    <div className={`absolute left-3 top-7 w-0.5 h-[calc(100%-16px)] -translate-x-1/2 ${step.done && steps[idx + 1].done ? 'bg-primary' : 'bg-[var(--sidebar-border)]'
                                        }`} />
                                )}

                                {/* Node Indicator */}
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 z-10 border text-[10px] transition-all mt-0.5 ${step.done
                                        ? 'bg-primary border-primary text-white shadow-[0_0_8px_var(--color-primary-glow)]'
                                        : 'bg-[var(--app-bg)] border-[var(--sidebar-border)] text-[var(--color-text-muted)]/40'
                                    }`}>
                                    {step.done ? <Check className="w-3 h-3 stroke-[3]" /> : <div className="w-1.5 h-1.5 rounded-full bg-current" />}
                                </div>

                                {/* Status Text Details */}
                                <div className="flex flex-col min-w-0 pt-0.5">
                                    <span className={`text-sm font-bold transition-colors ${step.done ? 'text-[var(--color-text-primary)]' : 'text-[var(--color-text-muted)]/40'
                                        }`}>
                                        {step.label}
                                    </span>
                                    <span className={`text-[11px] font-mono mt-1 ${step.done ? 'text-[var(--color-text-muted)]' : 'text-[var(--color-text-muted)]/30'
                                        }`}>
                                        {step.time}
                                    </span>
                                </div>

                            </div>
                        ))}
                    </div>
                )}

            </div>
        </div>
    );
};