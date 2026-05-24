import { useQuery } from '@tanstack/react-query';
import API from '../services/apiClient';

interface StatusCounts {
    Pending: number;
    'In Transit': number;
    'Out for Delivery': number;
    Delivered: number;
    Cancelled: number;
}

interface StatusCountsResponse {
    success: boolean;
    message: string;
    data: StatusCounts;
}

const DEFAULT_COUNTS: StatusCounts = {
    Pending: 0,
    'In Transit': 0,
    'Out for Delivery': 0,
    Delivered: 0,
    Cancelled: 0,
};

const fetchAdminStatusCounts = async (): Promise<StatusCounts> => {
    const response = await API.get<StatusCountsResponse>('/admin/get-status-counts');
    return response.data.data;
};

const fetchMyStatusCounts = async (): Promise<StatusCounts> => {
    const response = await API.get<StatusCountsResponse>('/shipments/get-my-status-counts');
    return response.data.data;
};

export const useAdminStatusCounts = () => {
    const { data = DEFAULT_COUNTS, isLoading, error } = useQuery<StatusCounts, Error>({
        queryKey: ['admin-status-counts'],
        queryFn: fetchAdminStatusCounts,
        staleTime: 0,
        refetchOnWindowFocus: false,
        retry: 1,
    });

    return { counts: data, isLoading, error: error?.message ?? null };
};

export const useMyStatusCounts = () => {
    const { data = DEFAULT_COUNTS, isLoading, error } = useQuery<StatusCounts, Error>({
        queryKey: ['my-status-counts'],
        queryFn: fetchMyStatusCounts,
        staleTime: 0,
        refetchOnWindowFocus: false,
        retry: 1,
    });

    return { counts: data, isLoading, error: error?.message ?? null };
};
