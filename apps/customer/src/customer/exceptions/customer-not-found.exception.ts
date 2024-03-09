import { BatuhanKutluayCaseException, LogLevel } from '@batuhan_kutluay-case/common';
import { HttpStatus } from '@nestjs/common';

export class CustomerNotFoundException extends BatuhanKutluayCaseException {
  constructor(data?: string | object) {
    super(
      'Customer is not found !',
      19000,
      HttpStatus.NOT_FOUND,
      JSON.stringify(data),
      LogLevel.ERROR,
      'CustomerNotFoundException',
    );

    this.name = 'CustomerNotFoundException';
    Object.setPrototypeOf(this, CustomerNotFoundException.prototype);
  }
}
