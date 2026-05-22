import React, { useState, useMemo } from 'react';
import {
    Search,
    Inbox,
    Package,
    Layers,
    ShieldAlert,
    HeartPulse,
    Truck,
    CheckCircle2,
    Clock,
    Compass,
    Copy,
    Check,
    ChevronLeft,
    ChevronRight,
    Filter,
    User,
    Phone,
    MapPin,
    ExternalLink
} from 'lucide-react';
// import { Button } from './Button'; // removed unused Button import

interface RecipientDetails {
    name: string;
    mobile: string;
    address: string;
}

export interface ShipmentItem {
    id: string;
    trackingNumber: string;
    recipient: RecipientDetails;
    packageType: string;
    packageName: string;
    status: 'pending' | 'in_transit' | 'out_for_delivery' | 'delivered';
    date: string;
    weight?: string;
}

export interface CustomerShipmentsTableProps {
    shipments?: ShipmentItem[];
    isLoading?: boolean;
    onTrackShipment?: (trackingNumber: string) => void;
    className?: string;
}

const DEFAULT_SHIPMENTS: ShipmentItem[] = [
    {
        id: '1',
        trackingNumber: 'TRK-98234-X',
        recipient: {
            name: 'John Doe',
            mobile: '+1 (555) 234-5678',
            address: '123 Pine Street, Apt 4B, Seattle, WA 98101'
        },
        packageType: 'document',
        packageName: 'Important Legal Docs',
        status: 'delivered',
        date: '2026-05-22',
        weight: '0.4 kg'
    },
    {
        id: '2',
        trackingNumber: 'TRK-48102-Y',
        recipient: {
            name: 'Sarah Connor',
            mobile: '+1 (555) 876-5432',
            address: '742 Evergreen Terrace, Springfield, OR 97477'
        },
        packageType: 'package_box',
        packageName: 'Standard Package / Box',
        status: 'in_transit',
        date: '2026-05-21',
        weight: '4.2 kg'
    },
    {
        id: '3',
        trackingNumber: 'TRK-30291-A',
        recipient: {
            name: 'Bruce Wayne',
            mobile: '+1 (555) 999-1111',
            address: '1007 Mountain Drive, Gotham City, NJ 07001'
        },
        packageType: 'pallet',
        packageName: 'Industrial Bulk Crates',
        status: 'pending',
        date: '2026-05-22',
        weight: '120.0 kg'
    },
    {
        id: '4',
        trackingNumber: 'TRK-88231-Z',
        recipient: {
            name: 'Peter Parker',
            mobile: '+1 (555) 444-2222',
            address: '20 Ingram Street, Queens, NY 11375'
        },
        packageType: 'medical',
        packageName: 'Pharmaceutical / Vaccine Pack',
        status: 'out_for_delivery',
        date: '2026-05-22',
        weight: '1.8 kg'
    },
    {
        id: '5',
        trackingNumber: 'TRK-10928-B',
        recipient: {
            name: 'Tony Stark',
            mobile: '+1 (555) 300-3000',
            address: '10880 Malibu Point, Malibu, CA 90265'
        },
        packageType: 'perishable',
        packageName: 'Perishable Gourmet Food',
        status: 'delivered',
        date: '2026-05-20',
        weight: '3.5 kg'
    },
    {
        id: '6',
        trackingNumber: 'TRK-77123-K',
        recipient: {
            name: 'Clark Kent',
            mobile: '+1 (555) 777-8888',
            address: '344 Clinton Street, Apt 3B, Metropolis, NY 10001'
        },
        packageType: 'document',
        packageName: 'Press Press Release Envelopes',
        status: 'in_transit',
        date: '2026-05-22',
        weight: '0.2 kg'
    },
    {
        id: '7',
        trackingNumber: 'TRK-55248-L',
        recipient: {
            name: 'Diana Prince',
            mobile: '+1 (555) 123-0987',
            address: 'Gateway City Museum, Washington, DC 20004'
        },
        packageType: 'package_box',
        packageName: 'Fragile Antique Vase',
        status: 'pending',
        date: '2026-05-21',
        weight: '8.7 kg'
    }
];

