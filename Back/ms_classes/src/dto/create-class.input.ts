import { InputType, Field } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';


@InputType()
export class CreateClassInput {
  @Field()
  @Prop()
  name: string;

  @Field()
  @Prop()
  professorId: string;

  @Field(type => [String])
  @Prop()
  studentIds: string[];

  @Field()
  @Prop()
  school: string;
}
