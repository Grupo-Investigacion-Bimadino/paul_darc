import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Region } from './schemas/region.schema';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';

@Injectable()
export class RegionsService {
  constructor(@InjectModel(Region.name) private regionModel: Model<Region>) {}

  create(createRegionDto: CreateRegionDto): Promise<Region> {
    const createdRegion = new this.regionModel(createRegionDto);
    return createdRegion.save();
  }

  findAll(): Promise<Region[]> {
    return this.regionModel.find().exec();
  }

  async findOne(id: string): Promise<Region> {
    const region = await this.regionModel.findById(id).exec();
    if (!region) {
      throw new NotFoundException(`Región con ID ${id} no encontrada`);
    }
    return region;
  }

  async update(id: string, updateRegionDto: UpdateRegionDto): Promise<Region> {
    const updatedRegion = await this.regionModel.findByIdAndUpdate(id, updateRegionDto, { new: true });
    if (!updatedRegion) {
      throw new NotFoundException(`Región con ID ${id} no encontrada`);
    }
    return updatedRegion;
  }

  async remove(id: string): Promise<{ message: string }> {
    const result = await this.regionModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Región con ID ${id} no encontrada`);
    }
    return { message: `Región con ID ${id} eliminada.` };
  }
}