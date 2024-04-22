import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'; 
import { Document } from 'mongoose';

export type SubjectDocument = Subject & Document;

@Schema() 
@ObjectType()
export class Subject {
  @Field()
  _id: string;

  @Field()
  @Prop() 
  name: string;
}

export const SubjectSchema = SchemaFactory.createForClass(Subject);