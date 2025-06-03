import { Injectable } from '@nestjs/common';
import { CreateAlertDto } from './dto/create-alert.dto';
import { UpdateAlertDto } from './dto/update-alert.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Alert, AlertDocument } from './schemas/alert.schema';

@Injectable()
export class AlertsService {
  constructor(@InjectModel(Alert.name) private alertModel: Model<AlertDocument>) {}

  async create(createAlertDto: CreateAlertDto): Promise<Alert> {
    const createdAlert = new this.alertModel(createAlertDto);
 return createdAlert.save();
  }

  async findAll(): Promise<Alert[]> {
 return this.alertModel.find().exec();
  }

  async findOne(id: string): Promise<Alert | null> {
 return await this.alertModel.findById(id).exec();
  }

  async update(id: string, updateAlertDto: UpdateAlertDto): Promise<Alert | null> {
 return await this.alertModel.findByIdAndUpdate(id, updateAlertDto, { new: true }).exec();
  }

  async remove(id: string): Promise<any> {
 return await this.alertModel.findByIdAndDelete(id).exec();
  }
}
