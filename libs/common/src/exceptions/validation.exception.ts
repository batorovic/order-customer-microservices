import { HttpStatus, ValidationError } from '@nestjs/common';
import { ERROR_MESSAGES } from '../constants';
import { BaseCustomException } from './base';

const createValidationErrorForResponse = (exception: ValidationException) => {
  const { code, error } = ERROR_MESSAGES.VALIDATION;

  const details = exception.error.map((err) => {
    const constraints = err.constraints || {};
    const messages = Object.values(constraints).filter(Boolean);

    return {
      messages: messages,
      path: err.property,
    };
  });

  return {
    code,
    error,
    details,
  };
};

export class ValidationException extends BaseCustomException {
  constructor(public readonly error: ValidationError[]) {
    super(ERROR_MESSAGES.VALIDATION.message, ERROR_MESSAGES.VALIDATION.code, HttpStatus.BAD_REQUEST);

    this.name = 'ValidationException';
    Object.setPrototypeOf(this, ValidationException.prototype);
  }

  public createErrorResponse() {
    return createValidationErrorForResponse(this);
  }
}
