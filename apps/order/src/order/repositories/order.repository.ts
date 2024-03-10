import { OrderStatus } from '@batuhan_kutluay-case/common';
import { UpdateOrderDto } from '@batuhan_kutluay-case/common/dto/order-service';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument, OrderType } from '../entities';

@Injectable()
export class OrderRepository {
  constructor(@InjectModel(Order.name) private orderModel: Model<OrderDocument>) {}

  async create(order: OrderType): Promise<OrderDocument> {
    return (await this.orderModel.create(order)).toObject();
  }

  async getCustomerOrders(customer: string): Promise<OrderDocument[]> {
    return this.orderModel.find({ customer }).lean().exec();
  }

  async getById(id: string): Promise<OrderDocument[] | null> {
    return this.orderModel.find({ _id: id }).lean().exec();
  }

  async getOrders(): Promise<OrderDocument[]> {
    return this.orderModel.find().lean().exec();
  }

  async delete(id: string): Promise<OrderDocument | null> {
    return this.orderModel.findByIdAndDelete(id).lean().exec();
  }

  async update(id: string, order: UpdateOrderDto): Promise<OrderDocument | null> {
    //productlar array? mi yoksa tek bir product mu?
    const { address, product, ...rest } = order;
    return this.orderModel
      .findByIdAndUpdate(
        { _id: id },
        {
          $set: {
            ...rest,
            ...(address && {
              'address.city': address.city,
              'address.country': address.country,
              'address.cityCode': address.cityCode,
              'address.addressLine': address.addressLine,
            }),
            ...(product && {
              'product.name': product.name,
              'product.imageUrl': product.imageUrl,
            }),
          },
        },
        { new: true },
      )
      .lean()
      .exec();
  }

  async updateStatus(id: string, status: OrderStatus): Promise<OrderDocument | null> {
    return this.orderModel.findByIdAndUpdate(id, { status }, { new: true }).lean().exec();
  }
}
