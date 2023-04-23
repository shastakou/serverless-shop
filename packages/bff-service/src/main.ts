import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { API_PREFIX } from './shared/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(API_PREFIX);
  app.enableCors();
  app.use(helmet());

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
