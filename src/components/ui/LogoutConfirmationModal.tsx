import React, { useEffect } from 'react';
import { LogOut, X } from 'lucide-react';

interface LogoutConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export const LogoutConfirmationModal: React.FC<LogoutConfirmationModalProps> = ({
    isOpen,
    onClose,
    onConfirm
}) => {
    // Close modal using ESC key
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            window.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop with elegant blur */}
            <div
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-fade-in"
                onClick={onClose}
            />

            {/* Modal Box */}
            <div className="relative w-full max-w-[360px] rounded-[24px] bg-[var(--sidebar-bg)] border border-[var(--sidebar-border)] text-[var(--color-text-primary)] shadow-2xl p-7 overflow-hidden z-10 animate-scale-in">
                {/* Close Button */}
                <button
                    aria-label="Close logout modal"
                    onClick={onClose}
                    className="absolute right-5 top-5 p-1.5 rounded-xl bg-[var(--app-bg)] border border-[var(--sidebar-border)] text-[var(--color-text-muted)] hover:text-red-500 cursor-pointer transition-all duration-200"
                >
                    <X className="w-4 h-4" />
                </button>

                {/* Content */}
                <div className="flex flex-col items-center text-center mt-3 mb-6">
                    {/* Warning Icon Container */}
                    <div className="w-14 h-14 rounded-full bg-rose-500/10 border border-rose-500/25 flex items-center justify-center text-rose-500 mb-5 animate-bounce-subtle">
                        <LogOut className="w-6 h-6 stroke-[2.2]" />
                    </div>

                    <h3 className="text-lg font-bold text-[var(--color-text-primary)] tracking-tight">
                        Confirm Logout
                    </h3>

                    <p className="text-xs text-[var(--color-text-muted)] mt-2 leading-relaxed max-w-[280px]">
                        Are you sure you want to log out?
                    </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 w-full">
                    <button
                        onClick={onClose}
                        className="flex-1 py-3 px-4 rounded-xl text-xs font-bold border border-[var(--sidebar-border)] text-[var(--color-text-muted)] hover:border-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] cursor-pointer bg-transparent transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="flex-1 py-3 px-4 rounded-xl text-xs font-bold bg-rose-500 hover:bg-rose-600 text-white cursor-pointer border-none shadow-[0_4px_12px_rgba(244,63,94,0.25)] transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                    >
                        Log Out
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LogoutConfirmationModal;
