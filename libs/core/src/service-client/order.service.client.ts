import { OrderDto, UpdateOrderDto, UpdateOrderStatusDto } from '@batuhan_kutluay-case/common/dto/order-service';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClsService } from 'nestjs-cls';
import { PinoLogger } from 'nestjs-pino';
import { BaseServiceClient } from './base/service-client.base';
import { MICROSERVICES } from './constants';

@Injectable()
export class OrderServiceClient extends BaseServiceClient {
  constructor(
    protected readonly configService: ConfigService,
    protected readonly logger: PinoLogger,
    protected readonly cls: ClsService,
  ) {
    super(MICROSERVICES.ORDER, configService.get('services.urls.order') as string, configService, logger, cls);
  }

  async getOrders(): Promise<OrderDto[]> {
    return this.request('GET', 'orders') as Promise<OrderDto[]>;
  }

  async getOrdersByCustomerId(id: string): Promise<OrderDto[] | OrderDto> {
    return this.request('GET', `orders/customer/${id}`) as Promise<OrderDto[] | OrderDto>;
  }

  async create(order: OrderDto): Promise<string> {
    return this.request('POST', 'orders', order) as Promise<string>;
  }

  async delete(id: string): Promise<boolean> {
    return this.request('DELETE', `orders/${id}`) as Promise<boolean>;
  }

  async update(id: string, order: UpdateOrderDto): Promise<boolean> {
    return this.request('PATCH', `orders/${id}`, order) as Promise<boolean>;
  }

  async updateOrderStatus(id: string, status: UpdateOrderStatusDto): Promise<boolean> {
    return this.request('PATCH', `orders/${id}/status`, status) as Promise<boolean>;
  }
}
