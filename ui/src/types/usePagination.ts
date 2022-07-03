interface UsePaginationProps {
    contentPerPage: number,
    count: number,
}
interface UsePaginationReturn {
    page: number;
    totalPages: number;
    firstContentIndex: number;
    lastContentIndex: number;
    nextPage: () => void;
    prevPage: () => void;
    setPage: (page: number) => void;
    gaps:Gap
}

export interface Gap {
    before: boolean;
    paginationGroup: number[];
    after: boolean;
}

export type UsePagination = (UsePaginationProps:UsePaginationProps) => (UsePaginationReturn);