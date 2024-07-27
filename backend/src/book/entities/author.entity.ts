import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from 'typeorm';
import { Book } from './book.entity';


@Entity()
export class Author {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
   
    @OneToMany(()=>Book,(book)=>book.author)
    book:Book


}
