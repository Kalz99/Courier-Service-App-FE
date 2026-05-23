import React from 'react';
import { Users } from 'lucide-react';

export const CustomerEmptyState: React.FC = React.memo(() => {
    return (
        <div className="w-full flex flex-col items-center justify-center py-20 text-center text-[var(--color-text-muted)] gap-3 bg-[var(--app-bg)]/20 rounded-[24px]">
            <div className="flex items-center justify-center p-4 rounded-full bg-[var(--app-bg)] border border-[var(--sidebar-border)] text-[var(--color-text-muted)]">
                <Users className="w-10 h-10 opacity-40" />
            </div>
            <div className="flex flex-col gap-1 max-w-sm">
                <h3 className="font-bold text-sm text-[var(--color-text-primary)]">No customers matching your search</h3>
                <p className="text-xs max-w-[300px] leading-relaxed">
                    Double check your spelling or search by different keywords such as name or email.
                </p>
            </div>
        </div>
    );
});

CustomerEmptyState.displayName = 'CustomerEmptyState';
