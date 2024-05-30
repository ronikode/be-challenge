import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateSprocketDto {
  @IsString()
  @IsUUID()
  @IsOptional()
  readonly id?: string;

  @IsNumber()
  @IsOptional()
  readonly teeth?: number;

  @IsNumber()
  @IsOptional()
  readonly pitchDiameter?: number;

  @IsNumber()
  @IsOptional()
  readonly outsideDiameter?: number;

  @IsNumber()
  @IsOptional()
  readonly pitch?: number;
}
