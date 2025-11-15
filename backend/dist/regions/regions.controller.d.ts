import { RegionsService } from './regions.service';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
export declare class RegionsController {
    private readonly regionsService;
    constructor(regionsService: RegionsService);
    create(createRegionDto: CreateRegionDto): string;
    findAll(): Promise<import("./region.interface").Region[]>;
    findOne(id: string): Promise<import("./region.interface").Region>;
    update(id: string, updateRegionDto: UpdateRegionDto): string;
    remove(id: string): string;
}
