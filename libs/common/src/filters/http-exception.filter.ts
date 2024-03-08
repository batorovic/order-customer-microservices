import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { PinoLogger } from 'nestjs-pino';
import { ERROR_MESSAGES } from '../constants';
import { BaseCustomException } from '../exceptions';

const createUnknownErrorResponse = (exception: HttpException) => {
  const { code, error, message } = ERROR_MESSAGES.UNKNOWN;
  const { message: detail, stack } = exception;

  return {
    code,
    error,
    message,
    detail,
    stack,
  };
};

export const getStatusCode = (exception: HttpException): number => {
  return exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
};

export const createErrorResponse = (exception: HttpException) => {
  return exception instanceof BaseCustomException
    ? exception.getErrorResponse()
    : createUnknownErrorResponse(exception);
};

@Catch()
export class HttpExceptionsFilter implements ExceptionFilter {
  constructor(private readonly logger: PinoLogger) {}
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = getStatusCode(exception);
    const errorResponse = createErrorResponse(exception);

    response.locals = { data: JSON.stringify(errorResponse) };

    response.status(status).json(errorResponse);
  }
}
