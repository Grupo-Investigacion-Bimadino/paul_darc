import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true, collection: 'preguntas' })
export class Question extends Document {
  @Prop({ required: true, trim: true })
  descripcion: string;

  @Prop({ required: true, trim: true })
  tipo_interaccion: string; // Ejemplo: 'seleccion_multiple', 'arrastrar_soltar'

  // Asumimos que la respuesta correcta es un string, podría ser un array si hay múltiples respuestas.
  @Prop({ required: true })
  respuesta_correcta: string;

  // Relación Muchos-a-Muchos con Regiones
  // Guardamos un array de IDs que apuntan a la colección 'regiones'.
  @Prop([{ type: Types.ObjectId, ref: 'Region', required: true }])
  regiones: Types.ObjectId[];
}

export const QuestionSchema = SchemaFactory.createForClass(Question);