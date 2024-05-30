import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';

import { SprocketService } from './sprocket.service';
import { CreateSprocketDto } from './dto/create-sprocket.dto';
import { UpdateSprocketDto } from './dto/update-sprocket.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('sprockets')
@ApiTags('sprockets')
export class SprocketController {
  constructor(private readonly sprocketService: SprocketService) {}

  @Get()
  getAllSprockets() {
    return this.sprocketService.findAll();
  }

  @Get(':id')
  getSprocket(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.sprocketService.findOneById(id);
  }

  @Post()
  createSprocket(@Body() createSprocketDto: CreateSprocketDto) {
    return this.sprocketService.createSprocket(createSprocketDto);
  }

  @Patch()
  updateSprocket(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateSprocketDto: UpdateSprocketDto,
  ) {
    return this.sprocketService.updateSprocket(id, updateSprocketDto);
  }
}
