import React from 'react';
import { AdminShipmentsTable } from '../components/ui';


const AdminShipments: React.FC = () => {
    return (
        <div className="flex flex-col gap-8 w-full animate-fade-in">
            <AdminShipmentsTable />
        </div>
    );
};

export default AdminShipments;
