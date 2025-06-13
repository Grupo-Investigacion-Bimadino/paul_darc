import { Injectable } from '@nestjs/common';
import { CreateProgressDto } from './dto/create-progress.dto';
import { UpdateProgressDto } from './dto/update-progress.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Progress, ProgressDocument } from './schemas/progress.schema';

@Injectable()
export class ProgressService {
 constructor(
 @InjectModel(Progress.name) private progressModel: Model<ProgressDocument>,
  ) {}

  async create(createProgressDto: CreateProgressDto): Promise<Progress> {
    const createdProgress = new this.progressModel(createProgressDto);
 return createdProgress.save(); // Assuming createProgressDto contains id_logro if applicable during creation
  }

  async findAll(): Promise<Progress[]> {
 return this.progressModel.find().exec();
  }

  async findOne(id_progreso: number): Promise<Progress | null> {
 return this.progressModel.findOne({ id_progreso }).exec();
  }

  async update(id_progreso: number, updateProgressDto: UpdateProgressDto): Promise<Progress | null> {
 // Assuming updateProgressDto contains the updated percentage and potentially id_logro
 return this.progressModel.findOneAndUpdate({ id_progreso }, updateProgressDto, { new: true }).exec();
  }

  async remove(id_progreso: number): Promise<any> {
 return this.progressModel.deleteOne({ id_progreso }).exec();
  }
}
