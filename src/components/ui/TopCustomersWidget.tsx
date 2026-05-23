import React from 'react';
import { Award, Phone, Briefcase, Loader2, Package, Crown } from 'lucide-react';
import { useTopCustomers } from '../../hooks/useTopCustomers';

export const TopCustomersWidget: React.FC = React.memo(() => {
    const { topCustomers, isLoading, error } = useTopCustomers();

    return (
        <div className="w-full h-full bg-[var(--sidebar-bg)] border border-[var(--sidebar-border)] rounded-[24px] p-5 md:p-6 shadow-[var(--sidebar-shadow)] flex flex-col gap-5 justify-between">

            {/* Header Title Section */}
            <div className="flex items-center gap-3 select-none">
                <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/15 text-amber-500">
                    <Award className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                    <span className="text-base font-bold text-[var(--color-text-primary)]">
                        Top Customers
                    </span>

                </div>
            </div>

            {/* List / Loading Section */}
            <div className="grow flex flex-col">
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-12 text-[var(--color-text-muted)] gap-2 select-none">
                        <Loader2 className="w-7 h-7 animate-spin text-amber-500" />
                        <span className="text-xs font-semibold">Ranking top shippers...</span>
                    </div>
                ) : error ? (
                    <div className="flex flex-col items-center justify-center py-8 text-center text-red-500 gap-1.5 px-4 select-none">
                        <span className="text-xs font-bold leading-relaxed">{error}</span>
                    </div>
                ) : topCustomers.length > 0 ? (
                    <div className="flex flex-col gap-3.5 my-1">
                        {topCustomers.map((cust, index) => {
                            const isFirst = index === 0;
                            return (
                                <div
                                    key={cust.mobile + index}
                                    className="flex items-center justify-between gap-3 p-3 bg-[var(--app-bg)]/40 hover:bg-[var(--sidebar-active-bg)]/10 border border-[var(--sidebar-border)] rounded-2xl transition-all duration-200 group"
                                >
                                    {/* Left Customer Info */}
                                    <div className="flex items-center gap-3 min-w-0">
                                        <div className={`w-8.5 h-8.5 rounded-full shrink-0 flex items-center justify-center font-bold text-xs border transition-transform duration-200 group-hover:scale-105 select-none ${isFirst
                                            ? 'bg-amber-500/10 border-amber-500/20 text-amber-500 shadow-sm'
                                            : 'bg-primary/10 border-primary/15 text-primary'
                                            }`}>
                                            {isFirst ? <Crown className="w-4 h-4 fill-amber-500/10 animate-bounce" /> : cust.name.charAt(0)}
                                        </div>

                                        <div className="flex flex-col min-w-0">
                                            <span className="text-xs font-bold text-[var(--color-text-primary)] truncate">
                                                {cust.name}
                                            </span>
                                            {cust.businessName ? (
                                                <span className="text-[10px] text-[var(--color-text-muted)] font-medium flex items-center gap-1 mt-0.5 truncate">
                                                    <Briefcase className="w-2.5 h-2.5 shrink-0" />
                                                    {cust.businessName}
                                                </span>
                                            ) : (
                                                cust.mobile && (
                                                    <span className="text-[10px] text-[var(--color-text-muted)] font-medium flex items-center gap-1 mt-0.5 truncate">
                                                        <Phone className="w-2.5 h-2.5 shrink-0" />
                                                        {cust.mobile}
                                                    </span>
                                                )
                                            )}
                                        </div>
                                    </div>

                                    {/* Right Shipment Count badge */}
                                    <div className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-bold text-[10px] border select-none shrink-0 ${isFirst
                                        ? 'bg-amber-500/10 border-amber-500/15 text-amber-500'
                                        : 'bg-primary/5 border-primary/10 text-primary'
                                        }`}>
                                        <Package className="w-3 h-3" />
                                        <span>{cust.shipmentCount}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-10 text-center text-[var(--color-text-muted)] gap-2 select-none">
                        <Award className="w-10 h-10 opacity-20" />
                        <span className="text-xs font-bold text-[var(--color-text-primary)]">No active shippers found</span>
                    </div>
                )}
            </div>
        </div>
    );
});

TopCustomersWidget.displayName = 'TopCustomersWidget';
