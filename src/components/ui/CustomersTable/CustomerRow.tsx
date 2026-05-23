import React from 'react';
import { Phone, Mail, MapPin, Package } from 'lucide-react';
import type { CustomerInfo } from '../../../types/customershipment.types';

export interface CustomerRowProps {
    customer: CustomerInfo;
}

export const CustomerRow: React.FC<CustomerRowProps> = React.memo(({ customer }) => {
    return (
        <tr className="transition-colors duration-150 hover:bg-[var(--sidebar-active-bg)]/5 group">
            {/* Avatar / Name */}
            <td className="py-4 px-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary/20 to-primary/5 flex items-center justify-center font-bold text-primary text-sm border border-primary/10 transition-transform duration-200 group-hover:scale-105 select-none">
                        {customer.name.charAt(0)}
                    </div>
                    <span className="font-bold text-[var(--color-text-primary)] text-sm">
                        {customer.name}
                    </span>
                </div>
            </td>

            {/* Phone / Email */}
            <td className="py-4 px-6">
                <div className="flex flex-col gap-1.5">
                    {customer.mobile && (
                        <span className="text-[var(--color-text-muted)] font-semibold flex items-center gap-1.5 text-xs">
                            <Phone className="w-3.5 h-3.5 text-primary opacity-80" />
                            {customer.mobile}
                        </span>
                    )}
                    <span className="text-[var(--color-text-muted)] font-semibold flex items-center gap-1.5 text-xs">
                        <Mail className="w-3.5 h-3.5 text-emerald-500 opacity-80" />
                        {customer.email}
                    </span>
                </div>
            </td>

            {/* Address */}
            <td className="py-4 px-6 text-xs text-[var(--color-text-muted)] font-semibold">
                <div className="flex items-start gap-1.5 max-w-[320px]">
                    <MapPin className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
                    <span className="line-clamp-2 leading-relaxed">{customer.address || "No address provided"}</span>
                </div>
            </td>

            {/* Packages Count */}
            <td className="py-4 px-6 text-center">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary border border-primary/20 rounded-full font-bold text-xs">
                    <Package className="w-3.5 h-3.5" />
                    <span>{customer.totalPackagesReceived} total</span>
                </div>
            </td>
        </tr>
    );
});

CustomerRow.displayName = 'CustomerRow';
