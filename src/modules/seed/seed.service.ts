import { Injectable } from '@nestjs/common';

import { SprocketService } from '../../sprocket/sprocket.service';
import { sprocketsData } from '../../utils/loader-sprockets';

@Injectable()
export class SeedService {
  constructor(private readonly sprocketService: SprocketService) {}

  populateDB() {
    this.sprocketService.fillSprocketsWithSeedData(sprocketsData);
    return 'Seed executed successfully';
  }
}