const getStatusStyles = (status: string) => {
    switch (status) {
        case 'delivered':
            return {
                bg: 'bg-emerald-500/10 dark:bg-emerald-500/15',
                text: 'text-emerald-600 dark:text-emerald-400 border border-emerald-500/20',
                dot: 'bg-emerald-500',
                icon: <CheckCircle2 className="w-3.5 h-3.5 mr-1.5 shrink-0" />,
                label: 'Delivered',
            };
        case 'in_transit':
            return {
                bg: 'bg-[var(--color-primary-glow)]',
                text: 'text-primary dark:text-[var(--color-primary)] border border-primary/20',
                dot: 'bg-primary',
                icon: <Truck className="w-3.5 h-3.5 mr-1.5 shrink-0" />,
                label: 'In Transit',
            };
        case 'out_for_delivery':
            return {
                bg: 'bg-blue-500/10 dark:bg-blue-500/15',
                text: 'text-blue-600 dark:text-blue-400 border border-blue-500/20',
                dot: 'bg-blue-500',
                icon: <Compass className="w-3.5 h-3.5 mr-1.5 shrink-0" />,
                label: 'Out for Delivery',
            };
        default:
            return {
                bg: 'bg-amber-500/10 dark:bg-amber-500/15',
                text: 'text-amber-600 dark:text-amber-400 border border-amber-500/20',
                dot: 'bg-amber-500',
                icon: <Clock className="w-3.5 h-3.5 mr-1.5 shrink-0" />,
                label: 'Pending',
            };
    }
};

const getPackageIcon = (type: string) => {
    switch (type) {
        case 'document':
            return <Inbox className="w-4 h-4 text-primary shrink-0" />;
        case 'package_box':
            return <Package className="w-4 h-4 text-primary shrink-0" />;
        case 'pallet':
            return <Layers className="w-4 h-4 text-primary shrink-0" />;
        case 'perishable':
            return <ShieldAlert className="w-4 h-4 text-primary shrink-0" />;
        case 'medical':
            return <HeartPulse className="w-4 h-4 text-primary shrink-0" />;
        default:
            return <Package className="w-4 h-4 text-primary shrink-0" />;
    }
};

