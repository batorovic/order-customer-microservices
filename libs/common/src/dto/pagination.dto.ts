import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';
import { PAGINATION_DEFAULT_VALUES } from '../constants';
import { SORT_ORDER } from '../enums';
import { SortOrders } from '../types';

export class PaginationDto {
  @ApiPropertyOptional({
    type: Number,
    default: PAGINATION_DEFAULT_VALUES.LIMIT,
    description: 'Number of paged data',
  })
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  @IsOptional()
  @Min(1)
  @Max(200)
  limit?: number;

  @ApiPropertyOptional({
    type: Number,
    default: PAGINATION_DEFAULT_VALUES.SKIP,
    description: 'Number of paged data offset',
  })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Min(0)
  skip?: number;

  @ApiPropertyOptional({
    type: String,
    description: 'Key of data to sort by',
  })
  @IsOptional()
  @IsString()
  sortBy?: string;

  @ApiPropertyOptional({
    type: String,
    default: PAGINATION_DEFAULT_VALUES.ORDER,
    description: 'Sort direction',
  })
  @Type(() => Number)
  @IsOptional()
  @IsEnum(SORT_ORDER)
  sort?: SortOrders;
}
