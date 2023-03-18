import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';  //追記 dto validaton
 
const main = async () => {
	const app = await NestFactory.create(AppModule);
	app.useGlobalPipes(new ValidationPipe()); //追記 dto validaton
	app.setGlobalPrefix('api');
  	await app.listen(3100);
}

main();
