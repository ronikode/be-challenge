import { Global, Module } from '@nestjs/common';
import { PrismaService } from '../../src/modules/prisma/prisma.service';
import { prismaMock } from './prismaSingleton.mock';

export const mockedPrismaProviders = [
  {
    provide: PrismaService,
    useValue: prismaMock,
  },
];

@Module({
  providers: mockedPrismaProviders,
  exports: mockedPrismaProviders,
})
@Global()
export class PrismaMockedModule {}
