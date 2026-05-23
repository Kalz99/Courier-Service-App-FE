import React, { useState, useMemo } from 'react';
import {
    Search,
    User,
    MapPin,
    Trash2,
    Printer,
    Eye,
    Filter,
    Copy,
    Check,
    Package2
} from 'lucide-react';

export interface EntityDetails {
    name: string;
    mobile: string;
    address: string;
}

export interface ShipmentItem {
    id: string;
    trackingNumber: string;
    sender: EntityDetails;
    receiver: EntityDetails;
    packageName: string;
    packageType: string;
    weight: string;
    status: 'pending' | 'in_transit' | 'out_for_delivery' | 'delivered';
    date: string;
}

export interface AdminShipmentsTableProps {
    shipments?: ShipmentItem[];
    isLoading?: boolean;
    onUpdateStatus?: (id: string, newStatus: ShipmentItem['status']) => void;
    onViewShipment?: (id: string) => void;
    onPrintLabel?: (id: string) => void;
    onDeleteShipment?: (id: string) => void;
    className?: string;
}

const DEFAULT_SHIPMENTS: ShipmentItem[] = [
    {
        id: '1',
        trackingNumber: 'TRK-98234-X',
        sender: { name: 'Apex Electronics', mobile: '+1 (555) 019-2834', address: 'Warehouse A, Los Angeles, CA' },
        receiver: { name: 'John Doe', mobile: '+1 (555) 234-5678', address: '123 Pine St, Seattle, WA' },
        packageName: 'M2 Pro Mac Mini',
        packageType: 'Electronics',
        weight: '1.2 kg',
        status: 'delivered',
        date: '2026-05-22'
    },
    {
        id: '2',
        trackingNumber: 'TRK-48102-Y',
        sender: { name: 'Global Apparel Corp', mobile: '+1 (555) 014-9922', address: 'Distribution Center Hub, New York, NY' },
        receiver: { name: 'Sarah Connor', mobile: '+1 (555) 876-5432', address: '742 Evergreen Ter, Springfield' },
        packageName: 'Heavy Weather Parka',
        packageType: 'Apparel',
        weight: '2.5 kg',
        status: 'in_transit',
        date: '2026-05-21'
    }
];

