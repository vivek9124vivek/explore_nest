import { Injectable } from "@nestjs/common";
import { CreateBookDto } from "./dto/create-book.dto";
import {  Repository } from "typeorm";
import { Book } from "./entities/book.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { UpdateBookDto } from "./dto/update-book.dto";
import { Rating } from "./entities/rating.entity";
import { Author } from "./entities/author.entity";

@Injectable()
export class BookService{

    constructor(@InjectRepository(Book) private readonly bookRepository  : Repository<Book>,
    @InjectRepository(Rating) private readonly ratingRepository  : Repository<Rating>,
    // @InjectRepository(Author) private readonly authorRepository : Repository<Author>
   ){}
// This action add a new book in the DB.
async create(createBookDto: CreateBookDto): Promise<Book> {
  // rating operation
  const rating = new Rating();
  rating.Rating = createBookDto.rating;
  const savedRating = await this.ratingRepository.save(rating);

  // author operation
//   const author = new Author();
//   author.name = createBookDto.author;


  // book operation
  const book = new Book();
  book.name = createBookDto.name;

  book.rating = savedRating;

  const savedBook = await this.bookRepository.save(book);
  return savedBook;
}


    async findAll(): Promise<{ id: number, name: string }[]> {
      // Query builder create kar rahe hain 'book' entity ke liye
      return this.bookRepository.createQueryBuilder('book')
          // Sirf 'id' aur 'name' columns select kar rahe hain
          .select(['book.id', 'book.name'])
          // Query ko execute karke result return kar rahe hain
          .getMany();
  }


// This action find one book with the help of book's id in the DB.
async findOne(id: number): Promise<any> {

return this.bookRepository.findOne({
    where:{id},
    relations:{rating:true}
})

}

    update(id:number,updateBookDto:UpdateBookDto){
        let book: Book = new Book();
        book.id = updateBookDto.id;
        book.name = updateBookDto.name;
       
        book.id = id;
        return this.bookRepository.save(book)
    }
// This action remove a book with the help of book's id in the DB.
    // remove(id:number){
    //  return this.bookRepository.delete(id);
    // }

    async remove(id: number): Promise<void> {
        const book = await this.bookRepository.findOne({ where: { id }, relations: ['rating'] });
        if (book) {
            await this.bookRepository.remove(book); 
        }
    }

}

