import { UpdateOrderDto } from '@batuhan_kutluay-case/common/dto/order-service';

export class UpdateOrderCommand {
  constructor(
    public readonly id: string,
    public readonly order: UpdateOrderDto,
  ) {}
}
