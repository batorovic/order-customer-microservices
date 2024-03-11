import { OrderAction } from '@batuhan_kutluay-case/common';
import { Logger } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { CreateOrderCommand } from '.';
import { GenericOrderEvent } from '../events';
import { OrderRepository } from '../repositories';

@CommandHandler(CreateOrderCommand)
export class CreateOrderHandler implements ICommandHandler<CreateOrderCommand> {
  private readonly logger = new Logger(CreateOrderHandler.name);

  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateOrderCommand): Promise<string> {
    this.logger.debug(command, '[CreateOrderHandler] executing command');

    const orderId = (await this.orderRepository.create(command.order))._id;

    this.eventBus.publish(new GenericOrderEvent(OrderAction.CREATED, command.order));

    return orderId;
  }
}
