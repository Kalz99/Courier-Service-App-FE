import React from 'react';
import { User, Phone, MapPin, Inbox, Package, Layers, ShieldAlert, HeartPulse, Scale } from 'lucide-react';
import { InputField, RadioButton, Dropdown, type DropdownOption } from '../components/ui';
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
        handleUnitChange,
        handleSubmit,
    } = useAddShipmentForm();

    return (
        <div className="w-full bg-[var(--sidebar-bg)] border border-[var(--sidebar-border)] rounded-[32px] shadow-[var(--sidebar-shadow)] p-6 md:p-8 lg:p-10 box-border animate-fade-in transition-all duration-250 mb-6 flex flex-col justify-center grow">
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-6 w-full max-w-[1200px] mx-auto bg-transparent border-none p-0 shadow-none transition-all duration-200"
            >
                {/* Two Column Grid for Senders and Recipients */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 w-full">
                    {/* Left Column: Sender's Details */}
                    <div className="flex flex-col gap-4 w-full">
                        <h3 className="text-xs md:text-sm font-bold text-primary uppercase tracking-wider border-b border-[var(--sidebar-border)]/70 pb-2 mb-1">
                            Sender's Details
                        </h3>
                        <InputField
                            name="senderName"
                            label="Sender's Name"
                            placeholder="Enter sender's full name"
                            value={formData.senderName}
                            onChange={handleInputChange}
                            error={errors.senderName}
                            className="py-2 px-3 pl-10 text-xs rounded-xl md:py-2.5 md:pl-11 md:text-sm transition-all"
                            icon={<User className="w-3.5 h-3.5 md:w-4 md:h-4 text-[var(--color-text-muted)]" />}
                        />

                        <InputField
                            name="senderMobile"
                            label="Sender's Mobile"
                            placeholder="Enter sender's phone number"
                            value={formData.senderMobile}
                            onChange={handleInputChange}
                            error={errors.senderMobile}
                            className="py-2 px-3 pl-10 text-xs rounded-xl md:py-2.5 md:pl-11 md:text-sm transition-all"
                            icon={<Phone className="w-3.5 h-3.5 md:w-4 md:h-4 text-[var(--color-text-muted)]" />}
                        />

                        <InputField
                            name="senderAddress"
                            label="Sender's Address"
                            placeholder="Enter sender's physical address"
                            value={formData.senderAddress}
                            onChange={handleInputChange}
                            error={errors.senderAddress}
                            className="py-2 px-3 pl-10 text-xs rounded-xl md:py-2.5 md:pl-11 md:text-sm transition-all"
                            icon={<MapPin className="w-3.5 h-3.5 md:w-4 md:h-4 text-[var(--color-text-muted)]" />}
                        />
                    </div>

                    {/* Right Column: Recipient's Details */}
                    <div className="flex flex-col gap-4 w-full">
                        <h3 className="text-xs md:text-sm font-bold text-primary uppercase tracking-wider border-b border-[var(--sidebar-border)]/70 pb-2 mb-1">
                            Recipient's Details
                        </h3>
                        <InputField
                            name="recipientName"
                            label="Recipient's Name"
                            placeholder="Enter recipient's full name"
                            value={formData.recipientName}
                            onChange={handleInputChange}
                            error={errors.recipientName}
                            className="py-2 px-3 pl-10 text-xs rounded-xl md:py-2.5 md:pl-11 md:text-sm transition-all"
                            icon={<User className="w-3.5 h-3.5 md:w-4 md:h-4 text-[var(--color-text-muted)]" />}
                        />
                        <InputField
                            name="recipientMobile"
                            label="Recipient's Mobile"
                            placeholder="Enter recipient's phone number"
                            value={formData.recipientMobile}
                            onChange={handleInputChange}
                            error={errors.recipientMobile}
                            className="py-2 px-3 pl-10 text-xs rounded-xl md:py-2.5 md:pl-11 md:text-sm transition-all"
                            icon={<Phone className="w-3.5 h-3.5 md:w-4 md:h-4 text-[var(--color-text-muted)]" />}
                        />
                        <InputField
                            name="recipientAddress"
                            label="Recipient's Address"
                            placeholder="Enter recipient's physical delivery address"
                            value={formData.recipientAddress}
                            onChange={handleInputChange}
                            error={errors.recipientAddress}
                            className="py-2 px-3 pl-10 text-xs rounded-xl md:py-2.5 md:pl-11 md:text-sm transition-all"
                            icon={<MapPin className="w-3.5 h-3.5 md:w-4 md:h-4 text-[var(--color-text-muted)]" />}
                        />
                    </div>
                </div>

                {/* Common Bottom Section: Shipment Type & Button */}
                <div className="flex flex-col gap-5 w-full -mt-3 border-t border-[var(--sidebar-border)]/40 pt-2">
                    <div className="flex flex-col gap-2 w-full">
                        <span className="text-xs font-semibold text-slate-500 tracking-wide select-none">
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
                                    // Handles the micro density layouts natively
                                    className="p-3 lg:p-4 rounded-[14px] lg:rounded-[16px] transition-all duration-200"
                                />
                            ))}
                        </div>
                        {errors.shipmentType && (
                            <span className="text-xs font-medium text-red-500 transition-all duration-200 mt-1">
                                {errors.shipmentType}
                            </span>
                        )}
                    </div>

                    {/* Shipment Weight Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-[1fr_160px] gap-4 w-full mt-2">
                        <InputField
                            type="number"
                            step="any"
                            name="weight"
                            label="Shipment Weight"
                            placeholder="Enter shipment weight"
                            value={formData.weight}
                            onChange={handleInputChange}
                            error={errors.weight}
                            className="py-2 px-3 pl-10 text-xs rounded-xl md:py-2.5 md:pl-11 md:text-sm transition-all"
                            icon={<Scale className="w-3.5 h-3.5 md:w-4 md:h-4 text-[var(--color-text-muted)]" />}
                        />
                        <Dropdown
                            label="Weight Unit"
                            options={[
                                { value: 'kg', label: 'Kilograms (kg)' },
                                { value: 'g', label: 'Grams (g)' },
                            ]}
                            selectedValue={formData.weightUnit}
                            onChange={handleUnitChange}
                            placeholder="Select unit"
                        />
                    </div>

                    <div className="mt-2 w-full">
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full h-auto py-2.5 px-4 text-xs font-medium rounded-xl md:py-3 md:text-sm flex items-center justify-center transition-all duration-200"
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