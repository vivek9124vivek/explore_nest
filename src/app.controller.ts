import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { BookService } from './book/book.service';
@Controller()
export class AppController {  
  constructor(private readonly appService: AppService) {}
  

  
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
