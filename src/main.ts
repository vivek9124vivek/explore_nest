import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NextFunction } from 'express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

let visits=0;
function globalMiddleware(req: Request, res: Response, next: NextFunction){
  
  visits+=1;
  console.log("This is global Middleware. It will execute before every route. " +visits+  " users are visited.")
  next()
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
//swagger builder implements
const config = new DocumentBuilder()
.setTitle('Books example')
.setDescription('The books API description')
.setVersion('1.0')
.addTag('books')
.build();

const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.use(globalMiddleware)
  await app.listen(4000);
}
bootstrap();
