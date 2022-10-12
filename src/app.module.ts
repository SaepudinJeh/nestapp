import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { mongo_uri } from './shared/config/mongo.config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(mongo_uri),
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
