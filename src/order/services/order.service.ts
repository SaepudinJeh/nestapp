import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SaveOrderDto } from '../dto/save-order';
import { Order } from '../entities/order.entity';

@Injectable()
export class OrderService {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

  async createOrder(saveOrderDto: SaveOrderDto): Promise<any> {
    return await this.orderModel.updateOne(
      { product: saveOrderDto.product },
      { $set: { ...saveOrderDto } },
      { upsert: true },
    );
  }

  async findAll(userId: string) {
    return await this.orderModel
      .find({
        user: userId,
        isDelete: { $ne: true },
      })
      .populate({
        path: 'user product',
        select: '_id username email name price',
      })
      .sort({ createdAt: 'desc' })
      .exec();
  }

  async findOne(idOrder: string, userId: string): Promise<any> {
    return await this.orderModel
      .findOne({ _id: idOrder, user: userId, isDelete: { $ne: true } })
      .populate({
        path: 'user product',
        select: '_id username email name price',
      })
      .sort({ createdAt: 'desc' })
      .exec();
  }

  async delete(idProduct: string, userId: string) {
    return await this.orderModel.updateOne(
      {
        product: idProduct,
        user: userId,
      },
      { $set: { isDelete: true } },
    );
  }
}
