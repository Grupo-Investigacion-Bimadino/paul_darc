import { Test, TestingModule } from '@nestjs/testing';
import { AchievementsService } from './achievements.service';
import { getModelToken } from '@nestjs/mongoose';
import { Achievement } from './schemas/achievement.schema';

describe('AchievementsService', () => {
  let service: AchievementsService;

  const mockAchievementModel = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AchievementsService,
        {
          provide: getModelToken(Achievement.name),
          useValue: mockAchievementModel,
        },
      ],
    }).compile();

    service = module.get<AchievementsService>(AchievementsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
