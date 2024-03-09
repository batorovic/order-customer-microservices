import { HttpStatus } from '@nestjs/common';
import { LogLevel } from '../enums';
import { BatuhanKutluayCaseException } from './batuhan-kutluay-case.exception';

export class InvalidIdException extends BatuhanKutluayCaseException {
  constructor(data?: string) {
    super('Invalid Id', 1, HttpStatus.BAD_REQUEST, data, LogLevel.ERROR, 'InvalidIdException');

    this.name = 'InvalidIdException';
    Object.setPrototypeOf(this, InvalidIdException.prototype);
  }
}
