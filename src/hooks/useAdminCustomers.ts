import {
    useCallback,
    useEffect,
    useState,
    useMemo,
} from "react";
import { getAdminCustomers } from "../services/adminService";
import type { CustomerInfo } from "../types/customershipment.types";

export const useAdminCustomers = () => {
    const [customers, setCustomers] = useState<CustomerInfo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchCustomers = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getAdminCustomers();
            setCustomers(data);
        } catch (err: any) {
            setError(err?.message || "Failed to fetch customer data.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCustomers();
    }, [fetchCustomers]);

    const filteredCustomers = useMemo(() => {
        return customers.filter((customer) => {
            const searchLower = searchTerm.toLowerCase();
            return (
                customer.name.toLowerCase().includes(searchLower) ||
                (customer.company && customer.company.toLowerCase().includes(searchLower)) ||
                customer.email.toLowerCase().includes(searchLower) ||
                (customer.mobile && customer.mobile.toLowerCase().includes(searchLower)) ||
                (customer.address && customer.address.toLowerCase().includes(searchLower))
            );
        });
    }, [customers, searchTerm]);

    return {
        customers: filteredCustomers,
        allCustomersCount: customers.length,
        loading,
        error,
        searchTerm,
        setSearchTerm,
        refreshCustomers: fetchCustomers,
    };
};

export default useAdminCustomers;
