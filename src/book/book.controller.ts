import { Body, Controller, Get, Param, ParseIntPipe, Post, Req, Res, UseGuards, UseInterceptors } from "@nestjs/common";
import { BookDto } from "./dto/book.dto";
import { BookPipe } from "./pipes/book.pipe";
import { BookGuard } from "./book.guard";
import { BookInterceptor } from "./book.interceptor";
import { Request, Response } from "express";
import { Book } from "./book.decorator";
@Controller('/book')
export class BookController{
    @Get('/name')
    @UseInterceptors(new BookInterceptor)
    getName(@Req() req:Request, @Res() res:Response): any{
        return res.json(req.body)
    }
    @Get('/author')
    @UseGuards(new BookGuard)
    getAuthor(){
        return "James Clear"
    }
    @Get('/:id')
     getBookById(@Param("id",ParseIntPipe) id:Number){
        console.log(id , typeof(id))
        return "Get book by ID."
     }
     @Post('/add')
     addBook(@Body(new BookPipe) book: BookDto){
        return "Add Book"
     }
     @Post('/year')
     //using custom decorator
      bookYear(@Book("name") name: string) : string{
         return name;
      }
}