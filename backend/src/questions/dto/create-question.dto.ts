import { IsString, IsNotEmpty, IsMongoId, IsArray, ArrayMinSize } from 'class-validator';

export class CreateQuestionDto {
  @IsString()
  @IsNotEmpty()
  readonly descripcion: string;

  @IsString()
  @IsNotEmpty()
  readonly tipo_interaccion: string;

  @IsString()
  @IsNotEmpty()
  readonly respuesta_correcta: string;

  @IsArray()
  @IsMongoId({ each: true, message: 'Cada elemento en regiones debe ser un MongoID válido.' })
  @ArrayMinSize(1, { message: 'La pregunta debe pertenecer al menos a una región.' })
  readonly regiones: string[];
}