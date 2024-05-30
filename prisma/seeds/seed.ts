import { Logger } from '@nestjs/common';
import { PrismaClient, Sprocket } from '@prisma/client';

import { sprocketsData } from '../../src/utils/loader-sprockets';

// initialize Prisma Client
const prisma = new PrismaClient();
const logger = new Logger();

async function main() {
  logger.log(`Start seeding...!`);
  try {
    const sprockets: Sprocket[] = sprocketsData as Sprocket[];
    logger.log(`Loading data from json: ${sprockets.length} (s)`);

    if (!Array.isArray(sprockets)) {
      logger.error('sprocketsData is not an array');
      process.exit(1);
    }

    await Promise.all(
      sprockets.map((sprocket) =>
        prisma.sprocket.create({ data: sprocket as Sprocket }),
      ),
    );
  } catch (error) {
    logger.error(error);
  }

  logger.log('\n SEED COMPLETED ✅');
  process.exit(0);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    logger.error(JSON.stringify(e));
    await prisma.$disconnect();
    process.exit(1);
  });
