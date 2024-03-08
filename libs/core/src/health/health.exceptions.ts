import { HttpException, HttpStatus } from '@nestjs/common';

export class HealthStatusException extends HttpException {
  message: string;
  code: number;
  statusCode: HttpStatus;
  data?: unknown;
  level?: unknown;
  errorData?: unknown;

  constructor(
    message: string,
    code: number,
    statusCode = HttpStatus.INTERNAL_SERVER_ERROR,
    data?: unknown,
    level?: unknown,
    errorData?: unknown,
  ) {
    super(message, statusCode);
    this.message = message;
    this.code = code;
    this.statusCode = statusCode;
    this.data = data;
    this.level = level;
    this.errorData = errorData;
  }
}
