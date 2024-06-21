import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { Cat, CatSchema } from './schemas/cat.schema';
import { BookModule } from 'src/book/book.module';

@Module({
    // ye line keh rahi hai Cat naam ka collection banega Catschema use karke
  imports: [MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }]),forwardRef(()=> BookModule)],
  controllers: [CatsController],
  providers: [CatsService],

})
export class CatsModule {}