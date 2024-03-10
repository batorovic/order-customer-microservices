import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ProductDto {
  @ApiProperty({
    description: 'Image Url of the product',
    example: 'https://www.google.com',
  })
  @IsString()
  @IsNotEmpty()
  imageUrl: string;

  @ApiProperty({
    description: 'Name of the product',
    example: 'Iphone 12',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
