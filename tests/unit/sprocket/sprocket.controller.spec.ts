import { Test, TestingModule } from '@nestjs/testing';

import { SprocketController } from '@sprocket/sprocket.controller';
import { SprocketService } from '@sprocket/sprocket.service';
import { CreateSprocketDto, UpdateSprocketDto } from '@sprocket/dto';

describe('SprocketController', () => {
  let controller: SprocketController;
  let service: SprocketService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SprocketController],
      providers: [SprocketService],
    }).compile();

    controller = module.get<SprocketController>(SprocketController);
    service = module.get<SprocketService>(SprocketService);
  });

  describe('getAllSprockets', () => {
    it('should return a paginated list of sprockets', async () => {
      const result = {
        data: [
          { id: '1', name: 'Sprocket 1' },
          { id: '2', name: 'Sprocket 2' },
        ],
        total: 2,
        page: 1,
        limit: 10,
      };
      jest.spyOn(service, 'getAllSprockets').mockResolvedValue(result);

      const params = { page: 1, limit: 10 };
      const response = await controller.getAllSprockets(params);

      expect(service.getAllSprockets).toHaveBeenCalledWith(params);
      expect(response).toEqual(result);
    });
  });

  describe('getSprocket', () => {
    it('should return a sprocket by id', async () => {
      const result = { id: '1', name: 'Sprocket 1' };
      jest.spyOn(service, 'getSprocketById').mockResolvedValue(result);

      const id = '1';
      const response = await controller.getSprocket(id);

      expect(service.getSprocketById).toHaveBeenCalledWith(id);
      expect(response).toEqual(result);
    });
  });

  describe('createSprocket', () => {
    it('should create a new sprocket', async () => {
      const createSprocketDto: CreateSprocketDto = { name: 'New Sprocket' };
      const result = { id: '1', name: 'New Sprocket' };
      jest.spyOn(service, 'createSprocket').mockResolvedValue(result);

      const response = await controller.createSprocket(createSprocketDto);

      expect(service.createSprocket).toHaveBeenCalledWith(createSprocketDto);
      expect(response).toEqual(result);
    });
  });

  describe('updateSprocket', () => {
    it('should update a sprocket by id', async () => {
      const id = '1';
      const updateSprocketDto: UpdateSprocketDto = { name: 'Updated Sprocket' };
      const result = { id: '1', name: 'Updated Sprocket' };
      jest.spyOn(service, 'updateSprocket').mockResolvedValue(result);

      const response = await controller.updateSprocket(id, updateSprocketDto);

      expect(service.updateSprocket).toHaveBeenCalledWith(
        id,
        updateSprocketDto,
      );
      expect(response).toEqual(result);
    });
  });
});
