import { Logger } from '@nestjs/common';
import { Injectable, NotFoundException } from '@nestjs/common';

import { BasePaginationInput, PaginatedResponseDto } from '@common/dtos';
import { CreateSprocketDto, SprocketDto, UpdateSprocketDto } from './dto';

import { SprocketRepository } from './sprocket.repository';

const logger = new Logger();

@Injectable()
export class SprocketService {
  constructor(private readonly sprocketRepository: SprocketRepository) {}

  async getAllSprockets(
    params: BasePaginationInput,
  ): Promise<PaginatedResponseDto<SprocketDto>> {
    const sprockets = await this.sprocketRepository.findAll(params);
    return sprockets;
  }

  async findOneById(id: string): Promise<SprocketDto> | undefined {
    logger.log(`findOneById id: ${id}`);
    let sprocket;
    try {
      sprocket = await this.sprocketRepository.findOne(id);
      if (!sprocket) {
        throw new NotFoundException(`Sprocket with id '${id}' not found`);
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        logger.error(`Sprocket with id '${id}' not found`);
        return undefined;
      } else {
        throw error;
      }
    }
    return sprocket;
  }

  async createSprocket(
    createSprocketDto: CreateSprocketDto,
  ): Promise<SprocketDto> {
    return await this.sprocketRepository.create(createSprocketDto);
  }

  async updateSprocket(
    id: string,
    updateSprocketDto: UpdateSprocketDto,
  ): Promise<SprocketDto> {
    const sprocket = await this.findOneById(id);
    if (!sprocket) {
      throw new NotFoundException(`Cannot update the sprocket with id '${id}'`);
    }
    return await this.sprocketRepository.update(id, updateSprocketDto);
  }
}
