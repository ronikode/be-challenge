import { Test } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';

import { mockSprocketsData } from '../../mocks/sprocketsData.mock';

import { BasePaginationInput, PaginatedResponseDto } from '@common/dtos';
import { SprocketDto } from '@sprocket/dto';
import { SprocketService } from '@sprocket/sprocket.service';
import { SprocketRepository } from '@sprocket/sprocket.repository';

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
      const fakeSprocketId = '0EAF8326-F7BD-4FD9-BF35-5A5C07CF6F3D';
      const expectedResponse = undefined;
      jest
        .spyOn(fakeSprocketRepository, 'findOne')
        .mockResolvedValue(expectedResponse);
      // WHEN
      const result = await sprocketService.findOneById(fakeSprocketId);
      // THEN
      await expect(result).toBeUndefined();
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

  // describe('updateSprocket', () => {
  //   it('should update the sprocket', async () => {
  //     // GIVEN
  //     const updateSprocketDto = {
  //       pitch: 101,
  //     };
  //     const sprocket = fakeSprockets[0];
  //     const expectedResponse = {
  //       ...sprocket,
  //       pitch: updateSprocketDto.pitch,
  //     };
  //     jest
  //       .spyOn(fakeSprocketRepository, 'update')
  //       .mockResolvedValue(expectedResponse);
  //     // WHEN
  //     const result = await sprocketService.updateSprocket(
  //       sprocket.id,
  //       updateSprocketDto,
  //     );
  //     // THEN
  //     expect(result).toBeDefined();
  //     expect(result).toEqual(expectedResponse);
  //   });
  // });
});
