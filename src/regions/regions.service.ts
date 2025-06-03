import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Region, RegionDocument } from './schemas/region.schema';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';

@Injectable()
export class RegionsService {
  constructor(@InjectModel(Region.name) private regionModel: Model<RegionDocument>) {}

  async create(createRegionDto: CreateRegionDto): Promise<Region> {
    const createdRegion = new this.regionModel(createRegionDto);
    return createdRegion.save();
  }

  async findAll(): Promise<Region[]> {
    return this.regionModel.find().exec();
  }

  async findOne(id: string): Promise<Region | null> {
    return await this.regionModel.findById(id).exec();
  }

  async update(id: string, updateRegionDto: UpdateRegionDto): Promise<Region | null> {
    return await this.regionModel.findByIdAndUpdate(id, updateRegionDto, { new: true }).exec();
  }

  async remove(id: string): Promise<any> {
    return await this.regionModel.findByIdAndDelete(id).exec();
  }
}
