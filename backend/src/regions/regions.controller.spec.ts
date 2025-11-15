import { Test, TestingModule } from '@nestjs/testing';
import { RegionsController } from './regions.controller';
import { RegionsService } from './regions.service';
import { FirebaseService } from '../firebase/firebase.service';

describe('RegionsController', () => {
  let controller: RegionsController;

  const mockFirebaseService = {
    getAdmin: {
      firestore: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RegionsController],
      providers: [
        RegionsService,
        {
          provide: FirebaseService,
          useValue: mockFirebaseService,
        },
      ],
    }).compile();

    controller = module.get<RegionsController>(RegionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
