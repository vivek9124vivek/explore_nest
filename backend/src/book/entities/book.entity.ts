import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Rating } from "./rating.entity";
import { Author } from "./author.entity";
import { Publication } from "./publication.entity";


@Entity()
export class Book{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column({ type: 'varchar', length: 255, default: 'default_image_url' })
image: string;

    @OneToOne(() => Rating, rating=>rating.book, { cascade: true, onDelete: 'CASCADE' })
    @JoinColumn()
    rating:Rating;

    @OneToOne(() => Author, author=>author.book, { cascade: true, onDelete: 'CASCADE' })
    @JoinColumn()
    author:Author;

    @ManyToOne(() => Publication, publication => publication.books, { cascade: true, nullable: true })
  publications: Publication;
}