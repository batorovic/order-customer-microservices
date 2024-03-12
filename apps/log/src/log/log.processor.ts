import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { OrderRepository } from './repositories';

@Processor('AUDIT_LOG_QUEUE{auditLogQueue}')
export class LogProcessor {
  private readonly logger = new Logger(LogProcessor.name);

  constructor(private readonly orderRepository: OrderRepository) {}

  @Process('orderLog')
  async handleLogJob(job: Job) {
    this.logger.debug(`Processing log job with ID ${job.id} : ${JSON.stringify(job.data)}`);

    await this.orderRepository.create(job.data);
  }
}
