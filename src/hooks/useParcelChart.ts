import { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { getAdminShipmentsApi, getCustomerShipmentsApi } from '../services/shipment.service';
import type { Shipment } from '../types/customershipment.types';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------
export const CHART_MONTHS = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
] as const;

export const AVAILABLE_YEARS = ['2026', '2025', '2024'] as const;

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------
export const useParcelChart = () => {
    const { user } = useAuth();
    const [selectedYear, setSelectedYear] = useState('2026');
    const [shipments, setShipments] = useState<Shipment[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!user) return;

        const loadData = async () => {
            setIsLoading(true);
            try {
                const data: Shipment[] =
                    user.role === 'admin'
                        ? await getAdminShipmentsApi(1, 1000)
                        : await getCustomerShipmentsApi();
                setShipments(data);
            } catch (err) {
                console.error('Failed to load chart shipments', err);
            } finally {
                setIsLoading(false);
            }
        };

        loadData();
    }, [user]);

    /** Monthly counts (12-element array) for the selected year. */
    const monthlyData = useMemo(() => {
        const counts = Array<number>(12).fill(0);
        shipments.forEach((s) => {
            if (!s.date) return;
            const [year, month] = s.date.split('-');
            if (year === selectedYear) {
                const idx = parseInt(month, 10) - 1;
                if (idx >= 0 && idx < 12) counts[idx]++;
            }
        });
        return counts;
    }, [shipments, selectedYear]);

    /** Highest monthly count — used to normalise bar heights. */
    const maxValue = useMemo(() => Math.max(...monthlyData, 1), [monthlyData]);

    /** Sum of all shipments for the selected year. */
    const totalYearCount = useMemo(
        () => monthlyData.reduce((acc, cur) => acc + cur, 0),
        [monthlyData],
    );

    return {
        selectedYear,
        setSelectedYear,
        monthlyData,
        maxValue,
        totalYearCount,
        isLoading,
    };
};

export default useParcelChart;
