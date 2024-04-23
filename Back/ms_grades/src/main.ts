import { NestFactory } from '@nestjs/core';
import { GradesModule } from './grades.module';

async function bootstrap() {
  const app = await NestFactory.create(GradesModule);
  app.enableCors({
    origin: 'http://localhost:3000'
  });
  await app.listen(4002);
}
bootstrap();
