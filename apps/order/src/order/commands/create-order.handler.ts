import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateOrderCommand } from '.';
import { OrderRepository } from '../repositories';

@CommandHandler(CreateOrderCommand)
export class CreateOrderHandler implements ICommandHandler<CreateOrderCommand> {
  private readonly logger = new Logger(CreateOrderHandler.name);

  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(command: CreateOrderCommand): Promise<string> {
    this.logger.debug(command, '[CreateOrderHandler] executing command');

    return (await this.orderRepository.create(command.order))._id;
  }
}
