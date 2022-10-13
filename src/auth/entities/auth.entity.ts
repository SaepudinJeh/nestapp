import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Auth extends Document {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop({ default: true })
  status: boolean;
}

export const AuthModel = SchemaFactory.createForClass(Auth);
