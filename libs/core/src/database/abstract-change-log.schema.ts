import { Prop, Schema } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class AbstractChangeLogDocument {
  @ApiProperty()
  @Prop({ type: String })
  changedBy: string;

  @ApiProperty()
  @Prop({
    type: SchemaTypes.Date,
    default: () => new Date(),
  })
  createdAt: Date;
}
