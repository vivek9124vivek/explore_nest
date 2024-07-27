import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Rating } from "./rating.entity";
import { Author } from "./author.entity";


@Entity()
export class Book{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @OneToOne(() => Rating, rating=>rating.book, { cascade: true, onDelete: 'CASCADE' })
    @JoinColumn()
    rating:Rating;

    @OneToOne(() => Author, author=>author.book, { cascade: true, onDelete: 'CASCADE' })
    @JoinColumn()
    author:Author;
   
}