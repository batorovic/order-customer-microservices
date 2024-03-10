import { AbstractDocument, Address, AddressSchema, OrderStatus } from '@batuhan_kutluay-case/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Product, ProductSchema } from './product.schema';

@Schema({
  timestamps: true,
  versionKey: false,
  toJSON: {
    virtuals: true,
    getters: true,
  },
})
export class Order extends AbstractDocument {
  @Prop({ type: String, required: true })
  customer: string;

  @Prop({ type: Number, required: true })
  quantity: number;

  @Prop({ type: Number, required: true })
  price: number;

  @Prop({ type: Number, required: true, default: OrderStatus.CREATED })
  status: OrderStatus;

  @Prop({ type: AddressSchema, required: true })
  address: Address;

  @Prop({ type: ProductSchema, required: true })
  product: Product;
}

export type OrderType = Omit<Order, '_id' | 'createdAt' | 'updatedAt'>;
export type OrderDocument = Order & Document;

export const OrderSchema = SchemaFactory.createForClass(Order);
