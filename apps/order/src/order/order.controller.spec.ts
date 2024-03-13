import { OrderStatus } from '@batuhan_kutluay-case/common';
import { CreateOrderDto, UpdateOrderDto, UpdateOrderStatusDto } from '@batuhan_kutluay-case/common/dto/order-service';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateOrderCommand, DeleteOrderCommand, UpdateOrderCommand, UpdateOrderStatusCommand } from './commands';
import { OrderController } from './order.controller';

describe('OrderController', () => {
  let controller: OrderController;
  let mockCommandBus: Partial<CommandBus>;
  let mockQueryBus: Partial<QueryBus>;

  beforeEach(async () => {
    mockCommandBus = {
      execute: jest.fn(),
    };
    mockQueryBus = {
      execute: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        {
          provide: CommandBus,
          useValue: mockCommandBus,
        },
        {
          provide: QueryBus,
          useValue: mockQueryBus,
        },
      ],
    }).compile();

    controller = module.get<OrderController>(OrderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create an order', async () => {
    const dto = new CreateOrderDto();
    dto.customer = '5f4e7f9f8f3f4f3f4f3f4f3f';
    dto.quantity = 2;
    dto.price = 55;
    dto.status = OrderStatus.PENDING;
    dto.address = {
      city: 'Anytown',
      cityCode: 44,
      country: 'USA',
    };
    dto.product = {
      name: 'Product Name',
      imageUrl: 'image url.com',
    };
    await controller.create(dto);
    expect(mockCommandBus.execute).toHaveBeenCalledWith(new CreateOrderCommand(dto));
  });

  it('should delete an order', async () => {
    const id = '65ee322f3b890bd84a73eb3e';
    await controller.delete(id);
    expect(mockCommandBus.execute).toHaveBeenCalledWith(new DeleteOrderCommand(id));
  });

  it('should update an order', async () => {
    const id = '65ee322f3b890bd84a73eb3e';
    const dto = new UpdateOrderDto();
    dto.quantity = 2;
    await controller.update(id, dto);
    expect(mockCommandBus.execute).toHaveBeenCalledWith(new UpdateOrderCommand(id, dto));
  });

  it('should change order status', async () => {
    const id = '65ee322f3b890bd84a73eb3e';
    const dto = new UpdateOrderStatusDto();
    dto.status = 300;
    await controller.changeStatus(id, dto);
    expect(mockCommandBus.execute).toHaveBeenCalledWith(new UpdateOrderStatusCommand(id, dto.status));
  });
});
