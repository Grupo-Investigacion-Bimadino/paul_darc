import { Test, TestingModule } from '@nestjs/testing';
import { AlertsService } from './alerts.service';
import { getModelToken } from '@nestjs/mongoose';
import { Alert } from './schemas/alert.schema';

describe('AlertsService', () => {
  let service: AlertsService;

  const mockAlertModel = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AlertsService,
        {
          provide: getModelToken(Alert.name),
          useValue: mockAlertModel,
        },
      ],
    }).compile();

    service = module.get<AlertsService>(AlertsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
