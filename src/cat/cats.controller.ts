import { Controller, Post, Body, Get } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';

@Controller('/cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post('/create')
  async create(@Body() createCatDto: CreateCatDto) {
    return this.catsService.create(createCatDto);
  }
  @Get('/name')
  getName(){
    return "Missi"
  }
  @Get('/status')
  getStatus(){
    return "I am Happy"
  }
} 
