import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export const useAddShipmentForm = () => {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    senderName: user?.name || '',
    senderMobile: user?.phoneNumber || '',
    senderAddress: user?.address || '',
    recipientName: '',
    recipientMobile: '',
    recipientAddress: '',
    shipmentType: '',
    weight: '',
    weightUnit: 'kg',
  });

  const [errors, setErrors] = useState({
    senderName: '',
    senderMobile: '',
    senderAddress: '',
    recipientName: '',
    recipientMobile: '',
    recipientAddress: '',
    shipmentType: '',
    weight: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        senderName: prev.senderName || user.name || '',
        senderMobile: prev.senderMobile || user.phoneNumber || '',
        senderAddress: prev.senderAddress || user.address || '',
      }));
    }
  }, [user]);

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

  const handleUnitChange = (value: string) => {
    setFormData((prev) => ({ ...prev, weightUnit: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Weight validation
    const weightVal = formData.weight.trim();
    let weightError = '';
    if (!weightVal) {
      weightError = 'Weight is required';
    } else if (isNaN(Number(weightVal)) || Number(weightVal) <= 0) {
      weightError = 'Weight must be a positive number';
    }

    // Validation
    const newErrors = {
      senderName: formData.senderName.trim() ? '' : "Sender's name is required",
      senderMobile: formData.senderMobile.trim() ? '' : "Sender's mobile number is required",
      senderAddress: formData.senderAddress.trim() ? '' : "Sender's address is required",
      recipientName: formData.recipientName.trim() ? '' : "Recipient's name is required",
      recipientMobile: formData.recipientMobile.trim() ? '' : "Recipient's mobile number is required",
      recipientAddress: formData.recipientAddress.trim() ? '' : "Recipient's address is required",
      shipmentType: formData.shipmentType ? '' : 'Please select a shipment type',
      weight: weightError,
    };

    if (Object.values(newErrors).some(Boolean)) {
      setErrors(newErrors);
      return;
    }

    const weightNum = Number(formData.weight);
    const weightInKg = formData.weightUnit === 'g' ? weightNum / 1000 : weightNum;

    setIsSubmitting(true);
    setTimeout(() => {
      alert(`Shipment created successfully!\n\nSender: ${formData.senderName}\nRecipient: ${formData.recipientName}\nType: ${formData.shipmentType}\nWeight: ${weightInKg} kg`);
      setFormData({
        senderName: user?.name || '',
        senderMobile: user?.phoneNumber || '',
        senderAddress: user?.address || '',
        recipientName: '',
        recipientMobile: '',
        recipientAddress: '',
        shipmentType: '',
        weight: '',
        weightUnit: 'kg',
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
    handleUnitChange,
    handleSubmit,
  };
};
