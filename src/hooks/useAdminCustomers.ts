import { useState, useEffect, useCallback, useMemo } from 'react';
import { getAdminCustomers } from '../services/adminService';
import type { CustomerInfo } from '../types/customershipment.types';

const ITEMS_PER_PAGE = 10;

export const useAdminCustomers = () => {
    const [customers, setCustomers] = useState<CustomerInfo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const fetchCustomers = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getAdminCustomers();
            setCustomers(data);
        } catch (err: any) {
            setError(err?.response?.data?.message || err?.message || 'Failed to load customers');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCustomers();
    }, [fetchCustomers]);

    // Reset to page 1 whenever searchTerm changes
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    const filteredCustomers = useMemo(() => {
        if (!searchTerm.trim()) return customers;
        const normalized = searchTerm.toLowerCase();
        return customers.filter(c => 
            c.name.toLowerCase().includes(normalized) ||
            c.email.toLowerCase().includes(normalized) ||
            (c.mobile && c.mobile.toLowerCase().includes(normalized)) ||
            (c.address && c.address.toLowerCase().includes(normalized))
        );
    }, [customers, searchTerm]);

    // Derived pagination values
    const totalPages = useMemo(
        () => Math.max(1, Math.ceil(filteredCustomers.length / ITEMS_PER_PAGE)),
        [filteredCustomers.length]
    );

    const paginatedCustomers = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredCustomers.slice(start, start + ITEMS_PER_PAGE);
    }, [filteredCustomers, currentPage]);

    const startIndex = useMemo(
        () => (filteredCustomers.length === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1),
        [filteredCustomers.length, currentPage]
    );

    const endIndex = useMemo(
        () => Math.min(currentPage * ITEMS_PER_PAGE, filteredCustomers.length),
        [filteredCustomers.length, currentPage]
    );

    return {
        customers: filteredCustomers,
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
        refreshCustomers: fetchCustomers
    };
};

export default useAdminCustomers;
