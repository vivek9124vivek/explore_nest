import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { Request } from "express";
@Injectable()
export class BookInterceptor implements NestInterceptor{
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any>{
        const ctx = context.switchToHttp();
        const request = ctx.getRequest<Request>();

        // Log request details
        console.log(`Incoming request: ${request.method} ${request.url}`);
        console.log(`Request body: ${JSON.stringify(request.body)}`);

        // Modify request body
        if (!request.body.name) {
            request.body.name = 'Default Book Name';
        }

        if (!request.body.author) {
            request.body.author = 'Default Author Name';
        }

        // Continue to the next handler
        return next.handle();
    
    }
    
}