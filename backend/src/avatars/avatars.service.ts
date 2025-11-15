import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAvatarDto } from './dto/create-avatar.dto';
import { UpdateAvatarDto } from './dto/update-avatar.dto';
import { Avatar } from './avatar.interface';

@Injectable()
export class AvatarsService {
  // constructor(@InjectModel(Avatar.name) private avatarModel: Model<Avatar>) {}

  create(createAvatarDto: CreateAvatarDto): Promise<Avatar> {
    // const createdAvatar = new this.avatarModel(createAvatarDto);
    // return createdAvatar.save();
    throw new Error("Method not implemented.");
  }

  findAll(): Promise<Avatar[]> {
    // return this.avatarModel.find().exec();
    throw new Error("Method not implemented.");
  }

  async findOne(id: string): Promise<Avatar> {
    // const avatar = await this.avatarModel.findById(id).exec();
    // if (!avatar) {
    //   throw new NotFoundException(`Avatar con ID ${id} no encontrado`);
    // }
    // return avatar;
    throw new Error("Method not implemented.");
  }

  async update(id: string, updateAvatarDto: UpdateAvatarDto): Promise<Avatar> {
    // const updatedAvatar = await this.avatarModel.findByIdAndUpdate(id, updateAvatarDto, { new: true });
    // if (!updatedAvatar) {
    //   throw new NotFoundException(`Avatar con ID ${id} no encontrado`);
    // }
    // return updatedAvatar;
    throw new Error("Method not implemented.");
  }

  async remove(id: string): Promise<{ message: string }> {
    // const result = await this.avatarModel.deleteOne({ _id: id }).exec();
    // if (result.deletedCount === 0) {
    //   throw new NotFoundException(`Avatar con ID ${id} no encontrado`);
    // }
    // return { message: `Avatar con ID ${id} eliminado.` };
    throw new Error("Method not implemented.");
  }
}