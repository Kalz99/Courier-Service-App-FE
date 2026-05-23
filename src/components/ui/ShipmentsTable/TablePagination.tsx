import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface TablePaginationProps {
    currentPage: number;
    onPageChange: (page: number) => void;
    totalPages: number;
    startIndex: number;
    endIndex: number;
    totalShipmentsCount: number;
}

export const TablePagination: React.FC<TablePaginationProps> = React.memo(({
    currentPage,
    onPageChange,
    totalPages,
    startIndex,
    endIndex,
    totalShipmentsCount
}) => {
    if (totalShipmentsCount === 0) return null;

    const handlePrevPage = () => onPageChange(Math.max(currentPage - 1, 1));
    const handleNextPage = () => onPageChange(Math.min(currentPage + 1, totalPages));

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4.5 bg-[var(--app-bg)]/35 border-t border-[var(--sidebar-border)] select-none">
            <span className="text-xs font-medium text-[var(--color-text-muted)]">
                Showing <span className="font-bold text-[var(--color-text-primary)]">{startIndex}</span> to{' '}
                <span className="font-bold text-[var(--color-text-primary)]">{endIndex}</span> of{' '}
                <span className="font-bold text-[var(--color-text-primary)]">{totalShipmentsCount}</span> shipments
            </span>

            {totalPages > 1 && (
                <div className="flex items-center gap-2" role="navigation" aria-label="Pagination Navigation">
                    <button
                        disabled={currentPage === 1}
                        onClick={handlePrevPage}
                        aria-label="Previous Page"
                        className="p-1.5 rounded-lg border border-[var(--sidebar-border)] bg-[var(--sidebar-bg)] cursor-pointer text-[var(--color-text-muted)] hover:border-primary hover:text-primary disabled:opacity-40 disabled:hover:border-[var(--sidebar-border)] disabled:hover:text-[var(--color-text-muted)] disabled:cursor-not-allowed transition-all duration-200"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </button>

                    {Array.from({ length: totalPages }).map((_, i) => {
                        const pageNum = i + 1;
                        const isActive = currentPage === pageNum;
                        return (
                            <button
                                key={pageNum}
                                onClick={() => onPageChange(pageNum)}
                                aria-label={isActive ? `Current Page, Page ${pageNum}` : `Go to page ${pageNum}`}
                                aria-current={isActive ? 'page' : undefined}
                                className={`w-7.5 h-7.5 flex items-center justify-center text-xs font-bold rounded-lg border cursor-pointer transition-all duration-200 ${isActive
                                    ? 'border-primary bg-[var(--sidebar-active-bg)] text-primary shadow-[0_2px_8px_var(--color-primary-glow)]'
                                    : 'border-[var(--sidebar-border)] bg-[var(--sidebar-bg)] text-[var(--color-text-muted)] hover:border-primary hover:text-primary'
                                    }`}
                            >
                                {pageNum}
                            </button>
                        );
                    })}

                    <button
                        disabled={currentPage === totalPages}
                        onClick={handleNextPage}
                        aria-label="Next Page"
                        className="p-1.5 rounded-lg border border-[var(--sidebar-border)] bg-[var(--sidebar-bg)] cursor-pointer text-[var(--color-text-muted)] hover:border-primary hover:text-primary disabled:opacity-40 disabled:hover:border-[var(--sidebar-border)] disabled:hover:text-[var(--color-text-muted)] disabled:cursor-not-allowed transition-all duration-200"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            )}
        </div>
    );
});

TablePagination.displayName = 'TablePagination';
