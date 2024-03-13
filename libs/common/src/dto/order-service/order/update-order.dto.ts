import { OrderStatus } from '@batuhan_kutluay-case/common/enums';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, ValidateNested } from 'class-validator';
import { UpdateAddresDto } from '../../update-address.dto';
import { UpdateProductDto } from './update-product.dto';

export class UpdateOrderDto {
  @ApiPropertyOptional({
    description: 'Quantity of the product',
    example: 2,
  })
  @IsNumber()
  @IsOptional()
  quantity?: number;

  @ApiPropertyOptional({
    description: 'Price of the product',
    example: 55,
  })
  @IsNumber()
  @IsOptional()
  price?: number;

  @ApiPropertyOptional({
    enum: OrderStatus,
    description: 'Status of the product ',
    example: OrderStatus.PENDING,
  })
  @IsOptional()
  @IsEnum(OrderStatus)
  status?: OrderStatus;

  @ApiPropertyOptional({
    description: 'Address of the customer',
    type: UpdateAddresDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateAddresDto)
  address?: UpdateAddresDto;

  @ApiPropertyOptional({
    description: 'Products of the order',
    type: UpdateProductDto,
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => UpdateProductDto)
  product?: UpdateProductDto;
}
