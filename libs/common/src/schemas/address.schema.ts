import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
export class Address {
  @Prop({ type: String, required: false })
  addressLine?: string;

  @Prop({ type: String, required: true })
  city: string;

  @Prop({ type: String, required: true })
  country: string;

  @Prop({ type: Number, required: true })
  cityCode: number;
}

export const AddressSchema = SchemaFactory.createForClass(Address);
