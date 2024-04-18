import { NestFactory } from '@nestjs/core';
import { GradesModule } from './grades.module';

async function bootstrap() {
  const app = await NestFactory.create(GradesModule);
  await app.listen(4002);
}
bootstrap();
