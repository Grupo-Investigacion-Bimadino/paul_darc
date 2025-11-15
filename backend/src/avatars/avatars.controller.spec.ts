import { Test, TestingModule } from '@nestjs/testing';
import { AvatarsController } from './avatars.controller';
import { AvatarsService } from './avatars.service';
import { getModelToken } from '@nestjs/mongoose';
import { Avatar } from './schemas/avatar.schema';

describe('AvatarsController', () => {
  let controller: AvatarsController;

  const mockAvatarModel = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AvatarsController],
      providers: [
        AvatarsService,
        {
          provide: getModelToken(Avatar.name),
          useValue: mockAvatarModel,
        },
      ],
    }).compile();

    controller = module.get<AvatarsController>(AvatarsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
