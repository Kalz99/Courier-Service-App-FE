import React, { useMemo } from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

export interface TablePaginationProps {
    currentPage: number;
    onPageChange: (page: number) => void;
    totalPages: number;
    startIndex: number;
    endIndex: number;
    totalShipmentsCount: number;
}

/** Build the page number list with ellipsis for large page counts. */
function buildPageList(current: number, total: number): (number | '…')[] {
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

    const pages: (number | '…')[] = [1];

    if (current > 3) pages.push('…');

    const rangeStart = Math.max(2, current - 1);
    const rangeEnd = Math.min(total - 1, current + 1);

    for (let p = rangeStart; p <= rangeEnd; p++) pages.push(p);

    if (current < total - 2) pages.push('…');

    pages.push(total);
    return pages;
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

    const pageList = useMemo(
        () => buildPageList(currentPage, totalPages),
        [currentPage, totalPages]
    );

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4.5 bg-[var(--app-bg)]/35 border-t border-[var(--sidebar-border)] select-none">
            <span className="text-xs font-medium text-[var(--color-text-muted)]">
                Showing <span className="font-bold text-[var(--color-text-primary)]">{startIndex}</span> to{' '}
                <span className="font-bold text-[var(--color-text-primary)]">{endIndex}</span> of{' '}
                <span className="font-bold text-[var(--color-text-primary)]">{totalShipmentsCount}</span> shipments
            </span>

            {totalPages > 1 && (
                <div className="flex items-center gap-1.5" role="navigation" aria-label="Pagination Navigation">
                    {/* Prev */}
                    <button
                        disabled={currentPage === 1}
                        onClick={handlePrevPage}
                        aria-label="Previous Page"
                        className="p-1.5 rounded-lg border border-[var(--sidebar-border)] bg-[var(--sidebar-bg)] cursor-pointer text-[var(--color-text-muted)] hover:border-primary hover:text-primary disabled:opacity-40 disabled:hover:border-[var(--sidebar-border)] disabled:hover:text-[var(--color-text-muted)] disabled:cursor-not-allowed transition-all duration-200"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </button>

                    {/* Page numbers with ellipsis */}
                    {pageList.map((item, idx) =>
                        item === '…' ? (
                            <span
                                key={`ellipsis-${idx}`}
                                className="w-7.5 h-7.5 flex items-center justify-center text-[var(--color-text-muted)]"
                                aria-hidden="true"
                            >
                                <MoreHorizontal className="w-4 h-4" />
                            </span>
                        ) : (
                            <button
                                key={item}
                                onClick={() => onPageChange(item)}
                                aria-label={currentPage === item ? `Current Page, Page ${item}` : `Go to page ${item}`}
                                aria-current={currentPage === item ? 'page' : undefined}
                                className={`w-7.5 h-7.5 flex items-center justify-center text-xs font-bold rounded-lg border cursor-pointer transition-all duration-200 ${
                                    currentPage === item
                                        ? 'border-primary bg-[var(--sidebar-active-bg)] text-primary shadow-[0_2px_8px_var(--color-primary-glow)]'
                                        : 'border-[var(--sidebar-border)] bg-[var(--sidebar-bg)] text-[var(--color-text-muted)] hover:border-primary hover:text-primary'
                                }`}
                            >
                                {item}
                            </button>
                        )
                    )}

                    {/* Next */}
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
