export type PaginationResponse<T = unknown> = T & {
  message: 'success';
  pagination: { currentPage: number; totalPages: number; resultCount: number };
};

export type successResponse<T = unknown> = T & {
  message: 'success';
};
