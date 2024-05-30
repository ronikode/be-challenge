import { IsNumber } from 'class-validator';

export class CreateSprocketDto {
  @IsNumber()
  readonly teeth: number;

  @IsNumber()
  readonly pitchDiameter: number;

  @IsNumber()
  readonly outsideDiameter: number;

  @IsNumber()
  readonly pitch: number;
}
