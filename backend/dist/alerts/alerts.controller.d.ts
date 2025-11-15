import { AlertsService } from './alerts.service';
import { CreateAlertDto } from './dto/create-alert.dto';
import { UpdateAlertDto } from './dto/update-alert.dto';
export declare class AlertsController {
    private readonly alertsService;
    constructor(alertsService: AlertsService);
    create(createAlertDto: CreateAlertDto): Promise<import("./alert.interface").Alert>;
    findAll(): Promise<import("./alert.interface").Alert[]>;
    findOne(id: string): Promise<import("./alert.interface").Alert>;
    update(id: string, updateAlertDto: UpdateAlertDto): Promise<import("./alert.interface").Alert>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
