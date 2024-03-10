import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { OrderRepository } from '../repositories';
import { DeleteOrderCommand } from './delete-order.command';

@CommandHandler(DeleteOrderCommand)
export class DeleteOrderHandler implements ICommandHandler<DeleteOrderCommand> {
  private readonly logger = new Logger(DeleteOrderHandler.name);

  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(command: DeleteOrderCommand): Promise<boolean> {
    this.logger.debug(command, '[DeleteOrderCommand] executing command');

    const order = await this.orderRepository.getById(command.id);

    if (!order) {
      throw new Error('Order not found');
    }
    await this.orderRepository.delete(command.id);

    return true;
  }
}
