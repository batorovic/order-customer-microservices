import { Logger } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { OrderNotFoundException } from '../exceptions';
import { OrderRepository } from '../repositories';
import { DeleteOrderCommand } from './delete-order.command';
import { GenericOrderEvent } from '../events';
import { OrderAction } from '@batuhan_kutluay-case/common';
@CommandHandler(DeleteOrderCommand)
export class DeleteOrderHandler implements ICommandHandler<DeleteOrderCommand> {
  private readonly logger = new Logger(DeleteOrderHandler.name);

  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: DeleteOrderCommand): Promise<boolean> {
    const { orderRepository } = this;

    this.logger.debug(command, '[DeleteOrderCommand] executing command');

    const order = await orderRepository.getById(command.id);

    if (!order) {
      throw new OrderNotFoundException('Order not found');
    }

    await orderRepository.delete(command.id);

    this.eventBus.publish(new GenericOrderEvent(OrderAction.DELETED, order));

    return true;
  }
}
