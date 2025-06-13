import { IsString, IsNotEmpty, IsNumber, IsUrl, IsOptional } from 'class-validator';

export class CreateAvatarDto {
  @IsString()
  @IsNotEmpty()
  readonly nombre: string;

  @IsUrl({}, { message: 'La ruta de la imagen debe ser una URL válida.' })
  @IsNotEmpty()
  readonly ruta_imagen: string;

  @IsNumber()
  @IsNotEmpty()
  readonly nivel_desbloqueo: number;

  @IsString()
  @IsOptional()
  readonly color_asociado?: string;
}