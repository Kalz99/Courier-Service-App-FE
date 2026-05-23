import API from "./apiClient";
import type { CustomerInfo } from "../types/customershipment.types";

export interface GetCustomersApiResponse {
    success: boolean;
    message: string;
    data: CustomerInfo[];
}

export interface TopCustomerInfo {
    name: string;
    mobile: string;
    businessName: string;
    shipmentCount: number;
}

export interface GetTopCustomersApiResponse {
    success: boolean;
    message: string;
    data: TopCustomerInfo[];
}

/**
 * Fetches the list of customers for the admin view from the backend database.
 */
export const getAdminCustomers = async (): Promise<CustomerInfo[]> => {
    const response = await API.get<GetCustomersApiResponse>("/admin/get-customers");
    return response.data.data;
};

/**
 * Fetches top customer statistics from the backend database.
 */
export const getTopCustomers = async (): Promise<TopCustomerInfo[]> => {
    const response = await API.get<GetTopCustomersApiResponse>("/admin/get-top-customers");
    return response.data.data;
};
