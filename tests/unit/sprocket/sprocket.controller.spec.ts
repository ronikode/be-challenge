import { Test } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';

import { PrismaService } from '@prismaClient/prisma.service';
import { prismaMock } from '../../mocks/prismaSingleton.mock';

import { PaginatedResponseDto } from '@common/dtos';
import { mockSprocketsData } from '../../mocks/sprocketsData.mock';

import { CreateSprocketDto, SprocketDto } from '@sprocket/dto';
import { SprocketController } from '@sprocket/sprocket.controller';
import { SprocketService } from '@sprocket/sprocket.service';

describe('sprocket.controller', () => {
  let controller: SprocketController;
  const fakeSprocketService: Omit<SprocketService, 'sprocketRepository'> = {
    getAllSprockets: async () => new PaginatedResponseDto(),
    findOneById: async () => new SprocketDto(),
    createSprocket: async () => new SprocketDto(),
    updateSprocket: async () => new SprocketDto(),
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
        .spyOn(fakeSprocketService, 'getAllSprockets')
        .mockResolvedValue(expectedResponse);
      // WHEN
      const response = await controller.findAllSprockets(paginationInput);
      // THEN
      expect(response).toBeDefined();
      expect(response).toEqual(expectedResponse);
    });
  });

  describe('createSprockets', () => {
    it('should create a new sprocket', async () => {
      // GIVEN
      const createSprocketDto: CreateSprocketDto = {
        teeth: 5,
        pitchDiameter: 10,
        outsideDiameter: 10,
        pitch: 5,
      };
      const expectedResponse = new SprocketDto();
      jest
        .spyOn(fakeSprocketService, 'createSprocket')
        .mockResolvedValue(expectedResponse);
      // WHEN
      const response = await controller.createSprocket(createSprocketDto);
      // THEN
      expect(response).toBeDefined();
      expect(response).toEqual(expectedResponse);
    });

    it('should throw an exception', async () => {
      // GIVEN
      const badSprocketDto = {};
      jest
        .spyOn(fakeSprocketService, 'createSprocket')
        .mockRejectedValue(new Error('Error creating sprocket'));
      // WHEN
      try {
        await controller.createSprocket(badSprocketDto as CreateSprocketDto);
      } catch (error) {
        // THEN
        expect(error).toBeDefined();
        expect(error.message).toEqual('Error creating sprocket');
      }
    });
  });

  describe('updateSprocket', () => {
    it('should return a sprocket updated', async () => {
      // GIVEN
      const updateSprocketDto = {
        pitch: 5,
      };
      const expectedResponse = fakeSprockets[0];
      expectedResponse.pitch = updateSprocketDto.pitch;
      jest
        .spyOn(fakeSprocketService, 'updateSprocket')
        .mockResolvedValue(expectedResponse);
      // WHEN
      const response = await controller.updateSprocket(
        expectedResponse.id,
        updateSprocketDto,
      );
      // THEN
      expect(response).toBeDefined();
      expect(response).toBe(expectedResponse);
      expect(response.pitch).toEqual(updateSprocketDto.pitch);
    });

    it('should throw and exception', async () => {
      // GIVEN
      const sprocket = fakeSprockets[0];
      const updateSprocketDto = {
        pitch: 5,
      };
      const errorMessage = `Sprocket with id '${sprocket.id}' not found`;
      jest
        .spyOn(fakeSprocketService, 'updateSprocket')
        .mockRejectedValue(new NotFoundException(errorMessage));
      // WHEN
      try {
        await controller.updateSprocket(sprocket.id, updateSprocketDto);
      } catch (error) {
        // THEN
        expect(error).toBeDefined();
        expect(error.message).toEqual(errorMessage);
      }
    });
  });
});
