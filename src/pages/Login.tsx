import { Link } from 'react-router-dom';
import { Mail, Lock, Shield, User, ArrowRight, AlertTriangle } from 'lucide-react';
import { InputField, Dropdown } from '../components/ui';
import { useLoginForm } from '../hooks/useLoginForm';
import logoImg from '../assets/logo.png';

export const Login: React.FC = () => {
  const {
    fields,
    errors,
    isSubmitting,
    handleFieldChange,
    handleSubmit,
  } = useLoginForm();

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
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-[420px] bg-white rounded-3xl border border-slate-200 shadow-sm p-8 md:p-10">
        
        {/* Branding Logo & Header */}
        <div className="flex flex-col items-center text-center mb-8 gap-3">
          <div className="flex items-center gap-3.5">
            <img 
              src={logoImg} 
              alt="ShipSync Logo" 
              className="w-12 h-12 object-contain" 
            />
            <h1 className="text-3xl font-bold text-slate-900">
              ShipSync
            </h1>
          </div>
          <p className="text-sm text-slate-500 max-w-[280px] mt-1.5 leading-relaxed">
            Access your shipping details, live analytics, and logistic pipelines instantly.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Global Error Banner */}
          {errors.global && (
            <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
              <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
              <p>{errors.global}</p>
            </div>
          )}

          {/* Email Input Field */}
          <InputField
            label="Email Address"
            type="email"
            placeholder="name@example.com"
            value={fields.email}
            onChange={(e) => handleFieldChange('email', e.target.value)}
            error={errors.email}
            icon={<Mail className="w-4 h-4" />}
            required
            autoComplete="email"
          />

          {/* Password Input Field */}
          <InputField
            label="Password"
            type="password"
            placeholder="••••••••"
            value={fields.password}
            onChange={(e) => handleFieldChange('password', e.target.value)}
            error={errors.password}
            icon={<Lock className="w-4 h-4" />}
            required
            autoComplete="current-password"
          />

          {/* User Role Selection Dropdown */}
          <Dropdown
            label="Choose Workspace Portal"
            options={roleOptions}
            selectedValue={fields.role}
            onChange={(val) => handleFieldChange('role', val)}
            placeholder="Select a portal"
          />

          {/* Submit Action Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-12 rounded-xl bg-primary text-white font-medium flex items-center justify-center gap-2 transition hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Link to Register */}
        <div className="mt-8 text-center flex flex-col gap-2.5">
          <p className="text-sm text-slate-500">
            Don't have an account?{' '}
            <Link 
              to="/register" 
              className="text-primary font-medium hover:underline"
            >
              Create Account
            </Link>
          </p>
          <p className="text-xs text-slate-400">
            Secured end-to-end logistics workspace portal.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
