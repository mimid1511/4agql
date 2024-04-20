import { InputType, Field } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';

@InputType()
export class CreateGradeInput {  
  @Field()
  @Prop()
  studentId: string;

  @Field()
  @Prop() 
  teacherId: string;

  @Field()
  @Prop()
  subject: string;

  @Field()
  @Prop()
  value: number;

  @Field()
  @Prop()
  coefficient: number;
}
