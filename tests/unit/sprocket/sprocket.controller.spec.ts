import { Test } from '@nestjs/testing';
import { PrismaService } from '@prismaClient/prisma.service';
import { prismaMock } from '../../mocks/prismaSingleton.mock';

import { PaginatedResponseDto } from '@common/dtos';
import { mockSprocketsData } from '../../mocks/sprocketsData.mock';

import { SprocketDto } from '@sprocket/dto';
import { SprocketController } from '@sprocket/sprocket.controller';
import { SprocketService } from '@sprocket/sprocket.service';

describe('sprocket.controller', () => {
  let controller: SprocketController;
  const fakeSprocketService: Omit<SprocketService, 'sprocketRepository'> = {
    findAll: async () => new PaginatedResponseDto(),
    findOneById: async () => new SprocketDto(),
    createSprocket: async () => new SprocketDto(),
    updateSprocket: async () => new SprocketDto(),
    fillSprocketsWithSeedData: async () => Promise.resolve(),
  };
  const fakeSprockets = mockSprocketsData(2);

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [SprocketController],
      providers: [
        {
          provide: SprocketService,
          useValue: fakeSprocketService,
        },
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    controller = moduleRef.get<SprocketController>(SprocketController);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllSprockets', () => {
    it('should return a paginated list of sprockets', async () => {
      // GIVEN
      const paginationInput = { offset: 0, limit: 10 };
      const expectedResponse = {
        paging: {
          limit: 20,
          offset: 0,
          total_count: fakeSprockets.length,
        },
        items: fakeSprockets,
      };
      jest
        .spyOn(fakeSprocketService, 'findAll')
        .mockResolvedValue(expectedResponse);
      // WHEN
      const response = await controller.getAllSprockets(paginationInput);
      // THEN
      expect(response).toBeDefined();
      expect(response).toEqual(expectedResponse);
    });
  });
});
