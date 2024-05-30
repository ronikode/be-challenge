import { PartialType } from '@nestjs/swagger';

import { CreateSprocketDto } from './create-sprocket.dto';

export class UpdateSprocketDto extends PartialType(CreateSprocketDto) {}
