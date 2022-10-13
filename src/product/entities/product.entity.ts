import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Auth } from 'src/auth/entities/auth.entity';

@Schema({ timestamps: true })
export class Product extends Document {
  @Prop({ required: true, type: MongooseSchema.Types.ObjectId, ref: Auth.name })
  user: Auth;

  @Prop({ required: true, type: String, min: 1 })
  name: string;

  @Prop({ required: true, type: String, min: 1 })
  desc: string;

  @Prop({ required: true, type: Number, min: 1 })
  price: number;

  @Prop({ required: true, type: Number, default: 1 })
  qty: number;

  @Prop({ required: true, type: Boolean, default: false })
  isDelete: boolean;
}

export const ProductModel = SchemaFactory.createForClass(Product);
