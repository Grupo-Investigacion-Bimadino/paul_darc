import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Alert } from './schemas/alert.schema';
import { CreateAlertDto } from './dto/create-alert.dto';
import { UpdateAlertDto } from './dto/update-alert.dto';

@Injectable()
export class AlertsService {
  constructor(@InjectModel(Alert.name) private alertModel: Model<Alert>) {}

  create(createAlertDto: CreateAlertDto): Promise<Alert> {
    const createdAlert = new this.alertModel(createAlertDto);
    return createdAlert.save();
  }

  // Usamos populate para traer la información de la región, no solo su ID
  findAll(): Promise<Alert[]> {
    return this.alertModel.find().populate('region').exec();
  }

  async findOne(id: string): Promise<Alert> {
    const alert = await this.alertModel.findById(id).populate('region').exec();
    if (!alert) {
      throw new NotFoundException(`Alerta con ID ${id} no encontrada`);
    }
    return alert;
  }

  async update(id: string, updateAlertDto: UpdateAlertDto): Promise<Alert> {
    const updatedAlert = await this.alertModel.findByIdAndUpdate(id, updateAlertDto, { new: true });
    if (!updatedAlert) {
      throw new NotFoundException(`Alerta con ID ${id} no encontrada`);
    }
    return updatedAlert;
  }

  async remove(id: string): Promise<{ message: string }> {
    const result = await this.alertModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Alerta con ID ${id} no encontrada`);
    }
    return { message: `Alerta con ID ${id} eliminada.` };
  }
}