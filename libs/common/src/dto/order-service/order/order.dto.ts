import { OrderStatus } from '@batuhan_kutluay-case/common/enums';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDefined, IsEnum, IsMongoId, IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';
import { AddresDto } from '../../address.dto';
import { ProductDto } from './product.dto';

export class OrderDto {
  @ApiProperty({
    description: 'Customer Id',
    example: '5f4e7f9f8f3f4f3f4f3f4f3f',
  })
  @IsNotEmpty()
  @IsMongoId()
  readonly customer: string;

  @ApiProperty({
    description: 'Quantity of the product',
    example: 2,
  })
  @IsNumber()
  @IsNotEmpty()
  readonly quantity: number;

  @ApiProperty({
    description: 'Price of the product',
    example: 55,
  })
  @IsNumber()
  @IsNotEmpty()
  readonly price: number;

  @ApiProperty({ enum: OrderStatus, description: 'Status of the product ', example: OrderStatus.PENDING })
  @IsNotEmpty()
  @IsEnum(OrderStatus)
  readonly status: OrderStatus;

  @ApiProperty({
    description: 'Address of the customer',
    type: AddresDto,
  })
  @IsDefined()
  @ValidateNested()
  @Type(() => AddresDto)
  readonly address: AddresDto;

  @ApiProperty({
    description: 'Products of the order',
    type: [ProductDto],
  })
  @IsDefined()
  @ValidateNested()
  @Type(() => ProductDto)
  readonly product: ProductDto[];
}
