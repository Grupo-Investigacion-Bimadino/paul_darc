import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Question, QuestionDocument } from './schemas/question.schema';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Injectable()
export class QuestionsService {
  constructor(@InjectModel(Question.name) private questionModel: Model<QuestionDocument>) {}

  async create(createQuestionDto: CreateQuestionDto): Promise<Question> {
    const createdQuestion = new this.questionModel(createQuestionDto);
    return createdQuestion.save();
  }

  async findAll(): Promise<Question[]> {
    return this.questionModel.find().exec();
  }

  async findOne(id: string): Promise<Question | null> {
    return await this.questionModel.findById(id).exec();
  }

  async update(id: string, updateQuestionDto: UpdateQuestionDto): Promise<Question | null> {
    return await this.questionModel.findByIdAndUpdate(id, updateQuestionDto, { new: true }).exec();
  }

  async remove(id: string): Promise<any> {
    return await this.questionModel.findByIdAndDelete(id).exec();
  }
}
