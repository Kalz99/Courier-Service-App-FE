import React from 'react';

export const CustomerSkeleton: React.FC = React.memo(() => {
    return (
        <>
            {Array.from({ length: 5 }).map((_, rowIndex) => (
                <tr key={rowIndex} className="bg-transparent">
                    {/* Customer Info */}
                    <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-[var(--sidebar-border)]/40 animate-pulse shrink-0" />
                            <div className="h-4 w-28 bg-[var(--sidebar-border)]/40 rounded animate-pulse" />
                        </div>
                    </td>

                    {/* Contact Details */}
                    <td className="py-4 px-6">
                        <div className="flex flex-col gap-2">
                            <div className="h-3.5 w-24 bg-[var(--sidebar-border)]/40 rounded animate-pulse" />
                            <div className="h-3.5 w-36 bg-[var(--sidebar-border)]/40 rounded animate-pulse" />
                        </div>
                    </td>

                    {/* Mailing Address */}
                    <td className="py-4 px-6">
                        <div className="flex flex-col gap-2">
                            <div className="h-3.5 w-52 bg-[var(--sidebar-border)]/40 rounded animate-pulse" />
                            <div className="h-3.5 w-24 bg-[var(--sidebar-border)]/40 rounded animate-pulse" />
                        </div>
                    </td>

                    {/* Packages */}
                    <td className="py-4 px-6 text-center">
                        <div className="h-6 w-20 rounded-full bg-[var(--sidebar-border)]/40 animate-pulse mx-auto" />
                    </td>
                </tr>
            ))}
        </>
    );
});

CustomerSkeleton.displayName = 'CustomerSkeleton';
