import React from 'react';
import { Mail, Lock, Shield, User, ArrowRight } from 'lucide-react';
import { InputField, Dropdown } from '../components/ui';
import { useLoginForm } from '../hooks/useLoginForm';
import logoImg from '../assets/logo.png';

export const Login: React.FC = () => {
  // Delegate all validation, state handling, and redirection logic to custom hook
  const {
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
  } = useLoginForm();

  // Forcing a pristine Light Theme by overriding workspace variables locally
  const lightThemeStyles = {
    '--sidebar-bg': '#ffffff',
    '--sidebar-border': '#f0edf9',
    '--sidebar-active-bg': '#f1edfc',
    '--color-text-primary': '#1e1b29',
    '--color-text-muted': '#8e8b9a',
    '--color-text-active': '#7B57DF',
    '--color-avatar-bg': '#f1edfc',
    '--color-avatar-text': '#7B57DF',
    '--app-bg': '#f8f7fd',
    '--sidebar-shadow': '0 4px 30px rgba(123, 87, 223, 0.02)',
  } as React.CSSProperties;

  // Dropdown options matching the required types
  const roleOptions = [
    {
      value: 'customer',
      label: 'Customer Portal',
      icon: <User className="w-4 h-4 text-primary" />,
    },
    {
      value: 'admin',
      label: 'Admin & Operations',
      icon: <Shield className="w-4 h-4 text-primary" />,
    },
  ];

  return (
    <div 
      style={lightThemeStyles} 
      className="min-h-screen w-full flex items-center justify-center p-4 bg-[var(--app-bg)] relative overflow-hidden font-sans"
    >
      {/* Light Theme Pastel Violet Blur Accents */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/6 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/8 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Glassmorphic Login Card */}
      <div className="w-full max-w-[420px] p-8 md:p-10 rounded-[32px] bg-[var(--sidebar-bg)] border border-[var(--sidebar-border)] shadow-[var(--sidebar-shadow)] flex flex-col gap-8 transition-all duration-300 relative z-10 backdrop-blur-md animate-fade-in">
        
        {/* Branding Logo & Header */}
        <div className="flex flex-col items-center text-center gap-3">
          <div className="flex items-center gap-3.5 group">
            <img 
              src={logoImg} 
              alt="ShipSync Logo" 
              className="w-12 h-12 object-contain transition-transform duration-500 hover:scale-110" 
            />
            <h1 className="text-3.5xl font-extrabold tracking-tight text-[var(--color-text-primary)]">
              ShipSync
            </h1>
          </div>
          <p className="text-xs text-[var(--color-text-muted)] max-w-[280px] mt-1.5 leading-relaxed">
            Access your shipping details, live analytics, and logistic pipelines instantly.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Email Input Field */}
          <InputField
            label="Email Address"
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => handleEmailChange(e.target.value)}
            error={emailError}
            icon={<Mail className="w-4 h-4 stroke-[2]" />}
            required
            autoComplete="email"
          />

          {/* Password Input Field */}
          <InputField
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => handlePasswordChange(e.target.value)}
            error={passwordError}
            icon={<Lock className="w-4 h-4 stroke-[2]" />}
            required
            autoComplete="current-password"
          />

          {/* User Role Selection Dropdown */}
          <Dropdown
            label="Choose Workspace Portal"
            options={roleOptions}
            selectedValue={role}
            onChange={handleRoleChange}
            placeholder="Select a portal"
          />

          {/* Submit Action Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 flex items-center justify-center gap-2.5 w-full py-3 bg-primary hover:bg-primary-hover disabled:bg-primary/50 text-white border-none rounded-xl text-sm font-semibold cursor-pointer shadow-[0_6px_20px_var(--color-primary-glow)] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(123,87,223,0.35)] active:translate-y-0 active:shadow-[0_4px_12px_var(--color-primary-glow)] disabled:opacity-75 disabled:cursor-not-allowed transition-all duration-200 select-none group"
          >
            {isSubmitting ? (
              <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRight className="w-4.5 h-4.5 group-hover:translate-x-0.5 transition-transform duration-200" />
              </>
            )}
          </button>
        </form>

        {/* Footer Accent */}
        <div className="text-center">
          <p className="text-[11px] text-[var(--color-text-muted)]">
            Secured end-to-end logistics workspace portal.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
