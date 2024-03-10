import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { OrderNotFoundException } from '../exceptions';
import { OrderRepository } from '../repositories';
import { UpdateOrderCommand } from './update-order.command';

@CommandHandler(UpdateOrderCommand)
export class UpdateOrderHandler implements ICommandHandler<UpdateOrderCommand> {
  private readonly logger = new Logger(UpdateOrderHandler.name);

  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(command: UpdateOrderCommand): Promise<boolean> {
    this.logger.debug(command, '[UpdateOrderHandler] executing command');

    const order = await this.orderRepository.getById(command.id);

    if (!order) {
      throw new OrderNotFoundException('Order not found');
    }

    await this.orderRepository.update(command.id, command.order);

    return true;
  }
}
