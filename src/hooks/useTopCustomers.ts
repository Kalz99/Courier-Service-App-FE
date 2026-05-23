import { useQuery } from '@tanstack/react-query';
import { getTopCustomers } from '../services/adminService';
import type { TopCustomerInfo } from '../services/adminService';

const TOP_CUSTOMERS_LIMIT = 5;

export const useTopCustomers = () => {
    const {
        data: topCustomers = [],
        isLoading,
        error: queryError,
    } = useQuery<TopCustomerInfo[], Error>({
        queryKey: ['top-customers'],
        queryFn: () => getTopCustomers(),
        staleTime: 1000 * 60 * 5, // 5 minutes
        refetchOnWindowFocus: false,
        retry: 1,
        select: (data) => data.slice(0, TOP_CUSTOMERS_LIMIT),
    });

    const error = queryError
        ? (queryError.message || 'Failed to load top customers.')
        : null;

    return {
        topCustomers,
        isLoading,
        error,
    };
};

export default useTopCustomers;
