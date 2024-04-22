import { InputType, Field } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';

@InputType()
export class CreateSubjectInput {  
  @Field()
  @Prop()
  name: string;
}
