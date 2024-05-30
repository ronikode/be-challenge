import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { ValidationPipe } from '@nestjs/common';
import { envs } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1'); // set global prefix
  // Use DocumentBuilder to create a new Swagger document configuration
  const config = new DocumentBuilder()
    .setTitle('Sprockets API') // Set the title of the API
    .setDescription('Sprockets API description') // Set the description of the API
    .setVersion('0.1') // Set the version of the API
    .build(); // Build the document
  const document = SwaggerModule.createDocument(app, config);
  // Setup Swagger module with the application instance and the Swagger document
  SwaggerModule.setup('api/v1', app, document);
  app.useGlobalPipes(
    new ValidationPipe({
      forbidUnknownValues: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      validateCustomDecorators: true,
    }),
  );

  await app.listen(envs.port);
}
bootstrap();
