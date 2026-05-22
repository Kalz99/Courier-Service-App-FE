import React, { useState, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { createShipmentApi } from '../services/shipment.service';

/**
 * Interface representing the shipment form values.
 */
export interface ShipmentFormData {
  recipientName: string;
  recipientPhoneNumber: string;
  recipientAddress: string;
  shipmentType: string;
  weight: string;
  weightUnit: 'kg' | 'g';
}

/**
 * Interface representing validation error messages for the shipment form.
 */
export interface ShipmentFormErrors {
  recipientName: string;
  recipientPhoneNumber: string;
  recipientAddress: string;
  shipmentType: string;
  weight: string;
}

const INITIAL_FORM_DATA: ShipmentFormData = {
  recipientName: '',
  recipientPhoneNumber: '',
  recipientAddress: '',
  shipmentType: '',
  weight: '',
  weightUnit: 'kg',
};

const INITIAL_ERRORS: ShipmentFormErrors = {
  recipientName: '',
  recipientPhoneNumber: '',
  recipientAddress: '',
  shipmentType: '',
  weight: '',
};

/**
 * Utility function to convert weight to kilograms.
 */
const convertToKg = (weight: string, unit: 'kg' | 'g'): number => {
  const numWeight = Number(weight);
  if (isNaN(numWeight)) return 0;
  return unit === 'g' ? numWeight / 1000 : numWeight;
};

/**
 * Utility function to extract a user-friendly error message from API errors.
 */
const extractErrorMessage = (error: unknown): string => {
  const defaultMessage = 'Failed to create shipment';
  if (typeof error === 'object' && error !== null) {
    const err = error as Record<string, any>;
    if (err.response?.data) {
      return err.response.data.message || err.response.data.error || defaultMessage;
    }
  }
  if (error instanceof Error) {
    return error.message;
  }
  return defaultMessage;
};

/**
 * A custom hook to manage shipment form state, validation, performance optimizations,
 * and API integration.
 */
export const useAddShipmentForm = () => {
  const { user } = useAuth();

  const [formData, setFormData] = useState<ShipmentFormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<ShipmentFormErrors>(INITIAL_ERRORS);
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Handle changes to input fields with automatic error clearing and reference stability.
   */
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    setErrors((prev) => {
      if (prev[name as keyof ShipmentFormErrors]) {
        return { ...prev, [name]: '' };
      }
      return prev;
    });
  }, []);

  /**
   * Handle change to the shipment type selection.
   */
  const handleShipmentTypeChange = useCallback((value: string) => {
    setFormData((prev) => ({ ...prev, shipmentType: value }));

    setErrors((prev) => {
      if (prev.shipmentType) {
        return { ...prev, shipmentType: '' };
      }
      return prev;
    });
  }, []);

  /**
   * Handle change to the weight unit selection.
   */
  const handleWeightUnitChange = useCallback((value: 'kg' | 'g') => {
    setFormData((prev) => ({ ...prev, weightUnit: value }));
  }, []);

  /**
   * Validates the active form state.
   */
  const validateForm = useCallback((): boolean => {
    const newErrors: ShipmentFormErrors = {
      recipientName: formData.recipientName.trim() ? '' : 'Recipient name is required',
      recipientPhoneNumber: formData.recipientPhoneNumber.trim() ? '' : 'Recipient phone number is required',
      recipientAddress: formData.recipientAddress.trim() ? '' : 'Recipient address is required',
      shipmentType: formData.shipmentType ? '' : 'Shipment type is required',
      weight: '',
    };

    const weightValue = Number(formData.weight);
    if (!formData.weight.trim()) {
      newErrors.weight = 'Weight is required';
    } else if (isNaN(weightValue) || weightValue <= 0) {
      newErrors.weight = 'Weight must be a positive number';
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  }, [formData]);

  /**
   * Resets the form state and errors.
   */
  const resetForm = useCallback(() => {
    setFormData(INITIAL_FORM_DATA);
    setErrors(INITIAL_ERRORS);
  }, []);

  /**
   * Handles form submission to create a shipment.
   */
  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const convertedWeight = convertToKg(formData.weight, formData.weightUnit);

      const payload = {
        recipientName: formData.recipientName.trim(),
        recipientPhoneNumber: formData.recipientPhoneNumber.trim(),
        recipientAddress: formData.recipientAddress.trim(),
        shipmentType: formData.shipmentType,
        weight: convertedWeight,
      };

      const response = await createShipmentApi(payload);
      alert(response.data?.message || 'Shipment created successfully');
      resetForm();
    } catch (error: unknown) {
      alert(extractErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, validateForm, resetForm]);

  return {
    user,
    formData,
    errors,
    isSubmitting,
    handleInputChange,
    handleShipmentTypeChange,
    handleWeightUnitChange,
    handleSubmit,
  };
};

export default useAddShipmentForm;