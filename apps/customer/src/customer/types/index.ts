import { CustomerDocument } from '../entities';

export type Customer = Omit<CustomerDocument, 'id'>;

export type GetAllCustomers = {
  data: Array<CustomerDocument>;
  count: number;
};

export type UpdateCustomer = {
  name?: string;
  email?: string;
  address?: {
    city?: string;
    country?: string;
    cityCode?: number;
    addressLine?: string;
  };
};
