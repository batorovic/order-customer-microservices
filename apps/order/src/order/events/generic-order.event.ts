import { OrderAction } from '@batuhan_kutluay-case/common';

// events/generic-order.event.ts
export class GenericOrderEvent {
  constructor(
    public readonly action: OrderAction,
    public readonly details: any,
    public readonly timestamp: Date = new Date(),
  ) {}
}
