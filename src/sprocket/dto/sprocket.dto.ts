import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger';
import { IsDateString, IsString, IsNumber } from 'class-validator';

export const SWAGGER_ID: ApiPropertyOptions = {
  name: 'id',
  minLength: 36,
  description: 'uuid',
  type: String,
  example: 'f0b3a72a-841c-43f3-b50e-51e8ca67e73e',
};
export const SWAGGER_DATE_TIME_FORMAT = { format: 'date-time' };

export const SWAGGER_CREATED_AT: ApiPropertyOptions = {
  name: 'createdAt',
  ...SWAGGER_DATE_TIME_FORMAT,
};
export const SWAGGER_UPDATED_AT: ApiPropertyOptions = {
  name: 'updated_at',
  required: true,
  example: new Date().toISOString(),
  ...SWAGGER_DATE_TIME_FORMAT,
};

export class SprocketDto {
  @IsString()
  @ApiProperty(SWAGGER_ID)
  id: string;

  @IsNumber()
  teeth: number;

  @IsNumber()
  pitch: number;

  @IsNumber()
  pitchDiameter: number;

  @IsNumber()
  outsideDiameter: number;

  @IsDateString()
  @ApiProperty(SWAGGER_CREATED_AT)
  createdAt: Date;

  @IsDateString()
  @ApiProperty(SWAGGER_UPDATED_AT)
  updatedAt: Date;
}
