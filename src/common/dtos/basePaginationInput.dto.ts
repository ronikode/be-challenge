import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsPositive, IsOptional } from 'class-validator';

export class BasePaginationInput {
  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  @ApiProperty({ required: false })
  limit?: number = 20;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @ApiProperty({ required: false })
  offset?: number = 0;
}
