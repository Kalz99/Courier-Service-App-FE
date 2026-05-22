import API from './apiClient';

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  address: string;
  businessName: string;
  phone: string;
}

export const registerApi = async (payload: RegisterPayload) => {
  return await API.post('/auth/register', payload);
};
