export interface TrackingHistoryItem {
    id: string;
    shipment_id: string;
    status: string;
    updated_by: string;
    created_at: string;
}

export interface TrackShipmentResponse {
    success: boolean;
    message: string;
    data: TrackingHistoryItem[];
}
