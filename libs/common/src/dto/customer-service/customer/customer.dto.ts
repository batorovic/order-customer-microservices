import { AddresDto } from '@batuhan_kutluay-case/common';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CustomerDto {
  @ApiProperty({
    description: 'Name of the customer',
    example: 'John Doe',
  })
  readonly name: string;

  @ApiProperty({
    description: 'Email of the customer',
    example: 'test@gmail.com',
  })
  readonly email: string;

  @ApiProperty({
    description: 'Address of the customer',
    type: AddresDto,
  })
  @Type(() => AddresDto)
  readonly address: AddresDto;
}