export const CustomerShipmentsTable: React.FC<CustomerShipmentsTableProps> = ({
    shipments = DEFAULT_SHIPMENTS,
    isLoading = false,
    onTrackShipment,
    className = '',
}) => {
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

    // Filter & Search Logic
    const filteredShipments = useMemo(() => {
        return shipments.filter((shipment) => {
            const matchesSearch =
                shipment.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                shipment.recipient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                shipment.recipient.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                shipment.packageName.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesStatus = statusFilter === 'all' || shipment.status === statusFilter;

            return matchesSearch && matchesStatus;
        });
    }, [shipments, searchTerm, statusFilter]);

    // Reset page when filter changes
    React.useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, statusFilter]);

    // Pagination Logic
    const totalPages = Math.ceil(filteredShipments.length / itemsPerPage);
    const paginatedShipments = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredShipments.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredShipments, currentPage]);

    const startIndex = (currentPage - 1) * itemsPerPage + 1;
    const endIndex = Math.min(currentPage * itemsPerPage, filteredShipments.length);

    return (
        <div className={`w-full flex flex-col gap-5 ${className}`}>
            {/* Search & Filter Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full bg-[var(--sidebar-bg)] border border-[var(--sidebar-border)] rounded-2xl p-4 shadow-[0_4px_16px_rgba(0,0,0,0.02)]">
                {/* Search Input */}
                <div className="relative flex-1 max-w-md w-full">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                        <Search className="h-4.5 w-4.5 text-[var(--color-text-muted)]" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search by tracking #, recipient name, address..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-[var(--app-bg)] text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)]/60 text-sm border border-[var(--sidebar-border)] rounded-xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-[var(--color-primary-glow)] transition-all duration-200"
                    />
                </div>

                {/* Status Filter Badges */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none shrink-0">
                    <span className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mr-2 hidden md:inline-block">
                        Filter:
                    </span>
                    {[
                        { value: 'all', label: 'All' },
                        { value: 'pending', label: 'Pending' },
                        { value: 'in_transit', label: 'In Transit' },
                        { value: 'out_for_delivery', label: 'Out for Delivery' },
                        { value: 'delivered', label: 'Delivered' }
                    ].map((tab) => {
                        const isActive = statusFilter === tab.value;
                        return (
                            <button
                                key={tab.value}
                                onClick={() => setStatusFilter(tab.value)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide border cursor-pointer select-none transition-all duration-200 ${isActive
                                    ? 'border-primary bg-[var(--sidebar-active-bg)] text-primary shadow-[0_2px_10px_var(--color-primary-glow)]'
                                    : 'border-[var(--sidebar-border)] bg-[var(--app-bg)] text-[var(--color-text-muted)] hover:border-primary/30 hover:text-primary'
                                    }`}
                            >
                                {tab.label}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Main Table Container */}
            <div className="w-full bg-[var(--sidebar-bg)] border border-[var(--sidebar-border)] rounded-[24px] shadow-[var(--sidebar-shadow)] overflow-hidden">
                <div className="overflow-x-auto w-full">
                    {isLoading || paginatedShipments.length > 0 ? (
                        <table className="w-full min-w-[900px] border-collapse text-left text-sm select-none">
                            <thead>
                                <tr className="border-b border-[var(--sidebar-border)] bg-[var(--app-bg)]/40">
                                    <th className="py-4.5 px-6 font-bold text-xs uppercase tracking-wider text-[var(--color-text-muted)] select-none w-[18%]">
                                        Tracking Number
                                    </th>
                                    <th className="py-4.5 px-6 font-bold text-xs uppercase tracking-wider text-[var(--color-text-muted)] select-none w-[30%]">
                                        Recipient Details
                                    </th>
                                    <th className="py-4.5 px-6 font-bold text-xs uppercase tracking-wider text-[var(--color-text-muted)] select-none w-[30%]">
                                        Package Details
                                    </th>
                                    <th className="py-4.5 px-6 font-bold text-xs uppercase tracking-wider text-[var(--color-text-muted)] select-none w-[26%]">
                                        Status
                                    </th>
                                    <th className="py-4.5 px-6 font-bold text-xs uppercase tracking-wider text-[var(--color-text-muted)] select-none w-[6%] text-center">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[var(--sidebar-border)]/50">
                                {isLoading ? (
                                    Array.from({ length: 5 }).map((_, index) => (
                                        <tr key={index} className="bg-transparent">
                                            {/* Tracking ID column */}
                                            <td className="py-4.5 px-6">
                                                <div className="flex items-center gap-2">
                                                    <div className="h-4 w-28 bg-[var(--sidebar-border)]/40 rounded animate-pulse" />
                                                    <div className="w-8 h-8 rounded-md bg-[var(--sidebar-border)]/40 animate-pulse shrink-0" />
                                                </div>
                                            </td>

                                            {/* Recipient Details column */}
                                            <td className="py-4.5 px-6">
                                                <div className="flex flex-col gap-2">
                                                    <div className="h-4 w-36 bg-[var(--sidebar-border)]/40 rounded animate-pulse" />
                                                    <div className="h-3 w-28 bg-[var(--sidebar-border)]/40 rounded animate-pulse" />
                                                    <div className="h-3 w-52 bg-[var(--sidebar-border)]/40 rounded animate-pulse" />
                                                </div>
                                            </td>

                                            {/* Package Details column */}
                                            <td className="py-4.5 px-6 text-left">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-9 h-9 rounded-lg bg-[var(--sidebar-border)]/40 animate-pulse shrink-0" />
                                                    <div className="flex flex-col gap-1.5 flex-1 max-w-[140px]">
                                                        <div className="h-4 bg-[var(--sidebar-border)]/40 rounded animate-pulse" />
                                                        <div className="h-3 w-16 bg-[var(--sidebar-border)]/40 rounded animate-pulse" />
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Status column */}
                                            <td className="py-4.5 px-6">
                                                <div className="h-6 w-24 rounded-full bg-[var(--sidebar-border)]/40 animate-pulse" />
                                            </td>

                                            {/* Action column */}
                                            <td className="py-4.5 px-6 text-center">
                                                <div className="h-7 w-16 rounded-lg bg-[var(--sidebar-border)]/40 animate-pulse mx-auto" />
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    paginatedShipments.map((shipment) => {
                                        const styleInfo = getStatusStyles(shipment.status);
                                        const isCopied = copiedId === shipment.trackingNumber;
                                        return (
                                            <tr
                                                key={shipment.id}
                                                className="hover:bg-[var(--sidebar-active-bg)]/20 transition-colors duration-150 group"
                                            >
                                                <td className="py-4.5 px-6 font-mono font-semibold text-[var(--color-text-primary)]">
                                                    <div className="flex items-center gap-2">
                                                        <span className="tracking-tight select-all">{shipment.trackingNumber}</span>
                                                        <button
                                                            onClick={(e) => handleCopy(e, shipment.trackingNumber)}
                                                            title="Copy Tracking ID"
                                                            className={`p-1.5 rounded-md border border-[var(--sidebar-border)] bg-[var(--app-bg)] cursor-pointer hover:bg-primary/5 hover:border-primary/30 transition-all duration-200 ${isCopied ? 'text-emerald-500 border-emerald-500/30' : 'text-[var(--color-text-muted)]'
                                                                }`}
                                                        >
                                                            {isCopied ? (
                                                                <Check className="w-3.5 h-3.5 animate-scale-in" />
                                                            ) : (
                                                                <Copy className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
                                                            )}
                                                        </button>
                                                    </div>
                                                </td>

                                                {/* Recipient details column */}
                                                <td className="py-4.5 px-6">
                                                    <div className="flex flex-col gap-1.5">
                                                        <span className="font-bold text-[var(--color-text-primary)] flex items-center gap-1.5">
                                                            <User className="w-3.5 h-3.5 text-primary shrink-0 opacity-80" />
                                                            {shipment.recipient.name}
                                                        </span>
                                                        <span className="text-xs text-[var(--color-text-muted)] font-medium flex items-center gap-1.5 leading-none">
                                                            <Phone className="w-3 h-3 text-[var(--color-text-muted)]/70 shrink-0" />
                                                            {shipment.recipient.mobile}
                                                        </span>
                                                        <span className="text-xs text-[var(--color-text-muted)]/90 font-medium flex items-start gap-1.5 leading-snug">
                                                            <MapPin className="w-3.5 h-3.5 text-[var(--color-text-muted)]/70 shrink-0 mt-0.5" />
                                                            {shipment.recipient.address}
                                                        </span>
                                                    </div>
                                                </td>

                                                {/* Package details column */}
                                                <td className="py-4.5 px-2 text-left">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex items-center justify-center p-2 rounded-lg bg-primary/10 border border-primary/15 shrink-0 transition-transform duration-200 group-hover:scale-105">
                                                            {getPackageIcon(shipment.packageType)}
                                                        </div>
                                                        <div className="flex flex-col gap-0.5 min-w-0">
                                                            <span className="font-semibold text-sm text-[var(--color-text-primary)] truncate">
                                                                {shipment.packageName}
                                                            </span>
                                                            <span className="text-xs text-[var(--color-text-muted)] font-medium capitalize">
                                                                {{
                                                                    document: 'Document / Letter',
                                                                    package_box: 'Standard Package / Box',
                                                                    pallet: 'Pallet / Bulk Crate',
                                                                    perishable: 'Perishable Goods / Food',
                                                                    medical: 'Pharmaceutical / Medical',
                                                                }[shipment.packageType]}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* Status column */}
                                                <td className="py-4.5 px-6">
                                                    <div className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider select-none ${styleInfo.bg} ${styleInfo.text}`}>
                                                        <span className={`w-1.5 h-1.5 rounded-full mr-2 shrink-0 ${styleInfo.dot}`} />
                                                        {styleInfo.label}
                                                    </div>
                                                </td>

                                                {/* View Action column */}
                                                <td className="py-4.5 px-6 text-center">
                                                    <button
                                                        onClick={() => onTrackShipment?.(shipment.trackingNumber)}
                                                        className="py-1.5 px-5 rounded-lg text-xs font-bold bg-primary hover:bg-primary-hover text-white flex items-center justify-center gap-1 mx-auto transition-transform duration-200 hover:scale-105 active:scale-98 shadow-[0_2px_8px_var(--color-primary-glow)] min-w-[100px]"
                                                    >
                                                        Track
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    ) : (
                        <div className="w-full flex flex-col items-center justify-center py-14 px-6 text-center gap-4.5 bg-[var(--sidebar-bg)] rounded-[24px]">
                            <div className="flex items-center justify-center p-4 rounded-full bg-[var(--app-bg)] border border-[var(--sidebar-border)] text-[var(--color-text-muted)]">
                                <Inbox className="w-10 h-10 opacity-40" />
                            </div>
                            <div className="flex flex-col gap-1 max-w-sm">
                                <span className="text-base font-bold text-[var(--color-text-primary)]">
                                    No shipments found
                                </span>
                                <span className="text-xs text-[var(--color-text-muted)] leading-relaxed">
                                    We couldn't find any shipments matching your search term or active filters. Try searching for something else.
                                </span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Table Pagination Footer */}
                {!isLoading && filteredShipments.length > 0 && (
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4.5 bg-[var(--app-bg)]/35 border-t border-[var(--sidebar-border)] select-none">
                        <span className="text-xs font-medium text-[var(--color-text-muted)]">
                            Showing <span className="font-bold text-[var(--color-text-primary)]">{startIndex}</span> to{' '}
                            <span className="font-bold text-[var(--color-text-primary)]">{endIndex}</span> of{' '}
                            <span className="font-bold text-[var(--color-text-primary)]">{filteredShipments.length}</span> shipments
                        </span>

                        {totalPages > 1 && (
                            <div className="flex items-center gap-2">
                                <button
                                    disabled={currentPage === 1}
                                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                    className="p-1.5 rounded-lg border border-[var(--sidebar-border)] bg-[var(--sidebar-bg)] cursor-pointer text-[var(--color-text-muted)] hover:border-primary hover:text-primary disabled:opacity-40 disabled:hover:border-[var(--sidebar-border)] disabled:hover:text-[var(--color-text-muted)] disabled:cursor-not-allowed transition-all duration-200"
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                </button>

                                {Array.from({ length: totalPages }).map((_, i) => {
                                    const pageNum = i + 1;
                                    const isActive = currentPage === pageNum;
                                    return (
                                        <button
                                            key={pageNum}
                                            onClick={() => setCurrentPage(pageNum)}
                                            className={`w-7.5 h-7.5 flex items-center justify-center text-xs font-bold rounded-lg border cursor-pointer transition-all duration-200 ${isActive
                                                ? 'border-primary bg-[var(--sidebar-active-bg)] text-primary shadow-[0_2px_8px_var(--color-primary-glow)]'
                                                : 'border-[var(--sidebar-border)] bg-[var(--sidebar-bg)] text-[var(--color-text-muted)] hover:border-primary hover:text-primary'
                                                }`}
                                        >
                                            {pageNum}
                                        </button>
                                    );
                                })}

                                <button
                                    disabled={currentPage === totalPages}
                                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                    className="p-1.5 rounded-lg border border-[var(--sidebar-border)] bg-[var(--sidebar-bg)] cursor-pointer text-[var(--color-text-muted)] hover:border-primary hover:text-primary disabled:opacity-40 disabled:hover:border-[var(--sidebar-border)] disabled:hover:text-[var(--color-text-muted)] disabled:cursor-not-allowed transition-all duration-200"
                                >
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CustomerShipmentsTable;
