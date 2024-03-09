import { CustomerServiceClient } from '@batuhan_kutluay-case/core/service-client/customer.service.client';
import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';

@Module({
  imports: [],
  controllers: [CustomerController],
  providers: [CustomerService, CustomerServiceClient],
})
export class CustomerModule {}
