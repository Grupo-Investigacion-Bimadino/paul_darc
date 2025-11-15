import { AchievementsService } from './achievements.service';
import { CreateAchievementDto } from './dto/create-achievement.dto';
import { UpdateAchievementDto } from './dto/update-achievement.dto';
export declare class AchievementsController {
    private readonly achievementsService;
    constructor(achievementsService: AchievementsService);
    create(createAchievementDto: CreateAchievementDto): Promise<import("./achievement.interface").Achievement>;
    findAll(): Promise<import("./achievement.interface").Achievement[]>;
    findOne(id: string): Promise<import("./achievement.interface").Achievement>;
    update(id: string, updateAchievementDto: UpdateAchievementDto): Promise<import("./achievement.interface").Achievement>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
