import { CreateAchievementDto } from './dto/create-achievement.dto';
import { UpdateAchievementDto } from './dto/update-achievement.dto';
import { Achievement } from './achievement.interface';
export declare class AchievementsService {
    create(createAchievementDto: CreateAchievementDto): Promise<Achievement>;
    findAll(): Promise<Achievement[]>;
    findOne(id: string): Promise<Achievement>;
    update(id: string, updateAchievementDto: UpdateAchievementDto): Promise<Achievement>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
