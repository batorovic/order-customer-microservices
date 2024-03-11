import { OrderAction } from '@batuhan_kutluay-case/common';
import { Logger } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { GenericOrderEvent } from '../events';
import { OrderNotFoundException } from '../exceptions';
import { OrderRepository } from '../repositories';
import { UpdateOrderStatusCommand } from './update-order-status.command';

@CommandHandler(UpdateOrderStatusCommand)
export class UpdateOrderStatusHandler implements ICommandHandler<UpdateOrderStatusCommand> {
  private readonly logger = new Logger(UpdateOrderStatusHandler.name);

  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: UpdateOrderStatusCommand): Promise<boolean> {
    this.logger.debug(command, '[UpdateOrderStatusHandler] executing command');

    const order = await this.orderRepository.getById(command.id);

    if (!order) {
      throw new OrderNotFoundException('Order not found');
    }

    await this.orderRepository.updateStatus(command.id, command.status);

    this.eventBus.publish(new GenericOrderEvent(OrderAction.UPDATED, { order: command.id, status: order.status }));

    return true;
  }
}
