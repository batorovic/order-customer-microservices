import { ParseObjectIdPipe } from '@batuhan_kutluay-case/common';
import {
  CreateOrderDto,
  OrderDto,
  UpdateOrderDto,
  UpdateOrderStatusDto,
} from '@batuhan_kutluay-case/common/dto/order-service';
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { OrderService } from './order.service';

@ApiTags('Orders')
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiOkResponse({
    description: 'Received orders',
  })
  @ApiOperation({ summary: 'Get Orders' })
  @Get()
  async getOrders(): Promise<OrderDto[]> {
    return this.orderService.getOrders();
  }

  @ApiOkResponse({
    description: 'Received orders for by customer id',
  })
  @ApiOperation({ summary: 'Get order by customer id' })
  @Get('customer/:id')
  async getCustomerOrdersById(@Param('id', ParseObjectIdPipe) id: string): Promise<OrderDto[] | OrderDto> {
    return this.orderService.getCustomerOrdersById(id);
  }

  @ApiOkResponse({
    description: 'Created order',
  })
  @ApiOperation({ summary: 'Create Order' })
  @Post()
  async create(@Body() createOrderDto: CreateOrderDto): Promise<string> {
    return this.orderService.create(createOrderDto);
  }

  @ApiOkResponse({
    description: 'Deleted order',
  })
  @ApiOperation({ summary: 'Delete Order' })
  @Delete(':id')
  async delete(@Param('id', ParseObjectIdPipe) id: string): Promise<boolean> {
    return this.orderService.delete(id);
  }

  @ApiOkResponse({
    description: 'Updated order',
  })
  @ApiOperation({ summary: 'Update Order' })
  @Patch(':id')
  async update(@Param('id', ParseObjectIdPipe) id: string, @Body() order: UpdateOrderDto): Promise<boolean> {
    return this.orderService.update(id, order);
  }

  @ApiOkResponse({
    description: 'Updated order status',
  })
  @ApiOperation({ summary: 'Update order status by id' })
  @Patch(':id/status')
  async updateOrderStatus(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() updateOrderStatusDto: UpdateOrderStatusDto,
  ): Promise<boolean> {
    return this.orderService.updateOrderStatus(id, updateOrderStatusDto);
  }
}
