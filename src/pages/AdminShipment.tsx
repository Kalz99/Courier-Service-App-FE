import React from 'react';
import { AdminShipmentsTable } from '../components/ui';

/**
 * AdminShipments page – displays the AdminShipmentsTable within the application layout.
 * This page is intended for internal logistics staff to manage shipments, assign drivers,
 * update statuses, and perform administrative actions.
 */
const AdminShipments: React.FC = () => {
    return (
        <div className="flex flex-col gap-8 w-full animate-fade-in">
            <AdminShipmentsTable />
        </div>
    );
};

export default AdminShipments;
