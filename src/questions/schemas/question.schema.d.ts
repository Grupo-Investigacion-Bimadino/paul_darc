import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
// import { Region } from '../../regions/schemas/region.schema';

export type QuestionDocument = Question & Document;

@Schema({ timestamps: true, collection: 'questions' })
export class Question {
  // _id será generado por Mongoose

  @Prop({ required: true, trim: true })
  descripcion: string;

  @Prop({ trim: true }) // Podrías usar un Enum aquí si los tipos son fijos
  tipoInteraccion?: string; // e.g., 'opcion_multiple', 'verdadero_falso', 'rellenar_espacio'

   @Prop()
  respuestaCorrecta?: string; // o un tipo más complejo si son opciones múltiples
  

  // Para la relación M:N con Regions (a través de PREGUNTAS_REGIONES)
  // Una pregunta puede pertenecer a varias regiones.
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Region' }], default: [] })
  regions: Types.ObjectId[]; // Array de IDs de Regiones
}

export const QuestionSchema = SchemaFactory.createForClass(Question);