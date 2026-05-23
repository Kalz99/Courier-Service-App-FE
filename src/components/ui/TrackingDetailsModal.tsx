import React, { useMemo, useEffect } from 'react';
import { X, Check, Loader2 } from 'lucide-react';
import { useTrackingDetails } from '../../hooks/useTrackingDetails';

interface TrackingModalProps {
    isOpen: boolean;
    onClose: () => void;
    trackingNumber: string | null;
    forceLight?: boolean;
}

export const TrackingModal: React.FC<TrackingModalProps> = ({
    isOpen,
    onClose,
    trackingNumber,
    forceLight = false,
}) => {

    const {
        history,
        isLoading,
        error,
    } = useTrackingDetails(trackingNumber, isOpen);

    // Close modal using ESC key
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            window.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);

    const formatDate = (isoString: string): string => {
        const date = new Date(isoString);

        if (isNaN(date.getTime())) {
            return isoString;
        }

        return date.toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        });
    };

    const getMilestoneStep = (
        label: string,
        statusKeys: string[]
    ) => {

        const matchedHistory = history.find((item) =>
            statusKeys.includes(item.status.toLowerCase())
        );

        return {
            label,
            time: matchedHistory
                ? formatDate(matchedHistory.created_at)
                : 'Pending',
            done: Boolean(matchedHistory),
        };
    };

    const steps = useMemo(() => [
        getMilestoneStep('Shipment Created', ['pending']),
        getMilestoneStep('In Transit', ['in transit', 'in_transit']),
        getMilestoneStep('Out for Delivery', ['out for delivery', 'out_for_delivery']),
        getMilestoneStep('Delivered', ['delivered']),
    ], [history]);

    if (!isOpen || !trackingNumber) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className={`relative w-full max-w-[360px] rounded-[24px] shadow-2xl p-7 overflow-hidden transition-colors ${
                forceLight 
                    ? 'bg-white border border-slate-200 text-slate-800' 
                    : 'bg-[var(--sidebar-bg)] border border-[var(--sidebar-border)] text-[var(--color-text-primary)]'
            }`}>

                {/* Header */}
                <div className="flex items-center justify-between mb-8">

                    <div>
                        <span className={`text-[10px] font-bold uppercase tracking-widest ${
                            forceLight ? 'text-slate-400' : 'text-[var(--color-text-muted)]'
                        }`}>
                            Tracking Status
                        </span>

                        <h3 className={`text-base font-mono font-bold mt-1 ${
                            forceLight ? 'text-slate-800' : 'text-[var(--color-text-primary)]'
                        }`}>
                            {trackingNumber}
                        </h3>
                    </div>

                    <button
                        aria-label="Close tracking modal"
                        onClick={onClose}
                        className={`p-1.5 rounded-xl cursor-pointer transition-colors border ${
                            forceLight 
                                ? 'bg-slate-50 border-slate-200 text-slate-400 hover:text-primary' 
                                : 'bg-[var(--app-bg)] border-[var(--sidebar-border)] text-[var(--color-text-muted)] hover:text-primary'
                        }`}
                    >
                        <X className="w-4 h-4" />
                    </button>

                </div>

                {/* Loading State */}
                {isLoading ? (

                    <div className={`flex flex-col items-center justify-center py-12 gap-3 ${
                        forceLight ? 'text-slate-400' : 'text-[var(--color-text-muted)]'
                    }`}>

                        <Loader2 className="w-8 h-8 animate-spin text-primary" />

                        <span className="text-xs font-semibold">
                            Retrieving tracking history...
                        </span>

                    </div>

                ) : error ? (

                    /* Error State */
                    <div className="flex flex-col items-center text-center justify-center py-8 gap-3">

                        <div className="w-12 h-12 rounded-full bg-rose-500/10 border border-rose-500/25 flex items-center justify-center text-rose-500">
                            <X className="w-6 h-6 stroke-[2.5]" />
                        </div>

                        <div className="flex flex-col gap-1">

                            <span className={`text-xs font-bold ${
                                forceLight ? 'text-slate-800' : 'text-[var(--color-text-primary)]'
                            }`}>
                                Tracking Failed
                            </span>

                            <span className={`text-[11px] max-w-[240px] leading-relaxed ${
                                forceLight ? 'text-slate-400' : 'text-[var(--color-text-muted)]'
                            }`}>
                                {error}
                            </span>

                        </div>

                    </div>

                ) : (

                    /* Timeline */
                    <div className="flex flex-col relative pl-1">

                        {steps.map((step, index) => {

                            const isLastStep = index === steps.length - 1;

                            return (
                                <div
                                    key={step.label}
                                    className="flex gap-5 pb-10 last:pb-2 relative items-start"
                                >

                                    {/* Progress Line */}
                                    {!isLastStep && (
                                        <div
                                            className={`absolute left-3 top-7 w-0.5 h-[calc(100%-16px)] -translate-x-1/2 ${
                                                step.done && steps[index + 1].done
                                                    ? 'bg-primary'
                                                    : forceLight ? 'bg-slate-100' : 'bg-[var(--sidebar-border)]'
                                            }`}
                                        />
                                    )}

                                    {/* Status Node */}
                                    <div
                                        className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 z-10 border text-[10px] transition-all mt-0.5 ${
                                            step.done
                                                ? 'bg-primary border-primary text-white shadow-[0_0_8px_var(--color-primary-glow)]'
                                                : forceLight 
                                                    ? 'bg-slate-50 border-slate-200 text-slate-300' 
                                                    : 'bg-[var(--app-bg)] border-[var(--sidebar-border)] text-[var(--color-text-muted)]/40'
                                        }`}
                                    >
                                        {step.done ? (
                                            <Check className="w-3 h-3 stroke-[3]" />
                                        ) : (
                                            <div className="w-1.5 h-1.5 rounded-full bg-current" />
                                        )}
                                    </div>

                                    {/* Step Content */}
                                    <div className="flex flex-col min-w-0 pt-0.5">

                                        <span
                                            className={`text-sm font-bold transition-colors ${
                                                step.done
                                                    ? forceLight ? 'text-slate-800' : 'text-[var(--color-text-primary)]'
                                                    : forceLight ? 'text-slate-300' : 'text-[var(--color-text-muted)]/40'
                                            }`}
                                        >
                                            {step.label}
                                        </span>

                                        <span
                                            className={`text-[11px] font-mono mt-1 ${
                                                step.done
                                                    ? forceLight ? 'text-slate-500' : 'text-[var(--color-text-muted)]'
                                                    : forceLight ? 'text-slate-300' : 'text-[var(--color-text-muted)]/30'
                                            }`}
                                        >
                                            {step.time}
                                        </span>

                                    </div>

                                </div>
                            );
                        })}

                    </div>

                )}

            </div>

        </div>
    );
};