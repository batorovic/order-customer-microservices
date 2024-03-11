import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { CreateOrderHandler, DeleteOrderHandler } from './commands';
import { UpdateOrderStatusHandler } from './commands/update-order-status.handler';
import { UpdateOrderHandler } from './commands/update-order.handler';
import { Order, OrderSchema } from './entities';
import { OrderController } from './order.controller';
import { GetCustomerOrdersHandler, GetOrdersHandler } from './queries';
import { OrderRepository } from './repositories';

@Module({
  imports: [MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]), CqrsModule],
  controllers: [OrderController],
  providers: [
    OrderRepository,
    CreateOrderHandler,
    UpdateOrderHandler,
    UpdateOrderStatusHandler,
    DeleteOrderHandler,
    GetOrdersHandler,
    GetCustomerOrdersHandler,
  ],
})
export class OrderModule {}
