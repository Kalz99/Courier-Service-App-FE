import { useState, useEffect, useCallback, useMemo } from 'react';
import { getAdminCustomers } from '../services/adminService';
import type { CustomerInfo } from '../types/customershipment.types';

export const useAdminCustomers = () => {
    const [customers, setCustomers] = useState<CustomerInfo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

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

    return {
        customers: filteredCustomers,
        loading,
        error,
        searchTerm,
        setSearchTerm,
        refreshCustomers: fetchCustomers
    };
};

export default useAdminCustomers;
