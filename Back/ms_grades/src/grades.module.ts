import { Module } from '@nestjs/common';
import { GradesService } from './grades.service';
import { GradesResolver } from './grades.resolver';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Grade, GradeSchema } from './schemas/grade.schema';
import { HttpModule } from '@nestjs/axios';
import { SubjectsResolver } from './subjects.resolver';
import { SubjectsService } from './subjects.service';
import { Subject, SubjectSchema } from './schemas/subject.schema';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    MongooseModule.forFeature([
      { name: Grade.name, schema: GradeSchema },
      { name: Subject.name, schema: SubjectSchema }
    ]),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2,
      }
    }),
    HttpModule,
  ],
  providers: [GradesResolver, GradesService, SubjectsResolver, SubjectsService],
})
export class GradesModule {}
