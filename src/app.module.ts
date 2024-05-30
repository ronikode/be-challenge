import { Module } from '@nestjs/common';
import { SprocketModule } from './sprocket/sprocket.module';
import { SeedModule } from './modules/seed/seed.module';

// Modules
import { PrismaModule } from './modules/prisma/prisma.module';

@Module({
  imports: [SprocketModule, SeedModule, PrismaModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
