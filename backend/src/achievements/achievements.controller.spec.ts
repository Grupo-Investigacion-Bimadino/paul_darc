import { Test, TestingModule } from '@nestjs/testing';
import { AchievementsController } from './achievements.controller';
import { AchievementsService } from './achievements.service';
import { getModelToken } from '@nestjs/mongoose';
import { Achievement } from './schemas/achievement.schema';

describe('AchievementsController', () => {
  let controller: AchievementsController;

  const mockAchievementModel = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AchievementsController],
      providers: [
        AchievementsService,
        {
          provide: getModelToken(Achievement.name),
          useValue: mockAchievementModel,
        },
      ],
    }).compile();

    controller = module.get<AchievementsController>(AchievementsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
