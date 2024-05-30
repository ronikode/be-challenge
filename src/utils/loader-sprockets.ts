import * as fs from 'fs';
import { Sprocket } from '../sprocket/entities/sprocket.interface';

function readJsonFile(filePath: string): Sprocket[] {
  const rawData = fs.readFileSync(filePath, 'utf-8');
  const jsonData: Sprocket[] = JSON.parse(rawData);
  return jsonData;
}

const FILE_SEED_SPROCKET_PATH =
  'src/modules/seed/data/seed_sprocket_types.json';
export const sprocketsData = readJsonFile(FILE_SEED_SPROCKET_PATH);
