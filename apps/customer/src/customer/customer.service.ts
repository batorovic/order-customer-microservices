import {
  CreateCustomerDto,
  GetAllCustomersResponseDto,
  PaginationDto,
  UpdateCustomerDto,
} from '@batuhan_kutluay-case/common';
import { Injectable, Logger } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { CustomerNotFoundException } from './exceptions';
import { CustomerRepository } from './repositories';

@Injectable()
export class CustomerService {
  private readonly logger = new Logger(CustomerService.name);

  constructor(private readonly customerRepository: CustomerRepository) {}

  async create(createCustomerDto: CreateCustomerDto): Promise<ObjectId> {
    this.logger.debug(createCustomerDto, '[CustomerService] creating customer');

    return (await this.customerRepository.create(createCustomerDto))._id;
  }

  async update(id: string, updateCustomerDto: UpdateCustomerDto): Promise<boolean> {
    this.logger.debug(updateCustomerDto, '[CustomerService] updating customer');

    if (!(await this.validate(id))) {
      throw new CustomerNotFoundException();
    }

    await this.customerRepository.update(id, updateCustomerDto);

    return true;
  }

  async delete(id: string): Promise<boolean> {
    this.logger.debug(id, '[CustomerService] deleting customer');

    if (!(await this.validate(id))) {
      throw new CustomerNotFoundException();
    }

    await this.customerRepository.delete(id);

    return true;
  }

  async getAll(paginationDto: PaginationDto): Promise<GetAllCustomersResponseDto> {
    this.logger.debug(paginationDto, '[CustomerService] getting all customers');

    return this.customerRepository.findAll(paginationDto);
  }

  async getById(id: string) {
    this.logger.debug(id, '[CustomerService] getting customer by id');

    const customer = await this.customerRepository.getCustomerById(id);

    if (!customer) {
      throw new CustomerNotFoundException();
    }

    return customer;
  }

  async validate(id: string): Promise<boolean> {
    this.logger.debug(id, '[CustomerService] validating customer');

    const customer = await this.customerRepository.getCustomerById(id);

    return customer ? true : false;
  }
}
