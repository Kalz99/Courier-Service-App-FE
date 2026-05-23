import API from "./apiClient";

export type ShipmentStatus =
    | "Pending"
    | "In Transit"
    | "Delivered"
    | "Out For Delivery";

export interface Shipment {
    id: string;
    trackingNumber: string;
    recipient: {
        name: string;
        mobile: string;
        address: string;
    };
    shipmentType: string;
    packageType: string;
    packageName: string;
    weight: string;
    status: "pending" | "in_transit" | "out_for_delivery" | "delivered";
    date: string;
}

interface ShipmentApiResponse {
    id: string;
    tracking_number: string;
    recipient_name: string;
    recipient_address: string;
    recipient_phone_number: string;
    shipment_type: string;
    weight: string;
    status: string;
    user_id: string;
    created_at: string;
}

interface GetShipmentsResponse {
    success: boolean;
    message: string;
    data: ShipmentApiResponse[];
}

export interface CreateShipmentPayload {
    recipientName: string;
    recipientPhoneNumber: string;
    recipientAddress: string;
    shipmentType: string;
    weight: number;
}

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

export const getCustomerShipmentsApi = async (): Promise<Shipment[]> => {
    const response = await API.get<GetShipmentsResponse>(
        "/shipments/get-shipment"
    );
    return response.data.data.map(mapShipment);
};

export const createShipmentApi = async (payload: CreateShipmentPayload) => {
    return API.post("/shipments/create-shipment", payload);
};