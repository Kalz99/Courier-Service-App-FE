import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useRegisterForm = () => {
  const navigate = useNavigate();

  // Form field states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [businessName, setBusinessName] = useState('');

  // Form validation errors
  const [fullNameError, setFullNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [mobileError, setMobileError] = useState('');
  const [addressError, setAddressError] = useState('');
  const [businessNameError, setBusinessNameError] = useState('');

  // Submit loading state indicator
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reactive change handlers that clear corresponding error flags
  const handleFullNameChange = (val: string) => {
    setFullName(val);
    if (fullNameError) setFullNameError('');
  };

  const handleEmailChange = (val: string) => {
    setEmail(val);
    if (emailError) setEmailError('');
  };

  const handlePasswordChange = (val: string) => {
    setPassword(val);
    if (passwordError) setPasswordError('');
  };

  const handleMobileChange = (val: string) => {
    setMobile(val);
    if (mobileError) setMobileError('');
  };

  const handleAddressChange = (val: string) => {
    setAddress(val);
    if (addressError) setAddressError('');
  };

  const handleBusinessNameChange = (val: string) => {
    setBusinessName(val);
    if (businessNameError) setBusinessNameError('');
  };

  // Comprehensive client-side form validation
  const validateForm = (): boolean => {
    let isValid = true;

    // Full Name check
    if (!fullName.trim()) {
      setFullNameError('Full name is required');
      isValid = false;
    } else {
      setFullNameError('');
    }

    // Email check
    if (!email.trim()) {
      setEmailError('Email address is required');
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError('Please enter a valid email address');
      isValid = false;
    } else {
      setEmailError('');
    }

    // Password check
    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
      isValid = false;
    } else {
      setPasswordError('');
    }

    // Mobile Number check
    if (!mobile.trim()) {
      setMobileError('Mobile number is required');
      isValid = false;
    } else if (!/^\+?[0-9\s\-()]{7,16}$/.test(mobile.trim())) {
      setMobileError('Please enter a valid mobile number');
      isValid = false;
    } else {
      setMobileError('');
    }

    // Address check
    if (!address.trim()) {
      setAddressError('Address is required');
      isValid = false;
    } else {
      setAddressError('');
    }

    // Business Name check
    if (!businessName.trim()) {
      setBusinessNameError('Business name is required');
      isValid = false;
    } else {
      setBusinessNameError('');
    }

    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate premium signup network latency
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Registration successful! Welcome to ShipSync.');
      navigate('/login');
    }, 1500);
  };

  return {
    fullName,
    email,
    password,
    mobile,
    address,
    businessName,
    fullNameError,
    emailError,
    passwordError,
    mobileError,
    addressError,
    businessNameError,
    isSubmitting,
    handleFullNameChange,
    handleEmailChange,
    handlePasswordChange,
    handleMobileChange,
    handleAddressChange,
    handleBusinessNameChange,
    handleSubmit,
  };
};

export default useRegisterForm;
