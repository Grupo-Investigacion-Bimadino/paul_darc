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
 return createdProgress.save();
  }

  async findAll(): Promise<Progress[]> {
 return this.progressModel.find().exec();
  }

  async findOne(id: string): Promise<Progress | null> {
 return this.progressModel.findById(id).exec();
  }

  async update(id: string, updateProgressDto: UpdateProgressDto): Promise<Progress | null> {
 return this.progressModel.findByIdAndUpdate(id, updateProgressDto, { new: true }).exec();
  }

  async remove(id: string): Promise<any> {
 return this.progressModel.deleteOne({ _id: id }).exec();
  }
}
