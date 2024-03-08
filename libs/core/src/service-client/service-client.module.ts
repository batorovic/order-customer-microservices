import { Global, Module } from '@nestjs/common';
import { ClsModule } from 'nestjs-cls';

@Global()
@Module({
  imports: [ClsModule],
  providers: [],
  exports: [],
})
export class ServiceClientModule {}
