import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateBookDto } from "./dto/create-book.dto";
import {  Repository } from "typeorm";
import { Book } from "./entities/book.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { UpdateBookDto } from "./dto/update-book.dto";
import { Rating } from "./entities/rating.entity";
import { Author } from "./entities/author.entity";
import { Publication } from "./entities/publication.entity";

@Injectable()
export class BookService{

    constructor(
    @InjectRepository(Book) private readonly bookRepository  : Repository<Book>,
    @InjectRepository(Rating) private readonly ratingRepository  : Repository<Rating>,
    @InjectRepository(Author) private readonly authorRepository : Repository<Author>,
    @InjectRepository(Publication) private readonly publicationRepository : Repository<Publication>
   ){}


async create(createBookDto: CreateBookDto): Promise<Book> {
  // Rating operation
  const rating = new Rating();
  rating.Rating = createBookDto.rating;
  // No need to explicitly save rating, as cascade will handle it

  // Author operation
  const author = new Author();
  author.name = createBookDto.author;
  // No need to explicitly save author, as cascade will handle it

  // Publication operation
  let publication = await this.publicationRepository.findOne({
    where: { publication: createBookDto.publication },
  });

  if (!publication) {
    publication = new Publication();
    publication.publication = createBookDto.publication;
    publication.publishedAt = new Date(); // Set the published date
  }

  // Book operation
  const book = new Book();
  book.name = createBookDto.name;
  book.image = createBookDto.image;
  book.rating = rating; // Cascade will handle saving rating
  book.author = author; // Cascade will handle saving author
  book.publications = publication; // Cascade will handle saving publication

  const savedBook = await this.bookRepository.save(book);

  return savedBook;
}





// async findAll(): Promise<{ 
//   id: number, 
//   name: string, 
//   image: string, 
//   rating: number, 
//   publication: string, 
//   publishedAt: Date, 
//   author: string 
// }[]> {
//   const books = await this.bookRepository.createQueryBuilder('book')
//     .leftJoinAndSelect('book.publications', 'publication')
//     .leftJoinAndSelect('book.author', 'author')
//     .leftJoinAndSelect('book.rating', 'rating')
//     .getMany();

//   return books.map(book => ({
//     id: book.id,
//     name: book.name,
//     image: book.image,
//     rating: book.rating ? book.rating.Rating : null, // Access rating through the rating entity
//     publication: book.publications ? book.publications.publication : null,
//     publishedAt: book.publications ? book.publications.publishedAt : null,
//     author: book.author ? book.author.name : null
//   }));
// }

async findAll(
  page: number = 1,
  limit: number = 6
): Promise<{
  totalItems: number;
  totalPages: number;
  currentPage: number;
  books: {
    id: number;
    name: string;
    image: string;
    rating: number;
    publication: string;
    publishedAt: Date;
    author: string;
  }[];
}> {
  if (page < 1) page = 1;
  if (limit < 1) limit = 6;

  const [books, totalItems] = await this.bookRepository
    .createQueryBuilder('book')
    .leftJoinAndSelect('book.publications', 'publication')
    .leftJoinAndSelect('book.author', 'author')
    .leftJoinAndSelect('book.rating', 'rating')
    .skip((page - 1) * limit)
    .take(limit)
    .getManyAndCount(); // Retrieves both books and the total count of books

  const totalPages = Math.ceil(totalItems / limit);

  return {
    totalItems,
    totalPages,
    currentPage: page,
    books: books.map(book => ({
      id: book.id,
      name: book.name,
      image: book.image,
      rating: book.rating ? book.rating.Rating : null,
      publication: book.publications ? book.publications.publication : null,
      publishedAt: book.publications ? book.publications.publishedAt : null,
      author: book.author ? book.author.name : null,
    })),
  };
}





// This action find one book with the help of book's id in the DB.
async findOne(id: number): Promise<Book> {
  console.log(`Looking for book with id: ${id}`);
  const book = await this.bookRepository.findOne({
    where: { id },
    relations: ['rating', 'author', 'publications'], // Ensure correct relation name
  });
  console.log(`Book found: ${book}`);

  if (!book) {
    throw new NotFoundException('Book not found');
  }

  return book;
}


    
   async update(id:number,updateBookDto:UpdateBookDto):Promise<Book>{
      const existingBook = await this.bookRepository.findOne({
        where: { id },
        relations: ['author', 'rating'],
    });
    if (!existingBook) {
      throw new Error(`Book with ID ${id} not found`);
  }

  // Update fields
  existingBook.name = updateBookDto.name;

  // Ensure author and rating are initialized
  if (existingBook.author) {
      existingBook.author.name = updateBookDto.author;
  }

  if (existingBook.rating) {
      existingBook.rating.Rating = updateBookDto.rating;
  }

  // Save the updated book
  return this.bookRepository.save(existingBook);
    }
// This action remove a book with the help of book's id in the DB.
    // remove(id:number){
    //  return this.bookRepository.delete(id);
    // }

    async remove(id: number): Promise<void> {
        const book = await this.bookRepository.findOne({ where: { id }, relations: ['rating','author'] });
        if (book) {
            await this.bookRepository.remove(book); 
        }
    }

}

