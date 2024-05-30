import * as fs from 'fs';
import { camelCase, mapKeys } from 'lodash';

import { Sprocket } from '@prisma/client';

function convertToCamelCase(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map((v) => convertToCamelCase(v));
  } else if (obj !== null && obj.constructor === Object) {
    return Object.keys(obj).reduce(
      (result, key) => ({
        ...result,
        [camelCase(key)]: convertToCamelCase(obj[key]),
      }),
      {},
    );
  }
  return obj;
}

function readSprocketsJsonFile(filePath: string): Sprocket[] {
  const rawData = fs.readFileSync(filePath, 'utf-8');
  const convertData: Sprocket[] = convertToCamelCase(JSON.parse(rawData))
    .sprockets as Sprocket[];
  return convertData;
}

const FILE_SEED_SPROCKETS_PATH = 'prisma/seeds/data/seed_sprocket_types.json';
export const sprocketsData: Sprocket[] = readSprocketsJsonFile(
  FILE_SEED_SPROCKETS_PATH,
);
