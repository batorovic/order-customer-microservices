import { Injectable, PipeTransform } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

import { InvalidIdException } from '../exceptions';

@Injectable()
export class ParseObjectIdPipe implements PipeTransform {
  transform(value: string) {
    const isValid = isValidObjectId(value);
    if (!isValid) {
      throw new InvalidIdException();
    }

    return value;
  }
}
