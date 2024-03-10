import { OrderStatus } from '@batuhan_kutluay-case/common';

export class UpdateOrderStatusCommand {
  constructor(
    public readonly id: string,
    public readonly status: OrderStatus,
  ) {}
}
