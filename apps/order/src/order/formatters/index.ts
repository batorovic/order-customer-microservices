import { OrderDocument } from '../entities';

export class OrderFormatter {
  static formatOrders(orders: OrderDocument[]): OrderDocument | OrderDocument[] {
    return orders.length === 1 ? orders[0] : orders;
  }
}
