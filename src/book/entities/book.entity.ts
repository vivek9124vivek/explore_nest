import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Rating } from "./rating.entity";


@Entity()
export class Book{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @OneToOne(() => Rating, rating=>rating.book, {onDelete: 'CASCADE' })
    @JoinColumn()
    rating:Rating;
   
}