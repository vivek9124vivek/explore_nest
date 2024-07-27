import { createParamDecorator, ExecutionContext} from '@nestjs/common';
import { Request } from 'express';
export const Book = createParamDecorator(
  (data: string, executionContext: ExecutionContext) => {
    const ctx = executionContext.switchToHttp()
    const request = ctx.getRequest<Request>();

    return request.body ? request.body?.[data]: request.body;
  },
);