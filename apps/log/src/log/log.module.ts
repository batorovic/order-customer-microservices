import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Log, LogSchema } from './entities';
import { LogProcessor } from './log.processor';
import { OrderRepository } from './repositories';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Log.name, schema: LogSchema }]),
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
  providers: [LogProcessor, OrderRepository],
})
export class LogModule {}
