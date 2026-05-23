import React from 'react';
import {
    Users,
    Phone,
    Mail,
    MapPin,
    Package,
    Search,
    Loader2
} from 'lucide-react';
import { useAdminCustomers } from '../hooks/useAdminCustomers';

export const CustomersPage: React.FC = () => {
    const {
        customers,
        loading,
        error,
        searchTerm,
        setSearchTerm,
        refreshCustomers
    } = useAdminCustomers();

    return (
        <div className="flex flex-col gap-6 w-full p-1 md:p-2 animate-fade-in">

            {/* Filter / Search Bar */}
            <div className="flex flex-col gap-4 w-full bg-[var(--sidebar-bg)] border border-[var(--sidebar-border)] rounded-2xl p-4 shadow-sm">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-4 top-3.5 h-5 w-5 text-[var(--color-text-muted)]" />
                    <input
                        type="text"
                        placeholder="Search by customer name, email, phone or address..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3.5 bg-[var(--app-bg)] text-sm border border-[var(--sidebar-border)] rounded-xl focus:outline-none focus:border-primary text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)]/70 font-medium"
                    />
                </div>
            </div>

            {/* Customers Data Table */}
            <div className="w-full bg-[var(--sidebar-bg)] border border-[var(--sidebar-border)] rounded-[24px] shadow-sm overflow-hidden">
                <div className="overflow-x-auto w-full">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20 gap-3 text-[var(--color-text-muted)]">
                            <Loader2 className="w-10 h-10 animate-spin text-primary" />
                            <span className="text-sm font-semibold">Simulating secure log query...</span>
                        </div>
                    ) : error ? (
                        <div className="flex flex-col items-center justify-center py-16 gap-3 text-red-500">
                            <span className="text-sm font-bold">{error}</span>
                            <button
                                onClick={refreshCustomers}
                                className="px-4 py-2 bg-red-500/10 text-red-600 rounded-xl font-bold border border-red-500/20 text-xs cursor-pointer"
                            >
                                Retry Connection
                            </button>
                        </div>
                    ) : customers.length > 0 ? (
                        <table className="w-full min-w-[900px] border-collapse text-left text-sm">
                            <thead>
                                <tr className="border-b border-[var(--sidebar-border)] bg-[var(--app-bg)]/40">
                                    <th className="py-4.5 px-6 font-bold text-xs uppercase tracking-wider text-[var(--color-text-muted)] w-[25%]">Customer Info</th>
                                    <th className="py-4.5 px-6 font-bold text-xs uppercase tracking-wider text-[var(--color-text-muted)] w-[25%]">Contact Details</th>
                                    <th className="py-4.5 px-6 font-bold text-xs uppercase tracking-wider text-[var(--color-text-muted)] w-[35%]">Mailing Address</th>
                                    <th className="py-4.5 px-6 font-bold text-xs uppercase tracking-wider text-[var(--color-text-muted)] w-[15%] text-center">Packages</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[var(--sidebar-border)]/50 text-sm">
                                {customers.map((customer) => (
                                    <tr
                                        key={customer.email}
                                        className="transition-colors duration-150 hover:bg-[var(--sidebar-active-bg)]/5"
                                    >
                                        {/* Avatar / Name */}
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary/20 to-primary/5 flex items-center justify-center font-bold text-primary text-sm border border-primary/10">
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
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 text-center text-[var(--color-text-muted)] gap-3 bg-[var(--app-bg)]/20">
                            <Users className="w-12 h-12 opacity-30" />
                            <h3 className="font-bold text-sm">No customers matching your search</h3>
                            <p className="text-xs max-w-[300px] leading-relaxed">
                                Double check your spelling or search by different keywords such as name or email.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CustomersPage;
