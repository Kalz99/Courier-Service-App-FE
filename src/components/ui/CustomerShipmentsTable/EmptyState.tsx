import React from 'react';
import { Inbox } from 'lucide-react';

export const EmptyState: React.FC = React.memo(() => {
    return (
        <div className="w-full flex flex-col items-center justify-center py-14 px-6 text-center gap-4.5 bg-[var(--sidebar-bg)] rounded-[24px]">
            <div className="flex items-center justify-center p-4 rounded-full bg-[var(--app-bg)] border border-[var(--sidebar-border)] text-[var(--color-text-muted)]">
                <Inbox className="w-10 h-10 opacity-40" />
            </div>
            <div className="flex flex-col gap-1 max-w-sm">
                <span className="text-base font-bold text-[var(--color-text-primary)]">
                    No shipments found
                </span>
                <span className="text-xs text-[var(--color-text-muted)] leading-relaxed">
                    We couldn't find any shipments matching your search term or active filters. Try searching for something else.
                </span>
            </div>
        </div>
    );
});

EmptyState.displayName = 'EmptyState';
