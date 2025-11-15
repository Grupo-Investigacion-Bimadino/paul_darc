import { Test, TestingModule } from '@nestjs/testing';
import { RegionsService } from './regions.service';
import { FirebaseService } from '../firebase/firebase.service';

describe('RegionsService', () => {
  let service: RegionsService;

  const mockFirebaseService = {
    getAdmin: {
      firestore: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RegionsService,
        {
          provide: FirebaseService,
          useValue: mockFirebaseService,
        },
      ],
    }).compile();

    service = module.get<RegionsService>(RegionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
