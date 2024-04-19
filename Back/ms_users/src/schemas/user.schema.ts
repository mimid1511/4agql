import { ObjectType, Field, ID, Directive } from '@nestjs/graphql'; 
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'; 
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema() 
@ObjectType() 
export class User { 
  @Field()
  _id: string;

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

  
}

export const UserSchema = SchemaFactory.createForClass(User);