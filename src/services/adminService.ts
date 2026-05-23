import type { CustomerInfo } from '../types/customershipment.types';

// Mock data representing customers
const MOCK_CUSTOMERS: CustomerInfo[] = [
    {
        name: 'John Doe',
        company: 'Acme Corp',
        mobile: '+1 (555) 019-2834',
        email: 'john.doe@acme.com',
        address: '123 Enterprise Way, Suite 500, New York, NY 10001',
        totalPackagesReceived: 142
    },
    {
        name: 'Sarah Connor',
        company: 'Cyberdyne Systems',
        mobile: '+1 (555) 014-9988',
        email: 'sconnor@cyberdyne.co',
        address: '456 Tech Boulevard, Los Angeles, CA 90025',
        totalPackagesReceived: 89
    },
    {
        name: 'Bruce Wayne',
        company: 'Wayne Enterprises',
        mobile: '+1 (555) 017-1122',
        email: 'bwayne@waynecorp.com',
        address: '1007 Mountain Drive, Gotham City, NJ 07001',
        totalPackagesReceived: 512
    },
    {
        name: 'Alice Johnson',
        company: 'Starlight Retailers',
        mobile: '+1 (555) 012-3456',
        email: 'alice.j@starlight.com',
        address: '789 Market Street, San Francisco, CA 94103',
        totalPackagesReceived: 63
    },
    {
        name: 'Robert Carter',
        company: 'Vanguard Logistics',
        mobile: '+1 (555) 016-7890',
        email: 'r.carter@vanguard.io',
        address: '321 Port Terminal Rd, Seattle, WA 98104',
        totalPackagesReceived: 215
    },
    {
        name: 'Elena Rostova',
        company: 'Apex Trading Ltd',
        mobile: '+1 (555) 018-4433',
        email: 'elena@apextrading.com',
        address: '88 Financial Plaza, Chicago, IL 60603',
        totalPackagesReceived: 104
    }
];

/**
 * Simulates fetching the list of customers for the admin view.
 * Simulates a small network delay to test loading states.
 */
export const getAdminCustomers = async (): Promise<CustomerInfo[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(MOCK_CUSTOMERS);
        }, 800); // 800ms simulated network latency
    });
};
