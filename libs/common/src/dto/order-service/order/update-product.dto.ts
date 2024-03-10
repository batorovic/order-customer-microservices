import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateProductDto {
  @ApiPropertyOptional({
    description: 'Image Url of the product',
    example: 'https://www.google.com',
  })
  @IsString()
  @IsOptional()
  imageUrl?: string;

  @ApiPropertyOptional({
    description: 'Name of the product',
    example: 'Iphone 12',
  })
  @IsString()
  @IsOptional()
  name?: string;
}
