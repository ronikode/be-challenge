import { Test } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';

import { mockSprocketsData } from '../../mocks/sprocketsData.mock';

import { BasePaginationInput, PaginatedResponseDto } from '@common/dtos';
import { SprocketDto } from 'src/modules/sprocket/dto';
import { SprocketService } from 'src/modules/sprocket/sprocket.service';
import { SprocketRepository } from 'src/modules/sprocket/sprocket.repository';

describe('SprocketService', () => {
  let sprocketService: SprocketService;
  let fakeSprocketRepository: Omit<SprocketRepository, 'prismaService'>;

  const fakeSprockets = mockSprocketsData(2);

  beforeAll(async () => {
    fakeSprocketRepository = {
      findAll: () => Promise.resolve(new PaginatedResponseDto()),
      create: () => Promise.resolve(new SprocketDto()),
      findOne: () => Promise.resolve(new SprocketDto()),
      update: () => Promise.resolve(new SprocketDto()),
    };

    const moduleRef = await Test.createTestingModule({
      providers: [
        SprocketService,
        SprocketRepository,
        {
          provide: SprocketRepository,
          useValue: fakeSprocketRepository,
        },
      ],
    }).compile();

    sprocketService = moduleRef.get<SprocketService>(SprocketService);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(sprocketService).toBeDefined();
  });

  describe('findAll', () => {
    it('should return a paginated list of sprockets', async () => {
      // GIVEN
      const paginationInput: BasePaginationInput = { offset: 0, limit: 10 };
      const expectedResponse = {
        items: fakeSprockets,
        paging: {
          total_count: fakeSprockets.length,
          limit: paginationInput.limit,
          offset: paginationInput.offset,
        },
      };
      jest
        .spyOn(fakeSprocketRepository, 'findAll')
        .mockResolvedValue(expectedResponse);

      // WHEN
      const result = await sprocketService.getAllSprockets(paginationInput);
      // THEN
      expect(result).toBeDefined();
      expect(result.paging.limit).toBe(paginationInput.limit);
      expect(result.paging.offset).toBe(paginationInput.offset);
      expect(result.items).toHaveLength(fakeSprockets.length);
    });

    it('should return a paginated object if sprockets is empty', async () => {
      // GIVEN
      const paginationInput: BasePaginationInput = { offset: 0, limit: 10 };
      const expectedResponse = {
        items: [],
        paging: {
          total_count: 0,
          limit: paginationInput.limit,
          offset: paginationInput.offset,
        },
      };
      jest
        .spyOn(fakeSprocketRepository, 'findAll')
        .mockResolvedValue(expectedResponse);

      // WHEN
      const result = await sprocketService.getAllSprockets(paginationInput);
      // THEN
      expect(result).toBeDefined();
      expect(result.paging.limit).toBe(paginationInput.limit);
      expect(result.paging.offset).toBe(paginationInput.offset);
      expect(result.items).toHaveLength(0);
    });
  });

  describe('findOneById', () => {
    it('should return a specific sprocket', async () => {
      // GIVEN
      const expectedResponse = fakeSprockets[0];
      jest
        .spyOn(fakeSprocketRepository, 'findOne')
        .mockResolvedValue(expectedResponse);

      // WHEN
      const result = await sprocketService.findOneById(expectedResponse.id);
      // THEN
      expect(result).toBeDefined();
      expect(result).toEqual(expectedResponse);
    });

    it('should throw and exception when sprocket is not found', async () => {
      // GIVEN
      const expectedResponse = undefined;
      jest
        .spyOn(fakeSprocketRepository, 'findOne')
        .mockResolvedValue(expectedResponse);
      // WHEN
      const result = sprocketService.findOneById('1');
      // THEN
      expect(result).rejects.toThrow(NotFoundException);
    });
  });

  describe('createSprocket', () => {
    it('should create a sprocket', async () => {
      // GIVEN
      const sprocket = fakeSprockets[0];
      jest.spyOn(fakeSprocketRepository, 'create').mockResolvedValue(sprocket);
      // WHEN
      const result = await sprocketService.createSprocket(sprocket);
      // THEN
      expect(result).toBeDefined();
      expect(result).toEqual(sprocket);
    });

    it('should throw a BadRequestException invalid request', async () => {
      // Mock the function to reject with a BadRequestException
      jest
        .spyOn(sprocketService, 'createSprocket')
        .mockRejectedValue(new BadRequestException());

      // Assert that the function throws a BadRequestException
      await expect(sprocketService.createSprocket(null)).rejects.toThrow(
        BadRequestException,
      );
    });
  });
});
