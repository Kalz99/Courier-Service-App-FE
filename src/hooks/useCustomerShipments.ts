import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  getCustomerShipmentsApi,
  type Shipment,
} from "../services/shipment.service";

export const useCustomerShipments =
  () => {
    const [shipments, setShipments] =
      useState<Shipment[]>([]);

    const [loading, setLoading] =
      useState(true);

    const [error, setError] =
      useState<string | null>(null);

    const fetchShipments =
      useCallback(async () => {
        setLoading(true);

        setError(null);

        try {
          const data =
            await getCustomerShipmentsApi();

          setShipments(data);
        } catch (
        error: unknown
        ) {
          let message =
            "Failed to load shipments";

          if (
            error instanceof Error
          ) {
            message =
              error.message;
          }

          setError(message);
        } finally {
          setLoading(false);
        }
      }, []);

    useEffect(() => {
      fetchShipments();
    }, [fetchShipments]);

    return {
      shipments,

      loading,

      error,

      refreshShipments:
        fetchShipments,
    };
  };

export default useCustomerShipments;