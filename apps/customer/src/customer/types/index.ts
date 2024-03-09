import { CustomerDocument } from '../entities';

export type Customer = Omit<CustomerDocument, 'id'>;

export type GetAllCustomers = {
  data: Array<CustomerDocument>;
  count: number;
};
