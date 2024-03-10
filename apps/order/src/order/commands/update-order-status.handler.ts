import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { OrderNotFoundException } from '../exceptions';
import { OrderRepository } from '../repositories';
import { UpdateOrderStatusCommand } from './update-order-status.command';

@CommandHandler(UpdateOrderStatusCommand)
export class UpdateOrderStatusHandler implements ICommandHandler<UpdateOrderStatusCommand> {
  private readonly logger = new Logger(UpdateOrderStatusHandler.name);

  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(command: UpdateOrderStatusCommand): Promise<boolean> {
    this.logger.debug(command, '[UpdateOrderStatusHandler] executing command');

    const order = await this.orderRepository.getById(command.id);

    if (!order) {
      throw new OrderNotFoundException('Order not found');
    }

    await this.orderRepository.updateStatus(command.id, command.status);

    return true;
  }
}
