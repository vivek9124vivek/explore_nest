import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Request } from "express";

@Injectable()
export class BookGuard implements CanActivate{

    public key: string = "ABCDEFGH";
    canActivate(context: ExecutionContext): boolean {
        const ctx = context.switchToHttp();
        const request = ctx.getRequest<Request>();
        if(request.header("key")=== undefined) return false;

        return request.header("key")===this.key;
    }
    
}