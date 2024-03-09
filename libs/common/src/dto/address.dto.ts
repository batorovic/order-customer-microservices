import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class AddresDto {
  @ApiPropertyOptional({
    description: 'Address line of the customer',
    example: 'Istanbul, Turkey',
  })
  @IsOptional()
  @IsString()
  addressLine?: string;

  @ApiProperty({
    description: 'City of the customer',
    example: 'Istanbul',
  })
  @IsNotEmpty()
  @IsString()
  city: string;

  @ApiProperty({
    description: 'Country of the customer',
    example: 'Turkey',
  })
  @IsNotEmpty()
  @IsString()
  country: string;

  @ApiProperty({
    description: 'City code of the customer',
    example: 34,
  })
  @IsNotEmpty()
  @IsNumber()
  cityCode: number;
}
