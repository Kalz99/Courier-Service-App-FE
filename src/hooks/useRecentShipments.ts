import { useQuery } from '@tanstack/react-query';
import { getCustomerShipmentsApi } from '../services/shipment.service';
import type { Shipment } from '../types/customershipment.types';

export const useRecentShipments = () => {
    const {
        data: shipments = [],
        isLoading,
        error: queryError,
    } = useQuery<Shipment[], Error>({
        queryKey: ['recent-shipments'],
        queryFn: () => getCustomerShipmentsApi(),
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
        retry: 1,
    });

    const recentShipments = [...shipments]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 6);

    const error = queryError ? queryError.message : null;

    return {
        recentShipments,
        isLoading,
        error,
    };
};
