import { ObjectType, Field } from '@nestjs/graphql';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'; 
import { Document } from 'mongoose';

export type ClassDocument = Class & Document;

@Schema()
@ObjectType()
export class Class {
  @Field()
  _id: string;

  @Field()
  @Prop() 
  name: string;

  @Field()
  @Prop() 
  professorId: string;

  @Field(type => [String])
  @Prop() 
  studentIds: string[];
}

export const ClassSchema = SchemaFactory.createForClass(Class);
