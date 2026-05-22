import API from './apiClient';

export interface LoginPayload {
  email: string;
  password: string;
}

export const loginApi = async (payload: LoginPayload) => {
  return await API.post('/auth/login', payload);
};
