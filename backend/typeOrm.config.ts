import { Book } from "src/book/entities/book.entity";
import { Rating } from "src/book/entities/rating.entity";
import { DataSource } from "typeorm";


export default new DataSource({
  type: 'postgres',
  host: "localhost",
  username: "vivek_kumar",
  password: "Vv#18067036",
  database: "learningDB",
  port: 5433,
  migrationsTableName:"Migration_Table",
  migrations: ["migrations/*.ts"],
  entities:["./src.entities/*.ts"],
  
  
})

