import { useState, useEffect } from 'react';
import { trackShipmentApi } from '../services/shipment.service';
import type { TrackingHistoryItem } from '../types/tracking.types';

export const useTrackingDetails = (trackingNumber: string | null, isOpen: boolean) => {
    const [history, setHistory] = useState<TrackingHistoryItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!isOpen || !trackingNumber) {
            setHistory([]);
            setError(null);
            return;
        }

        let isMounted = true;
        const fetchTrackingData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const data = await trackShipmentApi(trackingNumber);
                if (isMounted) {
                    setHistory(data);
                }
            } catch (err: any) {
                if (isMounted) {
                    console.error("Error fetching tracking details:", err);
                    setError(err?.response?.data?.message || err?.message || "Failed to load tracking details");
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        fetchTrackingData();

        return () => {
            isMounted = false;
        };
    }, [isOpen, trackingNumber]);

    return {
        history,
        isLoading,
        error
    };
};
