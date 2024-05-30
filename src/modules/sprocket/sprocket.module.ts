import { Module } from '@nestjs/common';
import { SprocketController } from './sprocket.controller';
import { SprocketService } from './sprocket.service';

import { PrismaModule } from '@prismaClient/prisma.module';
import { SprocketRepository } from './sprocket.repository';

@Module({
  imports: [PrismaModule],
  controllers: [SprocketController],
  providers: [SprocketService, SprocketRepository],
  exports: [SprocketService],
})
export class SprocketModule {}
