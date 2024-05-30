import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';

import { SprocketModule } from '../../sprocket/sprocket.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [SprocketModule],
})
export class SeedModule {}
