import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true, collection: 'alertas' })
export class Alert extends Document {
  @Prop({ required: true, trim: true })
  mensaje: string;

  @Prop({ trim: true }) // Hacemos la ruta del sonido opcional
  ruta_sonido: string;

  // Relación: Una alerta es generada por UNA región.
  @Prop({ type: Types.ObjectId, ref: 'Region', required: true })
  region: Types.ObjectId;
}

export const AlertSchema = SchemaFactory.createForClass(Alert);