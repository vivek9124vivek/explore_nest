import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Book } from "./book.entity";

@Entity()
export class Rating{
    
    @PrimaryGeneratedColumn()
    Rating_ID:number;

    @Column()
    Rating:number;

    @OneToOne(() => Book, (book) => book.rating)
    book: Book;

}