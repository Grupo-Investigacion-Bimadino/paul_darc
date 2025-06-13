import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, collection: 'regiones' })
export class Region extends Document {
  @Prop({ required: true, unique: true, trim: true })
  nombre: string;

  @Prop({ trim: true }) // Opcional
  ruta_imagen: string;

  @Prop({ trim: true }) // Opcional
  ruta_sonido: string;

  @Prop({ trim: true }) // Opcional
  ruta_video: string;
}

export const RegionSchema = SchemaFactory.createForClass(Region);