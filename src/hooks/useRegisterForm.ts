import { useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../services/apiClient";
import { useAuth } from "../context/AuthContext";

import type {
  RegisterFields,
  FieldErrors,
} from "../types/register.types";

const INITIAL_FIELDS: RegisterFields = {
  fullName: "",
  email: "",
  password: "",
  mobile: "",
  address: "",
  businessName: "",
};

export const useRegisterForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [fields, setFields] =
    useState<RegisterFields>(INITIAL_FIELDS);

  const [errors, setErrors] =
    useState<FieldErrors>({});

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const handleFieldChange = (
    key: keyof RegisterFields,
    value: string
  ) => {
    setFields((prev) => ({
      ...prev,
      [key]: value,
    }));

    // Clear field error while typing
    if (errors[key]) {
      setErrors((prev) => ({
        ...prev,
        [key]: "",
      }));
    }

    // Clear global error
    if (errors.global) {
      setErrors((prev) => ({
        ...prev,
        global: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors: FieldErrors = {};

    if (!fields.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!fields.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)
    ) {
      newErrors.email = "Please enter a valid email";
    }

    if (!fields.password.trim()) {
      newErrors.password = "Password is required";
    } else if (fields.password.length < 6) {
      newErrors.password =
        "Password must be at least 6 characters";
    }

    if (!fields.mobile.trim()) {
      newErrors.mobile = "Phone number is required";
    }

    if (!fields.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!fields.businessName.trim()) {
      newErrors.businessName =
        "Business name is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const payload = {
        name: fields.fullName.trim(),
        email: fields.email.trim(),
        password: fields.password,
        address: fields.address.trim(),
        businessName: fields.businessName.trim(),
        phone: fields.mobile.trim(),
      };

      const response = await API.post(
        "/auth/register",
        payload
      );

      const data = response.data?.data || response.data;

      if (!data?.user || !data?.accessToken) {
        throw new Error(
          "Invalid server response"
        );
      }

      alert(response.data?.message || "User registered successfully");

      login(data.user, data.accessToken);

      navigate("/dashboard");
    } catch (error: unknown) {
      let message =
        "Registration failed. Please try again.";

      if (
        typeof error === "object" &&
        error !== null &&
        "response" in error
      ) {
        const err = error as any;

        message =
          err.response?.data?.message ||
          err.response?.data?.error ||
          message;
      }

      setErrors({
        global: message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    fields,
    errors,
    isSubmitting,
    handleFieldChange,
    handleSubmit,
  };
};

export default useRegisterForm;