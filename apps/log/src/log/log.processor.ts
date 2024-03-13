import { InjectQueue, Process, Processor } from '@nestjs/bull';
import { Logger, OnModuleInit } from '@nestjs/common';
import { Job, Queue } from 'bull';
import { promises as fs } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';
import { Log } from './entities';
import { OrderRepository } from './repositories';

@Processor('AUDIT_LOG_QUEUE{auditLogQueue}')
export class LogProcessor implements OnModuleInit {
  private readonly logger = new Logger(LogProcessor.name);

  constructor(
    private readonly orderRepository: OrderRepository,
    @InjectQueue('AUDIT_LOG_QUEUE{auditLogQueue}') private readonly cronJob: Queue,
  ) {}

  onModuleInit() {
    this.cronJob.add(
      'processLogs',
      {},
      {
        repeat: {
          // cron-parser format her gece 00:00'da calisacak
          cron: '0 0 * * *',
        },
      },
    );
  }

  @Process('orderLog')
  async handleLogJob(job: Job) {
    this.logger.debug(`Processing log job with ID ${job.id} : ${JSON.stringify(job.data)}`);

    await this.orderRepository.create(job.data);
  }

  @Process('processLogs')
  async handleProcessLogs(job: Job) {
    this.logger.debug(`Processing log job with ID ${job.id}`);

    const logs = await this.orderRepository.findAll();

    if (!logs.length) {
      this.logger.debug(`No logs found`);
      return;
    }

    await this.writeLogsToFile(logs);
  }

  async writeLogsToFile(logs: Log[]) {
    const tempDir = tmpdir();
    const logFilePath = join(tempDir, 'logs.txt');
    console.log(`Log file path: ${logFilePath}`);

    const content = logs.map((log) => JSON.stringify(log)).join('\n');

    try {
      await fs.writeFile(logFilePath, content);
      this.logger.debug(`Logs have been written to ${logFilePath}`);

      this.orderRepository.removeAll();

      // sendMailAndRemoveLogFileFromDisk(logFilePath);

      await fs.unlink(logFilePath);
    } catch (error) {
      this.logger.debug('Error writing logs to file:', error);
    }
  }
}
