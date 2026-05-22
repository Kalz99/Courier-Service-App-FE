import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, User, Phone, MapPin, Briefcase, UserPlus, ArrowRight } from 'lucide-react';
import { InputField } from '../components/ui';
import { useRegisterForm } from '../hooks/useRegisterForm';
import logoImg from '../assets/logo.png';

export const Register: React.FC = () => {
    // Delegate all validation, state handling, and submit redirection logic to custom hook
    const {
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
    } = useRegisterForm();

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

    return (
        <div
            style={lightThemeStyles}
            className="min-h-screen w-full flex items-center justify-center p-4 bg-[var(--app-bg)] relative overflow-hidden font-sans"
        >
            {/* Light Theme Pastel Violet Blur Accents */}
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/6 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/8 rounded-full blur-[120px] pointer-events-none" />

            {/* Main Glassmorphic Register Card */}
            <div className="w-full max-w-[640px] p-8 md:p-10 rounded-[32px] bg-[var(--sidebar-bg)] border border-[var(--sidebar-border)] shadow-[var(--sidebar-shadow)] flex flex-col gap-8 transition-all duration-300 relative z-10 backdrop-blur-md animate-fade-in">

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
                    <p className="text-xs text-[var(--color-text-muted)] max-w-[400px] mt-1.5 leading-relaxed">
                        Register a new workspace portal account. Set up your delivery metrics, pipeline keys, and start tracking immediately.
                    </p>
                </div>

                {/* Register Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    {/* Responsive Two-Column Inputs Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4">

                        {/* Full Name */}
                        <InputField
                            label="Full Name"
                            type="text"
                            placeholder="John Doe"
                            value={fullName}
                            onChange={(e) => handleFullNameChange(e.target.value)}
                            error={fullNameError}
                            icon={<User className="w-4 h-4 stroke-[2]" />}
                            required
                        />

                        {/* Business Name */}
                        <InputField
                            label="Business Name"
                            type="text"
                            placeholder="Acme Logistics"
                            value={businessName}
                            onChange={(e) => handleBusinessNameChange(e.target.value)}
                            error={businessNameError}
                            icon={<Briefcase className="w-4 h-4 stroke-[2]" />}
                            required
                        />

                        {/* Email Address */}
                        <InputField
                            label="Email Address"
                            type="email"
                            placeholder="name@business.com"
                            value={email}
                            onChange={(e) => handleEmailChange(e.target.value)}
                            error={emailError}
                            icon={<Mail className="w-4 h-4 stroke-[2]" />}
                            required
                            autoComplete="email"
                        />

                        {/* Mobile Number */}
                        <InputField
                            label="Mobile Number"
                            type="tel"
                            placeholder="+1 (555) 019-2834"
                            value={mobile}
                            onChange={(e) => handleMobileChange(e.target.value)}
                            error={mobileError}
                            icon={<Phone className="w-4 h-4 stroke-[2]" />}
                            required
                        />

                        {/* Password */}
                        <InputField
                            label="Password"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => handlePasswordChange(e.target.value)}
                            error={passwordError}
                            icon={<Lock className="w-4 h-4 stroke-[2]" />}
                            required
                            autoComplete="new-password"
                        />

                        {/* Business Address */}
                        <InputField
                            label="Address"
                            type="text"
                            placeholder="100 Express Blvd, NY"
                            value={address}
                            onChange={(e) => handleAddressChange(e.target.value)}
                            error={addressError}
                            icon={<MapPin className="w-4 h-4 stroke-[2]" />}
                            required
                        />

                    </div>

                    {/* Submit Action Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="mt-3 flex items-center justify-center gap-2.5 w-full py-3 bg-primary hover:bg-primary-hover disabled:bg-primary/50 text-white border-none rounded-xl text-sm font-semibold cursor-pointer shadow-[0_6px_20px_var(--color-primary-glow)] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(123,87,223,0.35)] active:translate-y-0 active:shadow-[0_4px_12px_var(--color-primary-glow)] disabled:opacity-75 disabled:cursor-not-allowed transition-all duration-200 select-none group"
                    >
                        {isSubmitting ? (
                            <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                        ) : (
                            <>
                                <UserPlus className="w-4.5 h-4.5" />
                                <span>Create Workspace Account</span>
                                <ArrowRight className="w-4.5 h-4.5 group-hover:translate-x-0.5 transition-transform duration-200" />
                            </>
                        )}
                    </button>
                </form>

                {/* Link back to Login */}
                <div className="text-center flex flex-col gap-2.5">
                    <p className="text-xs text-[var(--color-text-muted)]">
                        Already have an account?{' '}
                        <Link
                            to="/login"
                            className="text-primary font-semibold hover:underline transition-all"
                        >
                            Sign In to Portal
                        </Link>
                    </p>
                    <p className="text-[11px] text-[var(--color-text-muted)]">
                        Secured end-to-end logistics workspace portal.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
