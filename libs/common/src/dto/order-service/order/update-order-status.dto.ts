import { OrderStatus } from '@batuhan_kutluay-case/common/enums';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';

export class UpdateOrderStatusDto {
  @ApiProperty({
    description: 'Status of the product ',
    example: 100,
    enum: OrderStatus,
  })
  @IsEnum(OrderStatus)
  status: OrderStatus;
}
