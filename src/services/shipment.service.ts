import API from "./apiClient";

import type {
    Shipment,
    ShipmentApiResponse,
    GetShipmentsResponse,
} from "../types/customershipment.types";
import type { CreateShipmentPayload } from "../types/shipment.types";
import type { TrackingHistoryItem, TrackShipmentResponse } from "../types/tracking.types";


const SHIPMENT_TYPE_LABELS: Record<string, string> = {
    document: "Document / Letter",
    package_box: "Standard Package / Box",
    pallet: "Pallet / Bulk Crate",
    perishable: "Perishable Goods / Food",
    medical: "Pharmaceutical / Medical",
};

const getMappedStatus = (
    status: string
): "pending" | "in_transit" | "out_for_delivery" | "delivered" => {
    const cleaned = status.toLowerCase().replace(/\s+/g, "_");
    if (cleaned === "out_for_delivery" || cleaned === "in_transit" || cleaned === "delivered") {
        return cleaned as any;
    }
    return "pending";
};

const mapShipment = (
    shipment: ShipmentApiResponse
): Shipment => {
    return {
        id: shipment.id,
        trackingNumber: shipment.tracking_number,
        recipient: {
            name: shipment.recipient_name,
            mobile: shipment.recipient_phone_number,
            address: shipment.recipient_address,
        },
        shipmentType: shipment.shipment_type,
        packageType: shipment.shipment_type,
        packageName: SHIPMENT_TYPE_LABELS[shipment.shipment_type] || "Standard Shipment",
        weight: `${shipment.weight} kg`,
        status: getMappedStatus(shipment.status),
        date: shipment.created_at.split("T")[0],
    };
};

<<<<<<< Updated upstream
=======
export const getAdminShipmentsApi = async (page: number = 1, limit: number = 10, tracking?: string): Promise<Shipment[]> => {
    const response = await API.get<GetShipmentsResponse>(
        "/admin/get-shipment",
        {
            params: {
                limit,
                offset: (page - 1) * limit,
                tracking: tracking || undefined
            },
        }
    );
    return response.data.data.map(mapShipment);
};

>>>>>>> Stashed changes
export const getCustomerShipmentsApi = async (tracking?: string): Promise<Shipment[]> => {
    const response = await API.get<GetShipmentsResponse>(
        "/shipments/get-shipment",
        {
            params: tracking ? { tracking } : undefined,
        }
    );
    return response.data.data.map(mapShipment);
};

export const createShipmentApi = async (payload: CreateShipmentPayload) => {
    return API.post("/shipments/create-shipment", payload);
};

export const trackShipmentApi = async (tracking: string): Promise<TrackingHistoryItem[]> => {
    const response = await API.get<TrackShipmentResponse>(
        "/shipments/track-shipment",
        {
            params: { tracking },
        }
    );
    return response.data.data;
};
<<<<<<< Updated upstream
=======

export const updateShipmentStatusApi = async (id: string, status: string): Promise<any> => {
    return API.patch(`/admin/update-shipment/${id}/status`, { status });
};

>>>>>>> Stashed changes
