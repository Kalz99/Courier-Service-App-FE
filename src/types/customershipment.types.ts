export type ShipmentStatus =
    | "Pending"
    | "In Transit"
    | "Delivered"
    | "Out For Delivery";

export interface RecipientDetails {
    name: string;
    mobile: string;
    address: string;
}

export interface Shipment {
    id: string;
    trackingNumber: string;
    recipient: RecipientDetails;
    shipmentType: string;
    packageType: string;
    packageName: string;
    weight: string;
    status: "pending" | "in_transit" | "out_for_delivery" | "delivered";
    date: string;
}

export interface ShipmentItem {
    id: string;
    trackingNumber: string;
    recipient: RecipientDetails;
    packageType: string;
    packageName: string;
    status: "pending" | "in_transit" | "out_for_delivery" | "delivered";
    date: string;
    weight?: string;
}

export interface ShipmentApiResponse {
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

export interface GetShipmentsResponse {
    success: boolean;
    message: string;
    data: ShipmentApiResponse[];
}
