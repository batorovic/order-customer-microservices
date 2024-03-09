import { CustomerDocument } from '../entities';

export class GetAllCustomersResponseDto {
  data: Array<CustomerDocument>;
  count: number;
}