const STATUS_OPTIONS: { value: ShipmentItem['status']; label: string; colorClass: string }[] = [
    { value: 'pending', label: 'Pending', colorClass: 'text-amber-600 dark:text-amber-400 bg-amber-500/10' },
    { value: 'in_transit', label: 'In Transit', colorClass: 'text-blue-600 dark:text-blue-400 bg-blue-500/10' },
    { value: 'out_for_delivery', label: 'Out for Delivery', colorClass: 'text-purple-600 dark:text-purple-400 bg-purple-500/10' },
    { value: 'delivered', label: 'Delivered', colorClass: 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10' },
];

export const AdminShipmentsTable: React.FC<AdminShipmentsTableProps> = ({
    shipments: initialShipments = DEFAULT_SHIPMENTS,
    isLoading = false,
    onUpdateStatus,
    onViewShipment,
    onPrintLabel,
    onDeleteShipment,
    className = '',
}) => {
    const [localShipments, setLocalShipments] = useState<ShipmentItem[]>(initialShipments);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [copiedId, setCopiedId] = useState<string | null>(null);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const handleCopy = (e: React.MouseEvent, trackingNum: string) => {
        e.stopPropagation();
        navigator.clipboard.writeText(trackingNum);
        setCopiedId(trackingNum);
        setTimeout(() => setCopiedId(null), 1500);
    };

    const handleStatusChange = (id: string, nextStatus: ShipmentItem['status']) => {
        setLocalShipments(prev => prev.map(s => s.id === id ? { ...s, status: nextStatus } : s));
        if (onUpdateStatus) onUpdateStatus(id, nextStatus);
    };

    React.useEffect(() => {
        setLocalShipments(initialShipments);
    }, [initialShipments]);

    React.useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, statusFilter]);

    // Filter & Search Logic
    const filteredShipments = useMemo(() => {
        return localShipments.filter((shipment) => {
            const matchesSearch =
                shipment.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                shipment.sender.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                shipment.receiver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                shipment.packageName.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesStatus = statusFilter === 'all' || shipment.status === statusFilter;
            return matchesSearch && matchesStatus;
        });
    }, [localShipments, searchTerm, statusFilter]);

    const paginatedShipments = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredShipments.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredShipments, currentPage]);

    return (
        <div className={`w-full flex flex-col gap-5 ${className}`}>

            {/* Filter Bar */}
            <div className="flex flex-col gap-4 w-full bg-[var(--sidebar-bg)] border border-[var(--sidebar-border)] rounded-2xl p-4 shadow-sm">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="relative flex-1 w-full">
                        <Search className="absolute left-4 top-3.5 h-5 w-5 text-[var(--color-text-muted)]" />
                        <input
                            type="text"
                            placeholder="Search Tracking ID, Sender, Receiver, or Item..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-[var(--app-bg)] text-sm border border-[var(--sidebar-border)] rounded-xl focus:outline-none focus:border-primary"
                        />
                    </div>

                    <div className="flex items-center gap-2 w-full md:w-auto">
                        <Filter className="w-5 h-5 text-[var(--color-text-muted)] hidden sm:inline-block" />
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="text-sm font-semibold p-3 bg-[var(--app-bg)] text-[var(--color-text-primary)] border border-[var(--sidebar-border)] rounded-xl focus:outline-none min-w-[150px]"
                        >
                            <option value="all">All Statuses</option>
                            <option value="pending">Pending</option>
                            <option value="in_transit">In Transit</option>
                            <option value="out_for_delivery">Out For Delivery</option>
                            <option value="delivered">Delivered</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Table Component */}
            <div className="w-full bg-[var(--sidebar-bg)] border border-[var(--sidebar-border)] rounded-[24px] shadow-sm overflow-hidden">
                <div className="overflow-x-auto w-full">
                    <table className="w-full min-w-[1200px] border-collapse text-left text-sm">
                        <thead>
                            <tr className="border-b border-[var(--sidebar-border)] bg-[var(--app-bg)]/40">
                                <th className="py-3 px-6 font-bold text-sm uppercase tracking-wider text-[var(--color-text-muted)] w-[14%]">Tracking ID</th>
                                <th className="py-3 px-6 font-bold text-sm uppercase tracking-wider text-[var(--color-text-muted)] w-[22%]">Sender Details</th>
                                <th className="py-3 px-6 font-bold text-sm uppercase tracking-wider text-[var(--color-text-muted)] w-[22%]">Receiver Details</th>
                                <th className="py-3 px-6 font-bold text-sm uppercase tracking-wider text-[var(--color-text-muted)] w-[18%]">Item Specs</th>
                                <th className="py-3 px-6 font-bold text-sm uppercase tracking-wider text-[var(--color-text-muted)] w-[14%]">Status</th>
                                <th className="py-3 px-6 font-bold text-sm uppercase tracking-wider text-[var(--color-text-muted)] w-[10%] text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--sidebar-border)]/50 text-sm">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={6} className="py-8 text-center text-sm font-semibold text-[var(--color-text-muted)] animate-pulse">
                                        Retrieving shipments...
                                    </td>
                                </tr>
                            ) : paginatedShipments.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="py-8 text-center text-sm font-semibold text-[var(--color-text-muted)]">
                                        No shipments found matching the filters.
                                    </td>
                                </tr>
                            ) : (
                                paginatedShipments.map((shipment) => {
                                    const isCopied = copiedId === shipment.trackingNumber;

                                    return (
                                        <tr key={shipment.id} className="transition-colors duration-150 hover:bg-[var(--sidebar-active-bg)]/10">

                                            {/* Tracking ID */}
                                            <td className="py-3 px-6 font-mono font-semibold text-sm">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-sm tracking-wide text-[var(--color-text-primary)]">{shipment.trackingNumber}</span>
                                                    <button
                                                        onClick={(e) => handleCopy(e, shipment.trackingNumber)}
                                                        className="p-1.5 rounded bg-[var(--app-bg)] border border border-[var(--sidebar-border)] transition-colors hover:bg-[var(--sidebar-border)]/20"
                                                    >
                                                        {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-[var(--color-text-muted)]" />}
                                                    </button>
                                                </div>
                                            </td>

                                            {/* Sender Details */}
                                            <td className="py-3 px-6 text-sm">
                                                <div className="flex flex-col gap-1">
                                                    <span className="font-bold text-base text-[var(--color-text-primary)] flex items-center gap-1.5">
                                                        <User className="w-4 h-4 opacity-70 text-primary" /> {shipment.sender.name}
                                                    </span>
                                                    <span className="text-sm text-[var(--color-text-muted)] font-medium">{shipment.sender.mobile}</span>
                                                    <span className="text-sm text-[var(--color-text-muted)] font-medium flex items-start gap-1 mt-0.5">
                                                        <MapPin className="w-3.5 h-3.5 text-zinc-400 mt-0.5 shrink-0" />
                                                        <span className="line-clamp-2 leading-relaxed">{shipment.sender.address}</span>
                                                    </span>
                                                </div>
                                            </td>

                                            {/* Receiver Details */}
                                            <td className="py-3 px-6 text-sm">
                                                <div className="flex flex-col gap-1">
                                                    <span className="font-bold text-base text-[var(--color-text-primary)] flex items-center gap-1.5">
                                                        <User className="w-4 h-4 opacity-70 text-emerald-500" /> {shipment.receiver.name}
                                                    </span>
                                                    <span className="text-sm text-[var(--color-text-muted)] font-medium">{shipment.receiver.mobile}</span>
                                                    <span className="text-sm text-[var(--color-text-muted)] font-medium flex items-start gap-1 mt-0.5">
                                                        <MapPin className="w-3.5 h-3.5 text-red-400 mt-0.5 shrink-0" />
                                                        <span className="line-clamp-2 leading-relaxed">{shipment.receiver.address}</span>
                                                    </span>
                                                </div>
                                            </td>

                                            {/* Item About Info */}
                                            <td className="py-3 px-6 text-sm">
                                                <div className="flex flex-col gap-1">
                                                    <span className="font-bold text-base text-[var(--color-text-primary)] flex items-center gap-1.5">
                                                        <Package2 className="w-4 h-4 opacity-80 text-blue-500" /> {shipment.packageName}
                                                    </span>
                                                    <span className="text-sm text-[var(--color-text-muted)] font-medium">
                                                        Type: {shipment.packageType}
                                                    </span>
                                                    <span className="text-sm text-[var(--color-text-primary)] font-semibold bg-zinc-100 dark:bg-zinc-800/60 px-2 py-0.5 rounded border border-[var(--sidebar-border)]/40 w-fit mt-0.5">
                                                        Weight: {shipment.weight}
                                                    </span>
                                                </div>
                                            </td>

                                            {/* Editable Status Modifier */}
                                            <td className="py-3 px-6">
                                                <select
                                                    value={shipment.status}
                                                    onChange={(e) => handleStatusChange(shipment.id, e.target.value as ShipmentItem['status'])}
                                                    className={`text-sm font-bold px-2.5 py-2 rounded-xl border border-[var(--sidebar-border)] w-full max-w-[150px] focus:outline-none transition-all cursor-pointer ${STATUS_OPTIONS.find(opt => opt.value === shipment.status)?.colorClass || ''}`}
                                                >
                                                    {STATUS_OPTIONS.map((opt) => (
                                                        <option key={opt.value} value={opt.value} className="bg-white dark:bg-zinc-900 text-black dark:text-white font-medium">
                                                            {opt.label}
                                                        </option>
                                                    ))}
                                                </select>
                                            </td>

                                            {/* Row Actions: View, Print, Delete */}
                                            <td className="py-3 px-6 text-center">
                                                <div className="flex items-center justify-center gap-2">
                                                    <button
                                                        onClick={() => onViewShipment?.(shipment.id)}
                                                        title="View Shipment Details"
                                                        className="p-2 text-[var(--color-text-muted)] hover:text-primary transition-colors border border-[var(--sidebar-border)] rounded-lg hover:bg-[var(--app-bg)] shadow-sm"
                                                    >
                                                        <Eye className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => onPrintLabel?.(shipment.id)}
                                                        title="Print Shipping Label"
                                                        className="p-2 text-[var(--color-text-muted)] hover:text-blue-500 transition-colors border border-[var(--sidebar-border)] rounded-lg hover:bg-[var(--app-bg)] shadow-sm"
                                                    >
                                                        <Printer className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => onDeleteShipment?.(shipment.id)}
                                                        title="Delete Shipment"
                                                        className="p-2 text-[var(--color-text-muted)] hover:text-red-500 transition-colors border border-[var(--sidebar-border)] rounded-lg hover:bg-red-500/5 shadow-sm"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination Footer */}
            {filteredShipments.length > itemsPerPage && (
                <div className="flex items-center justify-between px-6 py-4 bg-[var(--sidebar-bg)] border border-[var(--sidebar-border)] rounded-2xl shadow-sm mt-2 select-none">
                    <span className="text-xs text-[var(--color-text-muted)] font-semibold">
                        Showing <strong className="text-[var(--color-text-primary)]">{(currentPage - 1) * itemsPerPage + 1}</strong> to <strong className="text-[var(--color-text-primary)]">{Math.min(currentPage * itemsPerPage, filteredShipments.length)}</strong> of <strong className="text-[var(--color-text-primary)]">{filteredShipments.length}</strong> items
                    </span>
                    <div className="flex items-center gap-1.5">
                        <button
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            className="px-3 py-1.5 rounded-lg border border-[var(--sidebar-border)] bg-[var(--app-bg)] text-xs font-bold text-[var(--color-text-muted)] hover:text-primary transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            Previous
                        </button>
                        <button
                            disabled={currentPage * itemsPerPage >= filteredShipments.length}
                            onClick={() => setCurrentPage(prev => prev + 1)}
                            className="px-3 py-1.5 rounded-lg border border-[var(--sidebar-border)] bg-[var(--app-bg)] text-xs font-bold text-[var(--color-text-muted)] hover:text-primary transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminShipmentsTable;