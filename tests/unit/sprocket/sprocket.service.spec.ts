import { Test } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';

import { Sprocket } from '@prisma/client';

import { SprocketService } from '@sprocket/sprocket.service';
import { SprocketRepository } from '@sprocket/sprocket.repository';
import { CreateSprocketDto, UpdateSprocketDto } from '@sprocket/dto';

describe('SprocketService', () => {
  let sprocketService: SprocketService;
  let sprocketRepository: SprocketRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        SprocketService,
        {
          provide: SprocketRepository,
          useValue: {
            findAll: jest.fn(),
            findOneById: jest.fn(),
            createSprocket: jest.fn(),
            updateSprocket: jest.fn(),
            fillSprocketsWithSeedData: jest.fn(),
          },
        },
      ],
    }).compile();

    sprocketService = moduleRef.get<SprocketService>(SprocketService);
    sprocketRepository = moduleRef.get<SprocketRepository>(SprocketRepository);
  });

  describe('findAll', () => {
    it('should return a paginated list of sprockets', async () => {
      const paginationInput = { page: 1, limit: 10 };
      const expectedResponse = {
        data: [
          { id: '1', name: 'Sprocket 1' },
          { id: '2', name: 'Sprocket 2' },
        ],
        totalCount: 2,
        page: 1,
        limit: 10,
      };
      jest
        .spyOn(sprocketRepository, 'findAll')
        .mockResolvedValue(expectedResponse);

      const result = await sprocketService.findAll(paginationInput);

      expect(result).toEqual(expectedResponse);
      expect(sprocketRepository.findAll).toHaveBeenCalledWith(paginationInput);
    });
  });

  describe('findOneById', () => {
    it('should return a sprocket by id', async () => {
      const sprocketId = '1';
      const expectedResponse = { id: '1', name: 'Sprocket 1' };
      jest
        .spyOn(sprocketRepository, 'findOneById')
        .mockResolvedValue(expectedResponse);

      const result = await sprocketService.findOneById(sprocketId);

      expect(result).toEqual(expectedResponse);
      expect(sprocketRepository.findOneById).toHaveBeenCalledWith(sprocketId);
    });

    it('should throw NotFoundException if sprocket is not found', async () => {
      const sprocketId = '1';
      jest
        .spyOn(sprocketRepository, 'findOneById')
        .mockResolvedValue(undefined);

      await expect(sprocketService.findOneById(sprocketId)).rejects.toThrow(
        NotFoundException,
      );
      expect(sprocketRepository.findOneById).toHaveBeenCalledWith(sprocketId);
    });
  });

  describe('createSprocket', () => {
    it('should create a new sprocket', async () => {
      const createSprocketDto: CreateSprocketDto = { name: 'New Sprocket' };
      const expectedResponse = { id: '1', name: 'New Sprocket' };
      jest
        .spyOn(sprocketRepository, 'createSprocket')
        .mockResolvedValue(expectedResponse);

      const result = await sprocketService.createSprocket(createSprocketDto);

      expect(result).toEqual(expectedResponse);
      expect(sprocketRepository.createSprocket).toHaveBeenCalledWith(
        createSprocketDto,
      );
    });
  });

  describe('updateSprocket', () => {
    it('should update an existing sprocket', async () => {
      const sprocketId = '1';
      const updateSprocketDto: UpdateSprocketDto = { pitch: 12 };
      const expectedResponse = { id: '1', name: 'Updated Sprocket' };
      jest
        .spyOn(sprocketRepository, 'updateSprocket')
        .mockResolvedValue(expectedResponse);

      const result = await sprocketService.updateSprocket(
        sprocketId,
        updateSprocketDto,
      );

      expect(result).toEqual(expectedResponse);
      expect(sprocketRepository.updateSprocket).toHaveBeenCalledWith(
        sprocketId,
        updateSprocketDto,
      );
    });
  });
});
