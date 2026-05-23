import React, { createContext, useContext, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { CheckCircle2, AlertOctagon, AlertTriangle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastMessage {
    id: string;
    message: string;
    type: ToastType;
    duration: number;
}

interface ToastContextType {
    showToast: (message: string, type?: ToastType, duration?: number) => void;
    removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

// Toast visual styles helper
const getToastStyles = (type: ToastType) => {
    switch (type) {
        case 'success':
            return {
                bg: 'bg-emerald-500/10 dark:bg-emerald-500/15 border-emerald-500/20 dark:border-emerald-500/30',
                text: 'text-emerald-800 dark:text-emerald-400',
                progressBar: 'bg-emerald-500 dark:bg-emerald-400',
                icon: <CheckCircle2 className="w-4.5 h-4.5 text-emerald-500 shrink-0" />
            };
        case 'error':
            return {
                bg: 'bg-red-500/10 dark:bg-red-500/15 border-red-500/20 dark:border-red-500/30',
                text: 'text-red-800 dark:text-red-400',
                progressBar: 'bg-red-500 dark:bg-red-400',
                icon: <AlertOctagon className="w-4.5 h-4.5 text-red-500 shrink-0" />
            };
        case 'warning':
            return {
                bg: 'bg-amber-500/10 dark:bg-amber-500/15 border-amber-500/20 dark:border-amber-500/30',
                text: 'text-amber-800 dark:text-amber-400',
                progressBar: 'bg-amber-500 dark:bg-amber-400',
                icon: <AlertTriangle className="w-4.5 h-4.5 text-amber-500 shrink-0" />
            };
        default:
            return {
                bg: 'bg-indigo-500/10 dark:bg-indigo-500/15 border-indigo-500/20 dark:border-indigo-500/30',
                text: 'text-indigo-800 dark:text-indigo-400',
                progressBar: 'bg-indigo-500 dark:bg-indigo-400',
                icon: <Info className="w-4.5 h-4.5 text-indigo-500 shrink-0" />
            };
    }
};

// CSS Keyframes injection
const ToastStyles: React.FC = () => (
    <style>{`
        @keyframes toast-slide-in {
            from {
                transform: translateX(120%) scale(0.9);
                opacity: 0;
            }
            to {
                transform: translateX(0) scale(1);
                opacity: 1;
            }
        }
        @keyframes toast-progress-shrink {
            from { width: 100%; }
            to { width: 0%; }
        }
        .animate-toast-in {
            animation: toast-slide-in 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-progress-shrink {
            animation: toast-progress-shrink linear forwards;
        }
    `}</style>
);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [toasts, setToasts] = useState<ToastMessage[]>([]);

    const removeToast = useCallback((id: string) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, []);

    const showToast = useCallback((message: string, type: ToastType = 'info', duration: number = 4000) => {
        const id = Date.now().toString() + Math.random().toString(36).substring(2, 6);
        
        setToasts((prev) => [
            ...prev,
            { id, message, type, duration }
        ]);

        // Auto expire
        setTimeout(() => {
            removeToast(id);
        }, duration);
    }, [removeToast]);

    return (
        <ToastContext.Provider value={{ showToast, removeToast }}>
            {children}
            <ToastStyles />
            {createPortal(
                <div 
                    className="fixed top-5 right-5 z-[9999] flex flex-col gap-3.5 max-w-sm w-full pointer-events-none select-none"
                    role="live"
                    aria-live="assertive"
                >
                    {toasts.map((toast) => {
                        const styleInfo = getToastStyles(toast.type);
                        return (
                            <div
                                key={toast.id}
                                className={`w-full pointer-events-auto flex flex-col rounded-2xl border backdrop-blur-md bg-white/70 dark:bg-[var(--sidebar-bg)]/85 shadow-lg overflow-hidden transition-all duration-300 animate-toast-in ${styleInfo.bg}`}
                            >
                                <div className="flex items-start gap-3.5 p-4.5">
                                    <div className="shrink-0 mt-0.5">
                                        {styleInfo.icon}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className={`text-xs font-bold leading-relaxed select-all ${styleInfo.text}`}>
                                            {toast.message}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => removeToast(toast.id)}
                                        className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] shrink-0 transition-colors p-0.5 rounded-lg hover:bg-[var(--sidebar-active-bg)]/20 cursor-pointer"
                                        aria-label="Close notification"
                                    >
                                        <X className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                                {/* Progress countdown indicator bar */}
                                <div className="w-full h-1 bg-black/5 dark:bg-white/5 mt-auto">
                                    <div 
                                        className={`h-full animate-progress-shrink ${styleInfo.progressBar}`}
                                        style={{ animationDuration: `${toast.duration}ms` }}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>,
                document.body
            )}
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};
