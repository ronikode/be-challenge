import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export const SWAGGER_LIMIT_PAGINATION: ApiPropertyOptions = {
  name: 'limit',
  example: 20,
  default: 20,
  required: false,
  type: Number,
};

export const SWAGGER_OFFSET_PAGINATION: ApiPropertyOptions = {
  name: 'offset',
  example: 0,
  default: 0,
  required: false,
  type: Number,
};

export class PaginationDto {
  @ApiProperty(SWAGGER_OFFSET_PAGINATION)
  @IsNumber()
  offset?: number;

  @ApiProperty(SWAGGER_LIMIT_PAGINATION)
  @IsNumber()
  limit?: number;

  @ApiProperty({
    name: 'total_count',
    type: Number,
    required: true,
    example: 20,
  })
  @IsNumber()
  total_count: number;
}
