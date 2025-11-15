import { CreateAvatarDto } from './dto/create-avatar.dto';
import { UpdateAvatarDto } from './dto/update-avatar.dto';
import { Avatar } from './avatar.interface';
export declare class AvatarsService {
    create(createAvatarDto: CreateAvatarDto): Promise<Avatar>;
    findAll(): Promise<Avatar[]>;
    findOne(id: string): Promise<Avatar>;
    update(id: string, updateAvatarDto: UpdateAvatarDto): Promise<Avatar>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
