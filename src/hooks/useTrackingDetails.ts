import { useQuery } from '@tanstack/react-query';
import { trackShipmentApi } from '../services/shipment.service';
import type { TrackingHistoryItem } from '../types/tracking.types';

export const useTrackingDetails = (trackingNumber: string | null, isOpen: boolean) => {
    const {
        data: history = [],
        isLoading,
        error: queryError,
    } = useQuery<TrackingHistoryItem[], any>({
        queryKey: ['tracking-details', trackingNumber],
        queryFn: () => {
            if (!trackingNumber) throw new Error("Tracking number is required");
            return trackShipmentApi(trackingNumber);
        },
        enabled: Boolean(isOpen && trackingNumber),
        staleTime: 1000 * 60 * 5, // 5 minutes
        refetchOnWindowFocus: false,
        retry: 1,
    });

    const error = queryError
        ? (queryError?.response?.data?.message || queryError?.message || "Failed to load tracking details")
        : null;

    return {
        history,
        isLoading,
        error,
    };
};
