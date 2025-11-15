import { ActivitiesService } from './activities.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
export declare class ActivitiesController {
    private readonly activitiesService;
    constructor(activitiesService: ActivitiesService);
    create(createActivityDto: CreateActivityDto): Promise<any>;
    findAll(): Promise<any[]>;
    findOne(id: string): Promise<any>;
    update(id: string, updateActivityDto: UpdateActivityDto): Promise<any>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
