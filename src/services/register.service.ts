import API from './apiClient';
import type { RegisterPayload } from '../types/register.types';


export const registerApi = async (payload: RegisterPayload) => {
  return await API.post('/auth/register', payload);
};
