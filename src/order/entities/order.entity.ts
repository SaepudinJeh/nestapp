import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Auth } from 'src/auth/entities/auth.entity';
import { Product } from 'src/product/entities/product.entity';

@Schema({ timestamps: true })
export class Order extends Document {
  @Prop({ required: true, type: MongooseSchema.Types.ObjectId, ref: Auth.name })
  user: Auth;

  @Prop({
    required: true,
    type: MongooseSchema.Types.ObjectId,
    ref: Product.name,
  })
  product: Product;

  @Prop({ required: true, type: Number, default: 1 })
  qty: number;

  @Prop({ required: true, type: Boolean, default: false })
  isDelete: boolean;
}

export const OrderModel = SchemaFactory.createForClass(Order);
