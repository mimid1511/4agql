import { Module } from '@nestjs/common';
import { ClassesService } from './classes.service';
import { ClassesResolver } from './classes.resolver';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Class, ClassSchema } from './schemas/class.schema';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    MongooseModule.forFeature([{ name: Class.name, schema: ClassSchema }]),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2,
      }
    }),
  ],
  providers: [ClassesResolver, ClassesService],
})
export class ClassesModule {}
