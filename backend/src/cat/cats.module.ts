import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { BookModule } from 'src/book/book.module';

@Module({
    // ye line keh rahi hai Cat naam ka collection banega Catschema use karke
  imports: [forwardRef(()=> BookModule)],
  controllers: [CatsController],
  providers: [CatsService],

})
export class CatsModule {}