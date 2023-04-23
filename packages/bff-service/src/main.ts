import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('bff');
  app.enableCors();
  app.use(helmet());

  await app.listen(process.env.PORT);
}
bootstrap();
