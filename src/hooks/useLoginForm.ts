import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/apiClient';
import { useAuth } from '../context/AuthContext';
import type { LoginFields, FieldErrors } from '../types/login.types';

const INITIAL_FIELDS: LoginFields = {
  email: '',
  password: '',
  role: 'customer',
};

export const useLoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [fields, setFields] = useState<LoginFields>(INITIAL_FIELDS);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFieldChange = (key: keyof LoginFields, value: string) => {
    setFields((prev) => ({
      ...prev,
      [key]: value,
    }));

    if (errors[key]) {
      setErrors((prev) => ({
        ...prev,
        [key]: '',
      }));
    }

    if (errors.global) {
      setErrors((prev) => ({
        ...prev,
        global: '',
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FieldErrors = {};

    if (!fields.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!fields.password) {
      newErrors.password = 'Password is required';
    } else if (fields.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await API.post('/auth/login', {
        email: fields.email.trim(),
        password: fields.password,
      });

      const data = response.data?.data || response.data;

      if (!data?.user || !data?.accessToken) {
        throw new Error('Invalid server response');
      }

      if (data.user.role !== fields.role) {
        throw new Error(
          `Unauthorized: This account does not have access to the ${fields.role === 'admin' ? 'Admin & Operations' : 'Customer Portal'
          }.`
        );
      }

      const mappedUser = {
        id: Number(data.user.id),
        name: data.user.name,
        email: data.user.email,
        address: data.user.address,
        businessName: data.user.businessName,
        phoneNumber: data.user.phone || data.user.phoneNumber || '',
        role: data.user.role,
      };

      alert(response.data?.message || 'Login successful');

      login(mappedUser, data.accessToken);

      if (mappedUser.role === 'admin') {
        navigate('/dashboard-admin');
      } else {
        navigate('/dashboard');
      }
    } catch (error: unknown) {
      let message = 'Login failed. Please try again.';

      if (typeof error === 'object' && error !== null && 'response' in error) {
        const err = error as any;
        message = err.response?.data?.message || err.response?.data?.error || message;
      } else if (error instanceof Error) {
        message = error.message;
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

export default useLoginForm;
