import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cat/cats.module';
import { UserModule } from './user/user.module';
import { BookModule } from './book/book.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './book/entities/book.entity';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-store';
import { RedisModule } from 'redis/redis.module';
import { Rating } from './book/entities/rating.entity';
import { ConfigModule } from '@nestjs/config';
import { Author } from './book/entities/author.entity';


@Module({
  imports: [
    CatsModule,
    UserModule,
    ConfigModule.forRoot({
    
      isGlobal:true,
    }),

    CacheModule.register(
      {
     
      isGlobal:true,
      store:redisStore,
      host:'127.0.0.1',
      port:6379,

    }
  ),

  TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [Book,Rating,Author],
    port: 5433,
   
    synchronize: true,
    
  }),
  BookModule, 
  RedisModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
