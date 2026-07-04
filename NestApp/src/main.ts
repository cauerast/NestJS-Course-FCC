import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';


async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  //app.useLogger(app.get(MyLoggerService)); // use logger globaly
  app.enableCors(); // to open the api 
  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
