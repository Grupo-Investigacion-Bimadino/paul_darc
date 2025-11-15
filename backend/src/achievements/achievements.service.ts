import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAchievementDto } from './dto/create-achievement.dto';
import { UpdateAchievementDto } from './dto/update-achievement.dto';
import { Achievement } from './achievement.interface';

@Injectable()
export class AchievementsService {
  // constructor(@InjectModel(Achievement.name) private achievementModel: Model<Achievement>) {}

  create(createAchievementDto: CreateAchievementDto): Promise<Achievement> {
    // const createdAchievement = new this.achievementModel(createAchievementDto);
    // return createdAchievement.save();
    throw new Error("Method not implemented.");
  }

  findAll(): Promise<Achievement[]> {
    // return this.achievementModel.find().populate('avatar').exec();
    throw new Error("Method not implemented.");
  }

  async findOne(id: string): Promise<Achievement> {
    // const achievement = await this.achievementModel.findById(id).populate('avatar').exec();
    // if (!achievement) {
    //   throw new NotFoundException(`Logro con ID ${id} no encontrado`);
    // }
    // return achievement;
    throw new Error("Method not implemented.");
  }

  async update(id: string, updateAchievementDto: UpdateAchievementDto): Promise<Achievement> {
    // const updatedAchievement = await this.achievementModel.findByIdAndUpdate(id, updateAchievementDto, { new: true });
    // if (!updatedAchievement) {
    //   throw new NotFoundException(`Logro con ID ${id} no encontrado`);
    // }
    // return updatedAchievement;
    throw new Error("Method not implemented.");
  }

  async remove(id: string): Promise<{ message: string }> {
    // const result = await this.achievementModel.deleteOne({ _id: id }).exec();
    // if (result.deletedCount === 0) {
    //   throw new NotFoundException(`Logro con ID ${id} no encontrado`);
    // }
    // return { message: `Logro con ID ${id} eliminado.` };
    throw new Error("Method not implemented.");
  }
}