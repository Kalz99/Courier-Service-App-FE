import API from "./apiClient";
import type { CustomerInfo } from "../types/customershipment.types";

export interface GetCustomersApiResponse {
    success: boolean;
    message: string;
    data: CustomerInfo[];
}

/**
 * Fetches the list of customers for the admin view from the backend database.
 */
export const getAdminCustomers = async (): Promise<CustomerInfo[]> => {
    const response = await API.get<GetCustomersApiResponse>("/customers/get-customers");
    return response.data.data;
};
