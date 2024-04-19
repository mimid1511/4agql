import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'; 
import { Document } from 'mongoose';

export type GradeDocument = Grade & Document;

@Schema() 
@ObjectType()
export class Grade {
  @Field()
  _id: string;

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

  //coefficient: number;
}

export const GradeSchema = SchemaFactory.createForClass(Grade);