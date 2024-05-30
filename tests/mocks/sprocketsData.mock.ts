import { faker } from '@faker-js/faker';
import { Sprocket } from '@prisma/client';

export const createFakeSprockets = (): Sprocket => {
  return {
    id: faker.string.uuid(),

    teeth: faker.number.int({ min: 1, max: 100 }),
    pitchDiameter: faker.number.int({ min: 1, max: 300 }),
    outsideDiameter: faker.number.int({ min: 1, max: 300 }),
    pitch: faker.number.int({ min: 1, max: 500 }),

    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
  };
};

export const mockSprocketsData = (size: number): Sprocket[] =>
  Array.from({ length: size }).map(() => createFakeSprockets());
