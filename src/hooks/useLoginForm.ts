import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useLoginForm = () => {
  const navigate = useNavigate();

  // Form field states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer'); // Default to Customer

  // Form validation errors
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  
  // Submit state indicator
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Input handlers that automatically clear errors
  const handleEmailChange = (val: string) => {
    setEmail(val);
    if (emailError) setEmailError('');
  };

  const handlePasswordChange = (val: string) => {
    setPassword(val);
    if (passwordError) setPasswordError('');
  };

  const handleRoleChange = (val: string) => {
    setRole(val);
  };

  // Live and on-submit validation checks
  const validateForm = (): boolean => {
    let isValid = true;
    
    // Email format checks
    if (!email.trim()) {
      setEmailError('Email address is required');
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError('Please enter a valid email address');
      isValid = false;
    } else {
      setEmailError('');
    }

    // Password strength check
    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
      isValid = false;
    } else {
      setPasswordError('');
    }

    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Simulate premium API latency delay
    setTimeout(() => {
      setIsSubmitting(false);
      
      // Perform mock redirection based on role select
      if (role === 'admin') {
        navigate('/dashboard');
      } else {
        navigate('/customershipments');
      }
    }, 1200);
  };

  return {
    email,
    password,
    role,
    emailError,
    passwordError,
    isSubmitting,
    handleEmailChange,
    handlePasswordChange,
    handleRoleChange,
    handleSubmit,
  };
};

export default useLoginForm;
