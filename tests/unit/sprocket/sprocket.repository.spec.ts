import { Test } from '@nestjs/testing';
import { Sprocket } from '@prisma/client';

import { PrismaService } from '@prismaClient/prisma.service';
import { SprocketRepository } from '@sprocket/sprocket.repository';

import { mockSprocketsData } from '../../mocks/sprocketsData.mock';
import { prismaMock } from '../../mocks/prismaSingleton.mock';
import { BasePaginationInput } from '@common/dtos/basePaginationInput.dto';

describe('sprocket.repository', () => {
  let sprocketRepository: SprocketRepository;
  const fakeSprockets = mockSprocketsData(5);

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [],
      providers: [
        SprocketRepository,
        PrismaService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    sprocketRepository = moduleRef.get<SprocketRepository>(SprocketRepository);
    // prismaMock.sprocket.count.mockResolvedValue(fakeSprockets.length);
    // prismaMock.sprocket.findMany.mockResolvedValue(fakeSprockets);
  });

  afterEach(async () => {
    jest.clearAllMocks();
    // prismaMock.sprocket.count.mockClear();
    // prismaMock.sprocket.findMany.mockClear();
  });

  it('should be defined', () => {
    expect(sprocketRepository).toBeDefined();
  });

  describe('getAllSprockets', () => {
    it('should return all sprockets', async () => {
      // GIVEN

      const paginationParams: BasePaginationInput = {
        limit: 10,
        offset: 0,
      };
      const paginatedSprockets = {
        paging: {
          limit: paginationParams.limit,
          offset: paginationParams.offset,
          total_count: fakeSprockets.length,
        },
        items: fakeSprockets,
      };
      console.log(fakeSprockets);

      // WHEN
      const result = await sprocketRepository.getAllSprockets(paginationParams);
      console.log(result);
      // THEN
      await expect(
        sprocketRepository.getAllSprockets(paginationParams),
      ).resolves.toEqual(paginatedSprockets);
      // expect(prismaMock.sprocket.findMany).toHaveBeenCalled();
    });
  });

  describe('getSprocketById', () => {
    it('should return expected sprocket', async () => {});
  });
});
