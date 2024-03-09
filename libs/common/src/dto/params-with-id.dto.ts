import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class ParamsWithId {
  @ApiProperty({
    description: 'id',
  })
  @IsNotEmpty()
  @IsMongoId()
  id: string;
}
