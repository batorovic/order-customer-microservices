import { CreateCustomerDto, ParseObjectIdPipe, UpdateCustomerDto } from '@batuhan_kutluay-case/common';
import { PaginationDto } from '@batuhan_kutluay-case/common/dto/pagination.dto';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { CustomerService } from './customer.service';
import { GetAllCustomersResponseDto } from './dto';
import { CustomerDocument } from './entities';

@ApiTags('Customers')
@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @ApiOperation({ summary: 'Get customer by id' })
  @ApiOkResponse({
    description: 'The customer has been successfully retrieved by id.',
  })
  @Get(':id')
  async getById(@Param('id', ParseObjectIdPipe) id: string): Promise<CustomerDocument> {
    return this.customerService.getById(id);
  }

  @ApiOperation({ summary: 'Get customers' })
  @ApiOkResponse({
    description: 'The customers has been successfully retrieved',
  })
  @Get('')
  async get(@Query() paginationDto: PaginationDto): Promise<GetAllCustomersResponseDto> {
    return this.customerService.getAll(paginationDto);
  }

  @ApiOkResponse({
    description: 'Created customer',
  })
  @ApiOperation({ summary: 'Create customer' })
  @Post('')
  async create(@Body() createCustomerDto: CreateCustomerDto): Promise<ObjectId> {
    return this.customerService.create(createCustomerDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update customer by id' })
  @ApiOkResponse({ description: 'The customer has been successfully updated.', type: Boolean })
  async update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ): Promise<boolean> {
    return this.customerService.update(id, updateCustomerDto);
  }

  @ApiOkResponse({
    description: 'The customer has been successfully deleted.',
    type: Boolean,
  })
  @ApiOperation({ summary: 'Delete customer' })
  @Delete(':id')
  async delete(@Param('id', ParseObjectIdPipe) id: string): Promise<boolean> {
    return this.customerService.delete(id);
  }
}
