import { CreateBookDto } from "./create-book.dto";

export class UpdateBookDto extends CreateBookDto {
    constructor(id: number, name: string, author: string,rating:number,publication:string,image:string) {
        super( name, author,rating,publication,image);
    }

    
}

