import { CustomerDto, GetAllCustomersResponseDto, UpdateCustomerDto } from '@batuhan_kutluay-case/common';
import { PaginationDto } from '@batuhan_kutluay-case/common/dto/pagination.dto';
import { CustomerServiceClient } from '@batuhan_kutluay-case/core/service-client/customer.service.client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CustomerService {
  constructor(private readonly customerServiceClient: CustomerServiceClient) {}

  async getCustomerById(id: string): Promise<CustomerDto> {
    return this.customerServiceClient.getCustomerById(id);
  }

  async getAllCustomers(paginationDto: PaginationDto): Promise<GetAllCustomersResponseDto> {
    return this.customerServiceClient.getAllCustomers(paginationDto);
  }

  async createCustomer(createCustomerDto: CustomerDto): Promise<string> {
    return this.customerServiceClient.createCustomer(createCustomerDto);
  }

  async updateCustomer(id: string, updateCustomerDto: UpdateCustomerDto): Promise<boolean> {
    return this.customerServiceClient.updateCustomer(id, updateCustomerDto);
  }

  async deleteCustomer(id: string): Promise<boolean> {
    return this.customerServiceClient.deleteCustomer(id);
  }
}
