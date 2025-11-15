import { Test, TestingModule } from '@nestjs/testing';
import { ProgressService } from './progress.service';
import { getModelToken } from '@nestjs/mongoose';
import { Progress } from './schemas/progress.schema';
import { User } from '../users/schemas/users.schema';
import { Model } from 'mongoose';
import { FirebaseService } from '../firebase/firebase.service';
import { ActivitiesService } from '../activities/activities.service';

describe('ProgressService', () => {
  let service: ProgressService;
  let progressModel: Model<Progress>;

  const mockProgressModel = {
    findOne: jest.fn(),
    create: jest.fn(),
    findByIdAndUpdate: jest.fn(),
  };

  const mockActivityModel = {
    findById: jest.fn(),
  };

  const mockUserModel = {};

  const mockFirebaseService = {
    getAdmin: {
      firestore: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProgressService,
        {
          provide: getModelToken(Progress.name),
          useValue: mockProgressModel,
        },
        {
          provide: getModelToken(User.name),
          useValue: mockUserModel,
        },
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

    service = module.get<ProgressService>(ProgressService);
    progressModel = module.get<Model<Progress>>(getModelToken(Progress.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
