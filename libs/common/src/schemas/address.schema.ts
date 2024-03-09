import { Prop } from '@nestjs/mongoose';

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
