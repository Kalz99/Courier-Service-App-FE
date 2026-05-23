import React from 'react';
import { BarChart3, ChevronDown, Loader2, Package } from 'lucide-react';
import { useParcelChart, CHART_MONTHS, AVAILABLE_YEARS } from '../../hooks/useParcelChart';

export const ParcelChart: React.FC = React.memo(() => {
    const {
        selectedYear,
        setSelectedYear,
        monthlyData,
        maxValue,
        totalYearCount,
        isLoading,
    } = useParcelChart();

    return (
        <div className="w-full bg-[var(--sidebar-bg)] border border-[var(--sidebar-border)] rounded-[24px] p-5 md:p-6 shadow-[var(--sidebar-shadow)] flex flex-col gap-6">

            {/* Chart Header Section */}
            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-primary/10 border border-primary/15 text-primary">
                        <BarChart3 className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-base font-bold text-[var(--color-text-primary)]">
                            Monthly Shipment Counts
                        </span>
                        <span className="text-[11px] font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">
                            Total package received per month
                        </span>
                    </div>
                </div>

                {/* Year Selection Dropdown */}
                <div className="relative select-none shrink-0">
                    <select
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                        className="appearance-none bg-[var(--app-bg)] text-xs font-bold text-[var(--color-text-primary)] border border-[var(--sidebar-border)] rounded-xl py-2 pl-4 pr-9 focus:outline-none focus:border-primary transition-all cursor-pointer shadow-sm select-none"
                    >
                        {AVAILABLE_YEARS.map((year) => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 absolute right-3 top-2.5 text-[var(--color-text-muted)] pointer-events-none" />
                </div>
            </div>

            {/* Total Indicator */}
            {!isLoading && (
                <div className="flex items-center gap-2 select-none">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/15 rounded-full font-bold text-xs">
                        <Package className="w-3.5 h-3.5" />
                        <span>{totalYearCount} {totalYearCount === 1 ? 'shipment' : 'shipments'} total in {selectedYear}</span>
                    </div>
                </div>
            )}

            {/* Loading / Data Grid Section */}
            <div className="w-full relative h-72 flex items-end justify-center">
                {isLoading ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-[var(--color-text-muted)] gap-2">
                        <Loader2 className="w-8 h-8 animate-spin text-primary" />
                        <span className="text-xs font-semibold">Analyzing parcel timelines...</span>
                    </div>
                ) : totalYearCount > 0 ? (
                    <div className="w-full flex justify-between items-end h-64 gap-2 md:gap-4 px-2">
                        {CHART_MONTHS.map((month, idx) => {
                            const count = monthlyData[idx];
                            const height = (count / maxValue) * 100;
                            return (
                                <div key={month} className="flex flex-col items-center flex-1 group relative">

                                    {/* Floating Tooltip */}
                                    <div className="absolute -top-11 scale-0 group-hover:scale-100 transition-all duration-200 bg-slate-900 text-white text-[10px] font-bold py-1.5 px-2.5 rounded-lg shadow-lg z-20 pointer-events-none after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-4 after:border-transparent after:border-t-slate-900 leading-none truncate whitespace-nowrap select-none">
                                        {count} {count === 1 ? 'parcel' : 'parcels'}
                                    </div>

                                    {/* Vertical Bar */}
                                    <div
                                        style={{ height: `${Math.max(height, 2)}%` }}
                                        className="w-full min-h-[4px] rounded-t-lg bg-gradient-to-t from-primary/30 to-primary hover:from-primary/55 hover:to-primary-hover transition-all duration-300 relative shadow-sm cursor-pointer"
                                    />

                                    {/* X-axis Label */}
                                    <span className="text-[10px] md:text-xs text-[var(--color-text-muted)] font-semibold mt-3 select-none">
                                        {month}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-[var(--color-text-muted)] text-center gap-3">
                        <BarChart3 className="w-12 h-12 opacity-25" />
                        <div className="flex flex-col gap-1 max-w-[280px]">
                            <span className="text-sm font-bold text-[var(--color-text-primary)]">No Shipment Volume Found</span>
                            <span className="text-xs leading-relaxed">
                                There are no active shipments recorded for the year {selectedYear}.
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
});

ParcelChart.displayName = 'ParcelChart';
