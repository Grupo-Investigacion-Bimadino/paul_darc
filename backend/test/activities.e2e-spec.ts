import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { RolesGuard } from '../src/auth/roles.guard';
import { AuthGuard } from '@nestjs/passport';

describe('ActivitiesController (e2e)', () => {
  let app: INestApplication;

  // Mock del AuthGuard para simular un usuario autenticado con rol de Alumno
  const mockAuthGuard = {
    canActivate: (context) => {
      const req = context.switchToHttp().getRequest();
      req.user = { role: 'Alumno' }; // Rol de Alumno
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

  it('/activities (POST) - should return 403 for Alumno', () => {
    return request(app.getHttpServer())
      .post('/activities')
      .send({ name: 'Test Activity', description: 'Test Desc' })
      .expect(403); // Esperamos Forbidden
  });

  it('/activities (GET) - should return 403 for Alumno', () => {
    return request(app.getHttpServer())
      .get('/activities')
      .expect(403);
  });

  it('/activities/:id (PATCH) - should return 403 for Alumno', () => {
    return request(app.getHttpServer())
      .patch('/activities/1')
      .send({ name: 'Updated Name' })
      .expect(403);
  });

  it('/activities/:id (DELETE) - should return 403 for Alumno', () => {
    return request(app.getHttpServer())
      .delete('/activities/1')
      .expect(403);
  });

  afterAll(async () => {
    await app.close();
  });
});
