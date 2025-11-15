import { Test, TestingModule } from '@nestjs/testing';
import { AlertsController } from './alerts.controller';
import { AlertsService } from './alerts.service';
import { getModelToken } from '@nestjs/mongoose';
import { Alert } from './schemas/alert.schema';

describe('AlertsController', () => {
  let controller: AlertsController;

  const mockAlertModel = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AlertsController],
      providers: [
        AlertsService,
        {
          provide: getModelToken(Alert.name),
          useValue: mockAlertModel,
        },
      ],
    }).compile();

    controller = module.get<AlertsController>(AlertsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
