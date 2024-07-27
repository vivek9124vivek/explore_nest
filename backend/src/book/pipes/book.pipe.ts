import { BadRequestException, PipeTransform } from "@nestjs/common";
import { CreateBookDto } from "../dto/create-book.dto";

export class BookPipe implements PipeTransform {
    transform(value: CreateBookDto) {
      const {id} = value;
      if (!Number.isInteger(id) || id <= 0) {
        throw new BadRequestException('Invalid ID. ID must be a positive integer.');
    }
    }

}