import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Avatar, AvatarDocument } from './schemas/avatar.schema';
import { CreateAvatarDto } from './dto/create-avatar.dto';
import { UpdateAvatarDto } from './dto/update-avatar.dto';

@Injectable()
export class AvatarsService {
  constructor(@InjectModel(Avatar.name) private avatarModel: Model<AvatarDocument>) {}

  async create(createAvatarDto: CreateAvatarDto): Promise<Avatar> {
    const createdAvatar = new this.avatarModel(createAvatarDto);
    return createdAvatar.save();
  }

  async findAll(): Promise<Avatar[]> {
    return this.avatarModel.find().exec();
  }

  async findOne(id: string): Promise<Avatar | null> {
    return await this.avatarModel.findById(id).exec();
  }

  async update(id: string, updateAvatarDto: UpdateAvatarDto): Promise<Avatar | null> {
    return await this.avatarModel.findByIdAndUpdate(id, updateAvatarDto, { new: true }).exec();
  }

  async remove(id: string): Promise<any> {
    return await this.avatarModel.findByIdAndDelete(id).exec();
  }
}
