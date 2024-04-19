import { CreateGradeInput } from './create-grade.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateGradeInput extends PartialType(CreateGradeInput) {
  @Field()
  _id: string;
}
