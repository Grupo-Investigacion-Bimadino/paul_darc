import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Achievement } from './schemas/achievement.schema';
import { CreateAchievementDto } from './dto/create-achievement.dto';
import { UpdateAchievementDto } from './dto/update-achievement.dto';

@Injectable()
export class AchievementsService {
  constructor(@InjectModel(Achievement.name) private achievementModel: Model<Achievement>) {}

  create(createAchievementDto: CreateAchievementDto): Promise<Achievement> {
    const createdAchievement = new this.achievementModel(createAchievementDto);
    return createdAchievement.save();
  }

  findAll(): Promise<Achievement[]> {
    return this.achievementModel.find().populate('avatar').exec();
  }

  async findOne(id: string): Promise<Achievement> {
    const achievement = await this.achievementModel.findById(id).populate('avatar').exec();
    if (!achievement) {
      throw new NotFoundException(`Logro con ID ${id} no encontrado`);
    }
    return achievement;
  }

  async update(id: string, updateAchievementDto: UpdateAchievementDto): Promise<Achievement> {
    const updatedAchievement = await this.achievementModel.findByIdAndUpdate(id, updateAchievementDto, { new: true });
    if (!updatedAchievement) {
      throw new NotFoundException(`Logro con ID ${id} no encontrado`);
    }
    return updatedAchievement;
  }

  async remove(id: string): Promise<{ message: string }> {
    const result = await this.achievementModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Logro con ID ${id} no encontrado`);
    }
    return { message: `Logro con ID ${id} eliminado.` };
  }
}