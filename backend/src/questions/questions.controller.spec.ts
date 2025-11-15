import { Test, TestingModule } from '@nestjs/testing';
import { QuestionsController } from './questions.controller';
import { QuestionsService } from './questions.service';
import { getModelToken } from '@nestjs/mongoose';
import { Question } from './schemas/question.schema';

describe('QuestionsController', () => {
  let controller: QuestionsController;

  const mockQuestionModel = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuestionsController],
      providers: [
        QuestionsService,
        {
          provide: getModelToken(Question.name),
          useValue: mockQuestionModel,
        },
      ],
    }).compile();

    controller = module.get<QuestionsController>(QuestionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
