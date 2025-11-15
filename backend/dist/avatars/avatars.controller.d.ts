import { AvatarsService } from './avatars.service';
import { CreateAvatarDto } from './dto/create-avatar.dto';
import { UpdateAvatarDto } from './dto/update-avatar.dto';
export declare class AvatarsController {
    private readonly avatarsService;
    constructor(avatarsService: AvatarsService);
    create(createAvatarDto: CreateAvatarDto): Promise<import("./avatar.interface").Avatar>;
    findAll(): Promise<import("./avatar.interface").Avatar[]>;
    findOne(id: string): Promise<import("./avatar.interface").Avatar>;
    update(id: string, updateAvatarDto: UpdateAvatarDto): Promise<import("./avatar.interface").Avatar>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
