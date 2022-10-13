import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SaveProductDto } from '../dto/save.product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async create(saveProductDto: SaveProductDto): Promise<any> {
    return await new this.productModel(saveProductDto).save();
  }

  async findAll(): Promise<any> {
    return await this.productModel
      .find({ isDelete: { $ne: true } })
      .populate({
        path: 'user',
        select: '_id username email',
      })
      .sort({ createdAt: 'desc' })
      .exec();
  }

  async findOne(id: string) {
    return (
      (await this.productModel
        .findOne({ _id: id, isDelete: { $ne: false } })
        .populate({
          path: 'user',
          select: '_id username email',
        })
        .sort({ createdAt: 'desc' })
        .exec()) || []
    );
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const { user, ...rest } = updateProductDto;
    console.log('asdasdasda', rest);
    console.log('user', user);
    console.log('id', id);

    return await this.productModel.findOneAndUpdate(
      { _id: id, user: user },
      {
        $set: { ...rest },
      },
      { new: true },
    );
  }

  async remove(id: string) {
    return await this.productModel.findByIdAndUpdate(id, { isDelete: true });
  }
}
