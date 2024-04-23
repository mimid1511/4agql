import { NestFactory } from '@nestjs/core';
import { ClassesModule } from './classes.module';

async function bootstrap() {
  const app = await NestFactory.create(ClassesModule);
  app.enableCors({
    origin: 'http://localhost:3000'
  });
  await app.listen(4003);
}
bootstrap();
