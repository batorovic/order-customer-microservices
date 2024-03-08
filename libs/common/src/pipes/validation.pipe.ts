import { ValidationPipeOptions } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { ValidationException } from '../exceptions/validation.exception';

function formatErrorsHelper(errors: ValidationError[]): ValidationError[] {
  const formattedErrors: ValidationError[] = [];
  const stack: ValidationError[] = [...errors];

  while (stack.length > 0) {
    const item = stack.shift();
    if (!item) continue;

    const { children } = item;

    if (Array.isArray(children) && children.length > 0) {
      stack.push(...children);
    } else {
      formattedErrors.push(item);
    }
  }

  return formattedErrors;
}

export const ValidationPipeConfig: ValidationPipeOptions = {
  transform: true,
  skipMissingProperties: false,
  exceptionFactory: (errors: ValidationError[]) => {
    const formattedErrors = formatErrorsHelper(errors);
    throw new ValidationException(formattedErrors);
  },
};
