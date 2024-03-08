import { HttpStatus } from '@nestjs/common';

export const ERROR_MESSAGES = {
  HEALTH_CHECKER: {
    message: 'Application unhealthy state',
    code: -6,
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
  },
};

export enum Statuses {
  OK = 'OK',
  NOK = 'NOK',
}
