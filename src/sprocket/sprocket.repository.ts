import { Injectable } from '@nestjs/common';

import { PrismaService } from '@prismaClient/prisma.service';
import { Sprocket } from '@prisma/client';

import { PaginatedResponseDto, BasePaginationInput } from '@common/dtos';
import { CreateSprocketDto } from './dto/create-sprocket.dto';
import { UpdateSprocketDto } from './dto/update-sprocket.dto';

@Injectable()
export class SprocketRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createSprocket(createSprocketDto: CreateSprocketDto) {
    return this.prismaService.sprocket.create({
      data: createSprocketDto as CreateSprocketDto,
    });
  }

  async getAllSprockets(
    params: BasePaginationInput,
  ): Promise<PaginatedResponseDto<Sprocket>> {
    const { limit, offset } = params;

    const sprocketsDB = await this.prismaService.sprocket.findMany({
      take: limit,
      skip: offset,
    });
    const totalCount = await this.prismaService.sprocket.count();
    return {
      paging: { limit, offset, total_count: totalCount },
      items: sprocketsDB,
    };
  }

  async getSprocketById(sprocketId: string): Promise<Sprocket | null> {
    return this.prismaService.sprocket.findUnique({
      where: {
        id: sprocketId,
      },
    });
  }

  async editSprocketById(
    sprocketId: string,
    updateData: UpdateSprocketDto,
  ): Promise<Sprocket | null> {
    return this.prismaService.sprocket.update({
      where: {
        id: sprocketId,
      },
      data: updateData,
    });
  }
}
