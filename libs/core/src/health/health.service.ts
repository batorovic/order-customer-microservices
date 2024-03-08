import { Injectable } from '@nestjs/common';
import { Health } from './health.types';
import { Statuses } from './health.constants';

@Injectable()
export class HealthService {
  constructor() {}

  async health(): Promise<Health> {
    return {
      time: Date.now(),
      status: Statuses.OK,
    };
  }
}
