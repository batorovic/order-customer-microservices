import { AbstractDocument, Address, AddressSchema } from '@batuhan_kutluay-case/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
  versionKey: false,
  toJSON: {
    virtuals: true,
    getters: true,
  },
})
export class Customer extends AbstractDocument {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  email: string;

  @Prop({ type: AddressSchema, required: true })
  address: Address;
}

export type CustomerType = Omit<Customer, '_id' | 'createdAt' | 'updatedAt'>;
export type CustomerDocument = Customer & Document;

export const CustomerSchema = SchemaFactory.createForClass(Customer);
