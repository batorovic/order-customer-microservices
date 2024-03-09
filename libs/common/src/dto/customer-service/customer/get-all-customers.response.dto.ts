import { CustomerDto } from './customer.dto';

export class GetAllCustomersResponseDto {
  data: Array<CustomerDto>;
  count: number;
}
