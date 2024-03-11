import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { CreateOrderHandler, DeleteOrderHandler } from './commands';
import { UpdateOrderStatusHandler } from './commands/update-order-status.handler';
import { UpdateOrderHandler } from './commands/update-order.handler';
import { Order, OrderSchema } from './entities';
import { GenericOrderHandler } from './events';
import { OrderController } from './order.controller';
import { GetCustomerOrdersHandler, GetOrdersHandler } from './queries';
import { OrderRepository } from './repositories';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    CqrsModule,
    BullModule.registerQueueAsync({
      name: 'AUDIT_LOG_QUEUE{auditLogQueue}',
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          redis: {
            host: configService.get<string>('redis.host') as string,
            port: configService.get<number>('redis.port') as number,
          },
          defaultJobOptions: {
            removeOnComplete: true,
            removeOnFail: true,
          },
        };
      },
    }),
  ],
  controllers: [OrderController],
  providers: [
    OrderRepository,
    CreateOrderHandler,
    UpdateOrderHandler,
    UpdateOrderStatusHandler,
    DeleteOrderHandler,
    GetOrdersHandler,
    GetCustomerOrdersHandler,
    GenericOrderHandler,
  ],
})
export class OrderModule {}
