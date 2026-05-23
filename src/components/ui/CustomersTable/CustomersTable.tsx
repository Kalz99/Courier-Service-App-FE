import React from 'react';
import { CustomerRow } from './CustomerRow';
import { CustomerSkeleton } from './CustomerSkeleton';
import { CustomerEmptyState } from './CustomerEmptyState';
import type { CustomerInfo } from '../../../types/customershipment.types';

export interface CustomersTableProps {
    customers: CustomerInfo[];
    isLoading?: boolean;
    error?: string | null;
    onRefresh?: () => void;
}

export const CustomersTable: React.FC<CustomersTableProps> = React.memo(({
    customers,
    isLoading = false,
    error = null,
    onRefresh
}) => {
    const hasRecords = customers.length > 0;

    return (
        <div className="w-full bg-[var(--sidebar-bg)] border border-[var(--sidebar-border)] rounded-[24px] shadow-[var(--sidebar-shadow)] overflow-visible">
            <div className="w-full md:overflow-visible overflow-x-auto">
                {isLoading || hasRecords ? (
                    <table className="w-full min-w-[900px] border-collapse text-left text-sm select-none">
                        <thead>
                            <tr className="border-b border-[var(--sidebar-border)] bg-[var(--app-bg)]/40">
                                <th className="py-4.5 px-6 font-bold text-xs uppercase tracking-wider text-[var(--color-text-muted)] w-[25%]">Customer Info</th>
                                <th className="py-4.5 px-6 font-bold text-xs uppercase tracking-wider text-[var(--color-text-muted)] w-[25%]">Contact Details</th>
                                <th className="py-4.5 px-6 font-bold text-xs uppercase tracking-wider text-[var(--color-text-muted)] w-[35%]">Mailing Address</th>
                                <th className="py-4.5 px-6 font-bold text-xs uppercase tracking-wider text-[var(--color-text-muted)] w-[15%] text-center">Packages</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--sidebar-border)]/50 text-sm">
                            {isLoading ? (
                                <CustomerSkeleton />
                            ) : (
                                customers.map((customer) => (
                                    <CustomerRow key={customer.email} customer={customer} />
                                ))
                            )}
                        </tbody>
                    </table>
                ) : error ? (
                    <div className="flex flex-col items-center justify-center py-16 gap-3 text-red-500 bg-[var(--sidebar-bg)] rounded-[24px]">
                        <span className="text-sm font-bold">{error}</span>
                        {onRefresh && (
                            <button
                                onClick={onRefresh}
                                className="px-4 py-2 bg-red-500/10 text-red-600 rounded-xl font-bold border border-red-500/20 text-xs cursor-pointer hover:bg-red-500/15 transition-all"
                            >
                                Retry Connection
                            </button>
                        )}
                    </div>
                ) : (
                    <CustomerEmptyState />
                )}
            </div>
        </div>
    );
});

CustomersTable.displayName = 'CustomersTable';
