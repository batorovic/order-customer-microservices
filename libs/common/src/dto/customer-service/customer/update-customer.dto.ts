import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEmail, IsOptional, IsString, ValidateNested } from 'class-validator';
import { UpdateAddresDto } from '../../update-address.dto';

export class UpdateCustomerDto {
  @ApiPropertyOptional({
    description: 'Name of the customer',
    example: 'John Doe',
  })
  @IsOptional()
  @IsString()
  readonly name?: string;

  @ApiPropertyOptional({
    description: 'Email of the customer',
    example: 'test@gmail.com',
  })
  @IsEmail()
  @IsOptional()
  readonly email?: string;

  @ApiPropertyOptional({
    description: 'Address of the customer',
    type: UpdateAddresDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateAddresDto)
  readonly address?: UpdateAddresDto;
}
