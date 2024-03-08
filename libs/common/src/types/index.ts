export type SortOrders = 1 | -1;

export type PaginationType = {
  limit?: number;
  skip?: number;
  sort?: SortOrders;
  sortBy?: string;
};
