import { CreateCustomerDto, PaginationDto, UpdateCustomerDto } from '@batuhan_kutluay-case/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';

describe('CustomerController', () => {
  let controller: CustomerController;
  let service: CustomerService;

  beforeEach(async () => {
    const mockCustomerService = {
      getById: jest.fn((id: string) => {
        return Promise.resolve({ id, name: 'John Doe', email: 'john@example.com' });
      }),
      getAll: jest.fn((paginationDto: PaginationDto) => {
        return Promise.resolve({ data: [], pagination: paginationDto });
      }),
      create: jest.fn((dto: CreateCustomerDto) => {
        return Promise.resolve('507f1f77bcf86cd799439011');
      }),
      update: jest.fn((id: string, dto: UpdateCustomerDto) => {
        return Promise.resolve(true);
      }),
      delete: jest.fn((id: string) => {
        return Promise.resolve(true);
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerController],
      providers: [
        {
          provide: CustomerService,
          useValue: mockCustomerService,
        },
      ],
    }).compile();

    controller = module.get<CustomerController>(CustomerController);
    service = module.get<CustomerService>(CustomerService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get customer by id', async () => {
    expect(await controller.getById('507f1f77bcf86cd799439011')).toEqual({
      id: '507f1f77bcf86cd799439011',
      name: 'John Doe',
      email: 'john@example.com',
    });
    expect(service.getById).toHaveBeenCalledWith('507f1f77bcf86cd799439011');
  });

  it('should get customers', async () => {
    const paginationDto = new PaginationDto();
    expect(await controller.get(paginationDto)).toEqual({ data: [], pagination: paginationDto });
    expect(service.getAll).toHaveBeenCalledWith(paginationDto);
  });

  it('should create customer', async () => {
    const createCustomerDto = new CreateCustomerDto();
    expect(await controller.create(createCustomerDto)).toEqual('507f1f77bcf86cd799439011');
    expect(service.create).toHaveBeenCalledWith(createCustomerDto);
  });

  it('should update customer', async () => {
    const updateCustomerDto = new UpdateCustomerDto();
    expect(await controller.update('507f1f77bcf86cd799439011', updateCustomerDto)).toBe(true);
    expect(service.update).toHaveBeenCalledWith('507f1f77bcf86cd799439011', updateCustomerDto);
  });

  it('should delete customer', async () => {
    expect(await controller.delete('507f1f77bcf86cd799439011')).toBe(true);
    expect(service.delete).toHaveBeenCalledWith('507f1f77bcf86cd799439011');
  });
});
