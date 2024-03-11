import { InjectQueue } from '@nestjs/bull';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Queue } from 'bull';
import { GenericOrderEvent } from '../events/generic-order.event';

@EventsHandler(GenericOrderEvent)
export class GenericOrderHandler implements IEventHandler<GenericOrderEvent> {
  constructor(@InjectQueue('AUDIT_LOG_QUEUE{auditLogQueue}') private auditLogQueue: Queue) {}

  async handle(event: GenericOrderEvent) {
    await this.auditLogQueue.add('orderLog', {
      action: event.action,
      details: event.details,
      timestamp: event.timestamp,
    });
  }
}
