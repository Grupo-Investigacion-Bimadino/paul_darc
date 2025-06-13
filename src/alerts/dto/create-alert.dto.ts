import { IsString, IsNotEmpty, IsOptional, IsMongoId } from 'class-validator';

export class CreateAlertDto {
  @IsString()
  @IsNotEmpty()
  readonly mensaje: string;

  @IsString()
  @IsOptional() // El sonido no es obligatorio
  readonly ruta_sonido?: string;

  @IsMongoId() // Validamos que el ID de la región sea un ObjectId válido
  @IsNotEmpty()
  readonly region: string;
}