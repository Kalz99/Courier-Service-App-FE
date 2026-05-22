import React, { useState } from 'react';

export const useAddShipmentForm = () => {
  const [formData, setFormData] = useState({
    senderName: '',
    senderMobile: '',
    senderAddress: '',
    recipientName: '',
    recipientMobile: '',
    recipientAddress: '',
    shipmentType: '',
  });

  const [errors, setErrors] = useState({
    senderName: '',
    senderMobile: '',
    senderAddress: '',
    recipientName: '',
    recipientMobile: '',
    recipientAddress: '',
    shipmentType: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleDropdownChange = (value: string) => {
    setFormData((prev) => ({ ...prev, shipmentType: value }));
    if (errors.shipmentType) {
      setErrors((prev) => ({ ...prev, shipmentType: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    const newErrors = {
      senderName: formData.senderName.trim() ? '' : "Sender's name is required",
      senderMobile: formData.senderMobile.trim() ? '' : "Sender's mobile number is required",
      senderAddress: formData.senderAddress.trim() ? '' : "Sender's address is required",
      recipientName: formData.recipientName.trim() ? '' : "Recipient's name is required",
      recipientMobile: formData.recipientMobile.trim() ? '' : "Recipient's mobile number is required",
      recipientAddress: formData.recipientAddress.trim() ? '' : "Recipient's address is required",
      shipmentType: formData.shipmentType ? '' : 'Please select a shipment type',
    };

    if (Object.values(newErrors).some(Boolean)) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      alert(`Shipment created successfully!\n\nSender: ${formData.senderName}\nRecipient: ${formData.recipientName}\nType: ${formData.shipmentType}`);
      setFormData({
        senderName: '',
        senderMobile: '',
        senderAddress: '',
        recipientName: '',
        recipientMobile: '',
        recipientAddress: '',
        shipmentType: '',
      });
      setIsSubmitting(false);
    }, 1000);
  };

  return {
    formData,
    errors,
    isSubmitting,
    handleInputChange,
    handleDropdownChange,
    handleSubmit,
  };
};
