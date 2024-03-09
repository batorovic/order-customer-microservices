import { HttpStatus } from '@nestjs/common';
import { BaseCustomException } from './base';

const createOllangErrorResponse = (exception: BatuhanKutluayCaseException) => {
  const error = exception?.constructor?.name;
  const { code, message, data, errorData } = exception;

  return {
    code,
    error,
    message,
    data,
    errorData,
  };
};

export class BatuhanKutluayCaseException extends BaseCustomException {
  constructor(
    public override readonly message: string,
    public override readonly code: number,
    public override readonly statusCode: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR,
    public override readonly data?: unknown,
    public override readonly level?: unknown,
    public readonly errorData?: unknown,
  ) {
    super(message, code, statusCode, data);

    this.name = 'OllangException';
    Object.setPrototypeOf(this, BatuhanKutluayCaseException.prototype);
  }

  public createErrorResponse() {
    return createOllangErrorResponse(this);
  }
}
