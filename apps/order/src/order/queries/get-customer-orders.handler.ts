import { Logger } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { OrderDocument } from '../entities';
import { OrderNotFoundException } from '../exceptions';
import { OrderFormatter } from '../formatters';
import { OrderRepository } from '../repositories';
import { GetCustomerOrdersQuery } from './get-customer-orders.query';

@QueryHandler(GetCustomerOrdersQuery)
export class GetCustomerOrdersHandler implements IQueryHandler<GetCustomerOrdersQuery> {
  private readonly logger = new Logger(GetCustomerOrdersHandler.name);

  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(query: GetCustomerOrdersQuery): Promise<OrderDocument | OrderDocument[]> {
    this.logger.debug(query, '[GetCustomerOrdersHandler] executing query');

    const orders = await this.orderRepository.getCustomerOrders(query.id);

    if (!orders.length) {
      throw new OrderNotFoundException();
    }

    return OrderFormatter.formatOrders(orders);
  }
}
