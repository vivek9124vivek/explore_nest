import { MiddlewareConsumer, Module,  NestModule, forwardRef } from "@nestjs/common";
import { BookController } from "./book.controller";
import { BookMiddleware } from "./book.middleware";
import { CatsModule } from "src/cat/cats.module";

@Module({
    imports:[forwardRef(()=> CatsModule)],
    controllers:[BookController]

})
export class BookModule implements NestModule{
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(BookMiddleware).forRoutes("/book")
    }
   
}