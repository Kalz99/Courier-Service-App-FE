import React from 'react';
import { Check, Copy, User, Phone, MapPin, Printer, Trash2, Eye } from 'lucide-react';
import type { ShipmentItem } from '../../../types/customershipment.types';
import { getStatusStyles, getPackageIcon, PACKAGE_TYPE_LABELS } from './helpers';
import { Dropdown } from '../DropDown';

export interface ShipmentRowProps {
    shipment: ShipmentItem;
    copiedId: string | null;
    onCopy: (e: React.MouseEvent, trackingNum: string) => void;
    onTrackShipment?: (trackingNumber: string) => void;
    role?: 'customer' | 'admin';
    onUpdateStatus?: (id: string, newStatus: any) => void;
    onDeleteShipment?: (id: string) => void;
    onPrintLabel?: (id: string) => void;
}

export const ShipmentRow: React.FC<ShipmentRowProps> = React.memo(({
    shipment,
    copiedId,
    onCopy,
    onTrackShipment,
    role = 'customer',
    onUpdateStatus,
    onDeleteShipment,
    onPrintLabel
}) => {
    const styleInfo = getStatusStyles(shipment.status);
    const isCopied = copiedId === shipment.trackingNumber;

    const handleCopyClick = (e: React.MouseEvent) => onCopy(e, shipment.trackingNumber);
    const handleTrackClick = () => onTrackShipment?.(shipment.trackingNumber);

    // Resilient fallbacks for admin customer specific fields
    const customerName = (shipment as any).sender?.name || (shipment as any).customerName || 'Apex Electronics';
    const customerEmail = (shipment as any).sender?.email || (shipment as any).customerEmail || 'billing@apex.com';

    // Premium dropdown options with custom matching status dots
    const dropdownOptions = [
        { 
            value: 'pending', 
            label: 'Pending', 
            icon: <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
        },
        { 
            value: 'in_transit', 
            label: 'In Transit', 
            icon: <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
        },
        { 
            value: 'out_for_delivery', 
            label: 'Out for Delivery', 
            icon: <span className="w-2 h-2 rounded-full bg-purple-500 shrink-0" />
        },
        { 
            value: 'delivered', 
            label: 'Delivered', 
            icon: <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
        }
    ];

    return (
        <tr className="hover:bg-[var(--sidebar-active-bg)]/25 transition-colors duration-150 group">
            {/* Tracking ID column */}
            <td className="py-4.5 px-6 font-mono font-semibold text-[var(--color-text-primary)]">
                <div className="flex items-center gap-2">
                    <span className="tracking-tight select-all">{shipment.trackingNumber}</span>
                    <button
                        onClick={handleCopyClick}
                        title="Copy Tracking ID"
                        aria-label={isCopied ? "Tracking ID copied" : "Copy Tracking ID"}
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

            {/* Admin-only Customer Details Column */}
            {role === 'admin' && (
                <td className="py-4.5 px-6">
                    <div className="flex flex-col gap-1">
                        <span className="font-bold text-[var(--color-text-primary)] text-sm leading-tight">
                            {customerName}
                        </span>
                        <span className="text-[11px] text-[var(--color-text-muted)] font-medium leading-none truncate max-w-[160px]" title={customerEmail}>
                            {customerEmail}
                        </span>
                    </div>
                </td>
            )}

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

            {/* Package details/type column */}
            <td className="py-4.5 px-6 text-left">
                {role === 'admin' ? (
                    <div className="flex items-center gap-2">
                        <div className="flex items-center justify-center p-1 rounded-lg bg-primary/10 border border-primary/15 shrink-0 transition-transform duration-250 group-hover:scale-105">
                            {getPackageIcon(shipment.packageType)}
                        </div>
                        <span className="text-[11px] font-semibold text-[var(--color-text-primary)] capitalize">
                            {PACKAGE_TYPE_LABELS[shipment.packageType] || shipment.packageType || 'Standard'}
                        </span>
                    </div>
                ) : (
                    // Customer view retains detailed Package Details cell
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center p-2 rounded-lg bg-primary/10 border border-primary/15 shrink-0 transition-transform duration-200 group-hover:scale-105">
                            {getPackageIcon(shipment.packageType)}
                        </div>
                        <div className="flex flex-col gap-0.5 min-w-0">
                            <span className="font-semibold text-sm text-[var(--color-text-primary)] truncate">
                                {shipment.packageName}
                            </span>
                            <span className="text-xs text-[var(--color-text-muted)] font-medium capitalize">
                                {PACKAGE_TYPE_LABELS[shipment.packageType] || 'Standard Package'}
                            </span>
                        </div>
                    </div>
                )}
            </td>

            {/* Status column - relative with stacking context to prevent clipping */}
            <td className="py-4.5 px-6 relative overflow-visible z-10 hover:z-30 focus-within:z-30 min-w-[180px]">
                {role === 'admin' ? (
                    <Dropdown
                        options={dropdownOptions}
                        selectedValue={shipment.status}
                        onChange={(val) => onUpdateStatus?.(shipment.id, val as any)}
                        placeholder="Select Status"
                        className="w-full max-w-[170px]"
                    />
                ) : (
                    <div className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider select-none ${styleInfo.bg} ${styleInfo.text}`}>
                        <span className={`w-1.5 h-1.5 rounded-full mr-2 shrink-0 ${styleInfo.dot}`} />
                        {styleInfo.label}
                    </div>
                )}
            </td>

            {/* Action column */}
            <td className="py-4.5 px-6 text-center">
                {role === 'admin' ? (
                    <div className="flex items-center justify-center gap-2">
                        <button
                            onClick={handleTrackClick}
                            title="View Shipment Details"
                            className="p-2 text-[var(--color-text-muted)] hover:text-primary transition-colors border border-[var(--sidebar-border)] rounded-lg hover:bg-[var(--app-bg)] shadow-sm cursor-pointer"
                        >
                            <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                            onClick={() => onPrintLabel?.(shipment.id)}
                            title="Print Shipping Label"
                            className="p-2 text-[var(--color-text-muted)] hover:text-blue-500 transition-colors border border-[var(--sidebar-border)] rounded-lg hover:bg-[var(--app-bg)] shadow-sm cursor-pointer"
                        >
                            <Printer className="w-3.5 h-3.5" />
                        </button>
                        <button
                            onClick={() => onDeleteShipment?.(shipment.id)}
                            title="Delete Shipment"
                            className="p-2 text-[var(--color-text-muted)] hover:text-red-500 transition-colors border border-[var(--sidebar-border)] rounded-lg hover:bg-red-500/5 shadow-sm cursor-pointer"
                        >
                            <Trash2 className="w-3.5 h-3.5" />
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={handleTrackClick}
                        aria-label={`Track shipment ${shipment.trackingNumber}`}
                        className="py-1.5 px-5 rounded-lg text-xs font-bold bg-primary hover:bg-primary-hover text-white flex items-center justify-center gap-1 mx-auto transition-transform duration-200 hover:scale-105 active:scale-98 shadow-[0_2px_8px_var(--color-primary-glow)] min-w-[100px] cursor-pointer"
                    >
                        Track
                    </button>
                )}
            </td>
        </tr>
    );
});

// Set displayName for memory optimization and debugging
ShipmentRow.displayName = 'ShipmentRow';
