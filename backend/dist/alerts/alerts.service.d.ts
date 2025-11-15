import { CreateAlertDto } from './dto/create-alert.dto';
import { UpdateAlertDto } from './dto/update-alert.dto';
import { Alert } from './alert.interface';
export declare class AlertsService {
    create(createAlertDto: CreateAlertDto): Promise<Alert>;
    findAll(): Promise<Alert[]>;
    findOne(id: string): Promise<Alert>;
    update(id: string, updateAlertDto: UpdateAlertDto): Promise<Alert>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
