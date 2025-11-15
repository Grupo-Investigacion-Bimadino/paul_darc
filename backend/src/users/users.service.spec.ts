import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { FirebaseService } from '../firebase/firebase.service';
import { getModelToken } from '@nestjs/mongoose';
import { User } from './schemas/users.schema';

describe('UsersService', () => {
  let service: UsersService;

  const mockFirebaseService = {
    getAdmin: {
      auth: () => ({
        getUser: jest.fn(),
      }),
      firestore: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: FirebaseService,
          useValue: mockFirebaseService,
        },
        {
          provide: getModelToken(User.name),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
