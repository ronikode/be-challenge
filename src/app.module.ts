import { Module } from '@nestjs/common';
import { SprocketModule } from './modules/sprocket/sprocket.module';

// Modules
import { PrismaModule } from './modules/prisma/prisma.module';

@Module({
  imports: [SprocketModule, PrismaModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
