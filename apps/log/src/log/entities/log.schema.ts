import { OrderAction } from '@batuhan_kutluay-case/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

@Schema({
  versionKey: false,
})
export class Log {
  @Prop({ type: String, enum: OrderAction, required: true })
  action: OrderAction;

  @Prop({ type: Object, required: true })
  details: any;

  @Prop({ type: SchemaTypes.Date, required: true })
  timestamp: Date;
}

export const LogSchema = SchemaFactory.createForClass(Log);
export type LogDocument = Log & Document;
