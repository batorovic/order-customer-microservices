import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { AddresDto } from '../../address.dto';

export class CreateCustomerDto {
  @ApiProperty({
    description: 'Name of the customer',
    example: 'John Doe',
  })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({
    description: 'Email of the customer',
    example: 'test@gmail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({
    description: 'Address of the customer',
    type: AddresDto,
  })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => AddresDto)
  readonly address: AddresDto;
}
