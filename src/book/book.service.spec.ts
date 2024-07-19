import { Test, TestingModule } from '@nestjs/testing';
import { BookService } from './book.service';
import { Book } from './entities/book.entity';
import { Rating } from './entities/rating.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';

describe('BookService', () => {
  let service: BookService;
  let bookRepository: Repository<Book>;
  let ratingRepository: Repository<Rating>;

  const mockQueryBuilder = {
    select: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    getMany: jest.fn().mockResolvedValue([
      { id: 1, name: 'Book 1' },
      { id: 2, name: 'Book 2' },
    ]),
  };

  const mockBookRepository = {
    create: jest.fn().mockImplementation(dto => dto),
    save: jest.fn().mockImplementation(book => Promise.resolve({ id: Date.now(), ...book })),
    findAll: jest.fn().mockImplementation(async () => [{ id: 1, name: 'Book 1' }]),
    findOne: jest.fn().mockImplementation(async (id: number) => ({ id:999,
        name:"Krish",
      
        Rating:{
            Rating:10,
            id:5
        } })),
    delete: jest.fn(),
    createQueryBuilder: jest.fn(() => mockQueryBuilder as unknown as SelectQueryBuilder<Book>),
  };

  const mockRatingRepository = {
    save: jest.fn().mockImplementation(async (rating) => Promise.resolve({ id: Date.now(), ...rating })),
    findOne: jest.fn().mockImplementation(async (id: number) => ({ id, score: 5 })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookService,
        {
          provide: getRepositoryToken(Book),
          useValue: mockBookRepository,
        },
        {
          provide: getRepositoryToken(Rating),
          useValue: mockRatingRepository,
        },
      ],
    }).compile();

    service = module.get<BookService>(BookService);
    bookRepository = module.get<Repository<Book>>(getRepositoryToken(Book));
    ratingRepository = module.get<Repository<Rating>>(getRepositoryToken(Rating));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

 
  it('should create a new book and return that', async () => {
    const createBookDto = { id: 5, name: 'Krish', rating: 10 };
  
    const result = await service.create(createBookDto);
  
    expect(result).toEqual(expect.objectContaining({
      id: expect.any(Number),
      name: 'Krish',
      rating: expect.objectContaining({
        id: expect.any(Number),
        Rating: 10,
      }),
    }));
  
    expect(mockBookRepository.save).toHaveBeenCalled();
    expect(mockRatingRepository.save).toHaveBeenCalled();
  });
  
  

 
    it('should return all books', async () => {
      
        const expectedBooks = [
            { id: 1, name: 'Book 1' },
            { id: 2, name: 'Book 2' },
          ];
      
          const result = await service.findAll();
      
          expect(result).toEqual(expectedBooks);
          expect(mockBookRepository.createQueryBuilder).toHaveBeenCalled();
          expect(mockQueryBuilder.select).toHaveBeenCalledWith(['book.id', 'book.name']);
          expect(mockQueryBuilder.getMany).toHaveBeenCalled();
   

     
    });
  

 
    it('should return a single book', async () => {
      expect(await service.findOne(999)).toEqual({
        id:999,
        name:"Krish",
        
        Rating:{
            Rating:10,
            id:5
        }
      })
    });
 

 

  
});
