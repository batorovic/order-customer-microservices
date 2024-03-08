import { HttpException, HttpStatus } from '@nestjs/common';

export abstract class BaseCustomException extends HttpException {
  constructor(
    public override message: string,
    public code: number,
    public statusCode: HttpStatus,
    public data?: unknown,
    public level?: unknown,
    public alertType?: 'Error' | 'Warning' | 'Info',
  ) {
    super(message, statusCode);
    Object.setPrototypeOf(this, new.target.prototype);
  }

  public abstract createErrorResponse(): any;
  public getErrorResponse(): any {
    return this.createErrorResponse();
  }
}
