import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
// Importaremos Question cuando esté definido si queremos populación directa
// import { Question } from '../../questions/schemas/question.schema';

export type RegionDocument = Region & Document;

@Schema({ timestamps: true, collection: 'regions' })
export class Region {
  // _id será generado por Mongoose

  @Prop({ required: true, trim: true, unique: true })
  nombre: string;

  @Prop({ trim: true })
  rutaImagen?: string;

  @Prop({ trim: true })
  rutaSonido?: string;

  @Prop({ trim: true })
  rutaVideo?: string;

  // Para la relación M:N con Questions (a través de PREGUNTAS_REGIONES)
  // Una región puede tener muchas preguntas.
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Question' }], default: [] })
  questions: Types.ObjectId[]; // Array de IDs de Preguntas
}

export const RegionSchema = SchemaFactory.createForClass(Region);