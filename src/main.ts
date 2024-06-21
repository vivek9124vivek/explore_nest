import { LazyModuleLoader, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NextFunction } from 'express';
import { UserModule } from './user/user.module';

var visits=0;
function globalMiddleware(req: Request, res: Response, next: NextFunction){
  
  visits+=1;
  console.log("This is global Middleware. It will execute before every route. " +visits+  " users are visited.")
  next()
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const lazyModuleLoader = app.get(LazyModuleLoader);
  const abc= await this.lazyModuleLoader.load(()=>
  UserModule
  )
  
  app.use(globalMiddleware)
  await app.listen(3000);
}
bootstrap();
