import { IsNotEmpty, IsNumber, IsString, Max } from "class-validator";

export class CreateBookDto {
    
   
  
    @IsNotEmpty({ message: 'Name is required' })
    @IsString({ message: 'Name must be a string' })
    name: string;
  
    @IsNotEmpty({ message: 'Author is required' })
    @IsString({ message: 'Author must be a string' })
    author: string;
  
    @IsNotEmpty({ message: 'Rating is required' })
    @IsNumber({}, { message: 'Rating must be a number' })
    @Max(5, { message: 'Rating must be less than or equal to 5' })
    rating: number;
  
    @IsNotEmpty({ message: 'Publication is required' })
    @IsString({ message: 'Publication must be a string' })
    publication: string;
  
    @IsNotEmpty({ message: 'Image is required' })
    @IsString({ message: 'Image must be a string' })
    image: string;

    constructor( name: string, author: string, rating: number,publcation:string,image:string) {
      
        this.name = name;
        this.author = author;
        this.rating = rating;
        this.publication = publcation;
        this.image = image;
    }
}