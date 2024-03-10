import { Logger } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { OrderDocument } from '../entities';
import { OrderFormatter } from '../formatters';
import { OrderRepository } from '../repositories';
import { GetCustomerOrdersQuery } from './get-customer-orders.query';

@QueryHandler(GetCustomerOrdersQuery)
export class GetCustomerOrdersHandler implements IQueryHandler<GetCustomerOrdersQuery> {
  private readonly logger = new Logger(GetCustomerOrdersHandler.name);

  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(query: GetCustomerOrdersQuery): Promise<OrderDocument | OrderDocument[]> {
    this.logger.debug(query, '[GetOrdersHandler] executing query');

    const orders = await this.orderRepository.getCustomerOrders(query.id);

    return OrderFormatter.formatOrders(orders);
  }
}
