// backend/src/regions/dto/create-region.dto.ts

import { IsString, IsArray, IsOptional, IsNumber } from 'class-validator';

// Interfaz para el minijuego (debe coincidir con MiniGame del frontend)
class MiniGameDto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsString()
  icon: string;
}

export class CreateRegionDto {
  @IsString()
  id: string; // ID DANE

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  image: string; // Ruta de la imagen

  @IsOptional()
  @IsArray()
  miniGames: MiniGameDto[];
}