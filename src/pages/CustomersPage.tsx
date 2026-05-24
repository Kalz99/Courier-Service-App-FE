import React from 'react';
import { Search } from 'lucide-react';
import { useAdminCustomers } from '../hooks/useAdminCustomers';
import { CustomersTable } from '../components/ui/CustomersTable';

export const CustomersPage: React.FC = () => {
    const {
        customers,
        paginatedCustomers,
        loading,
        error,
        searchTerm,
        setSearchTerm,
        currentPage,
        setCurrentPage,
        totalPages,
        startIndex,
        endIndex,
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
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3.5 bg-[var(--app-bg)] text-sm border border-[var(--sidebar-border)] rounded-xl focus:outline-none focus:border-primary text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)]/70 font-medium"
                    />
                </div>
            </div>

            {/* Customers Data Table */}
            <CustomersTable
                customers={paginatedCustomers}
                isLoading={loading}
                error={error}
                onRefresh={refreshCustomers}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
                totalPages={totalPages}
                startIndex={startIndex}
                endIndex={endIndex}
                totalCustomersCount={customers.length}
            />
        </div>
    );
};

export default CustomersPage;
