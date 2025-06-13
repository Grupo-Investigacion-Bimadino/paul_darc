import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Question } from './schemas/question.schema';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Injectable()
export class QuestionsService {
  constructor(@InjectModel(Question.name) private questionModel: Model<Question>) {}

  create(createQuestionDto: CreateQuestionDto): Promise<Question> {
    const createdQuestion = new this.questionModel(createQuestionDto);
    return createdQuestion.save();
  }

  // Poblamos las regiones para obtener su información completa
  findAll(): Promise<Question[]> {
    return this.questionModel.find().populate('regiones').exec();
  }

  async findOne(id: string): Promise<Question> {
    const question = await this.questionModel.findById(id).populate('regiones').exec();
    if (!question) {
      throw new NotFoundException(`Pregunta con ID ${id} no encontrada`);
    }
    return question;
  }

  async update(id: string, updateQuestionDto: UpdateQuestionDto): Promise<Question> {
    const updatedQuestion = await this.questionModel.findByIdAndUpdate(id, updateQuestionDto, { new: true });
    if (!updatedQuestion) {
      throw new NotFoundException(`Pregunta con ID ${id} no encontrada`);
    }
    return updatedQuestion;
  }

  async remove(id: string): Promise<{ message: string }> {
    const result = await this.questionModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Pregunta con ID ${id} no encontrada`);
    }
    return { message: `Pregunta con ID ${id} eliminada.` };
  }
}