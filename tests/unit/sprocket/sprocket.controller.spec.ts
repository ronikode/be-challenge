import { Test, TestingModule } from '@nestjs/testing';
import { SprocketController } from '../../../src/sprocket/sprocket.controller';

describe('SprocketController', () => {
  let controller: SprocketController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SprocketController],
    }).compile();

    controller = module.get<SprocketController>(SprocketController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
