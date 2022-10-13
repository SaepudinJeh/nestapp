import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { mongo_uri } from './shared/config/mongo.config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(mongo_uri),
    AuthModule,
    ProductModule,
    OrderModule,
    // MongooseModule.forRootAsync({
    //   imports: [ConfigModule],
    //   useFactory: (configService: ConfigService) => ({
    //     useCreateIndex: true,
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true,
    //     uri: configService.get<string>('mongodb.uri'),
    //   }),
    //   inject: [ConfigService],
    // }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
