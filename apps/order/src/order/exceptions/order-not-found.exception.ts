import { BatuhanKutluayCaseException, LogLevel } from '@batuhan_kutluay-case/common';
import { HttpStatus } from '@nestjs/common';

export class OrderNotFoundException extends BatuhanKutluayCaseException {
  constructor(data?: string | object) {
    super(
      'Order is not found !',
      29000,
      HttpStatus.NOT_FOUND,
      JSON.stringify(data),
      LogLevel.ERROR,
      'OrderNotFoundException',
    );

    this.name = 'CustomerNotFoundException';
    Object.setPrototypeOf(this, OrderNotFoundException.prototype);
  }
}
