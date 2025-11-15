import { IsString, IsNotEmpty, IsUrl, IsOptional } from 'class-validator';

export class CreateRegionDto {
  @IsString()
  @IsNotEmpty()
  readonly nombre: string;

  @IsUrl({}, { message: 'La ruta de la imagen debe ser una URL válida.' })
  @IsOptional()
  readonly ruta_imagen?: string;

  @IsUrl({}, { message: 'La ruta del sonido debe ser una URL válida.' })
  @IsOptional()
  readonly ruta_sonido?: string;

  @IsUrl({}, { message: 'La ruta del video debe ser una URL válida.' })
  @IsOptional()
  readonly ruta_video?: string;
}