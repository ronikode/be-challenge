import { Injectable, NotFoundException } from '@nestjs/common';

import { BasePaginationInput, PaginatedResponseDto } from '@common/dtos';
import { CreateSprocketDto, SprocketDto, UpdateSprocketDto } from './dto';

import { SprocketRepository } from './sprocket.repository';

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
    const sprocket = await this.sprocketRepository.findOne(id);
    if (!sprocket) {
      throw new NotFoundException(`Sprocket with id '${id}' not found`);
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
    this.findOneById(id);
    return await this.sprocketRepository.update(id, updateSprocketDto);
  }

  fillSprocketsWithSeedData(sprockets: any[]) {
    console.log('fillSprocketsWithSeedData');
    console.log(sprockets);
  }
}
