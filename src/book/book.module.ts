import { MiddlewareConsumer, Module,  NestModule, forwardRef } from "@nestjs/common";
import { BookController } from "./book.controller";
import { BookMiddleware } from "./book.middleware";
import { CatsModule } from "src/cat/cats.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Book } from "./entities/book.entity";
import { BookService } from "./book.service";
import { Rating } from "./entities/rating.entity";
import { Author } from "./entities/author.entity";



@Module({
    imports:[forwardRef(()=> CatsModule),TypeOrmModule.forFeature([Book,Rating,Author])],
    controllers:[BookController],
    providers: [BookService],
})
export class BookModule implements NestModule{
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(BookMiddleware).forRoutes("/book")
    }
   
}