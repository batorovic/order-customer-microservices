import { Global, Module } from '@nestjs/common';
import { ClsModule } from 'nestjs-cls';
import { CustomerServiceClient } from './customer.service.client';

@Global()
@Module({
  imports: [ClsModule],
  providers: [CustomerServiceClient],
  exports: [CustomerServiceClient],
})
export class ServiceClientModule {}
