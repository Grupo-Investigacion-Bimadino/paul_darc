import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlertDto } from './dto/create-alert.dto';
import { UpdateAlertDto } from './dto/update-alert.dto';
import { Alert } from './alert.interface';

@Injectable()
export class AlertsService {
  // constructor(@InjectModel(Alert.name) private alertModel: Model<Alert>) {}

  create(createAlertDto: CreateAlertDto): Promise<Alert> {
    // const createdAlert = new this.alertModel(createAlertDto);
    // return createdAlert.save();
    throw new Error("Method not implemented.");
  }

  // Usamos populate para traer la información de la región, no solo su ID
  findAll(): Promise<Alert[]> {
    // return this.alertModel.find().populate('region').exec();
    throw new Error("Method not implemented.");
  }

  async findOne(id: string): Promise<Alert> {
    // const alert = await this.alertModel.findById(id).populate('region').exec();
    // if (!alert) {
    //   throw new NotFoundException(`Alerta con ID ${id} no encontrada`);
    // }
    // return alert;
    throw new Error("Method not implemented.");
  }

  async update(id: string, updateAlertDto: UpdateAlertDto): Promise<Alert> {
    // const updatedAlert = await this.alertModel.findByIdAndUpdate(id, updateAlertDto, { new: true });
    // if (!updatedAlert) {
    //   throw new NotFoundException(`Alerta con ID ${id} no encontrada`);
    // }
    // return updatedAlert;
    throw new Error("Method not implemented.");
  }

  async remove(id: string): Promise<{ message: string }> {
    // const result = await this.alertModel.deleteOne({ _id: id }).exec();
    // if (result.deletedCount === 0) {
    //   throw new NotFoundException(`Alerta con ID ${id} no encontrada`);
    // }
    // return { message: `Alerta con ID ${id} eliminada.` };
    throw new Error("Method not implemented.");
  }
}