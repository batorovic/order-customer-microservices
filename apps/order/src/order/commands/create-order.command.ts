import { CreateOrderDto } from '@batuhan_kutluay-case/common/dto/order-service';

export class CreateOrderCommand {
  constructor(public readonly order: CreateOrderDto) {}
}
