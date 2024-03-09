import {
  CreateCustomerDto,
  CustomerDto,
  GetAllCustomersResponseDto,
  ParseObjectIdPipe,
  UpdateCustomerDto,
} from '@batuhan_kutluay-case/common';
import { PaginationDto } from '@batuhan_kutluay-case/common/dto/pagination.dto';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CustomerService } from './customer.service';

@ApiTags('Customers')
@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @ApiOperation({ summary: 'Get customer by id' })
  @ApiOkResponse({
    description: 'The customer has been successfully retrieved by id.',
  })
  @Get(':id')
  async getCustomerById(@Param('id', ParseObjectIdPipe) id: string): Promise<CustomerDto> {
    return this.customerService.getCustomerById(id);
  }

  @ApiOperation({ summary: 'Get customers' })
  @ApiOkResponse({
    description: 'The customers has been successfully retrieved',
  })
  @Get('')
  async getAllCustomers(@Query() paginationDto: PaginationDto): Promise<GetAllCustomersResponseDto> {
    return this.customerService.getAllCustomers(paginationDto);
  }

  @ApiOkResponse({
    description: 'Created customer',
  })
  @ApiOperation({ summary: 'Create customer' })
  @Post('')
  async createCustomer(@Body() createCustomerDto: CreateCustomerDto): Promise<string> {
    return this.customerService.createCustomer(createCustomerDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update customer by id' })
  @ApiOkResponse({ description: 'The customer has been successfully updated.', type: Boolean })
  async updateCustomer(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ): Promise<boolean> {
    return this.customerService.updateCustomer(id, updateCustomerDto);
  }

  @ApiOkResponse({
    description: 'The customer has been successfully deleted.',
    type: Boolean,
  })
  @ApiOperation({ summary: 'Delete customer' })
  @Delete(':id')
  async deleteCustomer(@Param('id', ParseObjectIdPipe) id: string): Promise<boolean> {
    return this.customerService.deleteCustomer(id);
  }
}
