import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { BasePaginationInput, PaginatedResponseDto } from '@common/dtos';
import { SprocketDto, CreateSprocketDto, UpdateSprocketDto } from './dto';

import { SprocketService } from './sprocket.service';

@Controller('sprockets')
@ApiTags('sprockets')
export class SprocketController {
  constructor(private readonly sprocketService: SprocketService) {}

  @Get()
  @ApiOperation({ summary: 'Get insurance profiles for specific patient' })
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: 'OK',
    type: PaginatedResponseDto<SprocketDto>,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal Server Error',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request Error',
  })
  getAllSprockets(@Query() params: BasePaginationInput) {
    return this.sprocketService.findAll(params);
  }

  @Get(':id')
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: 'OK',
    type: SprocketDto,
  })
  getSprocket(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.sprocketService.findOneById(id);
  }

  @Post()
  createSprocket(@Body() createSprocketDto: CreateSprocketDto) {
    return this.sprocketService.createSprocket(createSprocketDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update sprocket by identifier' })
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: 'OK',
    type: SprocketDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not found with the identifier',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal Server Error',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request Error',
  })
  updateSprocket(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateSprocketDto: UpdateSprocketDto,
  ) {
    return this.sprocketService.updateSprocket(id, updateSprocketDto);
  }
}
