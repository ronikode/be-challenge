import { PrismaClient } from '@prisma/client';

import { Logger } from '@nestjs/common';

// initialize Prisma Client
const prisma = new PrismaClient();
const logger = new Logger();

async function main() {
  logger.log('Starting Seeder');

  const recipe1 = await prisma.sprocket.upsert({
    update: {},
    create: {},
  });

  const recipe2 = await prisma.sprocket.upsert({
    update: {},
    create: {},
  });

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
