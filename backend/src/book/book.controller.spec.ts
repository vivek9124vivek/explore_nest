import { Test, TestingModule } from "@nestjs/testing";
import { BookController } from "./book.controller"
import { BookService } from "./book.service";
import { get } from "http";

describe('BookController', () => {
    let controller: BookController;

    const mockService = {
      create: jest.fn(dto =>{
        return{
          id:Date.now(),
          ...dto
        }
      }),
      update: jest.fn((id,dto)=>({
        id,
        ...dto
      })),
       findAll: jest.fn(()=>{
        return{
          
            id: 1,
            name: 'Book 1',
            rating: 5,
          
        }
       }),
       findOne: jest.fn(()=>{
        return{
          id:1,
          name:'Book 1',
          rating: 5,
        }
       }),

       remove: jest.fn(id => ({
        affected: 1,  
      })),
    };
  
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        controllers: [BookController],
        providers: [BookService],
      }).overrideProvider(BookService).useValue(mockService)
      .compile();
  
      controller = module.get<BookController>(BookController);
    });
  
    it('should be defined', () => {
      expect(controller).toBeDefined();
    });
  it('it should create a book',()=>{
    expect(controller.create({id:999,name:"Krish",rating:10})).toEqual({
      id:999,
      name:"Krish",
      rating:10

    })
  });
  it('should update a book',()=>{
    const updateBookDto = { id:999,name: 'Krishna', rating: 10 };
    expect(controller.update('999',updateBookDto)).toEqual({
      id: 999,
      name: 'Krishna',
      rating: 10,
    })
  })

  it('it should return all the books',()=>{
    expect(controller.findAll()).toEqual({
      id: 1,
      name: 'Book 1',
      rating: 5,
    

    })
  })
  it('should return a single book', async () => {
    const result = await controller.findOne(1);
    
    expect(result).toEqual({
      id: 1,
      name: 'Book 1',
      rating: 5,
    });
   
  });

  it('should delete a book', async () => {
    const result = await controller.remove('1'); // Pass string ID
      
    expect(result).toEqual({ affected: 1 });
    
  });

  
    
  });