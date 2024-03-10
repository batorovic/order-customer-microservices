import { OrderDocument } from '../entities';

export type GetAllOrders = {
  data: Array<OrderDocument>;
  count: number;
};
