import { Link } from "react-router-dom";
import {
    Mail,
    Lock,
    User,
    Phone,
    MapPin,
    Briefcase,
    UserPlus,
    ArrowRight,
    AlertTriangle,
} from "lucide-react";

import { InputField } from "../components/ui";
import { useRegisterForm } from "../hooks/useRegisterForm";

import logoImg from "../assets/logo.png";

const Register = () => {
    const {
        fields,
        errors,
        isSubmitting,
        handleFieldChange,
        handleSubmit,
    } = useRegisterForm();

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="w-full max-w-2xl bg-white rounded-3xl border border-slate-200 shadow-sm p-8 md:p-10">

                {/* Header */}
                <div className="flex flex-col items-center text-center mb-8">
                    <img
                        src={logoImg}
                        alt="ShipSync Logo"
                        className="w-14 h-14 object-contain mb-4"
                    />

                    <h1 className="text-3xl font-bold text-slate-900">
                        ShipSync
                    </h1>

                    <p className="text-sm text-slate-500 mt-2">
                        Create your account to manage and track shipments.
                    </p>
                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                >

                    {/* Global Error */}
                    {errors.global && (
                        <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                            <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />

                            <p>{errors.global}</p>
                        </div>
                    )}

                    {/* Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                        <InputField
                            label="Full Name"
                            type="text"
                            placeholder="John Doe"
                            value={fields.fullName}
                            onChange={(e) =>
                                handleFieldChange(
                                    "fullName",
                                    e.target.value
                                )
                            }
                            error={errors.fullName}
                            icon={<User className="w-4 h-4" />}
                            required
                        />

                        <InputField
                            label="Business Name"
                            type="text"
                            placeholder="Acme Logistics"
                            value={fields.businessName}
                            onChange={(e) =>
                                handleFieldChange(
                                    "businessName",
                                    e.target.value
                                )
                            }
                            error={errors.businessName}
                            icon={<Briefcase className="w-4 h-4" />}
                            required
                        />

                        <InputField
                            label="Email"
                            type="email"
                            placeholder="john@example.com"
                            value={fields.email}
                            onChange={(e) =>
                                handleFieldChange(
                                    "email",
                                    e.target.value
                                )
                            }
                            error={errors.email}
                            icon={<Mail className="w-4 h-4" />}
                            autoComplete="email"
                            required
                        />

                        <InputField
                            label="Phone Number"
                            type="tel"
                            placeholder="+94 77 123 4567"
                            value={fields.mobile}
                            onChange={(e) =>
                                handleFieldChange(
                                    "mobile",
                                    e.target.value
                                )
                            }
                            error={errors.mobile}
                            icon={<Phone className="w-4 h-4" />}
                            required
                        />

                        <InputField
                            label="Password"
                            type="password"
                            placeholder="••••••••"
                            value={fields.password}
                            onChange={(e) =>
                                handleFieldChange(
                                    "password",
                                    e.target.value
                                )
                            }
                            error={errors.password}
                            icon={<Lock className="w-4 h-4" />}
                            autoComplete="new-password"
                            required
                        />

                        <InputField
                            label="Address"
                            type="text"
                            placeholder="Colombo, Sri Lanka"
                            value={fields.address}
                            onChange={(e) =>
                                handleFieldChange(
                                    "address",
                                    e.target.value
                                )
                            }
                            error={errors.address}
                            icon={<MapPin className="w-4 h-4" />}
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full h-12 rounded-xl bg-primary text-white font-medium flex items-center justify-center gap-2 transition hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <>
                                <UserPlus className="w-4 h-4" />

                                <span>Create Account</span>

                                <ArrowRight className="w-4 h-4" />
                            </>
                        )}
                    </button>
                </form>

                {/* Footer */}
                <div className="mt-6 text-center">
                    <p className="text-sm text-slate-500">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="text-primary font-medium hover:underline"
                        >
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;