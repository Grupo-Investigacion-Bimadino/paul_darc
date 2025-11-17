// backend/src/regions/dto/update-region.dto.ts

import { PartialType } from '@nestjs/mapped-types';
import { CreateRegionDto } from './create-region.dto';

// Permite que todos los campos de CreateRegionDto sean opcionales para la actualización
export class UpdateRegionDto extends PartialType(CreateRegionDto) {}