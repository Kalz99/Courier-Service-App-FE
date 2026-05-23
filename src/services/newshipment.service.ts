import API from './apiClient';
import type { CreateShipmentPayload } from '../types/shipment.types';


export const createShipmentApi = async (payload: CreateShipmentPayload) => {
  return await API.post('/shipments/create-shipment', payload);
};
