import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

describe('RegionsController (e2e)', () => {
  let app: INestApplication;

  // Mock del AuthGuard para simular un usuario autenticado con rol de Administrador
  const mockAuthGuard = {
    canActivate: (context) => {
      const req = context.switchToHttp().getRequest();
      req.user = { role: 'Administrador' }; // Rol de Administrador
      return true;
    },
  };

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    })
    .overrideGuard(AuthGuard('jwt'))
    .useValue(mockAuthGuard) // Usamos el mock
    .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  // NOTA: Estas pruebas asumen que tienes datos en la BD o mocks para que no fallen en 404.
  // Por simplicidad, aquí solo comprobaremos que no devuelven un 403 (Forbidden).

  it('/regions (POST) - should not return 403 for Administrador', () => {
    return request(app.getHttpServer())
      .post('/regions')
      .send({ name: 'Test Region' })
      .then(res => {
        expect(res.statusCode).not.toBe(403);
      });
  });

  it('/regions (GET) - should not return 403 for Administrador', () => {
    return request(app.getHttpServer())
      .get('/regions')
      .then(res => {
        expect(res.statusCode).not.toBe(403);
      });
  });

  it('/regions/:id (PATCH) - should not return 403 for Administrador', () => {
    return request(app.getHttpServer())
      .patch('/regions/1')
      .send({ name: 'Updated Name' })
      .then(res => {
        expect(res.statusCode).not.toBe(403);
      });
  });

  it('/regions/:id (DELETE) - should not return 403 for Administrador', () => {
    return request(app.getHttpServer())
      .delete('/regions/1')
      .then(res => {
        expect(res.statusCode).not.toBe(403);
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
