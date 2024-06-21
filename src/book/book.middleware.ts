import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction } from "express";

@Injectable()
export class BookMiddleware implements NestMiddleware{
    use(req: Request, res: Response, next: NextFunction) {
        console.log("This is module based middleware for all Book routes");
        next();

    }
    
    
}