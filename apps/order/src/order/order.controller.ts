import { ParseObjectIdPipe } from '@batuhan_kutluay-case/common';
import { CreateOrderDto, UpdateOrderDto, UpdateOrderStatusDto } from '@batuhan_kutluay-case/common/dto/order-service';
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateOrderCommand, DeleteOrderCommand } from './commands';
import { UpdateOrderStatusCommand } from './commands/update-order-status.command';
import { UpdateOrderCommand } from './commands/update-order.command';
import { OrderDocument } from './entities';
import { GetCustomerOrdersQuery, GetOrdersQuery } from './queries';
// import { GetOrdersQuery } from './queries';

@ApiTags('Orders')
@Controller('orders')
export class OrderController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @ApiOkResponse({
    description: 'Received orders',
  })
  @ApiOperation({ summary: 'Get Orders' })
  @Get()
  async getOrders(): Promise<OrderDocument[]> {
    return this.queryBus.execute(new GetOrdersQuery());
  }

  @ApiOkResponse({
    description: 'Received customer orders',
  })
  @ApiOperation({ summary: 'Get Customer Orders by id' })
  @Get('customer/:id')
  async getOrdersByCustomerId(@Param('id', ParseObjectIdPipe) id: string): Promise<OrderDocument[] | OrderDocument> {
    return this.queryBus.execute(new GetCustomerOrdersQuery(id));
  }

  @ApiOkResponse({
    description: 'Created order',
  })
  @ApiOperation({ summary: 'Create order' })
  @Post()
  async create(@Body() createOrderDto: CreateOrderDto): Promise<string> {
    return this.commandBus.execute(new CreateOrderCommand(createOrderDto));
  }

  @ApiOkResponse({
    description: 'Deleted order',
  })
  @ApiOperation({ summary: 'Delete order' })
  @Delete(':id')
  async delete(@Param('id', ParseObjectIdPipe) id: string): Promise<boolean> {
    return this.commandBus.execute(new DeleteOrderCommand(id));
  }

  @ApiOkResponse({
    description: 'Updated order',
  })
  @ApiOperation({ summary: 'Update order' })
  @Patch(':id')
  async update(@Param('id', ParseObjectIdPipe) id: string, @Body() updateOrderDto: UpdateOrderDto): Promise<boolean> {
    return this.commandBus.execute(new UpdateOrderCommand(id, updateOrderDto));
  }

  @ApiOkResponse({
    description: 'Updated order status',
  })
  @ApiOperation({ summary: 'Update order status' })
  @Patch(':id/status')
  async changeStatus(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() updateOrderstatus: UpdateOrderStatusDto,
  ): Promise<boolean> {
    return this.commandBus.execute(new UpdateOrderStatusCommand(id, updateOrderstatus.status));
  }
}
