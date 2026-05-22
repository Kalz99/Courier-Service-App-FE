import React from 'react';
import { X, Check } from 'lucide-react';

interface TrackingModalProps {
    isOpen: boolean;
    onClose: () => void;
    trackingNumber: string | null;
}

export const TrackingModal: React.FC<TrackingModalProps> = ({ isOpen, onClose, trackingNumber }) => {
    if (!isOpen || !trackingNumber) return null;

    const steps = [
        { label: 'Shipment Created', time: 'May 21, 2026 — 09:30 AM', done: true },
        { label: 'In Transit', time: 'May 22, 2026 — 02:15 PM', done: true },
        { label: 'Out for Delivery', time: 'May 22, 2026 — 05:00 PM', done: true },
        { label: 'Delivered', time: 'Pending', done: false },
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />

            {/* Refined Modal Container (Swapped max-w-sm to max-w-[360px] to tighten width) */}
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

                {/* Timeline with expanded spacing */}
                <div className="flex flex-col relative pl-1">
                    {steps.map((step, idx) => (
                        /* Increased padding from pb-6 to pb-10 for distinct separation */
                        <div key={idx} className="flex gap-5 pb-10 last:pb-2 relative items-start">

                            {/* Vertical Track Line (Adjusted top and height to align perfectly with the node start point) */}
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

            </div>
        </div>
    );
};