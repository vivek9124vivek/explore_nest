
export class CreateBookDto {
    id: number;
    name: string;
    author: string;
    rating: number;

    constructor(id: number, name: string, author: string, rating: number) {
        this.id = id;
        this.name = name;
        this.author = author;
        this.rating= rating;
    }
}