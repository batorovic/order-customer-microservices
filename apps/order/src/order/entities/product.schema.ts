import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Product {
  @Prop({ type: String, required: true })
  imageUrl: string;

  @Prop({ type: String, required: true })
  name: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
