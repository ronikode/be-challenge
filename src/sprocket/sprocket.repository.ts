import { Injectable } from '@nestjs/common';

import { PrismaService } from '@prismaClient/prisma.service';
import { CreateSprocketDto } from './dto/create-sprocket.dto';

@Injectable()
export class SprocketRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createSprocket(createSprocketDto: CreateSprocketDto) {
    return this.prismaService.sprocket.create({
      data: createSprocketDto as CreateSprocketDto,
    });
  }

  async getAllSprockets() {
    return this.prismaService.sprocket.findMany();
  }

  async getSprocketById(sprocketId: string) {
    return this.prismaService.sprocket.findUnique({
      where: {
        id: sprocketId,
      },
    });
  }
}
