import { Test, TestingModule } from '@nestjs/testing';
import { ProgressController } from './progress.controller';
import { ProgressService } from './progress.service';
import { FirebaseService } from '../firebase/firebase.service';
import { ActivitiesService } from '../activities/activities.service';

describe('ProgressController', () => {
  let controller: ProgressController;

  const mockFirebaseService = {
    getAdmin: {
      firestore: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProgressController],
      providers: [
        ProgressService,
        {
          provide: FirebaseService,
          useValue: mockFirebaseService,
        },
        {
          provide: ActivitiesService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<ProgressController>(ProgressController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
