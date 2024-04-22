import { InputType, Field } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';

@InputType()
export class CreateUserInput {
  @Field()
  @Prop() 
  email: string;

  @Field()
  @Prop()
  pseudo: string;

  @Field()
  @Prop()
  password: string;

  @Field()
  @Prop()
  role: string;

  @Field({ nullable: true })
  @Prop()
  teachingSubjectId?: string; 
}