import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CatsModule } from './cat/cats.module';
import { UserModule } from './user/user.module';
import { BookModule } from './book/book.module';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://vivekkumar:18067036@cluster0.lnzhtqg.mongodb.net/nest_db?retryWrites=true&w=majority&appName=Cluster0'),CatsModule,UserModule,BookModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
