// src/main.ts (CORREGIDO)
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Cats example') // Puedes cambiar esto por el título de tu proyecto
    .setDescription('The cats API description') // Y la descripción
    .setVersion('1.0')
    .addTag('cats') // Y los tags
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Línea agregada para que el servidor escuche en el puerto 3000
  await app.listen(3000);
}
bootstrap();