import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAuthDto } from '../dto/create-auth.dto';
import { Auth } from '../entities/auth.entity';

@Injectable()
export class AuthService {
  constructor(@InjectModel(Auth.name) private authModel: Model<Auth>) {}

  async createUser(createAuthDto: CreateAuthDto): Promise<Auth> {
    const user = new this.authModel(createAuthDto);
    return await user.save();
  }

  async findUser(email: any): Promise<any> {
    return await this.authModel.findOne({ email: email });
  }
}
