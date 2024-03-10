import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateAddresDto {
  @ApiPropertyOptional({
    description: 'Address line of the customer',
    example: 'Istanbul, Turkey',
  })
  @IsOptional()
  @IsString()
  addressLine?: string;

  @ApiPropertyOptional({
    description: 'City of the customer',
    example: 'Istanbul',
  })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiPropertyOptional({
    description: 'Country of the customer',
    example: 'Turkey',
  })
  @IsOptional()
  @IsString()
  country?: string;

  @ApiPropertyOptional({
    description: 'City code of the customer',
    example: 34,
  })
  @IsOptional()
  @IsNumber()
  cityCode?: number;
}
