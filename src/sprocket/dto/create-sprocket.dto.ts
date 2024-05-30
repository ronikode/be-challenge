import { OmitType } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

import { SprocketDto } from './sprocket.dto';

export class CreateSprocketDto extends OmitType(SprocketDto, [
  'id',
  'createdAt',
  'updatedAt',
]) {
  @IsNumber()
  readonly teeth: number;

  @IsNumber()
  readonly pitchDiameter: number;

  @IsNumber()
  readonly outsideDiameter: number;

  @IsNumber()
  readonly pitch: number;
}
