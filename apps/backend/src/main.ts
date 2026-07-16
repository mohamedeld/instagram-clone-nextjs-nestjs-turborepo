import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { getUploadsRootPath } from './upload/uploads-path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bodyParser: false,
  });
  app.setGlobalPrefix('api');
  const uploadsPath = getUploadsRootPath();
  app.useStaticAssets(uploadsPath, {
    prefix: '/uploads',
  });
  await app.listen(process.env.PORT ?? 3002);
}
bootstrap();
