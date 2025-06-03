import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose'; // Importar Types
import { CreateAchievementDto } from './dto/create-achievement.dto';
import { UpdateAchievementDto } from './dto/update-achievement.dto';
import { Achievement, AchievementDocument } from './schemas/achievement.schema';
import { Avatar } from 'src/avatars/schemas/avatar.schema'; // Importar Avatar si se usa en el servicio

@Injectable()
export class AchievementsService {
  constructor(@InjectModel(Achievement.name) private achievementModel: Model<AchievementDocument>) {}

  async create(createAchievementDto: CreateAchievementDto): Promise<Achievement> {
    const createdAchievement = new this.achievementModel(createAchievementDto);
    return createdAchievement.save();
  }

  async findAll(): Promise<Achievement[]> {
    return this.achievementModel.find().exec();
  }

  async findOne(id: string): Promise<Achievement | null> {
    return await this.achievementModel.findById(id).exec();
  }

  async update(id: string, updateAchievementDto: UpdateAchievementDto): Promise<Achievement | null> {
    return await this.achievementModel.findByIdAndUpdate(id, updateAchievementDto, { new: true }).exec();
  }

  async remove(id: string): Promise<any> {
    return await this.achievementModel.findByIdAndDelete(id).exec();
  }
}
