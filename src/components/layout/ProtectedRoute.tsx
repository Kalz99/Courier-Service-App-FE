import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
    allowedRoles?: ('admin' | 'customer')[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
    const { user, isLoading } = useAuth();

    // Show a premium loading spinner while resolving session refresh
    if (isLoading) {
        return (
            <div className="w-screen h-screen flex flex-col items-center justify-center bg-[var(--app-bg)] text-[var(--color-text-muted)] gap-3">
                <Loader2 className="w-10 h-10 animate-spin text-primary" />
                <span className="text-sm font-semibold select-none">Securing workspace session...</span>
            </div>
        );
    }

    // Redirect to login if user is not authenticated
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Redirect to a safe space if role is not authorized
    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return <Navigate to="/dashboard" replace />;
    }

    // Render nested guarded page content
    return <Outlet />;
};

export default ProtectedRoute;
