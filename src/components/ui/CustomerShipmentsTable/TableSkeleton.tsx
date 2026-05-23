import React from 'react';

export interface TableSkeletonProps {
    role?: 'admin' | 'customer';
}

export const TableSkeleton: React.FC<TableSkeletonProps> = React.memo(({ role = 'customer' }) => {
    const isAdmin = role === 'admin';
    return (
        <>
            {Array.from({ length: 5 }).map((_, index) => (
                <tr key={index} className="bg-transparent">
                    {/* Tracking ID column */}
                    <td className="py-4.5 px-6">
                        <div className="flex items-center gap-2">
                            <div className="h-4 w-28 bg-[var(--sidebar-border)]/40 rounded animate-pulse" />
                            <div className="w-8 h-8 rounded-md bg-[var(--sidebar-border)]/40 animate-pulse shrink-0" />
                        </div>
                    </td>

                    {/* Sender / Customer details (Admin Only) */}
                    {isAdmin && (
                        <td className="py-4.5 px-6">
                            <div className="flex flex-col gap-2">
                                <div className="h-4 w-36 bg-[var(--sidebar-border)]/40 rounded animate-pulse" />
                                <div className="h-3 w-28 bg-[var(--sidebar-border)]/40 rounded animate-pulse" />
                            </div>
                        </td>
                    )}

                    {/* Recipient Details column */}
                    <td className="py-4.5 px-6">
                        <div className="flex flex-col gap-2">
                            <div className="h-4 w-36 bg-[var(--sidebar-border)]/40 rounded animate-pulse" />
                            <div className="h-3 w-28 bg-[var(--sidebar-border)]/40 rounded animate-pulse" />
                            <div className="h-3 w-52 bg-[var(--sidebar-border)]/40 rounded animate-pulse" />
                        </div>
                    </td>

                    {/* Package Details column */}
                    <td className="py-4.5 px-6 text-left">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-lg bg-[var(--sidebar-border)]/40 animate-pulse shrink-0" />
                            <div className="flex flex-col gap-1.5 flex-1 max-w-[140px]">
                                <div className="h-4 bg-[var(--sidebar-border)]/40 rounded animate-pulse" />
                                <div className="h-3 w-16 bg-[var(--sidebar-border)]/40 rounded animate-pulse" />
                            </div>
                        </div>
                    </td>

                    {/* Status column */}
                    <td className="py-4.5 px-6">
                        <div className="h-6 w-24 rounded-full bg-[var(--sidebar-border)]/40 animate-pulse" />
                    </td>

                    {/* Action column */}
                    <td className="py-4.5 px-6 text-center">
                        <div className="h-7 w-16 rounded-lg bg-[var(--sidebar-border)]/40 animate-pulse mx-auto" />
                    </td>
                </tr>
            ))}
        </>
    );
});

TableSkeleton.displayName = 'TableSkeleton';
