import { CustomerDto, GetAllCustomersResponseDto, UpdateCustomerDto } from '@batuhan_kutluay-case/common';
import { PaginationDto } from '@batuhan_kutluay-case/common/dto/pagination.dto';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClsService } from 'nestjs-cls';
import { PinoLogger } from 'nestjs-pino';
import { BaseServiceClient } from './base/service-client.base';
import { MICROSERVICES } from './constants';

@Injectable()
export class CustomerServiceClient extends BaseServiceClient {
  constructor(
    protected readonly configService: ConfigService,
    protected readonly logger: PinoLogger,
    protected readonly cls: ClsService,
  ) {
    super(MICROSERVICES.CUSTOMER, configService.get('services.urls.customer') as string, configService, logger, cls);
  }

  async getCustomerById(id: string): Promise<CustomerDto> {
    return this.request('GET', `customers/${id}`) as Promise<CustomerDto>;
  }

  async getAllCustomers(paginationDto: PaginationDto): Promise<GetAllCustomersResponseDto> {
    return this.request('GET', 'customers', {}, paginationDto) as Promise<GetAllCustomersResponseDto>;
  }

  async createCustomer(createCustomerDto: CustomerDto): Promise<string> {
    return this.request('POST', 'customers', createCustomerDto) as Promise<string>;
  }

  async updateCustomer(id: string, updateCustomerDto: UpdateCustomerDto): Promise<boolean> {
    return this.request('PATCH', `customers/${id}`, updateCustomerDto) as Promise<boolean>;
  }

  async deleteCustomer(id: string): Promise<boolean> {
    return this.request('DELETE', `customers/${id}`) as Promise<boolean>;
  }
}
