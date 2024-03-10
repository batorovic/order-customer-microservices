import { Logger } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetOrdersQuery } from '.';
import { OrderDocument } from '../entities';
import { OrderRepository } from '../repositories';

@QueryHandler(GetOrdersQuery)
export class GetOrdersHandler implements IQueryHandler<GetOrdersQuery> {
  private readonly logger = new Logger(GetOrdersHandler.name);

  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(): Promise<OrderDocument | OrderDocument[]> {
    this.logger.debug('[GetOrdersHandler] executing query');

    return this.orderRepository.getOrders();
  }
}
