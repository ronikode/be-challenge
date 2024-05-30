import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CreateSprocketDto, UpdateSprocketDto } from './dto';
import { Sprocket } from './interfaces/sprocket.interface';
import { SprocketRepository } from './sprocket.repository';

@Injectable()
export class SprocketService {
  private sprockets: Sprocket[] = [];

  constructor(private readonly sprocketRepository: SprocketRepository) {}

  findAll() {
    return this.sprocketRepository.getAllSprockets();
  }

  findOneById(id: string) {
    const sprocket = this.sprocketRepository.getSprocketById(id);
    if (!sprocket) {
      throw new NotFoundException(`Sprocket with id '${id}' not found`);
    }
    return sprocket;
  }

  createSprocket(createSprocketDto: CreateSprocketDto) {
    // const newSprocket: Sprocket = {
    //   id: uuid(),
    //   ...createSprocketDto,
    // };
    // this.sprockets.push(newSprocket);

    return this.sprocketRepository.createSprocket(createSprocketDto);
  }

  updateSprocket(id: string, updateSprocketDto: UpdateSprocketDto) {
    let sprocketDB = this.findOneById(id);

    if (updateSprocketDto.id && updateSprocketDto.id !== id)
      throw new BadRequestException(
        `Sprocket with id '${id}' is not valid inside body`,
      );

    this.sprockets = this.sprockets.map((sprocket) => {
      if (sprocket.id === id) {
        sprocketDB = {
          ...sprocketDB,
          ...updateSprocketDto,
        };
        return sprocket;
      }
    });
    return sprocketDB;
  }

  fillSprocketsWithSeedData(sprockets: Sprocket[]) {
    this.sprockets = sprockets;
  }
}
