import { NestFactory } from '@nestjs/core';
import { UsersModule } from './users.module';
import * as passport from 'passport';


async function bootstrap() {
  const app = await NestFactory.create(UsersModule);
  app.enableCors({
    origin: 'http://localhost:3000'
  });
  app.use(passport.initialize());
  await app.listen(4001);
}
bootstrap();
