import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { mongo_uri } from './shared/config/mongo.config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      'mongodb+srv://wkwkwk:wkwkwk@cluster0.ked2wqs.mongodb.net/?retryWrites=true&w=majority',
    ),
    AuthModule,
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
