export interface ShipmentFormData {
  recipientName: string;
  recipientPhoneNumber: string;
  recipientAddress: string;
  shipmentType: string;
  weight: string;
  weightUnit: 'kg' | 'g';
}

export interface ShipmentFormErrors {
  recipientName: string;
  recipientPhoneNumber: string;
  recipientAddress: string;
  shipmentType: string;
  weight: string;
}

export interface CreateShipmentPayload {
  recipientName: string;
  recipientAddress: string;
  recipientPhoneNumber: string;
  shipmentType: string;
  weight: number;
}