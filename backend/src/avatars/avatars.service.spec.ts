import { Test, TestingModule } from '@nestjs/testing';
import { AvatarsService } from './avatars.service';
import { getModelToken } from '@nestjs/mongoose';
import { Avatar } from './schemas/avatar.schema';

describe('AvatarsService', () => {
  let service: AvatarsService;

  const mockAvatarModel = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AvatarsService,
        {
          provide: getModelToken(Avatar.name),
          useValue: mockAvatarModel,
        },
      ],
    }).compile();

    service = module.get<AvatarsService>(AvatarsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
