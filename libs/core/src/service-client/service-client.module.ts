import { Global, Module } from '@nestjs/common';
import { ClsModule } from 'nestjs-cls';
import { CustomerServiceClient } from './customer.service.client';
import { OrderServiceClient } from './order.service.client';

@Global()
@Module({
  imports: [ClsModule],
  providers: [CustomerServiceClient, OrderServiceClient],
  exports: [CustomerServiceClient, OrderServiceClient],
})
export class ServiceClientModule {}
