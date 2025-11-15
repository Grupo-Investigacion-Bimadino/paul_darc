import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as functions from 'firebase-functions';
import * as express from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';

const server = express();

export const createNestServer = async (expressInstance) => {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressInstance),
  );
  // Habilitar CORS para peticiones desde el frontend
  // Durante el desarrollo local, 'origin: true' permite cualquier origen.
  // Para producción, se recomienda especificar orígenes permitidos.
  app.enableCors({
    origin: true, // Permite cualquier origen (para desarrollo local)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  return app.init();
};

createNestServer(server)
  .then(v => console.log('Nest Ready'))
  .catch(err => console.error('Nest broken', err));

export const api = functions.https.onRequest(server);
