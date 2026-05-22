import API from './apiClient';

export interface CreateShipmentPayload {
  recipientName: string;
  recipientAddress: string;
  recipientPhoneNumber: string;
  shipmentType: string;
  weight: number;
}

/**
 * Sends a request to the backend to create a new shipment
 * @param payload - Recipient details, type, and weight in kilograms
 */
export const createShipmentApi = async (payload: CreateShipmentPayload) => {
  return await API.post('/shipments/create-shipment', payload);
};
