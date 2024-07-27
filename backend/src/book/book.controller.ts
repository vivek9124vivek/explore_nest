import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param,  ParseIntPipe,  Patch, Post,  UseInterceptors } from "@nestjs/common";
import { CreateBookDto } from "./dto/create-book.dto";
import { BookService } from "./book.service";
import { UpdateBookDto } from "./dto/update-book.dto";
import { BookInterceptor } from "./book.interceptor";
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";



@ApiTags("Books Module")
@Controller('/book')
@UseInterceptors(BookInterceptor)
export class BookController{
    constructor(private readonly bookService:BookService){}
  //enter new book record
    @Post()
    @ApiOperation({summary:"Create new book record"})
    @ApiBody({
      schema:{
        type:'object',
        properties:{
          name:{
            type:"string",
            example:"The Alchemist",
            description:"Name of the book"
          },
          author:{
            type:"string",
            example:"Paul Coelho",
            description:"Name of the author"
          }
        }
      }
    })
    @ApiResponse({
      status:201,
      description:"Record created successfully"
    })
    create(@Body() createBookDto: CreateBookDto){
      return this.bookService.create(createBookDto);
    }
    
    //get all books entries
    @Get()
    @ApiOperation({summary:"Get all books from this api"})
    @ApiResponse({
      status:200,
      description:'All book list'
    })
    @ApiResponse({
      status:500,
      description:'Internal Server Error'
    })
    findAll(){
      return this.bookService.findAll()
    }
  //update book with the help of id
     @Patch(':id')
     @ApiOperation({summary:"Update book record"})
     @ApiParam({
      name:'id',
      type:'integer',
      description:'Enter unique id',
      required:true
     })
     @ApiBody({
      schema:{
        type:'object',
        properties:{
          name:{
            type:"string",
            example:"The Alchemist",
            description:"Name of the book"
          },
          author:{
            type:"string",
            example:"Paul Coelho",
            description:"Name of the author"
          }
        }
      }
    })
    @ApiResponse({
      status:200,
      description:"Updated successfully"
    })
     update(@Param('id') id: string, @Body()updateBookDto: UpdateBookDto){
      return this.bookService.update(+id,updateBookDto);
     }
//get book with the help of id
     @Get(':id')
     @ApiOperation({summary:"Get book record with its id"})
     @ApiParam({
      name:'id',
      type:'integer',
      description:'Enter unique id',
      required:true
     })
     @ApiResponse({
      status:200,
      description:"Get book successfully"
    })
     findOne(@Param('id',ParseIntPipe) id:number){
      if(id<=0){
throw new HttpException(
   "Invalid ID", HttpStatus.BAD_REQUEST

)
      }
      return this.bookService.findOne(+id)
     }


     
     @Delete(':id')
     @ApiOperation({summary:"Delete the record"})
     @ApiParam({
      name:'id',
      type:'integer',
      description:'Enter unique id',
      required:true
     })
     @ApiResponse({
      status:200,
      description:"Deleted successfully"
     })
     remove(@Param('id') id:string){
      return this.bookService.remove(+id)
     }

}