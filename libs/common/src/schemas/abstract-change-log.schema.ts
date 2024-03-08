import { Prop, Schema } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { SchemaTypes } from 'mongoose';

@Schema()
export class AbstractChangeLogDocument {
  @ApiProperty()
  @Prop({ type: String })
  changedBy: string;

  @ApiProperty()
  @Prop({ type: String })
  description: string;

  @ApiProperty()
  @Prop({
    type: SchemaTypes.Date,
    default: () => new Date(),
  })
  createdAt: Date;
}
