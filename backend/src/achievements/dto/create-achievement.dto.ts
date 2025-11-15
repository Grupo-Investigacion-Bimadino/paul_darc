import { IsString, IsNotEmpty, IsNumber, IsMongoId } from 'class-validator';

export class CreateAchievementDto {
  @IsString()
  @IsNotEmpty()
  readonly nombre: string;

  @IsString()
  @IsNotEmpty()
  readonly descripcion: string;

  @IsNumber()
  @IsNotEmpty()
  readonly nivel: number;

  @IsMongoId() // Valida que sea un ID de MongoDB
  @IsNotEmpty()
  readonly avatar: string;
}
// ¡No hay nada más después de esta llave de cierre!