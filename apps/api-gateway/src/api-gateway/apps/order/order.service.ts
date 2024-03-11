import { OrderDto, UpdateOrderDto, UpdateOrderStatusDto } from '@batuhan_kutluay-case/common/dto/order-service';
import { OrderServiceClient } from '@batuhan_kutluay-case/core/service-client/order.service.client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderService {
  constructor(private readonly orderServiceClient: OrderServiceClient) {}

  async getOrders(): Promise<OrderDto[]> {
    return this.orderServiceClient.getOrders();
  }

  async getCustomerOrdersById(id: string): Promise<OrderDto[] | OrderDto> {
    return this.orderServiceClient.getOrdersByCustomerId(id);
  }

  async create(order: OrderDto): Promise<string> {
    return this.orderServiceClient.create(order);
  }

  async delete(id: string): Promise<boolean> {
    return this.orderServiceClient.delete(id);
  }

  async update(id: string, order: UpdateOrderDto): Promise<boolean> {
    return this.orderServiceClient.update(id, order);
  }

  async updateOrderStatus(id: string, updateOrderStatusDto: UpdateOrderStatusDto): Promise<boolean> {
    return this.orderServiceClient.updateOrderStatus(id, updateOrderStatusDto);
  }
}
