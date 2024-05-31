import { Test } from '@nestjs/testing';

import { PrismaService } from '@prismaClient/prisma.service';
import { prismaMock } from '../../mocks/prismaSingleton.mock';
import { mockSprocketsData } from '../../mocks/sprocketsData.mock';

import { CreateSprocketDto, UpdateSprocketDto } from '@sprocket/dto';
import { SprocketRepository } from '@sprocket/sprocket.repository';

describe('SprocketRepository', () => {
  let sprocketRepository: SprocketRepository;
  let prismaService: PrismaService;
  const fakeSprockets = mockSprocketsData(5);

  afterEach(() => {
    jest.resetAllMocks();
  });

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        SprocketRepository,
        { provide: PrismaService, useValue: prismaMock },
        // {
        //   provide: PrismaService,
        //   useValue: {
        //     sprocket: {
        //       create: jest.fn(),
        //       findMany: jest.fn(),
        //       findOne: jest.fn(),
        //       update: jest.fn(),
        //     },
        //   },
        // },
      ],
    }).compile();

    sprocketRepository = moduleRef.get<SprocketRepository>(SprocketRepository);
    prismaService = moduleRef.get<PrismaService>(PrismaService);
  });

  describe('create', () => {
    it('should create a new sprocket', async () => {
      // GIVEN
      const createSprocketDto: CreateSprocketDto = {
        teeth: 5,
        pitchDiameter: 20,
        pitch: 10,
        outsideDiameter: 25,
      };
      const newSprocket = {
        id: '1',
        ...createSprocketDto,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest
        .spyOn(prismaService.sprocket, 'create')
        .mockResolvedValue(newSprocket);
      // WHEN
      const result = await sprocketRepository.create(createSprocketDto);
      // THEN
      expect(prismaService.sprocket.create).toHaveBeenCalledWith({
        data: createSprocketDto,
      });
      expect(result).toEqual(newSprocket);
      expect(result.id).toBeDefined();
      expect(result.pitch).toEqual(createSprocketDto.pitch);
      expect(result.teeth).toEqual(createSprocketDto.teeth);
      expect(result.pitchDiameter).toEqual(createSprocketDto.pitchDiameter);
      expect(result.outsideDiameter).toEqual(createSprocketDto.outsideDiameter);
      expect(result.createdAt).toBeDefined();
    });
  });

  describe('update', () => {
    it('should update a sprocket by ID', async () => {
      // GIVEN
      const sprocket = fakeSprockets[0];
      const updateData: UpdateSprocketDto = {
        pitch: 12,
      };
      const updatedSprocket = {
        ...sprocket,
        pitch: updateData.pitch,
      };
      jest
        .spyOn(prismaService.sprocket, 'update')
        .mockResolvedValue(updatedSprocket);
      // WHEN
      const result = await sprocketRepository.update(sprocket.id, updateData);
      // THEN
      expect(prismaService.sprocket.update).toHaveBeenCalledWith({
        where: { id: sprocket.id },
        data: updateData,
      });
      expect(result).toEqual(updatedSprocket);
      expect(result.pitch).toEqual(updateData.pitch);
    });

    it('should return null if sprocket is not found', async () => {
      // GIVEN
      const sprocketId = '0EAF8326-F7BD-4FD9-BF35-5A5C07CF6F3D';
      const updateData: UpdateSprocketDto = {
        teeth: 10,
        pitchDiameter: 12,
      };
      jest.spyOn(prismaService.sprocket, 'update').mockResolvedValue(null);
      // WHEN
      const result = await sprocketRepository.update(sprocketId, updateData);
      // THEN
      expect(prismaService.sprocket.update).toHaveBeenCalledWith({
        where: { id: sprocketId },
        data: updateData,
      });
      expect(result).toBeNull();
    });
  });

  describe('findAll', () => {
    it('should return a paginated list of sprockets', async () => {
      // GIVEN
      const paginationInput = { page: 1, limit: 10 };
      jest
        .spyOn(prismaService.sprocket, 'count')
        .mockResolvedValue(fakeSprockets.length);
      jest
        .spyOn(prismaService.sprocket, 'findMany')
        .mockResolvedValue(fakeSprockets);
      // WHEN
      const result = await sprocketRepository.findAll(paginationInput);
      // THEN
      expect(result.items).toEqual(fakeSprockets);
      expect(result.paging.limit).toEqual(paginationInput.limit);
    });
  });

  describe('findOne', () => {
    it('should return a sprocket by ID', async () => {
      const sprocketId = fakeSprockets[0].id;

      jest
        .spyOn(prismaService.sprocket, 'findUnique')
        .mockResolvedValue(fakeSprockets[0]);

      const result = await sprocketRepository.findOne(sprocketId);

      expect(prismaService.sprocket.findUnique).toHaveBeenCalledWith({
        where: { id: sprocketId },
      });
      expect(result).toEqual(fakeSprockets[0]);
    });

    it('should return null if sprocket is not found', async () => {
      const sprocketId = '0EAF8326-F7BD-4FD9-BF35-5A5C07CF6F3D';

      jest.spyOn(prismaService.sprocket, 'findUnique').mockResolvedValue(null);

      const result = await sprocketRepository.findOne(sprocketId);

      expect(prismaService.sprocket.findUnique).toHaveBeenCalledWith({
        where: { id: sprocketId },
      });
      expect(result).toBeNull();
    });
  });
});
