// backend/src/users/dto/update-user.dto.ts

import { IsString, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  role?: string; // Solo permitiremos actualizar el rol por ahora
  
  @IsOptional()
  @IsString()
  displayName?: string; 
}