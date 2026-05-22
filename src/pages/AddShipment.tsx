import React from 'react';
import { User, Phone, MapPin, Inbox, Package, Layers, ShieldAlert, HeartPulse } from 'lucide-react';
import { InputField, RadioButton, type DropdownOption } from '../components/ui';
import { Button } from '../components/ui/Button';
import { useAddShipmentForm } from '../hooks/useAddShipmentForm';

const SHIPMENT_TYPE_OPTIONS: DropdownOption[] = [
    { value: 'document', label: 'Document / Letter', icon: <Inbox className="w-4 h-4 text-primary" /> },
    { value: 'package_box', label: 'Standard Package / Box', icon: <Package className="w-4 h-4 text-primary" /> },
    { value: 'pallet', label: 'Pallet / Bulk Crate', icon: <Layers className="w-4 h-4 text-primary" /> },
    { value: 'perishable', label: 'Perishable Goods / Food', icon: <ShieldAlert className="w-4 h-4 text-primary" /> },
    { value: 'medical', label: 'Pharmaceutical / Medical', icon: <HeartPulse className="w-4 h-4 text-primary" /> },
];

export const AddShipment: React.FC = () => {
    const {
        formData,
        errors,
        isSubmitting,
        handleInputChange,
        handleDropdownChange,
        handleSubmit,
    } = useAddShipmentForm();

    return (
        <div className="w-full bg-[var(--sidebar-bg)] border border-[var(--sidebar-border)] rounded-[32px] shadow-[var(--sidebar-shadow)] p-6 md:p-8 lg:p-10 box-border animate-fade-in transition-all duration-250 mb-6 flex flex-col justify-center grow">
            <style>{`
                /* Scoped responsive styles for AddShipment page (Compact & High-Density) */
                .shipment-input-field,
                .shipment-submit-btn,
                .shipment-form [role="radio"] {
                    transition: all 0.2s ease-in-out !important;
                }

                /* Mobile sizes (Base Compact) */
                .shipment-input-field {
                    padding-top: 8px !important;
                    padding-bottom: 8px !important;
                    padding-left: 38px !important;
                    font-size: 13px !important;
                    border-radius: 10px !important;
                }
                .shipment-form .relative > div:first-child {
                    left: 12px !important;
                }
                .shipment-form .relative > div:first-child svg {
                    width: 15px !important;
                    height: 15px !important;
                }
                .shipment-submit-btn {
                    padding-top: 8.5px !important;
                    padding-bottom: 8.5px !important;
                    font-size: 13px !important;
                    border-radius: 10px !important;
                    width: 100% !important;
                    height: auto !important;
                    display: flex !important;
                }
                .shipment-form label,
                .shipment-form .select-none {
                    font-size: 11px !important;
                    margin-bottom: 2px !important;
                }

                /* Radio Button Cards (Horizontal layout) */
                .shipment-form [role="radio"] {
                    padding: 12px 14px !important;
                    border-radius: 14px !important;
                    max-width: none !important;
                }
                .shipment-form [role="radio"] span.text-sm {
                    font-size: 13px !important;
                }
                .shipment-form [role="radio"] span.text-xs {
                    font-size: 11px !important;
                    margin-top: 1px !important;
                }

                /* Medium screens (md) scaling up slightly */
                @media (min-width: 768px) {
                    .shipment-input-field {
                        padding-top: 9.5px !important;
                        padding-bottom: 9.5px !important;
                        padding-left: 42px !important;
                        font-size: 14px !important;
                        border-radius: 12px !important;
                    }
                    .shipment-form .relative > div:first-child {
                        left: 14px !important;
                    }
                    .shipment-form .relative > div:first-child svg {
                        width: 16px !important;
                        height: 16px !important;
                    }
                    .shipment-submit-btn {
                        padding-top: 9.5px !important;
                        padding-bottom: 9.5px !important;
                        font-size: 14px !important;
                        border-radius: 12px !important;
                    }
                    .shipment-form label,
                    .shipment-form .select-none {
                        font-size: 12px !important;
                        margin-bottom: 3px !important;
                    }
                }

                /* Large screens & Desktop (lg/xl) compact sizing */
                @media (min-width: 1024px) {
                    .shipment-input-field {
                        padding-top: 10px !important;
                        padding-bottom: 10px !important;
                        padding-left: 44px !important;
                        font-size: 14px !important;
                        border-radius: 12px !important;
                    }
                    .shipment-form .relative > div:first-child {
                        left: 14px !important;
                    }
                    .shipment-form .relative > div:first-child svg {
                        width: 16px !important;
                        height: 16px !important;
                    }
                    .shipment-submit-btn {
                        padding-top: 10px !important;
                        padding-bottom: 10px !important;
                        font-size: 14px !important;
                        border-radius: 12px !important;
                    }
                    .shipment-form label,
                    .shipment-form .select-none {
                        font-size: 12px !important;
                        margin-bottom: 4px !important;
                    }
                    .shipment-form [role="radio"] {
                        padding: 14px 16px !important;
                        border-radius: 16px !important;
                        max-width: none !important;
                    }
                    .shipment-form [role="radio"] span.text-sm {
                        font-size: 14px !important;
                    }
                    .shipment-form [role="radio"] span.text-xs {
                        font-size: 12px !important;
                    }
                }

                .shipment-form h3 {
                    font-size: 13px !important;
                    font-weight: 700 !important;
                    letter-spacing: 0.05em !important;
                }
            `}</style>

            <form
                onSubmit={handleSubmit}
                className="shipment-form flex flex-col gap-6 w-full max-w-[1200px] mx-auto bg-transparent border-none p-0 shadow-none"
            >
                {/* Two Column Grid for Senders and Recipients */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 w-full">
                    {/* Left Column: Sender's Details */}
                    <div className="flex flex-col gap-4 w-full">
                        <h3 className="text-sm font-bold text-primary uppercase tracking-wider border-b border-[var(--sidebar-border)]/70 pb-2 mb-1">
                            Sender's Details
                        </h3>
                        <InputField
                            name="senderName"
                            label="Sender's Name"
                            placeholder="Enter sender's full name"
                            value={formData.senderName}
                            onChange={handleInputChange}
                            error={errors.senderName}
                            className="shipment-input-field"
                            icon={<User className="w-4 h-4 text-[var(--color-text-muted)]" />}
                        />

                        <InputField
                            name="senderMobile"
                            label="Sender's Mobile"
                            placeholder="Enter sender's phone number"
                            value={formData.senderMobile}
                            onChange={handleInputChange}
                            error={errors.senderMobile}
                            className="shipment-input-field"
                            icon={<Phone className="w-4 h-4 text-[var(--color-text-muted)]" />}
                        />

                        <InputField
                            name="senderAddress"
                            label="Sender's Address"
                            placeholder="Enter sender's physical address"
                            value={formData.senderAddress}
                            onChange={handleInputChange}
                            error={errors.senderAddress}
                            className="shipment-input-field"
                            icon={<MapPin className="w-4 h-4 text-[var(--color-text-muted)]" />}
                        />
                    </div>

                    {/* Right Column: Recipient's Details */}
                    <div className="flex flex-col gap-4 w-full">
                        <h3 className="text-sm font-bold text-primary uppercase tracking-wider border-b border-[var(--sidebar-border)]/70 pb-2 mb-1">
                            Recipient's Details
                        </h3>
                        <InputField
                            name="recipientName"
                            label="Recipient's Name"
                            placeholder="Enter recipient's full name"
                            value={formData.recipientName}
                            onChange={handleInputChange}
                            error={errors.recipientName}
                            className="shipment-input-field"
                            icon={<User className="w-4 h-4 text-[var(--color-text-muted)]" />}
                        />
                        <InputField
                            name="recipientMobile"
                            label="Recipient's Mobile"
                            placeholder="Enter recipient's phone number"
                            value={formData.recipientMobile}
                            onChange={handleInputChange}
                            error={errors.recipientMobile}
                            className="shipment-input-field"
                            icon={<Phone className="w-4 h-4 text-[var(--color-text-muted)]" />}
                        />
                        <InputField
                            name="recipientAddress"
                            label="Recipient's Address"
                            placeholder="Enter recipient's physical delivery address"
                            value={formData.recipientAddress}
                            onChange={handleInputChange}
                            error={errors.recipientAddress}
                            className="shipment-input-field"
                            icon={<MapPin className="w-4 h-4 text-[var(--color-text-muted)]" />}
                        />
                    </div>
                </div>

                {/* Common Bottom Section: Shipment Type & Button */}
                <div className="flex flex-col gap-5 w-full mt-2 border-t border-[var(--sidebar-border)]/40 pt-6">
                    <div className="flex flex-col gap-2 w-full">
                        <span className="text-xs font-semibold text-[var(--color-text-muted)] tracking-wide uppercase select-none shipment-form-label">
                            Shipment Type
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-2.5 w-full mt-1">
                            {SHIPMENT_TYPE_OPTIONS.map((option) => (
                                <RadioButton
                                    key={option.value}
                                    label={option.label.split(' / ')[0]}
                                    description={option.label.split(' / ')[1]}
                                    value={option.value}
                                    checked={formData.shipmentType === option.value}
                                    onChange={handleDropdownChange}
                                    icon={option.icon}
                                    name="shipmentType"
                                />
                            ))}
                        </div>
                        {errors.shipmentType && (
                            <span className="text-xs font-medium text-red-500 transition-all duration-200 mt-1">
                                {errors.shipmentType}
                            </span>
                        )}
                    </div>

                    <div className="mt-2 w-full">
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="shipment-submit-btn max-md:rounded-xl max-md:w-full max-md:h-auto max-md:py-2.5 max-md:px-3 max-md:flex"
                        >
                            {isSubmitting ? 'Creating Shipment...' : 'Create Shipment'}
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddShipment;
